import type { PageType } from '../hooks/useAppState';

export const SEARCH_NAVIGATION_MAP: Record<string, PageType> = {
  conversation: 'inbox',
  ticket: 'tickets',
  client: 'clients',
  profile: 'profile',
  team: 'team',
  report: 'reports',
  article: 'knowledge-base',
  integration: 'integrations',
  activity: 'activity-log',
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

export const KEYBOARD_SHORTCUTS = {
  SEARCH: { key: 'k', modifier: 'cmd' },
  SETTINGS: { key: ',', modifier: 'cmd' },
  DASHBOARD: { key: 'h', modifier: 'cmd' },
} as const;