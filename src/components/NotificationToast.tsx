import { motion, AnimatePresence } from "motion/react";
import { Check, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info";
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function NotificationToast({ toasts, onRemove }: NotificationToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-charcoal text-alabaster diffused-shadow rounded-xl p-4 flex items-start gap-3 border border-charcoal/10"
            layout
          >
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <div className="bg-forest/20 text-dusty-rose p-1 rounded-full">
                  <Check className="w-4 h-4 text-forest bg-dusty-rose rounded-full p-0.5" />
                </div>
              ) : (
                <div className="bg-alabaster/10 text-dusty-rose p-1 rounded-full">
                  <Info className="w-4 h-4 text-dusty-rose" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-sm font-sans font-medium text-alabaster leading-tight">
              {toast.message}
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="text-alabaster/50 hover:text-alabaster transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
