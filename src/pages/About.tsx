import { motion } from "framer-motion";
import { Award, Users, Droplets, Target, CheckCircle, MapPin } from "lucide-react";
import { serviceAreas } from "@/data/products";

const About = () => {
  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">About Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">India's Leading Water Purifier Brand — Trusted by Thousands in Pune & PCMC</p>
        </div>
      </section>

      {/* Main About */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&h=500&fit=crop" alt="SGS RO Water Purifier Pune" className="rounded-2xl shadow-lg w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Shree Gajanan Services</span>
              <h2 className="font-heading text-3xl font-bold text-foreground mt-2 mb-4">No.1 Water Purifier Brand in Pune</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Shree Gajanan Services is the preferred India's Leading Water Purifier Brand specially in Domestic water purifiers. Customers' satisfaction has made us the No.1 Choice in Water Purifier Brand.</p>
                <p>SGS is No.1 water purifier manufacturing company in Pune. We manufactured Superior quality Water Purifiers to the peoples across the India. The company has formed state-of-the-art infrastructure that is fully integrated with latest and modern machines.</p>
                <p>We provide the customize product as customer requirements with all technology like RO UV UF TDS Minerals Alkaline Antioxidant Antibacterial water purifiers.</p>
                <p>Looking for the best water purifier in Pune? Explore top RO water purifiers from brands like Kent and Aquaguard, known for their high-performance filtration systems. Whether you need a water purifier installation in Pune or regular water purifier service, finding trusted water purifier dealers in Pune is essential.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="section-padding water-bg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "To provide affordable, high-quality water purification solutions to every household and business in Pune and across India." },
              { icon: Award, title: "Our Vision", text: "To become India's most trusted water purifier brand by delivering excellence in products, service, and customer satisfaction." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-8">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SGS */}
      <section className="section-padding">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Why Choose SGS RO?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "State-of-the-art manufacturing facility",
              "ISO certified products",
              "Customized solutions for every need",
              "Expert technicians for installation",
              "Competitive pricing with best quality",
              "Serving 50,000+ happy customers",
              "All technologies: RO, UV, UF, Alkaline",
              "Comprehensive AMC plans available",
            ].map((item) => (
              <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 p-3">
                <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold mb-8">Our Service Areas in Pune</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <span key={area} className="flex items-center gap-2 bg-primary-foreground/10 px-5 py-3 rounded-full text-sm font-medium border border-primary-foreground/20">
                <MapPin className="w-4 h-4" /> {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
