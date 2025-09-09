import { Grid3X3, List, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface ViewControlsProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  sortOrder?: 'asc' | 'desc';
  onSortOrderChange?: () => void;
  filterCount?: number;
  onFilterClick?: () => void;
  itemCount?: number;
  totalCount?: number;
  sortOptions?: { value: string; label: string }[];
}

export function ViewControls({
  viewMode,
  onViewModeChange,
  sortBy = 'name',
  onSortChange,
  sortOrder = 'asc',
  onSortOrderChange,
  filterCount = 0,
  onFilterClick,
  itemCount,
  totalCount,
  sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'date', label: 'Data' },
    { value: 'status', label: 'Status' }
  ]
}: ViewControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-[var(--border)] bg-white/50 backdrop-blur-sm">
      {/* Left side - View toggles */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-[var(--border)] rounded-lg p-1 bg-[var(--muted)]/30">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={`h-8 px-3 ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className={`h-8 px-3 ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          {onSortChange && (
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-32 h-8 border-0 bg-[var(--muted)]/50">
                <SelectValue />
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

          {onSortOrderChange && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSortOrderChange}
              className="h-8 px-2 hover:bg-[var(--muted)]/50"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Filter Button */}
        {onFilterClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterClick}
            className="h-8 border-0 bg-[var(--muted)]/50 hover:bg-[var(--muted)] relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {filterCount > 0 && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs rounded-full flex items-center justify-center">
                {filterCount}
              </div>
            )}
          </Button>
        )}
      </div>

      {/* Right side - Item count */}
      {itemCount !== undefined && totalCount !== undefined && (
        <div className="text-sm text-[var(--muted-foreground)]">
          {itemCount === totalCount ? (
            <span>{totalCount} {totalCount === 1 ? 'item' : 'itens'}</span>
          ) : (
            <span>{itemCount} de {totalCount} itens</span>
          )}
        </div>
      )}
    </div>
  );
}