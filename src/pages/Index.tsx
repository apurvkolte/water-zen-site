import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { categories, features, serviceAreas } from "@/data/products";
import { getProducts, Product } from "@/services/products";
import { Shield, Droplets, Award, Wrench, Phone, Star, CheckCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {

  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Products load failed", error);
      }
    };

    loadProducts();

  }, []);


  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? products.slice(0, 8)
      : products
        .filter((p) => p.category === activeCategory)
        .slice(0, 8);


  return (
    <div>
      {/* SEO-optimized hero */}
      <HeroSlider />

      {/* Category Tabs + Products */}
      <section className="section-padding">
        <div className="container px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Best Water Purifiers in Pune</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Explore our wide range of RO, UV, UF, Alkaline water purifiers. Customized solutions for homes and businesses across PCMC.</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products">
              <button className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                View All Products →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding water-bg">
        <div className="container px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Features & Advantages</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover-lift text-center"
              >
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding gradient-hero text-primary-foreground">
        <div className="container px-0 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, value: "10+", label: "Years Experience" },
              { icon: Droplets, value: "50,000+", label: "Purifiers Installed" },
              { icon: Star, value: "4.8★", label: "Customer Rating" },
              { icon: Shield, value: "100%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-heading font-bold">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Water Purifier Services in Pune</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wrench, title: "Installation", desc: "Free professional installation at your doorstep" },
              { icon: Shield, title: "AMC Plans", desc: "Annual maintenance contracts for worry-free service" },
              { icon: Droplets, title: "Water Testing", desc: "Free water quality testing before recommending a purifier" },
              { icon: Phone, title: "24/7 Support", desc: "Round the clock customer support and emergency service" },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 hover-lift text-center">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding water-bg">
        <div className="container px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Service Areas</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">We Serve Across Pune & PCMC</h2>
            <p className="text-muted-foreground mt-3">Best water purifier dealer, installation & service in these locations</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, i) => (
              <motion.span key={area} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 bg-card border border-border px-5 py-3 rounded-full text-sm font-medium text-foreground hover-lift cursor-default">
                <MapPin className="w-4 h-4 text-primary" /> {area}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Patil", location: "Pimpri Chinchwad", text: "Best water purifier service in Pune! Installed SGS RO at my home and the water quality is amazing. Highly recommended." },
              { name: "Priya Deshmukh", location: "Moshi", text: "Excellent customer support and quick installation. The alkaline purifier has improved our family's health significantly." },
              { name: "Amit Kulkarni", location: "Nigdi", text: "Very professional team. They tested our water first and recommended the perfect purifier. Great after-sales service!" },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-6">
                <div className="flex gap-1 mb-3 text-secondary">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground text-sm mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-primary-foreground">
        <div className="container px-0 md:px-8 md:text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Looking for the Best Water Purifier in Pune?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">Get a free water quality test and expert consultation. We serve Moshi, Talegaon, Ravet, Pimpri Chinchwad, and all over PCMC.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8007779657"><button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"><Phone className="w-5 h-5" /> Call Now: 8007779657</button></a>
              <Link to="/contact"><button className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors flex items-center gap-2 justify-center"><CheckCircle className="w-5 h-5" /> Get Free Quote</button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
