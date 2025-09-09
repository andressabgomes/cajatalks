// Export all hooks for easy importing
export { useAppState } from './useAppState';
export { useConnectionStatus } from './useConnectionStatus';
export { useKeyboardShortcuts, useAppKeyboardShortcuts } from './useKeyboardShortcuts';
export { useUserPreferences } from './useUserPreferences';
export { usePerformance, useExecutionTime } from './usePerformance';
export { 
  useViewState, 
  usePagination, 
  useResponsive,
  filterItems,
  sortItems,
  paginateItems,
  getStatusColor,
  formatTimeAgo,
  truncateText
} from './useDesignSystem';

// Re-export types
export type { PageType } from './useAppState';
export type { ViewState, PaginationState } from './useDesignSystem';