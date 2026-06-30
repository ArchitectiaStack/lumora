import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Sparkles, X } from "lucide-react";

interface PromoAlertProps {
  onShowToast: (message: string, type: "success" | "info") => void;
}

export default function PromoAlert({ onShowToast }: PromoAlertProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const promoCode = "SPRING40";

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    onShowToast(`Copied discount code "${promoCode}" to clipboard!`, "success");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-forest text-alabaster px-4 py-2 text-center text-xs relative flex items-center justify-between sm:justify-center gap-3 font-sans border-b border-white/5"
      >
        <div className="flex items-center gap-2 justify-center w-full">
          <Sparkles className="w-3.5 h-3.5 text-dusty-rose animate-pulse" />
          <span className="font-light tracking-wide">
            Spring Sale is live! Enjoy up to 40% off with coupon:
          </span>
          <button
            onClick={handleCopy}
            className="bg-dusty-rose text-forest font-semibold px-2 py-0.5 rounded-md hover:bg-dusty-rose/90 active:scale-95 transition-all flex items-center gap-1 cursor-pointer text-[11px] font-mono shadow-sm"
          >
            {promoCode}
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-alabaster/60 hover:text-alabaster p-1 rounded-full cursor-pointer absolute right-4 hover:bg-white/5 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
