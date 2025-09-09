import { useState, useCallback } from 'react';

export type PageType = 'dashboard' | 'inbox' | 'tickets' | 'clients' | 'settings' | 'profile' | 'team' | 'reports' | 'knowledge-base' | 'integrations' | 'activity-log';

interface AppState {
  isLoggedIn: boolean;
  currentPage: PageType;
  isMobileSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isOnboardingOpen: boolean;
}

const initialState: AppState = {
  isLoggedIn: false,
  currentPage: 'dashboard',
  isMobileSidebarOpen: false,
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isOnboardingOpen: false,
};

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const actions = {
    login: useCallback(() => {
      updateState({ isLoggedIn: true });
    }, [updateState]),

    logout: useCallback(() => {
      updateState({ isLoggedIn: false, currentPage: 'dashboard' });
    }, [updateState]),

    setCurrentPage: useCallback((page: PageType) => {
      updateState({ currentPage: page });
    }, [updateState]),

    toggleMobileSidebar: useCallback(() => {
      setState(prev => ({ ...prev, isMobileSidebarOpen: !prev.isMobileSidebarOpen }));
    }, []),

    closeMobileSidebar: useCallback(() => {
      updateState({ isMobileSidebarOpen: false });
    }, [updateState]),

    toggleSidebarCollapse: useCallback(() => {
      setState(prev => ({ ...prev, isSidebarCollapsed: !prev.isSidebarCollapsed }));
    }, []),

    toggleMobileMenu: useCallback(() => {
      setState(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
    }, []),

    closeMobileMenu: useCallback(() => {
      updateState({ isMobileMenuOpen: false });
    }, [updateState]),

    openSearch: useCallback(() => {
      updateState({ isSearchOpen: true });
    }, [updateState]),

    closeSearch: useCallback(() => {
      updateState({ isSearchOpen: false });
    }, [updateState]),

    openOnboarding: useCallback(() => {
      updateState({ isOnboardingOpen: true });
    }, [updateState]),

    closeOnboarding: useCallback(() => {
      updateState({ isOnboardingOpen: false });
    }, [updateState]),
  };

  return {
    state,
    actions,
  };
}