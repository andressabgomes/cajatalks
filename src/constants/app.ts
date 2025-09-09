// Application constants
export const APP_CONFIG = {
  NAME: 'Cajá Talks',
  VERSION: '1.0.0',
  DESCRIPTION: 'Workspace Pro',
  SUPPORT_EMAIL: 'suporte@cajatalks.com',
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index levels
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  NOTIFICATION: 1080,
} as const;

// Animation presets
export const ANIMATION_PRESETS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  SLIDE_UP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  SLIDE_LEFT: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  SCALE_IN: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
} as const;

// Timing constants
export const TIMING = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
  DEBOUNCE: 300,
  THROTTLE: 100,
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.cajatalks.com',
  AUTH: '/auth',
  USERS: '/users',
  CONVERSATIONS: '/conversations',
  TICKETS: '/tickets',
  CLIENTS: '/clients',
} as const;