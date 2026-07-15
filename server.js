// server.js (create this in your project root)
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static('dist'));

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile(
            path.join(__dirname, 'src/data/products.ts'),
            'utf-8'
        );
        // Extract the products array from the TS file
        const productsMatch = data.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
        if (productsMatch) {
            // Parse the array - this is simplified, you might want a better parser
            const productsStr = '[' + productsMatch[1] + ']';
            // Clean up and parse
            const cleaned = productsStr
                .replace(/\/\/.*$/gm, '') // Remove comments
                .replace(/,\s*}/g, '}') // Remove trailing commas
                .replace(/,\s*]/g, ']'); // Remove trailing commas
            const products = eval(cleaned);
            res.json(products);
        } else {
            res.status(404).json({ error: 'Products not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update products file
app.post('/api/products/update', async (req, res) => {
    try {
        const { products, categories, sliderImages } = req.body;

        // Create the new file content
        const fileContent = `export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const categories = ${JSON.stringify(categories, null, 2)};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const sliderImages = ${JSON.stringify(sliderImages, null, 2)};

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
];`;

        await fs.writeFile(
            path.join(__dirname, 'src/data/products.ts'),
            fileContent,
            'utf-8'
        );

        res.json({ success: true, message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});