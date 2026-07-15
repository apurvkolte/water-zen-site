import productData from "./product.json";
import categoryData from "./categories.json";
import sliderImagesData from "./sliderImages.json";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;

  specifications?: {
    title: string;
    description: string;
  }[];
}

export const categories: string[] = categoryData;

export const products: Product[] = productData;


export interface SliderImage {
  url: string;
  title: string;
  subtitle: string;
}

export const sliderImages: SliderImage[] = sliderImagesData;

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
