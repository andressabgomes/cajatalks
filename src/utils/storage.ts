/**
 * Local storage utilities with error handling
 */

export const storage = {
  /**
   * Get item from localStorage with error handling
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage with error handling
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Get boolean value from localStorage
   */
  getBooleanItem: (key: string, defaultValue: boolean = false): boolean => {
    const value = storage.getItem(key);
    if (value === null) return defaultValue;
    return value === 'true';
  },

  /**
   * Set boolean value in localStorage
   */
  setBooleanItem: (key: string, value: boolean): boolean => {
    return storage.setItem(key, value.toString());
  },
};

/**
 * Application-specific storage keys
 */
export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'cajaTalks_onboardingCompleted',
  THEME_PREFERENCE: 'cajaTalks_themePreference',
  SIDEBAR_COLLAPSED: 'cajaTalks_sidebarCollapsed',
  USER_PREFERENCES: 'cajaTalks_userPreferences',
} as const;