import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PK;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const RECEIVER_EMAIL = import.meta.env.VITE_RECEIVER_EMAIL;

const Contact = () => {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container px-2 md:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">Get in touch for water purifier enquiry, installation, or service in Pune & PCMC</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container px-2 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: "Phone", value: "8007779657", href: "tel:8007779657" },
                  { icon: Mail, label: "Email", value: "info@sgsro.com", href: "mailto:info@sgsro.com" },
                  { icon: MapPin, label: "Location", value: "Pimpri Chinchwad, Pune, Maharashtra" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 9:00 AM - 8:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-semibold text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.93177129098!2d73.72567595!3d18.6297816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f2c0bec715%3A0x399f7d91ea4e0d13!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SGS RO Location - Pimpri Chinchwad Pune"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass-card p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground text-sm mb-6">Fill out the form and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Mobile *</label>
                    <input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="How can we help you?" />
                  </div>
                  <button type="submit" className="w-full gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
