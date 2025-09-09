import { motion } from 'motion/react';
import { Button } from './ui/button';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HamburgerMenu({ isOpen, onClick, className = "" }: HamburgerMenuProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={`relative h-10 w-10 p-0 hover:bg-[var(--caja-yellow)]/10 transition-colors duration-200 rounded-full ${className}`}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        <motion.div 
          className="flex flex-col items-center justify-center w-5 h-5 relative"
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Top line */}
          <motion.div
            className="w-5 h-0.5 bg-current rounded-full absolute shadow-sm"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -6,
              scaleX: isOpen ? 0.8 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          
          {/* Middle line */}
          <motion.div
            className="w-5 h-0.5 bg-current rounded-full absolute shadow-sm"
            animate={{
              opacity: isOpen ? 0 : 1,
              scaleX: isOpen ? 0 : 1,
              x: isOpen ? 10 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          
          {/* Bottom line */}
          <motion.div
            className="w-5 h-0.5 bg-current rounded-full absolute shadow-sm"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 6,
              scaleX: isOpen ? 0.8 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
        
        {/* Subtle glow effect when open */}
        {isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[var(--caja-yellow)]/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Button>
    </motion.div>
  );
}