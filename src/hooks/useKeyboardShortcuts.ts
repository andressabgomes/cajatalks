import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const {
        key,
        metaKey = false,
        ctrlKey = false,
        shiftKey = false,
        altKey = false,
        callback
      } = shortcut;

      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      const metaMatches = metaKey ? event.metaKey : !event.metaKey;
      const ctrlMatches = ctrlKey ? event.ctrlKey : !event.ctrlKey;
      const shiftMatches = shiftKey ? event.shiftKey : !event.shiftKey;
      const altMatches = altKey ? event.altKey : !event.altKey;

      if (keyMatches && metaMatches && ctrlMatches && shiftMatches && altMatches) {
        event.preventDefault();
        callback();
        break;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Predefined shortcuts hook for common app shortcuts
export function useAppKeyboardShortcuts(callbacks: {
  onOpenSearch: () => void;
  onOpenSettings?: () => void;
  onNavigateDashboard?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      metaKey: true,
      callback: callbacks.onOpenSearch,
    },
    {
      key: 'k',
      ctrlKey: true,
      callback: callbacks.onOpenSearch,
    },
  ];

  if (callbacks.onOpenSettings) {
    shortcuts.push({
      key: ',',
      metaKey: true,
      callback: callbacks.onOpenSettings,
    });
  }

  if (callbacks.onNavigateDashboard) {
    shortcuts.push({
      key: 'h',
      metaKey: true,
      callback: callbacks.onNavigateDashboard,
    });
  }

  useKeyboardShortcuts(shortcuts);
}