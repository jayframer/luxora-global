/**
 * A photo shipped at two widths so phones never download desktop-sized files.
 * `width`/`height` are the intrinsic size of the 960w file, which lets the
 * browser reserve layout space before the bytes arrive (no layout shift).
 */
export interface Photo {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

const photo = (slug: string, width: number, height: number): Photo => ({
  src: `/images/${slug}-960.jpg`,
  srcSet: `/images/${slug}-480.jpg 480w, /images/${slug}-960.jpg 960w`,
  width,
  height,
});

export interface Product {
  id: string;
  name: string;
  description: string;
  image: Photo;
  categoryId: string;
  type?: 'product' | 'catalog';
  catalogUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: Photo;
  products: Product[];
}

/**
 * Card images are never wider than ~373px on desktop (max-w-7xl, 3 columns),
 * so this is enough for the browser to pick the right candidate from srcset.
 */
export const CARD_SIZES =
  '(min-width: 1024px) 373px, (min-width: 768px) 320px, 92vw';

export const categories: Category[] = [
  {
    id: "automotive",
    name: "Industrial Components",
    description: "Automotive products and components designed for retailers serving everyday vehicle needs.",
    image: photo('cat-automotive', 960, 644),
    products: [
      {
        id: "auto-1",
        name: "Adapters",
        description: "High-precision machined metal adapters for industrial and mechanical applications.",
        image: photo('auto-adapters', 960, 766),
        categoryId: "automotive"
      },
      {
        id: "auto-2",
        name: "Precision Shafts",
        description: "High-accuracy machined shafts for demanding industrial applications.",
        image: photo('auto-shafts', 960, 760),
        categoryId: "automotive"
      },
      {
        id: "auto-3",
        name: "Flanges",
        description: "Durable metal flanges for secure pipe connections and industrial assemblies.",
        image: photo('auto-flanges', 960, 768),
        categoryId: "automotive"
      },
      {
        id: "auto-4",
        name: "Nuts & Lock Nuts",
        description: "Reliable fastening solutions including standard nuts and vibration-resistant lock nuts.",
        image: photo('auto-nuts', 960, 747),
        categoryId: "automotive"
      },
      {
        id: "auto-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ precision-engineered industrial components. Browse or download our complete catalog to find exactly what you need.",
        image: photo('cat-automotive', 960, 644),
        categoryId: "automotive",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Industrial.pdf"
      },
      {
        id: "auto-tractor-catalog",
        name: "Tractor Parts",
        description: "Explore 40+ tractor parts. Browse or download our complete catalog to find exactly what you need.",
        image: photo('cat-automotive', 960, 644),
        categoryId: "automotive",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Tractorparts.pdf"
      }
    ]
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    description: "Modern and practical kitchen products suitable for everyday retail needs.",
    image: photo('cat-kitchenware', 960, 644),
    products: [
      {
        id: "kw-1",
        name: "Cups",
        description: "Durable and stylish cups for everyday kitchen use.",
        image: photo('kw-cups', 960, 640),
        categoryId: "kitchenware"
      },
      {
        id: "kw-2",
        name: "Containers",
        description: "Airtight storage containers to keep your kitchen organized.",
        image: photo('kw-containers', 960, 640),
        categoryId: "kitchenware"
      },
      {
        id: "kw-4",
        name: "Plastic Flower Pot with Saucer",
        description: "Durable and lightweight plastic flower pots with built-in saucers. Perfect for flowers, herbs, succulents and more.",
        image: photo('kw-flowerpot', 960, 761),
        categoryId: "kitchenware"
      },
      {
        id: "kw-5",
        name: "Premium Square Plastic Water Bottle",
        description: "Sleek and durable bottle for everyday use. Perfect for beverages, storage, and kitchen organization.",
        image: photo('kw-bottle', 960, 592),
        categoryId: "kitchenware"
      },
      {
        id: "kw-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ quality kitchenware products. Browse or download our complete catalog to find exactly what you need.",
        image: photo('cat-kitchenware', 960, 644),
        categoryId: "kitchenware",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Kitchenware.pdf"
      }
    ]
  },
  {
    id: "biodegradable",
    name: "Biodegradable Products",
    description: "Practical sustainable products for retailers looking for alternatives designed with reduced environmental impact in mind.",
    image: photo('cat-biodegradable', 960, 644),
    products: [
      {
        id: "bio-4",
        name: "Plate",
        description: "Eco-friendly biodegradable plates for sustainable dining.",
        image: photo('bio-plate', 960, 861),
        categoryId: "biodegradable"
      },
      {
        id: "bio-5",
        name: "Cutlery",
        description: "Compostable cutlery sets made from plant-based materials.",
        image: photo('bio-cutlery', 960, 641),
        categoryId: "biodegradable"
      },
      {
        id: "bio-6",
        name: "Bowl",
        description: "Sturdy biodegradable bowls perfect for takeaway and dining.",
        image: photo('bio-bowl', 960, 644),
        categoryId: "biodegradable"
      },
      {
        id: "bio-7",
        name: "Cups",
        description: "Eco-friendly cups for hot and cold beverages.",
        image: photo('bio-cups', 960, 643),
        categoryId: "biodegradable"
      },
      {
        id: "bio-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ sustainable biodegradable products. Browse or download our complete catalog to find exactly what you need.",
        image: photo('cat-biodegradable', 960, 644),
        categoryId: "biodegradable",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Biodegradable.pdf"
      }
    ]
  }
];
