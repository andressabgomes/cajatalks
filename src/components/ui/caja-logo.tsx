import { cn } from './utils';
import cajaLogo from 'figma:asset/8fb6c1d53e58f03c03942d9f62603af840e8a7fc.png';
import { motion } from 'motion/react';

interface CajaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'minimal';
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  xs: 'w-6 h-6 p-1',
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-16 h-16 p-3',
  xl: 'w-24 h-24 p-4'
};

const variantClasses = {
  default: 'bg-white rounded-xl shadow-sm border border-[var(--caja-yellow)]/20 hover:shadow-md hover:border-[var(--caja-yellow)]/40',
  elevated: 'bg-white rounded-2xl shadow-lg border border-[var(--caja-yellow)]/20 hover:shadow-xl hover:border-[var(--caja-yellow)]/40',
  minimal: 'bg-white rounded-lg shadow-sm border border-[var(--border)]'
};

export function CajaLogo({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  className,
  onClick 
}: CajaLogoProps) {
  const containerClasses = cn(
    'flex items-center justify-center transition-all duration-300',
    sizeClasses[size],
    variantClasses[variant],
    onClick && 'cursor-pointer',
    className
  );

  const content = (
    <div className={containerClasses} onClick={onClick}>
      <img 
        src={cajaLogo} 
        alt="Cajá Talks" 
        className="w-full h-full object-contain"
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05, rotate: onClick ? 1 : 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Componente para logo com texto
interface CajaLogoWithTextProps extends Omit<CajaLogoProps, 'size'> {
  logoSize?: CajaLogoProps['size'];
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

export function CajaLogoWithText({ 
  logoSize = 'md',
  showText = true,
  textSize = 'md',
  orientation = 'horizontal',
  variant = 'default',
  animated = true,
  className,
  onClick
}: CajaLogoWithTextProps) {
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const containerClasses = cn(
    'flex items-center',
    orientation === 'horizontal' ? 'space-x-3' : 'flex-col space-y-2',
    className
  );

  return (
    <div className={containerClasses} onClick={onClick}>
      <CajaLogo 
        size={logoSize} 
        variant={variant} 
        animated={animated}
        onClick={onClick}
      />
      {showText && (
        <span className={cn(
          'font-semibold text-[var(--foreground)] transition-colors duration-200',
          textSizeClasses[textSize],
          onClick && 'hover:text-[var(--caja-yellow)] cursor-pointer'
        )}>
          Cajá Talks
        </span>
      )}
    </div>
  );
}