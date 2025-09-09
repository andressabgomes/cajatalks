import { useState, useCallback, useEffect } from 'react';

// Tipos para o estado dos componentes
export interface ViewState {
  mode: 'grid' | 'list';
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  filters: Record<string, any>;
  selectedItems: string[];
  loading: boolean;
  refreshing: boolean;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// Hook para gerenciar estado de visualização
export function useViewState(initialState?: Partial<ViewState>) {
  const [state, setState] = useState<ViewState>({
    mode: 'grid',
    sortBy: 'created',
    sortOrder: 'desc',
    searchTerm: '',
    filters: {},
    selectedItems: [],
    loading: false,
    refreshing: false,
    ...initialState
  });

  const updateState = useCallback((updates: Partial<ViewState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const setViewMode = useCallback((mode: 'grid' | 'list') => {
    updateState({ mode });
  }, [updateState]);

  const setSort = useCallback((sortBy: string, sortOrder?: 'asc' | 'desc') => {
    updateState({ 
      sortBy, 
      sortOrder: sortOrder || (state.sortBy === sortBy && state.sortOrder === 'desc' ? 'asc' : 'desc')
    });
  }, [updateState, state.sortBy, state.sortOrder]);

  const setSearch = useCallback((searchTerm: string) => {
    updateState({ searchTerm });
  }, [updateState]);

  const setFilter = useCallback((key: string, value: any) => {
    updateState({ 
      filters: { ...state.filters, [key]: value }
    });
  }, [updateState, state.filters]);

  const clearFilters = useCallback(() => {
    updateState({ filters: {}, searchTerm: '' });
  }, [updateState]);

  const toggleSelection = useCallback((id: string) => {
    const isSelected = state.selectedItems.includes(id);
    updateState({
      selectedItems: isSelected 
        ? state.selectedItems.filter(item => item !== id)
        : [...state.selectedItems, id]
    });
  }, [updateState, state.selectedItems]);

  const selectAll = useCallback((items: string[]) => {
    updateState({ selectedItems: items });
  }, [updateState]);

  const clearSelection = useCallback(() => {
    updateState({ selectedItems: [] });
  }, [updateState]);

  const setLoading = useCallback((loading: boolean) => {
    updateState({ loading });
  }, [updateState]);

  const setRefreshing = useCallback((refreshing: boolean) => {
    updateState({ refreshing });
  }, [updateState]);

  return {
    state,
    updateState,
    setViewMode,
    setSort,
    setSearch,
    setFilter,
    clearFilters,
    toggleSelection,
    selectAll,
    clearSelection,
    setLoading,
    setRefreshing
  };
}

// Hook para gerenciar paginação
export function usePagination(initialState?: Partial<PaginationState>) {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    hasMore: false,
    ...initialState
  });

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setState(prev => ({ 
      ...prev, 
      total, 
      hasMore: prev.page * prev.pageSize < total 
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      page: prev.page + 1,
      hasMore: (prev.page + 1) * prev.pageSize < prev.total
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      page: Math.max(1, prev.page - 1)
    }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({ ...prev, page: 1 }));
  }, []);

  return {
    state,
    setPage,
    setPageSize,
    setTotal,
    nextPage,
    prevPage,
    reset
  };
}

// Hook para gerenciar responsividade
export function useResponsive() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const checkScreenSize = useCallback(() => {
    if (window.innerWidth < 768) {
      setScreenSize('mobile');
    } else if (window.innerWidth < 1024) {
      setScreenSize('tablet');
    } else {
      setScreenSize('desktop');
    }
  }, []);

  // Inicializar e adicionar listener
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';
  const isMobileOrTablet = screenSize === 'mobile' || screenSize === 'tablet';

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet
  };
}

// Utilitários para filtros e busca
export function filterItems<T>(
  items: T[],
  searchTerm: string,
  filters: Record<string, any>,
  searchFields: string[] = ['name', 'title', 'description']
): T[] {
  let filtered = items;

  // Aplicar busca por texto
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      searchFields.some(field => {
        const value = (item as any)[field];
        return value && value.toLowerCase().includes(term);
      })
    );
  }

  // Aplicar filtros
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all') {
      filtered = filtered.filter(item => (item as any)[key] === value);
    }
  });

  return filtered;
}

// Utilitário para ordenação
export function sortItems<T>(
  items: T[],
  sortBy: string,
  sortOrder: 'asc' | 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const aValue = (a as any)[sortBy];
    const bValue = (b as any)[sortBy];

    let comparison = 0;
    
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;

    return sortOrder === 'desc' ? -comparison : comparison;
  });
}

// Utilitário para paginação
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; hasMore: boolean } {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);
  const hasMore = endIndex < items.length;

  return {
    items: paginatedItems,
    hasMore
  };
}

// Utilitário para cores de status
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Status gerais
    online: 'bg-[var(--caja-green)]',
    offline: 'bg-gray-400',
    away: 'bg-[var(--caja-yellow)]',
    
    // Status de tickets
    open: 'bg-blue-100 text-blue-700 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    resolved: 'bg-green-100 text-green-700 border-green-200',
    closed: 'bg-gray-100 text-gray-700 border-gray-200',
    pending: 'bg-orange-100 text-orange-700 border-orange-200',
    
    // Prioridades
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
    urgent: 'bg-red-100 text-red-700 border-red-200'
  };

  return statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
}

// Utilitário para formatação de tempo
export function formatTimeAgo(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'agora';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  
  return date.toLocaleDateString('pt-BR');
}

// Utilitário para truncar texto
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}