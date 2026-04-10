import { Facebook, Twitter, Share2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socials = [
    { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, label: "Twitter", color: "hover:bg-[#1DA1F2]" },
    { icon: MessageCircle, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, label: "WhatsApp", color: "hover:bg-[#25D366]" },
  ];

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground font-medium">Share:</span>
      {socials.map(({ icon: Icon, href, label, color }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground ${color} hover:text-white transition-all duration-300`}
          aria-label={`Share on ${label}`}
        >
          <Icon className="w-4 h-4" />
        </motion.a>
      ))}
      {typeof navigator !== "undefined" && navigator.share && (
        <motion.button
          onClick={handleNativeShare}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

export default SocialShare;
