import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { products } from "@/data/products";
import { getProductById } from "@/services/products";
import { Product } from "@/services/products";
import EnquiryModal from "@/components/EnquiryModal";
import { ArrowLeft, ShoppingCart, Phone, CheckCircle } from "lucide-react";
import SocialShare from "@/components/SocialShare";
import { Link as LinkIcon } from "lucide-react";
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();

  const [showCopyToast, setShowCopyToast] = useState(false);
  const [currentURL, setCurrentURL] = useState("");

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomPosition, setZoomPosition] = useState("0% 0%");
  const [isZoom, setIsZoom] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, [id]);

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);

        const data = await getProductById(id!);


        setProduct(data.product);

        setRelated(data.related || []);


      } catch (error) {

        console.error(
          "Product load failed:",
          error
        );

      }
      finally {

        setLoading(false);

      }

    };


    if (id) {
      loadProduct();
    }

  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(currentURL);
      setShowCopyToast(true);

      setTimeout(() => {
        setShowCopyToast(false);
      }, 2000);

    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const zoomer = e.currentTarget;
    const rect = zoomer.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition(`${x}% ${y}%`);
  };



  if (loading) {
    return (
      <div className="section-padding py-5 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-padding py-5 text-center">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Link to="/products" className="text-primary font-semibold mt-4 inline-block">← Back to Products</Link>
      </div>
    );
  }

  // const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <section className="section-padding py-5">
        <div className="container px-2 md:px-8">
          <Link to="/products" className="flex items-center gap-2 text-primary font-medium mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image with zoom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-2xl bg-white cursor-zoom-in aspect-square"
              onMouseMove={handleZoom}
              onMouseEnter={() => setIsZoom(true)}
              onMouseLeave={() => {
                setIsZoom(false);
                setZoomPosition("0% 0%");
              }}
            >

              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundImage: isZoom ? `url(${product.image})` : "none",
                  backgroundSize: "200%",
                  backgroundPosition: zoomPosition,
                  backgroundRepeat: "no-repeat",
                }}
              >

                <div className="relative w-full h-full  shadow-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${isZoom ? "opacity-0" : "opacity-100"
                      }`}
                  />
                </div>


                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="
      absolute 
      top-3 
      right-3 
      w-10 
      h-10 
      rounded-full 
      bg-white 
      shadow-md 
      flex 
      items-center 
      justify-center
      hover:bg-gray-100
      transition
    "
                >
                  <LinkIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>


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
                <section className="py-8">
                  <h3 className="mb-6 text-xl font-semibold text-gray-900">
                    Product Specifications
                  </h3>

                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {product.specifications.map((spec: any, index: number) => (
                      <div
                        key={index}
                        className={`
            grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[220px_1fr]
            border-b border-gray-200 last:border-b-0
            ${index % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
            transition-colors duration-200 hover:bg-blue-50/40
          `}
                      >
                        <div className="border-r border-gray-200 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700">
                          {spec.title}
                        </div>

                        <div className="px-4 py-4 text-sm leading-6 text-gray-700 break-words">
                          {spec.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
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
          {
            related.length > 0 && (
              <div className="mt-10 md:mt-16 py-8 md:py-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
                  Related Products
                </h2>
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
            )
          }


          {
            showCopyToast && (
              <div className="fixed bottom-5 right-5 z-50">
                <div className="bg-white rounded-lg shadow-xl border overflow-hidden w-72">

                  <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
                    <span className="font-semibold">
                      Success!
                    </span>

                    <button
                      onClick={() => setShowCopyToast(false)}
                      className="text-white text-lg"
                    >
                      ×
                    </button>
                  </div>

                  <div className="px-4 py-3 text-gray-700 text-sm">
                    Link copied to clipboard!
                  </div>

                </div>
              </div>
            )
          }

        </div >
      </section >

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={product.title} />
    </div >
  );
};

export default ProductDetail;
