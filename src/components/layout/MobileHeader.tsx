import { memo } from 'react';
import { Button } from '../ui/button';
import { HamburgerMenu } from '../hamburger-menu';
import { Search, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';
// import cajaLogo from 'figma:asset/141c2845f579bd317c51c23d4f2e2cf17ec7da5e.png';

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  isOnline: boolean;
  onToggleSidebar: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export const MobileHeader = memo(function MobileHeader({
  isSidebarOpen,
  isOnline,
  onToggleSidebar,
  onOpenMobileMenu,
  onOpenSearch,
}: MobileHeaderProps) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-white/90 backdrop-blur-sm"
    >
      <div className="flex items-center space-x-2">
        <HamburgerMenu
          isOpen={isSidebarOpen}
          onClick={onToggleSidebar}
        />
        
        {/* Alternative Menu Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenMobileMenu}
            className="h-10 w-10 p-0 hover:bg-[var(--caja-yellow)]/10 transition-colors duration-200"
            aria-label="Menu rápido"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md p-1"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 10px 25px rgba(244, 208, 63, 0.3)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-full bg-[var(--caja-yellow)] rounded flex items-center justify-center">
            <span className="text-xs font-bold text-[var(--caja-black)]">CT</span>
          </div>
        </motion.div>
        <span className="font-semibold">Cajá Talks</span>
      </motion.div>

      <div className="flex items-center space-x-2">
        {/* Search Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSearch}
            className="h-10 w-10 p-0 hover:bg-[var(--caja-yellow)]/10 transition-colors duration-200"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </Button>
        </motion.div>
        
        {/* Connection Status */}
        <motion.div 
          className={`p-2 rounded-full transition-colors duration-200 ${
            isOnline 
              ? 'text-[var(--caja-green)] bg-[var(--caja-green)]/10' 
              : 'text-red-500 bg-red-50'
          }`}
          animate={{ 
            scale: isOnline ? 1 : [1, 1.1, 1],
          }}
          transition={{ 
            duration: isOnline ? 0 : 0.5,
            repeat: isOnline ? 0 : Infinity,
            repeatDelay: 1
          }}
          title={isOnline ? 'Online' : 'Offline'}
        >
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        </motion.div>
      </div>
    </motion.div>
  );
});