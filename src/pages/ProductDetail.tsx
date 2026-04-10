import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import EnquiryModal from "@/components/EnquiryModal";
import { ArrowLeft, ShoppingCart, Phone, CheckCircle } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [zoomed, setZoomed] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!product) {
    return (
      <div className="section-padding text-center">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Link to="/products" className="text-primary font-semibold mt-4 inline-block">← Back to Products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <section className="section-padding">
        <div className="container">
          <Link to="/products" className="flex items-center gap-2 text-primary font-medium mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image with zoom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-2xl bg-muted cursor-zoom-in aspect-square"
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={product.image}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? "scale-150" : "scale-100"}`}
              />
              <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-secondary font-semibold text-sm uppercase mb-4">{product.category}</p>
              <p className="text-primary font-bold text-3xl mb-6">₹{product.price.toLocaleString("en-IN")}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="space-y-3 mb-8">
                {["Free Installation", "1 Year Warranty", "Free Water Testing", "24/7 Support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" /> {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setEnquiryOpen(true)} className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  <ShoppingCart className="w-5 h-5" /> Enquiry Now
                </button>
                <a href="tel:8007779657">
                  <button className="w-full border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors flex items-center gap-2 justify-center">
                    <Phone className="w-5 h-5" /> Call Now
                  </button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="glass-card hover-lift overflow-hidden group">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-1">{p.title}</h3>
                      <p className="text-primary font-bold mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={product.title} />
    </div>
  );
};

export default ProductDetail;
