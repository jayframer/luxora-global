export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  type?: 'product' | 'catalog';
  catalogUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: "biodegradable",
    name: "Biodegradable Products",
    description: "Practical sustainable products for retailers looking for alternatives designed with reduced environmental impact in mind.",
    image: "/images/biodegradable_category_1787480202571.jpg",
    products: [
      {
        id: "bio-4",
        name: "Plate",
        description: "Eco-friendly biodegradable plates for sustainable dining.",
        image: "/images/plate.jpg",
        categoryId: "biodegradable"
      },
      {
        id: "bio-5",
        name: "Cutlery",
        description: "Compostable cutlery sets made from plant-based materials.",
        image: "/images/cutlery.png",
        categoryId: "biodegradable"
      },
      {
        id: "bio-6",
        name: "Bowl",
        description: "Sturdy biodegradable bowls perfect for takeaway and dining.",
        image: "/images/bowl.png",
        categoryId: "biodegradable"
      },
      {
        id: "bio-7",
        name: "Cups",
        description: "Eco-friendly cups for hot and cold beverages.",
        image: "/images/cups.png",
        categoryId: "biodegradable"
      },
      {
        id: "bio-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ sustainable biodegradable products. Browse or download our complete catalog to find exactly what you need.",
        image: "/images/biodegradable_category_1787480202571.jpg",
        categoryId: "biodegradable",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Biodegradable.pdf"
      }
    ]
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    description: "Modern and practical kitchen products suitable for everyday retail needs.",
    image: "/images/kitchenware_cover.png",
    products: [
      {
        id: "kw-1",
        name: "Cups",
        description: "Durable and stylish cups for everyday kitchen use.",
        image: "/images/cups.jpeg",
        categoryId: "kitchenware"
      },
      {
        id: "kw-2",
        name: "Containers",
        description: "Airtight storage containers to keep your kitchen organized.",
        image: "/images/containers.png",
        categoryId: "kitchenware"
      },
      {
        id: "kw-4",
        name: "Plastic Flower Pot with Saucer",
        description: "Durable and lightweight plastic flower pots with built-in saucers. Perfect for flowers, herbs, succulents and more.",
        image: "/images/plastic_flower_pot.png",
        categoryId: "kitchenware"
      },
      {
        id: "kw-5",
        name: "Premium Square Plastic Water Bottle",
        description: "Sleek and durable bottle for everyday use. Perfect for beverages, storage, and kitchen organization.",
        image: "/images/bottle.png",
        categoryId: "kitchenware"
      },
      {
        id: "kw-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ quality kitchenware products. Browse or download our complete catalog to find exactly what you need.",
        image: "/images/kitchenware_cover.png",
        categoryId: "kitchenware",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Kitchenware.pdf"
      }
    ]
  },
  {
    id: "automotive",
    name: "Industrial Components",
    description: "Automotive products and components designed for retailers serving everyday vehicle needs.",
    image: "/images/automotive_category_1787480232455.jpg",
    products: [
      {
        id: "auto-1",
        name: "Adapters",
        description: "High-precision machined metal adapters for industrial and mechanical applications.",
        image: "/images/Adapters.jpg",
        categoryId: "automotive"
      },
      {
        id: "auto-2",
        name: "Precision Shafts",
        description: "High-accuracy machined shafts for demanding industrial applications.",
        image: "/images/Precisionshafts.jpg",
        categoryId: "automotive"
      },
      {
        id: "auto-3",
        name: "Flanges",
        description: "Durable metal flanges for secure pipe connections and industrial assemblies.",
        image: "/images/Flanges.jpg",
        categoryId: "automotive"
      },
      {
        id: "auto-4",
        name: "Nuts & Lock Nuts",
        description: "Reliable fastening solutions including standard nuts and vibration-resistant lock nuts.",
        image: "/images/Nuts&Locknuts.jpg",
        categoryId: "automotive"
      },
      {
        id: "auto-catalog",
        name: "Explore Our Full Range",
        description: "We offer 10+ precision-engineered industrial components. Browse or download our complete catalog to find exactly what you need.",
        image: "/images/automotive_category_1787480232455.jpg",
        categoryId: "automotive",
        type: "catalog",
        catalogUrl: "/catalog/LuxoraGlobal_Industrial.pdf"
      }
    ]
  }
];
