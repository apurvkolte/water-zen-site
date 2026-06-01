import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PK;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const RECEIVER_EMAIL = import.meta.env.VITE_RECEIVER_EMAIL;

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

const EnquiryModal = ({ open, onClose, productName }: EnquiryModalProps) => {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Please fill Name and Mobile number");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          mobile: form.mobile,
          email_to: RECEIVER_EMAIL,
          email: "Product Enquiry",
          message: `
Product Enquiry

Product: ${productName}

Customer Name: ${form.name}
Mobile Number: ${form.mobile}

Message:
${form.message || "No message provided"}
        `,
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );

      toast.success("Enquiry submitted! We'll call you shortly.");

      setForm({
        name: "",
        mobile: "",
        message: "",
      });

      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Enquiry Now</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="tel" placeholder="Mobile Number *" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" value={productName} readOnly className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-muted-foreground" />
              <textarea placeholder="Your Message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <button type="submit" className="w-full gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">Submit Enquiry</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
