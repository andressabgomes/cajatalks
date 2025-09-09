import { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Ticket, 
  Settings, 
  BarChart3, 
  Search,
  Bell,
  ChevronDown,
  Plus,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Zap,
  Activity
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ThemeToggle } from './theme-toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { CajaLogo } from './ui/caja-logo';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function CajaSidebar({ currentPage, onPageChange, isMobile, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: '12' },
    { id: 'tickets', label: 'Tickets', icon: Ticket, badge: '3' },
    { id: 'clients', label: 'Clientes', icon: Users, badge: null },
    { id: 'team', label: 'Equipe', icon: Users, badge: null },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, badge: null },
    { id: 'knowledge-base', label: 'Base de Conhecimento', icon: BookOpen, badge: null },
    { id: 'integrations', label: 'Integrações', icon: Zap, badge: null },
    { id: 'activity-log', label: 'Log de Atividades', icon: Activity, badge: null },
    { id: 'settings', label: 'Configurações', icon: Settings, badge: null },
  ];

  const quickActions = [
    { id: 'new-conversation', label: 'Nova Conversa', icon: Plus },
    { id: 'notifications', label: 'Notificações', icon: Bell },
  ];

  const handleItemClick = (pageId: string) => {
    onPageChange(pageId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-80';

  return (
    <TooltipProvider>
      <motion.div 
        className={`flex flex-col h-full bg-white border-r border-[var(--border)] relative transition-all duration-300 ${sidebarWidth} shadow-sm`}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className={`border-b border-[var(--border)] bg-white/95 backdrop-blur-sm relative transition-all duration-300 ${isCollapsed ? 'p-4' : 'p-6'}`}>
          {/* Logo and Title */}
          <motion.div 
            className={`flex items-center mb-6 group transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
            layout
          >
            <CajaLogo 
              size="md"
              variant="default"
              animated={true}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="transition-all duration-300"
                >
                  <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--caja-yellow)] transition-colors duration-300">
                    Cajá Talks
                  </h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Workspace Pro</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Collapse Toggle for Desktop */}
          {!isMobile && (
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute -right-3 top-6"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleCollapse}
                    className="h-6 w-6 rounded-full bg-white border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--caja-yellow)] hover:text-[var(--caja-black)] hover:border-[var(--caja-yellow)] transition-all duration-200 shadow-sm"
                  >
                    <motion.div
                      animate={{ rotate: isCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </motion.div>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isCollapsed ? 'Expandir menu' : 'Recolher menu'}
              </TooltipContent>
            </Tooltip>
          )}

          {/* Close Button for Mobile */}
          {isMobile && onClose && (
            <motion.div
              className="absolute -right-3 top-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 rounded-full bg-white border border-[var(--border)] text-[var(--muted-foreground)] hover:text-white hover:bg-red-500 hover:border-red-500 transition-all duration-200 shadow-sm"
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          )}

          {/* Search */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  placeholder="Buscar..."
                  className="pl-10 bg-[var(--muted)]/50 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--caja-yellow)] focus:bg-white transition-all duration-200"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className={`flex-1 py-6 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'} overflow-y-auto`}>
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              
              const buttonContent = (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                    isCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-[var(--caja-yellow)] text-[var(--caja-black)] shadow-sm border border-[var(--caja-yellow)]'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]/50 hover:text-[var(--foreground)] border border-transparent hover:border-[var(--border)]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Icon */}
                  <div className="relative flex items-center justify-center">
                    <Icon className={`h-5 w-5 transition-all duration-200 ${
                      isActive 
                        ? 'text-[var(--caja-black)]' 
                        : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'
                    }`} />
                    {item.badge && isCollapsed && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--caja-yellow)] rounded-full border border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 flex items-center justify-between"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            className={`text-xs transition-all duration-200 ${
                              isActive 
                                ? 'bg-[var(--caja-black)] text-[var(--caja-yellow)] border-[var(--caja-black)]' 
                                : 'bg-[var(--caja-yellow)] text-[var(--caja-black)] border-[var(--caja-yellow)]'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );

              return isCollapsed ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    {buttonContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <div className="flex items-center space-x-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)]">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : buttonContent;
            })}
          </nav>

          {/* Separator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`my-6 ${isCollapsed ? 'px-2' : 'px-4'}`}
          >
            <Separator />
          </motion.div>

          {/* Quick Actions */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <h3 className="text-xs uppercase font-medium text-[var(--muted-foreground)] px-4 mb-3 tracking-wider">
                  Ações Rápidas
                </h3>
                <div className="space-y-1">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-lg transition-all duration-200 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (quickActions.length + index) * 0.05 }}
                      >
                        <Icon className="h-4 w-4 group-hover:text-[var(--caja-yellow)] transition-colors duration-200" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </motion.button>
                    );
                  })}
                  <div className="px-4 py-2">
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Quick Actions */}
          <AnimatePresence>
            {isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Tooltip key={action.id}>
                      <TooltipTrigger asChild>
                        <motion.button
                          className="w-full p-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-xl transition-all duration-200 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Icon className="h-4 w-4 group-hover:text-[var(--caja-yellow)] transition-colors duration-200" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        {action.label}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className={`border-t border-[var(--border)] bg-white/95 transition-all duration-300 ${isCollapsed ? 'p-3' : 'p-4'}`}>
          <AnimatePresence>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-[var(--caja-yellow)]/20 hover:border-[var(--caja-yellow)] transition-colors duration-200">
                      <AvatarImage src="/avatar.jpg" />
                      <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] font-semibold">
                        JS
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-xs text-[var(--muted-foreground)]">joao@empresa.com</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-[var(--caja-yellow)]/20">
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] font-semibold">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] truncate">João Silva</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">joao@empresa.com</p>
                  </div>
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-2 h-2 bg-[var(--caja-green)] rounded-full"></div>
                    <motion.div
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      className="space-y-1 mb-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        onClick={() => handleItemClick('profile')}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-lg transition-all duration-200 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Users className="h-4 w-4 group-hover:text-[var(--caja-yellow)] transition-colors duration-200" />
                        <span className="text-sm font-medium">Meu Perfil</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  className="w-full flex items-center space-x-2 px-3 py-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-lg transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-4 w-4 group-hover:text-red-500 transition-colors duration-200" />
                  <span className="text-sm font-medium">Sair</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}