import React, { forwardRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Separator } from './separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { motion } from 'motion/react';
import { cn } from './utils';
import { LucideIcon } from 'lucide-react';

// Re-export logo components for easy access
export { CajaLogo, CajaLogoWithText } from './caja-logo';

// Tipos base do design system
export interface CajaIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'yellow' | 'green' | 'brown' | 'muted';
  className?: string;
}

export interface CajaCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'stats' | 'activity' | 'feature';
  hoverable?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CajaListItemProps {
  title: string;
  description?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  icon?: LucideIcon;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'yellow' | 'green' | 'brown' | 'red' | 'blue';
  }>;
  actions?: React.ReactNode;
  status?: 'online' | 'away' | 'offline';
  priority?: 'high' | 'medium' | 'low';
  timestamp?: string;
  unread?: number;
  selected?: boolean;
  hoverable?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CajaSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  loading?: boolean;
}

export interface CajaHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

export interface CajaStatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  variant?: 'yellow' | 'green' | 'brown' | 'default';
  animated?: boolean;
  loading?: boolean;
  className?: string;
}

// Design System Components

// Ícone padronizado
export const CajaIcon = forwardRef<HTMLDivElement, CajaIconProps>(
  ({ icon: Icon, size = 'md', variant = 'default', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8'
    };

    const variantClasses = {
      default: 'text-[var(--foreground)]',
      yellow: 'text-[var(--caja-yellow)]',
      green: 'text-[var(--caja-green)]',
      brown: 'text-[var(--caja-brown)]',
      muted: 'text-[var(--muted-foreground)]'
    };

    return (
      <div ref={ref} className={cn('flex items-center justify-center', className)} {...props}>
        <Icon className={cn(sizeClasses[size], variantClasses[variant])} />
      </div>
    );
  }
);

CajaIcon.displayName = 'CajaIcon';

// Card padronizado
export const CajaCard = forwardRef<HTMLDivElement, CajaCardProps>(
  ({ title, description, children, variant = 'default', hoverable = false, animated = false, className, onClick, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white border border-[var(--border)]',
      stats: 'bg-white border-0 shadow-md hover:shadow-lg',
      activity: 'bg-white border border-[var(--border)] hover:bg-[var(--muted)]/30',
      feature: 'bg-gradient-to-br from-white to-[var(--caja-yellow-light)] border border-[var(--caja-yellow)]/20'
    };

    const hoverClasses = hoverable ? 'hover:shadow-lg cursor-pointer transition-all duration-300' : '';
    const animationClasses = animated ? 'hover:scale-[1.02] group' : '';

    const baseClasses = cn(
      'rounded-xl',
      variantClasses[variant],
      hoverClasses,
      animationClasses,
      className
    );

    return animated ? (
      <motion.div
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {(title || description) && (
          <CardHeader className="pb-4">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={title || description ? 'pt-0' : ''}>
          {children}
        </CardContent>
      </motion.div>
    ) : (
      <div
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {(title || description) && (
          <CardHeader className="pb-4">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={title || description ? 'pt-0' : ''}>
          {children}
        </CardContent>
      </div>
    );
  }
);

CajaCard.displayName = 'CajaCard';

// Item de lista padronizado
export const CajaListItem = forwardRef<HTMLDivElement, CajaListItemProps>(
  ({ 
    title, 
    description, 
    subtitle, 
    avatar, 
    icon: Icon, 
    badges = [], 
    actions, 
    status, 
    priority, 
    timestamp, 
    unread, 
    selected = false, 
    hoverable = true, 
    animated = true, 
    className, 
    onClick,
    ...props 
  }, ref) => {
    const statusColors = {
      online: 'bg-[var(--caja-green)]',
      away: 'bg-[var(--caja-yellow)]',
      offline: 'bg-gray-400'
    };

    const priorityColors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };

    const badgeVariants = {
      default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
      yellow: 'bg-[var(--caja-yellow-light)] text-[var(--caja-yellow)] border-[var(--caja-yellow)]/20',
      green: 'bg-[var(--caja-green-light)] text-[var(--caja-green)] border-[var(--caja-green)]/20',
      brown: 'bg-[var(--caja-brown-light)] text-[var(--caja-brown)] border-[var(--caja-brown)]/20',
      red: 'bg-red-50 text-red-700 border-red-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200'
    };

    const baseClasses = cn(
      'p-4 rounded-xl border-2 transition-all duration-200',
      selected 
        ? 'bg-[var(--caja-yellow)]/10 border-[var(--caja-yellow)]/30 shadow-sm' 
        : 'border-transparent hover:bg-[var(--muted)]/50',
      hoverable && 'cursor-pointer',
      className
    );

    return animated ? (
      <motion.div
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {/* Avatar/Icon */}
          {avatar && (
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--caja-yellow)]/20 to-[var(--caja-green)]/20 flex items-center justify-center text-xl border-2 border-white shadow-sm">
                {avatar}
              </div>
              {status && (
                <div className={cn(
                  'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm',
                  statusColors[status]
                )} />
              )}
            </div>
          )}
          
          {Icon && !avatar && (
            <div className="w-10 h-10 rounded-lg bg-[var(--caja-yellow-light)] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[var(--caja-yellow)]" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-[var(--foreground)] truncate">
                    {title}
                  </h3>
                  {priority && (
                    <div className={cn('w-2 h-2 rounded-full', priorityColors[priority])} />
                  )}
                </div>
                {subtitle && (
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 shrink-0">
                {timestamp && (
                  <span className="text-xs text-[var(--muted-foreground)]">{timestamp}</span>
                )}
                {unread && unread > 0 && (
                  <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                    {unread}
                  </Badge>
                )}
                {actions}
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-[var(--muted-foreground)] truncate">{description}</p>
            )}
            
            {badges.length > 0 && (
              <div className="flex items-center space-x-2 mt-2">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    className={cn(
                      'text-xs px-2 py-1 border',
                      badgeVariants[badge.variant || 'default']
                    )}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    ) : (
      <div
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {/* Avatar/Icon */}
          {avatar && (
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--caja-yellow)]/20 to-[var(--caja-green)]/20 flex items-center justify-center text-xl border-2 border-white shadow-sm">
                {avatar}
              </div>
              {status && (
                <div className={cn(
                  'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm',
                  statusColors[status]
                )} />
              )}
            </div>
          )}
          
          {Icon && !avatar && (
            <div className="w-10 h-10 rounded-lg bg-[var(--caja-yellow-light)] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[var(--caja-yellow)]" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-[var(--foreground)] truncate">
                    {title}
                  </h3>
                  {priority && (
                    <div className={cn('w-2 h-2 rounded-full', priorityColors[priority])} />
                  )}
                </div>
                {subtitle && (
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 shrink-0">
                {timestamp && (
                  <span className="text-xs text-[var(--muted-foreground)]">{timestamp}</span>
                )}
                {unread && unread > 0 && (
                  <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                    {unread}
                  </Badge>
                )}
                {actions}
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-[var(--muted-foreground)] truncate">{description}</p>
            )}
            
            {badges.length > 0 && (
              <div className="flex items-center space-x-2 mt-2">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    className={cn(
                      'text-xs px-2 py-1 border',
                      badgeVariants[badge.variant || 'default']
                    )}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CajaListItem.displayName = 'CajaListItem';

// Barra de pesquisa padronizada
export const CajaSearchBar = forwardRef<HTMLInputElement, CajaSearchBarProps>(
  ({ placeholder = 'Buscar...', value, onChange, onSearch, className, loading = false, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-[var(--caja-yellow)] border-t-transparent rounded-full"
            />
          ) : (
            <div className="w-4 h-4 text-[var(--muted-foreground)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          )}
        </div>
        <Input
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value || '')}
          className="pl-10 h-11 border-[var(--border)] focus:border-[var(--caja-yellow)] transition-colors"
          {...props}
        />
      </div>
    );
  }
);

CajaSearchBar.displayName = 'CajaSearchBar';

// Header padronizado
export const CajaHeader = forwardRef<HTMLDivElement, CajaHeaderProps>(
  ({ title, description, actions, breadcrumbs, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6', className)}
        {...props}
      >
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-[var(--muted-foreground)] mb-2">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && <span>/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'text-[var(--foreground)]' : 'hover:text-[var(--foreground)] cursor-pointer'}>
                    {crumb.label}
                  </span>
                </div>
              ))}
            </nav>
          )}
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">{title}</h1>
          {description && (
            <p className="text-[var(--muted-foreground)] mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

CajaHeader.displayName = 'CajaHeader';

// Card de estatísticas padronizado
export const CajaStatsCard = forwardRef<HTMLDivElement, CajaStatsCardProps>(
  ({ 
    title, 
    value, 
    change, 
    changeType = 'neutral', 
    icon: Icon, 
    variant = 'yellow', 
    animated = true, 
    loading = false, 
    className,
    ...props 
  }, ref) => {
    const variantColors = {
      yellow: 'bg-[var(--caja-yellow)]',
      green: 'bg-[var(--caja-green)]',
      brown: 'bg-[var(--caja-brown)]',
      default: 'bg-[var(--muted)]'
    };

    const changeColors = {
      positive: 'text-[var(--caja-green)]',
      negative: 'text-red-500',
      neutral: 'text-[var(--muted-foreground)]'
    };

    if (loading) {
      return (
        <Card ref={ref} className={cn('animate-pulse', className)} {...props}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-[var(--muted)] rounded w-3/4"></div>
                <div className="h-8 bg-[var(--muted)] rounded w-1/2"></div>
                <div className="h-3 bg-[var(--muted)] rounded w-1/4"></div>
              </div>
              <div className="w-12 h-12 bg-[var(--muted)] rounded-xl"></div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const baseClasses = cn(
      'hover:shadow-lg transition-all duration-300 border-0 shadow-md',
      animated && 'group',
      className
    );

    return animated ? (
      <motion.div
        ref={ref}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                {title}
              </p>
              <p className="text-2xl font-semibold group-hover:scale-105 transition-transform duration-300">
                {value}
              </p>
              {change && (
                <div className="flex items-center space-x-1">
                  <div className={cn('w-3 h-3 group-hover:scale-110 transition-transform duration-300', changeColors[changeType])}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
                      <polyline points="16,7 22,7 22,13"/>
                    </svg>
                  </div>
                  <span className={cn('text-xs', changeColors[changeType])}>{change}</span>
                </div>
              )}
            </div>
            <div className={cn(
              'p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg',
              variantColors[variant]
            )}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </motion.div>
    ) : (
      <Card
        ref={ref}
        className={baseClasses}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                {title}
              </p>
              <p className="text-2xl font-semibold group-hover:scale-105 transition-transform duration-300">
                {value}
              </p>
              {change && (
                <div className="flex items-center space-x-1">
                  <div className={cn('w-3 h-3 group-hover:scale-110 transition-transform duration-300', changeColors[changeType])}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
                      <polyline points="16,7 22,7 22,13"/>
                    </svg>
                  </div>
                  <span className={cn('text-xs', changeColors[changeType])}>{change}</span>
                </div>
              )}
            </div>
            <div className={cn(
              'p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg',
              variantColors[variant]
            )}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CajaStatsCard.displayName = 'CajaStatsCard';

// Button com cores padronizadas do Cajá
export const CajaButton = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button> & {
  variant?: 'default' | 'yellow' | 'green' | 'brown' | 'outline' | 'ghost' | 'destructive';
}>(({ variant = 'default', className, ...props }, ref) => {
  const variantClasses = {
    default: 'bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)]',
    yellow: 'bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)]',
    green: 'bg-[var(--caja-green)] hover:bg-[var(--caja-green)]/90 text-white',
    brown: 'bg-[var(--caja-brown)] hover:bg-[var(--caja-brown)]/90 text-white',
    outline: 'border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]',
    ghost: 'hover:bg-[var(--muted)] text-[var(--foreground)]',
    destructive: 'bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-[var(--destructive-foreground)]'
  };

  return (
    <Button
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
});

CajaButton.displayName = 'CajaButton';

// Interfaces para componentes unificados
export interface CajaEntityCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  avatarFallback?: string;
  status?: {
    type: 'active' | 'inactive' | 'pending' | 'open' | 'in_progress' | 'resolved' | 'closed' | 'online' | 'away' | 'offline';
    label: string;
    icon?: LucideIcon;
  };
  priority?: {
    type: 'low' | 'medium' | 'high' | 'urgent';
    label: string;
  };
  badges?: Array<{
    text: string;
    variant?: 'default' | 'yellow' | 'green' | 'brown' | 'red' | 'blue' | 'orange' | 'purple';
  }>;
  metrics?: Array<{
    label: string;
    value: string | number;
    icon?: LucideIcon;
    color?: string;
  }>;
  metadata?: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
  }>;
  tags?: string[];
  actions?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CajaEntityListProps {
  items: Array<CajaEntityCardProps>;
  viewMode: 'grid' | 'list';
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

// Card unificado para entidades (clientes, tickets, membros da equipe)
export const CajaEntityCard = forwardRef<HTMLDivElement, CajaEntityCardProps>(
  ({ 
    id,
    title, 
    subtitle, 
    description, 
    avatar, 
    avatarFallback,
    status, 
    priority, 
    badges = [], 
    metrics = [],
    metadata = [],
    tags = [],
    actions, 
    selected = false, 
    onClick, 
    className,
    ...props 
  }, ref) => {
    const getStatusConfig = (statusType: string) => {
      const configs = {
        // Status para clientes
        active: { color: 'bg-[var(--caja-green)]/10 text-[var(--caja-green)] border-[var(--caja-green)]/20' },
        inactive: { color: 'bg-gray-100 text-gray-600 border-gray-200' },
        pending: { color: 'bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)] border-[var(--caja-yellow)]/20' },
        // Status para tickets
        open: { color: 'bg-blue-50 text-blue-600 border-blue-200' },
        in_progress: { color: 'bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)] border-[var(--caja-yellow)]/20' },
        resolved: { color: 'bg-[var(--caja-green)]/10 text-[var(--caja-green)] border-[var(--caja-green)]/20' },
        closed: { color: 'bg-gray-50 text-gray-600 border-gray-200' },
        // Status para equipe
        online: { color: 'bg-[var(--caja-green)]/10 text-[var(--caja-green)] border-[var(--caja-green)]/20' },
        away: { color: 'bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)] border-[var(--caja-yellow)]/20' },
        offline: { color: 'bg-gray-100 text-gray-600 border-gray-200' }
      };
      return configs[statusType as keyof typeof configs] || configs.inactive;
    };

    const getPriorityConfig = (priorityType: string) => {
      const configs = {
        low: { color: 'bg-[var(--caja-green)]/10 text-[var(--caja-green)] border-[var(--caja-green)]/20' },
        medium: { color: 'bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)] border-[var(--caja-yellow)]/20' },
        high: { color: 'bg-orange-50 text-orange-600 border-orange-200' },
        urgent: { color: 'bg-red-50 text-red-600 border-red-200' }
      };
      return configs[priorityType as keyof typeof configs] || configs.medium;
    };

    const badgeVariants = {
      default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
      yellow: 'bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)] border-[var(--caja-yellow)]/20',
      green: 'bg-[var(--caja-green)]/10 text-[var(--caja-green)] border-[var(--caja-green)]/20',
      brown: 'bg-[var(--caja-brown-light)] text-[var(--caja-brown)] border-[var(--caja-brown)]/20',
      red: 'bg-red-50 text-red-700 border-red-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'group bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden',
          selected && 'ring-2 ring-[var(--caja-yellow)] ring-offset-2',
          className
        )}
        onClick={onClick}
        {...props}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {avatar && (
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                    <AvatarImage src={avatar} alt={title} />
                    <AvatarFallback className="bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)]">
                      {avatarFallback || title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {status?.type === 'active' || status?.type === 'online' && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[var(--caja-green)] rounded-full border-2 border-white"></div>
                  )}
                </div>
              )}
              <div className="space-y-1">
                <CardTitle className="text-lg group-hover:text-[var(--caja-brown)] transition-colors">
                  {title}
                </CardTitle>
                {subtitle && (
                  <CardDescription className="flex items-center space-x-2">
                    <span>{subtitle}</span>
                  </CardDescription>
                )}
              </div>
            </div>
            
            {actions && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                {actions}
              </div>
            )}
          </div>

          {/* Status e Priority Badges */}
          {(status || priority || badges.length > 0) && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                {status && (
                  <Badge className={cn(
                    'text-xs px-2 py-1 border flex items-center space-x-1',
                    getStatusConfig(status.type).color
                  )}>
                    {status.icon && <status.icon className="h-3 w-3" />}
                    <span>{status.label}</span>
                  </Badge>
                )}
                {badges.slice(0, 2).map((badge, index) => (
                  <Badge
                    key={index}
                    className={cn(
                      'text-xs px-2 py-1 border',
                      badgeVariants[badge.variant || 'default']
                    )}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
              {priority && (
                <Badge className={cn(
                  'text-xs px-2 py-1 border',
                  getPriorityConfig(priority.type).color
                )}>
                  {priority.label}
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          {description && (
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata (contact info, etc.) */}
          {metadata.length > 0 && (
            <div className="space-y-3">
              {metadata.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  <item.icon className="h-4 w-4 text-[var(--caja-brown)]" />
                  <span className="truncate flex-1">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {(metadata.length > 0 && metrics.length > 0) && <Separator />}

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {metrics.slice(0, 3).map((metric, index) => (
                <div key={index} className="text-center space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    {metric.icon && (
                      <metric.icon className={cn(
                        'h-4 w-4',
                        metric.color || 'text-[var(--caja-green)]'
                      )} />
                    )}
                    <span className={cn(
                      'font-semibold',
                      metric.color || 'text-[var(--caja-green)]'
                    )}>
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {(metrics.length > 0 && tags.length > 0) && <Separator />}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-[var(--muted)]/50">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs bg-[var(--muted)]/50">
                  +{tags.length - 3} mais
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </motion.div>
    );
  }
);

CajaEntityCard.displayName = 'CajaEntityCard';

// Lista unificada para entidades
export const CajaEntityList = forwardRef<HTMLDivElement, CajaEntityListProps>(
  ({ items, viewMode, loading = false, emptyState, className, ...props }, ref) => {
    if (loading) {
      return (
        <div ref={ref} className={cn('space-y-4', className)} {...props}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-[var(--muted)] rounded-xl"></div>
            </div>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div ref={ref} className={cn('flex items-center justify-center py-16', className)} {...props}>
          {emptyState || (
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-[var(--muted-foreground)]">Nenhum item encontrado</p>
              <p className="text-sm text-[var(--muted-foreground)]">Tente ajustar seus filtros de pesquisa</p>
            </div>
          )}
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div 
          ref={ref} 
          className={cn('grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6', className)} 
          {...props}
        >
          {items.map((item) => (
            <CajaEntityCard key={item.id} {...item} />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {items.map((item) => (
          <CajaListItem
            key={item.id}
            title={item.title}
            description={item.description}
            subtitle={item.subtitle}
            avatar={item.avatar ? (
              <Avatar className="w-full h-full">
                <AvatarImage src={item.avatar} alt={item.title} />
                <AvatarFallback className="bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)]">
                  {item.avatarFallback || item.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ) : undefined}
            badges={[
              ...(item.status ? [{ text: item.status.label, variant: 'default' as const }] : []),
              ...(item.priority ? [{ text: item.priority.label, variant: 'default' as const }] : []),
              ...item.badges
            ]}
            actions={item.actions}
            selected={item.selected}
            onClick={item.onClick}
            status={item.status?.type === 'active' || item.status?.type === 'online' ? 'online' : 
                   item.status?.type === 'away' ? 'away' : 
                   item.status?.type === 'inactive' || item.status?.type === 'offline' ? 'offline' : undefined}
            priority={item.priority?.type}
          />
        ))}
      </div>
    );
  }
);

CajaEntityList.displayName = 'CajaEntityList';