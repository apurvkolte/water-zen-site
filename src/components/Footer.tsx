import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp, Droplets } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Message sent successfully! We'll contact you soon.");
    setForm({ name: "", mobile: "", email: "", message: "" });
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-8 h-8 text-secondary" />
              <span className="font-heading text-xl font-bold">SGS RO</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              India's Leading Water Purifier Brand. No.1 in Pune for RO, UV, UF, Alkaline water purifiers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com/sgsro" },
                { icon: Instagram, href: "https://instagram.com/sgsro" },
                { icon: Twitter, href: "https://twitter.com/sgsro" },
                { icon: Youtube, href: "https://youtube.com/sgsro" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["RO Water Purifier", "UV Water Purifier", "UF Water Purifier", "Alkaline Purifier", "Commercial Purifier"].map((p) => (
                <li key={p}><Link to="/products" className="hover:text-secondary transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-secondary shrink-0" /> 8007779657</li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-secondary shrink-0" /> info@sgsro.com</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" /> Pimpri Chinchwad, Pune, Maharashtra</li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
              <input type="tel" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
              <textarea placeholder="Message" rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary resize-none" />
              <div className="flex gap-2">
                <button type="submit" className="gradient-primary px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Send</button>
                <button type="button" onClick={() => setForm({ name: "", mobile: "", email: "", message: "" })} className="px-4 py-2 rounded-lg text-sm border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors">Reset</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} sgsro.com | All Rights Reserved</p>
          <p>Best Water Purifier Dealer in Pune & PCMC</p>
        </div>
      </div>

      {/* Back to top */}
      <button onClick={scrollToTop} className="fixed bottom-6 right-6 w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity z-40" aria-label="Back to top">
        <ArrowUp className="w-5 h-5 text-primary-foreground" />
      </button>
    </footer>
  );
};

export default Footer;
