import { createContext, useContext, ReactNode } from 'react';
import { useAppState } from '../hooks/useAppState';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { useAuth } from '../hooks/useAuth';
import type { PageType } from '../hooks/useAppState';
import type { AuthUser } from '../services/auth';

interface AppContextType {
  // App State
  state: ReturnType<typeof useAppState>['state'];
  actions: ReturnType<typeof useAppState>['actions'];
  
  // User Preferences
  preferences: ReturnType<typeof useUserPreferences>['preferences'];
  updatePreference: ReturnType<typeof useUserPreferences>['updatePreference'];
  updateNestedPreference: ReturnType<typeof useUserPreferences>['updateNestedPreference'];
  
  // Connection Status
  isOnline: boolean;
  
  // Authentication
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAgent: boolean;
  isClient: boolean;
  
  // Computed values
  isMobile: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const appState = useAppState();
  const userPreferences = useUserPreferences();
  const { isOnline } = useConnectionStatus();
  const auth = useAuth();
  
  // Simple mobile detection (can be enhanced)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const value: AppContextType = {
    state: appState.state,
    actions: appState.actions,
    preferences: userPreferences.preferences,
    updatePreference: userPreferences.updatePreference,
    updateNestedPreference: userPreferences.updateNestedPreference,
    isOnline,
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    updateProfile: auth.updateProfile,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.isAdmin,
    isAgent: auth.isAgent,
    isClient: auth.isClient,
    isMobile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Convenience hooks for specific parts of the context
export function useAppActions() {
  return useAppContext().actions;
}

export function useAppPreferences() {
  const { preferences, updatePreference, updateNestedPreference } = useAppContext();
  return { preferences, updatePreference, updateNestedPreference };
}

export function useAppConnection() {
  return useAppContext().isOnline;
}