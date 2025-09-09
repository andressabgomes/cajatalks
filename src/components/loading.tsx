interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'var(--caja-yellow)', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div 
        className="w-full h-full border-2 border-transparent rounded-full animate-spin"
        style={{
          borderTopColor: color,
          borderRightColor: `${color}40`,
          borderBottomColor: `${color}20`,
          borderLeftColor: `${color}60`
        }}
      />
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, message = 'Carregando...', children }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
        <div className="flex flex-col items-center space-y-3">
          <LoadingSpinner size="lg" />
          <p className="text-[var(--muted-foreground)] font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      style={{
        backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        animation: 'loading-shimmer 1.5s infinite'
      }}
    />
  );
}

// Skeleton Cards for different components
export function ConversationSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-start space-x-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-48" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton variant="circular" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton variant="circular" className="w-12 h-12" />
      </div>
    </div>
  );
}

export function TicketSkeleton() {
  return (
    <div className="p-4 space-y-3 border-b border-[var(--border)]">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="h-3 w-full" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-18" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Skeleton variant="circular" className="w-8 h-8" />
          <Skeleton variant="circular" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

// Default loading component for page transitions
export function Loading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-[var(--muted-foreground)] font-medium">Carregando...</p>
      </div>
    </div>
  );
}

// Add keyframes to global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes loading-shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
document.head.appendChild(style);