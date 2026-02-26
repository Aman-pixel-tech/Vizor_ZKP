import { motion, AnimatePresence } from "framer-motion";

export default function ModalWrapper({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Center Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}