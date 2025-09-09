// Supabase configuration and environment variables
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  appName: import.meta.env.VITE_APP_NAME || 'Cajá Talks Interface Design',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.1.0',
}

// Validate required environment variables
export function validateSupabaseConfig() {
  if (!supabaseConfig.url) {
    throw new Error('VITE_SUPABASE_URL is required')
  }
  if (!supabaseConfig.anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is required')
  }
  return true
}

// Database table names
export const TABLES = {
  USERS: 'users',
  CLIENTS: 'clients',
  TICKETS: 'tickets',
  CONVERSATIONS: 'conversations',
  NOTIFICATIONS: 'notifications',
} as const

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CLIENT: 'client',
} as const

// Ticket statuses
export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const

// Ticket priorities
export const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

// Client statuses
export const CLIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const

// Notification types
export const NOTIFICATION_TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
} as const
