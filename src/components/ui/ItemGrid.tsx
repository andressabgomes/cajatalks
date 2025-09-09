import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CajaCard, CajaListItem } from './design-system';
import { Badge } from './badge';
import { Button } from './button';
import { LucideIcon } from 'lucide-react';

export interface GridItem {
  id: string | number;
  title: string;
  description?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  icon?: LucideIcon;
  status?: string;
  priority?: 'high' | 'medium' | 'low';
  timestamp?: string;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'yellow' | 'green' | 'brown' | 'red' | 'blue';
  }>;
  actions?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface ItemGridProps {
  items: GridItem[];
  viewMode?: 'grid' | 'list';
  selectedItems?: (string | number)[];
  onSelect?: (id: string | number) => void;
  onMultiSelect?: (ids: (string | number)[]) => void;
  loading?: boolean;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  emptyState?: {
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
      icon?: LucideIcon;
    };
  };
  className?: string;
  renderCustomCard?: (item: GridItem) => React.ReactNode;
}

export function ItemGrid({
  items,
  viewMode = 'grid',
  selectedItems = [],
  onSelect,
  onMultiSelect,
  loading = false,
  columns = 3,
  gap = 'md',
  emptyState,
  className,
  renderCustomCard
}: ItemGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  };

  const handleItemClick = (id: string | number) => {
    if (onMultiSelect) {
      const isSelected = selectedItems.includes(id);
      if (isSelected) {
        onMultiSelect(selectedItems.filter(item => item !== id));
      } else {
        onMultiSelect([...selectedItems, id]);
      }
    } else if (onSelect) {
      onSelect(id);
    }
  };

  // Loading skeleton
  if (loading) {
    const skeletonItems = Array.from({ length: 6 }, (_, i) => i);
    
    return (
      <div className={`${viewMode === 'grid' ? `grid ${gridColumns[columns as keyof typeof gridColumns]} ${gapClasses[gap]}` : 'space-y-3'} ${className || ''}`}>
        {skeletonItems.map((index) => (
          <div key={index} className="animate-pulse">
            {viewMode === 'grid' ? (
              <CajaCard variant="default" className="h-48">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </CajaCard>
            ) : (
              <div className="p-4 rounded-xl border border-[var(--border)]">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!loading && items.length === 0 && emptyState) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
          {emptyState.action?.icon && <emptyState.action.icon className="h-8 w-8 text-[var(--muted-foreground)]" />}
        </div>
        <h3 className="font-medium text-[var(--foreground)] mb-2">{emptyState.title}</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">{emptyState.description}</p>
        {emptyState.action && (
          <Button variant="outline" size="sm" onClick={emptyState.action.onClick}>
            {emptyState.action.icon && <emptyState.action.icon className="h-4 w-4 mr-2" />}
            {emptyState.action.label}
          </Button>
        )}
      </div>
    );
  }

  // Grid view
  if (viewMode === 'grid') {
    return (
      <div className={`grid ${gridColumns[columns as keyof typeof gridColumns]} ${gapClasses[gap]} ${className || ''}`}>
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              {renderCustomCard ? (
                renderCustomCard(item)
              ) : (
                <CajaCard
                  variant="default"
                  hoverable={true}
                  animated={true}
                  onClick={() => handleItemClick(item.id)}
                  className={selectedItems.includes(item.id) ? 'ring-2 ring-[var(--caja-yellow)] ring-opacity-50' : ''}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        {item.avatar && (
                          <div className="shrink-0">
                            {item.avatar}
                          </div>
                        )}
                        {item.icon && !item.avatar && (
                          <div className="w-10 h-10 rounded-lg bg-[var(--caja-yellow-light)] flex items-center justify-center shrink-0">
                            <item.icon className="w-5 h-5 text-[var(--caja-yellow)]" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--foreground)] truncate">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-sm text-[var(--muted-foreground)] truncate">{item.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        {item.timestamp && (
                          <span className="text-xs text-[var(--muted-foreground)]">{item.timestamp}</span>
                        )}
                        {item.actions}
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">{item.description}</p>
                    )}

                    {/* Badges */}
                    {item.badges && item.badges.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2">
                        {item.badges.map((badge, badgeIndex) => (
                          <Badge 
                            key={badgeIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {badge.text}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CajaCard>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // List view
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.03 }}
          >
            <CajaListItem
              title={item.title}
              description={item.description}
              subtitle={item.subtitle}
              avatar={item.avatar}
              icon={item.icon}
              badges={item.badges}
              actions={item.actions}
              priority={item.priority}
              timestamp={item.timestamp}
              selected={selectedItems.includes(item.id)}
              hoverable={true}
              animated={true}
              onClick={() => handleItemClick(item.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ItemGrid;