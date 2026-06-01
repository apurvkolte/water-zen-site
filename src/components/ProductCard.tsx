import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="glass-card hover-lift overflow-hidden group"
  >
    <div className="relative overflow-hidden aspect-square bg-muted">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
        {product.category}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-heading font-semibold text-foreground text-lg mb-1 mb-4 line-clamp-1">{product.title}</h3>
      {/* <p className="text-primary font-bold text-xl mb-3">₹{product.price.toLocaleString("en-IN")}</p> */}
      <Link to={`/product/${product.id}`}>
        <button className="w-full gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
          View Details
        </button>
      </Link>
    </div>
  </motion.div>
);

export default ProductCard;
