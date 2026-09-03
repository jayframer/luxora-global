import express from 'express';
import cors from 'cors';
import XLSX from 'xlsx';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const EXCEL_FILE = join(__dirname, 'inquiries.xlsx');
const ADMIN_PAGE = join(__dirname, 'admin.html');
const CONFIG_FILE = join(__dirname, 'config.json');

if (!existsSync(CONFIG_FILE)) {
  console.error('config.json not found. Run setup first or set ADMIN_USERNAME/ADMIN_PASSWORD env vars.');
  process.exit(1);
}

const config = JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
const MAX_SESSIONS = config.maxSessions || 5;

const SESSION_SECRET = crypto.randomBytes(32).toString('hex');

app.use(cors());
app.use(express.json());

function verifyPassword(inputPassword, storedHash, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(inputPassword, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex') === storedHash);
    });
  });
}

function generateToken(username) {
  const payload = `${username}:${Date.now()}:${crypto.randomBytes(8).toString('hex')}`;
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
}

const validTokens = new Map(); // token -> { username, createdAt }
const TOKEN_EXPIRY_DAYS = 30;
const TOKEN_EXPIRY_MS = TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

function isTokenValid(token) {
  const session = validTokens.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > TOKEN_EXPIRY_MS) {
    validTokens.delete(token);
    return false;
  }
  return true;
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  if (!isTokenValid(token)) {
    validTokens.delete(token);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  next();
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = config.adminUsers.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const isMatch = await verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(username);
    validTokens.set(token, { username, createdAt: Date.now() });
    return res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    validTokens.delete(authHeader.split(' ')[1]);
  }
  res.json({ success: true });
});

function getInquiries() {
  if (!existsSync(EXCEL_FILE)) {
    return [];
  }
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    if (!wb.SheetNames || wb.SheetNames.length === 0) {
      return [];
    }
    const ws = wb.Sheets[wb.SheetNames[0]];
    if (!ws) {
      return [];
    }
    return XLSX.utils.sheet_to_json(ws);
  } catch (err) {
    console.error('Error reading Excel file, starting fresh:', err.message);
    return [];
  }
}

function saveInquiries(inquiries) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(inquiries);
  XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');
  XLSX.writeFile(wb, EXCEL_FILE);
}

app.post('/api/inquiries', (req, res) => {
  try {
    const { fullName, companyName, email, phone, category, product, quantity, message } = req.body;

    if (!fullName || !email || !category || !product || !message) {
      const missing = [];
      if (!fullName) missing.push('fullName');
      if (!email) missing.push('email');
      if (!category) missing.push('category');
      if (!product) missing.push('product');
      if (!message) missing.push('message');
      return res.status(400).json({ error: 'Missing required fields', missing });
    }

    const inquiries = getInquiries();
    const newInquiry = {
      id: Date.now(),
      fullName,
      companyName: companyName || '',
      email,
      phone: phone || '',
      category,
      product,
      quantity: quantity || '',
      message,
      date: new Date().toISOString(),
      status: 'New'
    };

    inquiries.push(newInquiry);
    saveInquiries(inquiries);

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error('Error saving inquiry:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to save inquiry', details: error.message });
  }
});

app.get('/api/inquiries', authMiddleware, (req, res) => {
  try {
    const inquiries = getInquiries();
    res.json(inquiries);
  } catch (error) {
    console.error('Error reading inquiries:', error);
    res.status(500).json({ error: 'Failed to read inquiries' });
  }
});

app.delete('/api/inquiries/:id', authMiddleware, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const inquiries = getInquiries();
    const filtered = inquiries.filter(i => i.id !== id);
    if (filtered.length === inquiries.length) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    saveInquiries(filtered);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

app.delete('/api/inquiries', authMiddleware, (req, res) => {
  try {
    saveInquiries([]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting all inquiries:', error);
    res.status(500).json({ error: 'Failed to delete inquiries' });
  }
});

app.patch('/api/inquiries/:id', authMiddleware, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const inquiries = getInquiries();
    const index = inquiries.findIndex(i => i.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    inquiries[index].status = status;
    saveInquiries(inquiries);
    res.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

app.get('/api/inquiries/export', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const queryToken = req.query.token;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (queryToken) {
      token = queryToken;
    }
    if (!token || !isTokenValid(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!existsSync(EXCEL_FILE)) {
      return res.status(404).json({ error: 'No inquiries found' });
    }
    res.download(EXCEL_FILE, 'inquiries.xlsx');
  } catch (error) {
    console.error('Error exporting inquiries:', error);
    res.status(500).json({ error: 'Failed to export inquiries' });
  }
});

const ROOT_DIR = join(__dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

app.use(express.static(DIST_DIR));
app.use(express.static(PUBLIC_DIR));
app.use('/logo.png', express.static(join(__dirname, 'logo.png')));

app.get('/admin', (req, res) => {
  res.sendFile(ADMIN_PAGE);
});

app.get('*', (req, res) => {
  res.sendFile(join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});
