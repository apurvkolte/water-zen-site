import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import EnquiryModal from "@/components/EnquiryModal";
import { ArrowLeft, ShoppingCart, Phone, CheckCircle } from "lucide-react";
import SocialShare from "@/components/SocialShare";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [zoomed, setZoomed] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const res = await fetch("/api/products");

        const data = await res.json();

        const list = data.products || data;

        setProducts(list);


        const found = list.find(
          (p: any) => p.id === Number(id)
        );

        setProduct(found);


      } catch (error) {

        console.log(error);

      }

    };


    loadProducts();

  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, [id]);

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
              {/* <p className="text-primary font-bold text-3xl mb-6">₹{product.price.toLocaleString("en-IN")}</p> */}
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <motion.button
                  onClick={() => setEnquiryOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
                >
                  <ShoppingCart className="w-5 h-5" /> Enquiry Now
                </motion.button>
                <motion.a href="tel:8007779657" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <button className="w-full border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors flex items-center gap-2 justify-center">
                    <Phone className="w-5 h-5" /> Call Now
                  </button>
                </motion.a>
              </div>

              {product.specifications && product.specifications.length > 0 && (
                <div className="py-6">
                  <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <span className="w-1 h-6"></span>
                    Product Specifications
                  </h3>

                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full min-w-[640px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Specification
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.specifications.map((spec: any, index: number) => (
                          <tr
                            key={index}
                            className={`
                border-t border-gray-100 
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                hover:bg-blue-50/30 transition-colors duration-200
                group
              `}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                              {spec.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                              {spec.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                {["Free Installation", "1 Year Warranty", "Free Water Testing", "24/7 Support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" /> {f}
                  </div>
                ))}
              </div>



              {/* Social Share */}
              <div className="mt-6 pt-6 border-t border-border">
                <SocialShare
                  url={`https://sgsro.com/product/${product.id}`}
                  title={`${product.title} - SGS RO Water Purifier`}
                />
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
                      <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-1 mb-4">{p.title}</h3>
                      {/* <p className="text-primary font-bold mt-1">₹{p.price.toLocaleString("en-IN")}</p> */}
                      <Link to={`/product/${p.id}`}>
                        <button className="w-full gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
                          View Details
                        </button>
                      </Link>
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
