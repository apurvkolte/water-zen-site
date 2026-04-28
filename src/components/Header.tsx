import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <div className="gradient-primary text-primary-foreground text-sm py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 8007779657</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@sgsro.com</span>
          </div>
          <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> Serving Pune, PCMC & Surrounding Areas</span>
        </div>
      </div>
      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="logo.png" alt="SGS RO - Water Purifier" className="h-12 md:h-14 object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === link.to
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="ml-2">
              <button className="gradient-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Get Quote
              </button>
            </Link>
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-card border-b border-border"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === link.to
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
