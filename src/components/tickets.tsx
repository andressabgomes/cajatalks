import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewControls } from './view-controls';
import { CajaEntityList, CajaSearchBar, CajaStatsCard, CajaHeader } from './ui/design-system';
import { useTicketData, TicketData } from '../hooks/useEntityData';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { transformTicketToEntity } = useTicketData();

  const tickets: TicketData[] = [
    {
      id: 'TIC-001',
      title: 'Problema no login do sistema',
      description: 'Usuário relatando dificuldades para acessar sua conta após a atualização do sistema. Erro 500 intermitente.',
      status: 'open',
      priority: 'high',
      client: 'Maria Santos',
      assignee: 'João Silva',
      created: '2024-01-15T10:00:00Z',
      updated: '2024-01-15T14:30:00Z',
      category: 'Técnico',
      tags: ['login', 'bug', 'urgente'],
      messages: 12
    },
    {
      id: 'TIC-002',
      title: 'Solicitação de nova funcionalidade',
      description: 'Cliente solicitando implementação de relatórios personalizados no dashboard principal.',
      status: 'in_progress',
      priority: 'medium',
      client: 'João Silva',
      assignee: 'Ana Costa',
      created: '2024-01-14T09:15:00Z',
      updated: '2024-01-15T11:20:00Z',
      category: 'Feature Request',
      tags: ['enhancement', 'dashboard'],
      messages: 8
    },
    {
      id: 'TIC-003',
      title: 'Erro na geração de relatórios',
      description: 'Relatórios mensais não estão sendo gerados corretamente. Dados inconsistentes na base.',
      status: 'resolved',
      priority: 'high',
      client: 'Ana Costa',
      assignee: 'Carlos Oliveira',
      created: '2024-01-13T16:45:00Z',
      updated: '2024-01-15T09:00:00Z',
      category: 'Bug',
      tags: ['relatórios', 'dados'],
      messages: 15
    },
    {
      id: 'TIC-004',
      title: 'Dúvida sobre cobrança',
      description: 'Cliente questionando valores cobrados no último mês. Necessário verificar histórico de uso.',
      status: 'open',
      priority: 'low',
      client: 'Carlos Oliveira',
      assignee: 'Fernanda Lima',
      created: '2024-01-12T14:20:00Z',
      updated: '2024-01-14T16:10:00Z',
      category: 'Suporte',
      tags: ['billing', 'suporte'],
      messages: 5
    },
    {
      id: 'TIC-005',
      title: 'Sistema lento na navegação',
      description: 'Performance degradada em todas as páginas do sistema. Necessário investigar causa raiz.',
      status: 'in_progress',
      priority: 'urgent',
      client: 'Fernanda Lima',
      assignee: 'João Silva',
      created: '2024-01-11T11:30:00Z',
      updated: '2024-01-15T13:45:00Z',
      category: 'Performance',
      tags: ['performance', 'crítico'],
      messages: 20
    }
  ];

  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
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
          aValue = a.client.toLowerCase();
          bValue = b.client.toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.created).getTime();
          bValue = new Date(b.created).getTime();
          break;
        case 'updated':
          aValue = new Date(a.updated).getTime();
          bValue = new Date(b.updated).getTime();
          break;
        default:
          aValue = new Date(a.created).getTime();
          bValue = new Date(b.created).getTime();
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
  const entityItems = filteredAndSortedTickets.map(ticket => ({
    ...transformTicketToEntity(ticket),
    selected: selectedTicket === ticket.id,
    onClick: () => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id),
    actions: (
      <Button variant="ghost" size="sm">
        <MoreVertical className="h-4 w-4" />
      </Button>
    )
  }));

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
                onClick={() => {
                  setIsRefreshing(true);
                  setTimeout(() => setIsRefreshing(false), 1000);
                }}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] shadow-sm">
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
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}