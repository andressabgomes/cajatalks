import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewControls } from './view-controls';
import { CajaEntityList, CajaSearchBar, CajaStatsCard, CajaHeader } from './ui/design-system';
import { useTicketData, TicketData } from '../hooks/useEntityData';
import { CreateTicketModal } from './CreateTicketModal';
import { TicketService, type TicketWithDetails } from '@/services/tickets';
import { useAuth } from '@/hooks/useAuth';
import { 
  Plus, 
  RefreshCw,
  MoreVertical,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Activity
} from 'lucide-react';

export function Tickets() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tickets, setTickets] = useState<TicketWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { transformTicketToEntity } = useTicketData();

  // Carregar tickets do backend
  const loadTickets = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        status: statusFilter !== 'all' ? statusFilter : undefined,
        priority: priorityFilter !== 'all' ? priorityFilter : undefined,
      };
      
      const { data } = await TicketService.getTickets(1, 100, filters);
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tickets');
      console.error('Erro ao carregar tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar tickets quando o componente montar ou filtros mudarem
  useEffect(() => {
    loadTickets();
  }, [isAuthenticated, statusFilter, priorityFilter]);

  // Função para atualizar tickets
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTickets();
    setIsRefreshing(false);
  };

  // Função chamada quando um novo ticket é criado
  const handleTicketCreated = (newTicket: any) => {
    setTickets(prev => [newTicket, ...prev]);
  };

  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3, urgent: 4 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        case 'client':
          aValue = a.client.name.toLowerCase();
          bValue = b.client.name.toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'updated':
          aValue = new Date(a.updated_at).getTime();
          bValue = new Date(b.updated_at).getTime();
          break;
        default:
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      in_progress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      high_priority: tickets.filter(t => t.priority === 'high' || t.priority === 'urgent').length
    };
  };

  const stats = getTicketStats();

  // Transformar tickets para o formato unificado
  const entityItems = filteredAndSortedTickets.map(ticket => {
    // Converter TicketWithDetails para TicketData (formato esperado pelo transformTicketToEntity)
    const ticketData: TicketData = {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      client: ticket.client.name,
      assignee: ticket.assigned_user?.full_name || 'Não atribuído',
      created: ticket.created_at,
      updated: ticket.updated_at,
      category: 'Suporte', // Pode ser expandido no futuro
      tags: [], // Pode ser expandido no futuro
      messages: ticket.conversations_count
    };

    return {
      ...transformTicketToEntity(ticketData),
    selected: selectedTicket === ticket.id,
    onClick: () => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id),
    actions: (
      <Button variant="ghost" size="sm">
        <MoreVertical className="h-4 w-4" />
      </Button>
    )
    };
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[var(--border)] bg-white/50 backdrop-blur-sm">
        <CajaHeader
          title="Gestão de Tickets"
          description="Gerencie e acompanhe todos os tickets de suporte"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Tickets' }
          ]}
          actions={
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button 
                className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] shadow-sm"
                onClick={() => setShowCreateModal(true)}
                disabled={!isAuthenticated}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Ticket
              </Button>
            </div>
          }
        />
      </div>

      {/* Stats Section */}
      <div className="px-6 py-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <CajaStatsCard
            title="Total"
            value={stats.total.toString()}
            icon={AlertCircle}
            variant="default"
          />
          <CajaStatsCard
            title="Abertos"
            value={stats.open.toString()}
            icon={AlertCircle}
            variant="yellow"
          />
          <CajaStatsCard
            title="Em Andamento"
            value={stats.in_progress.toString()}
            icon={Clock}
            variant="brown"
          />
          <CajaStatsCard
            title="Resolvidos"
            value={stats.resolved.toString()}
            icon={CheckCircle}
            variant="green"
            change="+8 hoje"
            changeType="positive"
          />
          <CajaStatsCard
            title="Alta Prioridade"
            value={stats.high_priority.toString()}
            icon={Zap}
            variant="default"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 max-w-md">
            <CajaSearchBar
              placeholder="Buscar por título, cliente ou ID..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 border-0 bg-[var(--muted)]/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="resolved">Resolvido</SelectItem>
                <SelectItem value="closed">Fechado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32 border-0 bg-[var(--muted)]/50">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <ViewControls
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        itemCount={filteredAndSortedTickets.length}
        totalCount={tickets.length}
        sortOptions={[
          { value: 'created', label: 'Data de Criação' },
          { value: 'updated', label: 'Última Atualização' },
          { value: 'title', label: 'Título' },
          { value: 'status', label: 'Status' },
          { value: 'priority', label: 'Prioridade' },
          { value: 'client', label: 'Cliente' }
        ]}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-2">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[var(--muted-foreground)]" />
                <p className="text-sm text-[var(--muted-foreground)]">Carregando tickets...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center space-y-2">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
              <p className="text-lg font-medium text-red-600">Erro ao carregar tickets</p>
              <p className="text-sm text-[var(--muted-foreground)]">{error}</p>
              <Button variant="outline" onClick={handleRefresh} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </div>
          ) : (
          <CajaEntityList
            items={entityItems}
            viewMode={viewMode}
            emptyState={
              <div className="text-center space-y-2">
                <AlertCircle className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                <p className="text-lg font-medium text-[var(--muted-foreground)]">
                  Nenhum ticket encontrado
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Tente ajustar seus filtros de pesquisa ou crie um novo ticket
                </p>
                  {isAuthenticated && (
                    <Button 
                      className="mt-4 bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)]"
                      onClick={() => setShowCreateModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Ticket
                    </Button>
                  )}
              </div>
            }
          />
          )}
        </div>
      </div>

      {/* Modal de Criação de Ticket */}
      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  );
}