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
  "RO Water Purifier",
  "UV Water Purifier",
  "UF Water Purifier",
  "Alkaline Purifier",
  "Commercial Purifier",
];

export const products: Product[] = [
  { id: 1, title: "SGS Aqua Pro RO+UV+UF", price: 12999, category: "RO Water Purifier", image: "https://images.unsplash.com/photo-1624958429836-6e0a5e6c8750?w=400&h=400&fit=crop", description: "Advanced 7-stage RO+UV+UF purification with TDS controller. 12L storage capacity." },
  { id: 2, title: "SGS Pure Life RO+UV", price: 9999, category: "RO Water Purifier", image: "https://images.unsplash.com/photo-1564419320461-6eb1f1a8e46c?w=400&h=400&fit=crop", description: "Compact RO+UV purifier ideal for small families. 8L storage tank." },
  { id: 3, title: "SGS Crystal UV Purifier", price: 6999, category: "UV Water Purifier", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop", description: "UV purification for municipally treated water. Energy efficient design." },
  { id: 4, title: "SGS AquaGuard UV+UF", price: 7999, category: "UV Water Purifier", image: "https://images.unsplash.com/photo-1585687433928-9ef37e0a1b6b?w=400&h=400&fit=crop", description: "Dual UV+UF protection with real-time monitoring and alerts." },
  { id: 5, title: "SGS UltraFlow UF System", price: 4999, category: "UF Water Purifier", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&h=400&fit=crop", description: "Gravity-based UF purifier. No electricity needed. Perfect for rural areas." },
  { id: 6, title: "SGS GreenFlow UF", price: 5499, category: "UF Water Purifier", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", description: "Eco-friendly UF system with zero water wastage technology." },
  { id: 7, title: "SGS Alkaline Pro RO+UV+Alkaline", price: 15999, category: "Alkaline Purifier", image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&h=400&fit=crop", description: "Premium alkaline water purifier with mineral enrichment and antioxidant boost." },
  { id: 8, title: "SGS Health+ Alkaline", price: 17999, category: "Alkaline Purifier", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop", description: "Top-tier alkaline purifier with 10-stage purification and copper infusion." },
  { id: 9, title: "SGS Industrial RO 500 LPH", price: 89999, category: "Commercial Purifier", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&fit=crop", description: "Commercial grade 500 LPH RO system for offices, restaurants, and industries." },
  { id: 10, title: "SGS Commercial RO 250 LPH", price: 54999, category: "Commercial Purifier", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop", description: "Mid-range commercial RO plant ideal for small businesses and clinics." },
  { id: 11, title: "SGS Mineral RO+UV+TDS", price: 13999, category: "RO Water Purifier", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop", description: "Mineral RO system with TDS controller to retain essential minerals." },
  { id: 12, title: "SGS Antibacterial RO", price: 11499, category: "RO Water Purifier", image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=400&h=400&fit=crop", description: "RO purifier with silver-charged antibacterial membrane for extra safety." },
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
