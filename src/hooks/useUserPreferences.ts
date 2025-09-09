import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface UserPreferences {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    desktop: boolean;
    email: boolean;
    sound: boolean;
  };
  language: string;
}

const defaultPreferences: UserPreferences = {
  sidebarCollapsed: false,
  theme: 'system',
  notifications: {
    desktop: true,
    email: true,
    sound: true,
  },
  language: 'pt-BR',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const storedPreferences = storage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (storedPreferences) {
        const parsed = JSON.parse(storedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
      
      // Load individual preferences for backward compatibility
      const sidebarCollapsed = storage.getBooleanItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
      const theme = storage.getItem(STORAGE_KEYS.THEME_PREFERENCE) as UserPreferences['theme'];
      
      setPreferences(prev => ({
        ...prev,
        ...(sidebarCollapsed !== defaultPreferences.sidebarCollapsed && { sidebarCollapsed }),
        ...(theme && { theme }),
      }));
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPreferences: UserPreferences) => {
    try {
      storage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(newPreferences));
      
      // Save individual keys for backward compatibility
      storage.setBooleanItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, newPreferences.sidebarCollapsed);
      storage.setItem(STORAGE_KEYS.THEME_PREFERENCE, newPreferences.theme);
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
    }
  }, []);

  // Update specific preference
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value };
      savePreferences(newPreferences);
      return newPreferences;
    });
  }, [savePreferences]);

  // Update nested preference
  const updateNestedPreference = useCallback(<
    K extends keyof UserPreferences,
    NK extends keyof UserPreferences[K]
  >(
    key: K,
    nestedKey: NK,
    value: UserPreferences[K][NK]
  ) => {
    setPreferences(prev => {
      const newPreferences = {
        ...prev,
        [key]: {
          ...prev[key],
          [nestedKey]: value,
        },
      };
      savePreferences(newPreferences);
      return newPreferences;
    });
  }, [savePreferences]);

  // Reset preferences to default
  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
    savePreferences(defaultPreferences);
  }, [savePreferences]);

  return {
    preferences,
    isLoading,
    updatePreference,
    updateNestedPreference,
    resetPreferences,
  };
}