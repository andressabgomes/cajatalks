import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CajaLogoWithText } from './components/ui/caja-logo';

// Components
import { Login } from './components/login';
import { CajaSidebar } from './components/sidebar';
import { GlobalSearch } from './components/global-search';
import { Onboarding } from './components/onboarding';
import { MobileMenu } from './components/mobile-menu';
import { Dashboard } from './components/dashboard';
import { Inbox } from './components/inbox';
import { Tickets } from './components/tickets';
import { Clients } from './components/clients';
import { Settings } from './components/settings';
import { Profile } from './components/profile';
import { Team } from './components/team';
import { Reports } from './components/reports';
import { KnowledgeBase } from './components/knowledge-base';
import { Integrations } from './components/integrations';
import { ActivityLog } from './components/activity-log';
import { ErrorBoundary } from './components/ErrorBoundary';

// Hooks
import { useNotifications } from './components/notifications';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'inbox' | 'tickets' | 'clients' | 'settings' | 'profile' | 'team' | 'reports' | 'knowledge-base' | 'integrations' | 'activity-log'>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  
  const { NotificationSystem, showSuccess, showInfo } = useNotifications();

  // Authentication handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    showSuccess('Bem-vindo!', 'Login realizado com sucesso');
    
    // Check if user is new (for demo purposes, always show onboarding)
    const isNewUser = !localStorage.getItem('cajaTalks_onboardingCompleted');
    if (isNewUser) {
      setTimeout(() => setIsOnboardingOpen(true), 1000);
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('cajaTalks_onboardingCompleted', 'true');
    setIsOnboardingOpen(false);
    showSuccess('Tutorial concluído!', 'Agora você está pronto para usar o Cajá Talks');
  };

  // Navigation handlers
  const handlePageChange = (page: string) => {
    setCurrentPage(page as any);
    setIsMobileSidebarOpen(false);
  };

  const handleMobileMenuPageChange = (page: string) => {
    setCurrentPage(page as any);
    setIsMobileMenuOpen(false);
  };

  const handleSearchNavigation = (type: string, id: string) => {
    const searchNavigationMap: Record<string, typeof currentPage> = {
      conversation: 'inbox',
      ticket: 'tickets',
      client: 'clients',
      profile: 'profile',
      team: 'team',
      report: 'reports',
      article: 'knowledge-base',
      integration: 'integrations',
      activity: 'activity-log',
    };
    
    const targetPage = searchNavigationMap[type];
    if (targetPage) {
      setCurrentPage(targetPage);
    }
    setIsSearchOpen(false);
  };

  // Simple mobile header component
  const MobileHeader = () => (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-white/90 backdrop-blur-sm">
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-gray-600"></div>
          <div className="w-full h-0.5 bg-gray-600"></div>
          <div className="w-full h-0.5 bg-gray-600"></div>
        </div>
      </button>
      <CajaLogoWithText 
        logoSize="sm" 
        textSize="md" 
        variant="default"
        animated={true}
      />
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        🔍
      </button>
    </div>
  );

  // Simple page renderer
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'inbox': return <Inbox />;
      case 'tickets': return <Tickets />;
      case 'clients': return <Clients />;
      case 'settings': return <Settings />;
      case 'profile': return <Profile />;
      case 'team': return <Team />;
      case 'reports': return <Reports />;
      case 'knowledge-base': return <KnowledgeBase />;
      case 'integrations': return <Integrations />;
      case 'activity-log': return <ActivityLog />;
      default: return <Dashboard />;
    }
  };

  // Render login screen if not authenticated
  if (!isLoggedIn) {
    return (
      <ErrorBoundary>
        <Login onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex bg-[var(--background)]">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <CajaSidebar 
            currentPage={currentPage} 
            onPageChange={handlePageChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className="fixed inset-y-0 left-0 w-80 z-50 lg:hidden"
            >
              <CajaSidebar 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                isMobile={true}
                onClose={() => setIsMobileSidebarOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {renderCurrentPage()}
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          currentPage={currentPage}
          onPageChange={handleMobileMenuPageChange}
          onSearchOpen={() => setIsSearchOpen(true)}
        />
        
        {/* Global Search */}
        <GlobalSearch 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleSearchNavigation}
        />
        
        {/* Onboarding */}
        <Onboarding 
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={handleOnboardingComplete}
        />
        
        {/* Notification System */}
        <NotificationSystem />
      </div>
    </ErrorBoundary>
  );
}