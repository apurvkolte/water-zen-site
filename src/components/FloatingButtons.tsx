import { useState } from "react";
import { Phone, X, MessageCircle, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const services = [
  "RO Water Purifier",
  "UV Water Purifier",
  "UF Water Purifier",
  "Alkaline Purifier",
  "Commercial Purifier",
  "Water Purifier Service",
  "AMC / Maintenance",
  "Water Testing",
];

const FloatingButtons = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", service: services[0] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Please fill Name and Mobile number");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const message = `Hi SGS RO,%0A%0AName: ${encodeURIComponent(form.name)}%0AMobile: ${form.mobile}%0AService: ${encodeURIComponent(form.service)}%0A%0APlease contact me.`;
    window.open(`https://wa.me/918007779657?text=${message}`, "_blank");

    // Also send via mailto
    const emailBody = `Name: ${form.name}\nMobile: ${form.mobile}\nService: ${form.service}`;
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:info@sgsro.com?subject=Enquiry from ${form.name}&body=${encodeURIComponent(emailBody)}`;
    mailLink.click();

    toast.success("Redirecting to WhatsApp...");
    setForm({ name: "", mobile: "", service: services[0] });
    setShowForm(false);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-20 right-2 md:bottom-24 md:right-6 z-50 flex flex-col gap-2 md:gap-3">
        {/* WhatsApp */}
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="WhatsApp Enquiry"
        >
          <FaWhatsapp className="w-7 h-7 md:w-9 md:h-9" />
        </motion.button>

        {/* Call */}
        <motion.a
          href="tel:8007779657"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-lg hover:bg-cyan-700 hover:shadow-xl "
          aria-label="Call Now"
        >
          <Phone className="w-7 h-7  animate-pulse" />
        </motion.a>
      </div>

      {/* WhatsApp Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="gradient-primary p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 md:w-7 md:h-7  text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary-foreground">WhatsApp Enquiry</h3>
                    <p className="text-primary-foreground/70 text-xs">We'll reply within 5 minutes</p>
                  </div>
                </div>
                <button onClick={() => setShowForm(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                  <X className="w-5 h-5 md:w-7 md:h-7 " />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <label className="text-sm font-medium text-foreground mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <label className="text-sm font-medium text-foreground mb-1 block">Mobile Number *</label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <label className="text-sm font-medium text-foreground mb-1 block">Service Required</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 md:w-7 md:h-7 " /> Send via WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
