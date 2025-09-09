import React from 'react';
import { motion } from 'motion/react';
import { CajaHeader } from '../ui/design-system';
import { ViewControls } from '../view-controls';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Search, Filter, Plus, RefreshCw, Settings, Download, MoreVertical } from 'lucide-react';
import { cn } from '../ui/utils';

export interface FilterConfig {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}

export interface ActionConfig {
  label: string;
  icon?: React.ComponentType<any>;
  variant?: 'default' | 'yellow' | 'green' | 'brown' | 'outline' | 'ghost';
  onClick: () => void;
}

export interface TabConfig {
  key: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

export interface PageLayoutProps {
  // Header
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  
  // Actions
  primaryAction?: ActionConfig;
  secondaryActions?: ActionConfig[];
  
  // Search & Filters
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  
  // View Controls
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  sortOptions?: Array<{ value: string; label: string }>;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  
  // Tabs
  tabs?: TabConfig[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  
  // Layout
  children?: React.ReactNode;
  className?: string;
  
  // Stats (mostradas no header)
  stats?: Array<{
    label: string;
    value: string | number;
    variant?: 'default' | 'yellow' | 'green' | 'brown';
  }>;
}

export function PageLayout({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryActions = [],
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  filters = [],
  filterValues = {},
  onFilterChange,
  showRefresh = false,
  onRefresh,
  refreshing = false,
  viewMode = 'grid',
  onViewModeChange,
  sortOptions = [],
  sortValue = '',
  onSortChange,
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
  stats = []
}: PageLayoutProps) {
  // Header Actions
  const headerActions = (
    <div className="flex items-center space-x-3">
      {/* Stats badges */}
      {stats.length > 0 && (
        <div className="hidden lg:flex items-center space-x-3 mr-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
              <Badge variant="outline" className="mt-1">
                {stat.value}
              </Badge>
            </div>
          ))}
        </div>
      )}
      
      {/* Secondary Actions */}
      {secondaryActions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'outline'}
          size="sm"
          onClick={action.onClick}
          className="h-9"
        >
          {action.icon && <action.icon className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      ))}
      
      {/* Refresh Button */}
      {showRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing}
          className="h-9 w-9 p-0"
        >
          <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
        </Button>
      )}
      
      {/* Primary Action */}
      {primaryAction && (
        <Button
          variant={primaryAction.variant || 'yellow'}
          size="sm"
          onClick={primaryAction.onClick}
          className="h-9"
        >
          {primaryAction.icon && <primaryAction.icon className="h-4 w-4 mr-2" />}
          {primaryAction.label}
        </Button>
      )}
    </div>
  );

  // Filters and Search Bar
  const filtersBar = (onSearchChange || filters.length > 0 || sortOptions.length > 0 || onViewModeChange) && (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[var(--border)] bg-white/80 backdrop-blur-sm">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-9 border-[var(--border)] focus:border-[var(--caja-yellow)] transition-colors"
            />
          </div>
        )}
        
        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex items-center space-x-2">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={filterValues[filter.key] || filter.defaultValue || 'all'}
                onValueChange={(value) => onFilterChange?.(filter.key, value)}
              >
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}
      </div>
      
      {/* View Controls */}
      {(sortOptions.length > 0 || onViewModeChange) && (
        <div className="flex items-center space-x-2">
          {/* Sort */}
          {sortOptions.length > 0 && (
            <Select value={sortValue} onValueChange={onSortChange}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {/* View Mode */}
          {onViewModeChange && (
            <ViewControls
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              sortBy={sortValue}
              sortOrder="desc"
              onSortChange={(by, order) => onSortChange?.(by)}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <motion.div 
      className={cn('h-full flex flex-col bg-[var(--background)]', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6">
        <CajaHeader
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
          actions={headerActions}
        />
      </div>
      
      {/* Filters Bar */}
      {filtersBar}
      
      {/* Tabs */}
      {tabs && tabs.length > 0 ? (
        <Tabs 
          value={activeTab || tabs[0].key} 
          onValueChange={onTabChange}
          className="flex-1 flex flex-col"
        >
          <div className="border-b border-[var(--border)] bg-white">
            <TabsList className="h-auto p-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="relative px-6 py-4 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] data-[state=active]:text-[var(--foreground)] data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-[var(--caja-yellow)] rounded-none"
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {tabs.map((tab) => (
            <TabsContent
              key={tab.key}
              value={tab.key}
              className="flex-1 p-6 mt-0"
            >
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        /* Content sem tabs */
        <div className="flex-1 p-6">
          {children}
        </div>
      )}
    </motion.div>
  );
}

export default PageLayout;