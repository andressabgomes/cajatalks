import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  BarChart3,
  MessageSquare,
  Ticket,
  Users,
  Settings,
  Bell,
  User,
  LogOut,
  Search,
  Plus,
  BookOpen,
  Zap,
  Activity
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearchOpen: () => void;
}

export function MobileMenu({ isOpen, onClose, currentPage, onPageChange, onSearchOpen }: MobileMenuProps) {
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
    { id: 'profile', label: 'Meu Perfil', icon: User, badge: null },
    { id: 'settings', label: 'Configurações', icon: Settings, badge: null },
  ];

  const handleItemClick = (pageId: string) => {
    onPageChange(pageId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed top-4 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden border border-[var(--border)]"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  ×
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    onSearchOpen();
                    onClose();
                  }}
                  className="h-12 justify-start space-x-3 border-[var(--caja-yellow)]/20 hover:bg-[var(--caja-yellow)]/10"
                >
                  <Search className="h-4 w-4" />
                  <span>Buscar</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 justify-start space-x-3 border-[var(--caja-green)]/20 hover:bg-[var(--caja-green)]/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>Novo</span>
                </Button>
              </div>

              <Separator className="mb-6" />

              {/* Navigation Items */}
              <div className="space-y-2 mb-6">
                {menuItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--caja-yellow)] text-[var(--caja-black)] shadow-sm'
                          : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${
                          isActive ? 'text-[var(--caja-black)]' : 'text-[var(--muted-foreground)]'
                        }`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"}
                          className={`text-xs ${
                            isActive 
                              ? 'bg-[var(--caja-black)] text-[var(--caja-yellow)]' 
                              : 'bg-[var(--caja-yellow)] text-[var(--caja-black)]'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <Separator className="mb-6" />

              {/* User Section */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 h-12"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notificações</span>
                  <Badge className="ml-auto bg-[var(--caja-yellow)] text-[var(--caja-black)]">5</Badge>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 h-12"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}