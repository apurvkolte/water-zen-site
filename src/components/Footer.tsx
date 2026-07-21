import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp, Droplets } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PK;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const RECEIVER_EMAIL = import.meta.env.VITE_RECEIVER_EMAIL;

const Footer = () => {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.mobile.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          mobile: form.mobile,
          email_to: `${RECEIVER_EMAIL}`,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );


      // ✅ show success toast
      toast.success("Message sent successfully!");

      // ✅ clear form after success
      setForm({
        name: "",
        mobile: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.log("FULL ERROR:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Droplets className="w-8 h-8 text-secondary" /> */}
              <img src="/logo.png" alt="SGS RO - Water Purifier" className="h-12 md:h-14 object-contain" />
              {/* <span className="font-heading text-xl font-bold">SGS RO</span> */}
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              India's Leading Water Purifier Brand. No.1 in Pune for RO, UV, UF, Alkaline water purifiers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/rowaterpurifierspune/", hoverBg: "hover:bg-[#1877F2]", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/p/DbAU1DWoOUk", hoverBg: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]", label: "Instagram" },
                // { icon: Twitter, href: "https://twitter.com/sgsro", hoverBg: "hover:bg-[#1DA1F2]", label: "Twitter" },
                // { icon: Youtube, href: "https://youtube.com/sgsro", hoverBg: "hover:bg-[#FF0000]", label: "YouTube" },
              ].map(({ icon: Icon, href, hoverBg, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`group w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center ${hoverBg} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-foreground/10`}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["RO Water Purifier", "UV Water Purifier", "UF Water Purifier", "Alkaline Purifier", "Commercial Purifier"].map((p) => (
                <li key={p}><Link to="/products" className="hover:text-secondary transition-colors flex">
                  <Droplets className="w-6 h-6 text-secondary me-2" />
                  {p}</Link></li>
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

      {/* Back to top - repositioned to avoid floating buttons overlap */}

      <button onClick={scrollToTop} className="fixed bottom-6 right-2 md:right-6 w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 hover:scale-110 transition-all duration-300 z-40" aria-label="Back to top">
        <ArrowUp className="w-7 h-7 text-primary-foreground" />
      </button>
    </footer>
  );
};

export default Footer;
