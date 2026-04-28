export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const categories = [
  "All",
  "Alkaline Water purifier",
  "Commercial Water Purifier",
  "Spare Parts",
  "Lexpure Water Purifier"
];

export const products: Product[] = [
  {
    id: 1,
    title: "Lexpure Seron RO+UV+Alkaline+Silver NANO",
    price: 17936,
    category: "Lexpure Water Purifier",
    image: "/products/lexpure-seron-ro-uv-alkaline-silver-nano.jpg",
    description: "7 Stage Purification | 10L Storage | Antimicrobial Defense with Silver NANO. Suitable for Borewell, Tanker & Municipal Water (TDS up to 2000 PPM)."
  },
  {
    id: 2,
    title: "Lexpure Ivory Alkaline Ro Water Purifier (Gray)",
    price: 14537,
    category: "Alkaline Water purifier",
    image: "/products/lexpure-ivory-alkaline-ro-water-purifier-gray.jpg",
    description: "5-Stage RO+UV+Alkaline purification. 10L Food Grade storage tank. 15-18 LPH capacity. Works up to 2000 ppm TDS."
  },
  {
    id: 3,
    title: "Lexpure Seron RO+UV+Alkaline+Silver NANO (Refurbished/Promo)",
    price: 16992,
    category: "Alkaline Water purifier",
    image: "/products/lexpure-seron-ro-uv-alkaline-nanofiltration.jpg",
    description: "7-Stage purification featuring Silver NANO technology for antimicrobial defense. 10L capacity, ideal for all water sources."
  },
  {
    id: 4,
    title: "Lexpure Vedic Alkaline (Black)",
    price: 18879,
    category: "Lexpure Water Purifier",
    image: "/products/lexpure-vedic-alkaline-ro-purifier-black.jpg",
    description: "RO + UV + Alkaline + TDS controller. 5-Stage purification with 10L storage. High-performance 100 GPD booster pump."
  },
  {
    id: 5,
    title: "Cruze Nobel RO+Alkaline Water Purifier",
    price: 16030,
    category: "Alkaline Water purifier",
    image: "/products/lexpure-cruze-nobel-ro-alkaline-purifier.jpg",
    description: "M.S. Coated Body RO+Alkaline purifier. Capacity: 17-18 LPH. Heavy-duty performance for TDS up to 2500 ppm."
  },
  {
    id: 6,
    title: "Lexpure PP Spun (Pack of 1)",
    price: 177,
    category: "Spare Parts",
    image: "/products/lexpure-pp-spun-filter-cartridge-1-pack.jpg",
    description: "0.005 Micron Polypropylene filter. Essential pre-filter for all domestic RO systems. 3-month shelf life."
  },
  {
    id: 7,
    title: "50 LPH Lexpure RO Water Purifier",
    price: 34423,
    category: "Commercial Water Purifier",
    image: "/products/lexpure-50-lph-commercial-ro-purifier.jpg",
    description: "Commercial grade 5-stage Reverse Osmosis system. 50-55 Litres per hour capacity. Includes 1-year warranty."
  },
  {
    id: 8,
    title: "25 LPH Commercial RO Water Purifier",
    price: 19116,
    category: "Commercial Water Purifier",
    image: "/products/commercial-ro-water-purifier-25-lph-pune.jpg",
    description: "Ideal for offices and clinics. 25 LPH purification capacity. 5-stage RO system with free installation in Pune."
  },
  {
    id: 9,
    title: "Purosis Water Purifier (RO+UV+TDS+Alkaline)",
    price: 14868,
    category: "Alkaline Water purifier",
    image: "/products/purosis-ro-uv-tds-alkaline-water-purifier.jpg",
    description: "Advanced filtration removing 99.99% bacteria and heavy metals. 9L storage capacity with modern compact design."
  },
  {
    id: 10,
    title: "Finepure Water Purifier (RO+TDS+Copper+Alkaline)",
    price: 13806,
    category: "Alkaline Water purifier",
    image: "/products/finepure-ro-tds-copper-alkaline-water-purifier.jpg",
    description: "Premium copper-infused alkaline purification. Effectively removes arsenic, rust, and pesticides. 9L capacity."
  },
  {
    id: 11,
    title: "Lexpure PP Spun (Pack of 3)",
    price: 501,
    category: "Spare Parts",
    image: "/products/lexpure-pp-spun-filter-cartridge-3-pack.jpg",
    description: "Value pack of 3 PP Spun filters. High-quality 0.005 micron filtration for domestic water purifiers."
  },
  {
    id: 12,
    title: "Lexpure PP Spun (Pack of 6)",
    price: 725,
    category: "Spare Parts",
    image: "/products/lexpure-pp-spun-filter-cartridge-6-pack.jpg",
    description: "Bulk pack of 6 PP Spun filters. Polypropylene material compatible with all electric water purifiers."
  }
];

export const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1400&h=500&fit=crop",
    title: "Pure Water, Healthy Life",
    subtitle: "India's Leading Water Purifier Brand in Pune",
  },
  {
    url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1400&h=500&fit=crop",
    title: "Advanced RO+UV+UF Technology",
    subtitle: "Serving Pimpri Chinchwad, Moshi, Talegaon & All PCMC",
  },
  {
    url: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=1400&h=500&fit=crop",
    title: "Alkaline & Mineral Rich Water",
    subtitle: "Customized Solutions for Every Home & Business",
  },
];

export const features = [
  { icon: "💧", title: "7-Stage Purification", description: "RO+UV+UF+TDS technology ensures 100% safe drinking water" },
  { icon: "🛡️", title: "Antibacterial Protection", description: "Silver-charged membranes eliminate harmful bacteria" },
  { icon: "🔧", title: "Free Installation", description: "Professional installation at your doorstep across Pune & PCMC" },
  { icon: "⚡", title: "Energy Efficient", description: "Low power consumption for eco-friendly water purification" },
  { icon: "🏆", title: "No.1 in Pune", description: "Trusted by thousands of families across Pimpri Chinchwad" },
  { icon: "📞", title: "24/7 Support", description: "Round the clock customer service and annual maintenance" },
];

export const serviceAreas = [
  "Moshi", "Talegaon", "Ravet", "Pimpri Chinchwad", "Punawale",
  "Akurdi", "Nigdi", "Chikhali", "Chakan", "All over PCMC",
];
