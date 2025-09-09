import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewControls } from './view-controls';
import { CajaEntityList, CajaSearchBar, CajaStatsCard, CajaHeader } from './ui/design-system';
import { useClientData, Client } from '../hooks/useEntityData';
import { 
  Filter, 
  Plus, 
  MoreVertical,
  Users as UsersIcon,
  Activity,
  DollarSign,
  Clock,
  Archive,
  Star,
  Ticket
} from 'lucide-react';

export function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { transformClientToEntity } = useClientData();

  const clients: Client[] = [
    {
      id: 'CLI-001',
      name: 'Maria Santos',
      email: 'maria@techsolutions.com',
      phone: '(11) 99999-1111',
      company: 'Tech Solutions Ltda',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      plan: 'pro',
      joinDate: '2024-01-15',
      lastContact: '2024-01-15',
      totalTickets: 12,
      openTickets: 2,
      satisfaction: 98,
      location: 'São Paulo, SP',
      website: 'techsolutions.com.br',
      tags: ['vip', 'enterprise'],
      revenue: 15000,
      lastActivity: '2h atrás',
      priority: 'high'
    },
    {
      id: 'CLI-002',
      name: 'João Silva',
      email: 'joao@startuptech.com',
      phone: '(21) 88888-2222',
      company: 'StartupTech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      plan: 'basic',
      joinDate: '2024-01-10',
      lastContact: '2024-01-14',
      totalTickets: 5,
      openTickets: 0,
      satisfaction: 95,
      location: 'Rio de Janeiro, RJ',
      website: 'startuptech.io',
      tags: ['startup'],
      revenue: 2500,
      lastActivity: '1d atrás',
      priority: 'medium'
    },
    {
      id: 'CLI-003',
      name: 'Ana Costa',
      email: 'ana@megacorp.com',
      phone: '(11) 77777-3333',
      company: 'MegaCorp Enterprises',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      plan: 'enterprise',
      joinDate: '2023-12-01',
      lastContact: '2024-01-13',
      totalTickets: 35,
      openTickets: 1,
      satisfaction: 92,
      location: 'São Paulo, SP',
      website: 'megacorp.com',
      tags: ['enterprise', 'long-term'],
      revenue: 45000,
      lastActivity: '30min atrás',
      priority: 'high'
    },
    {
      id: 'CLI-004',
      name: 'Carlos Oliveira',
      email: 'carlos@consultoria.com',
      phone: '(31) 66666-4444',
      company: 'Oliveira Consultoria',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'inactive',
      plan: 'basic',
      joinDate: '2023-11-20',
      lastContact: '2024-01-05',
      totalTickets: 8,
      openTickets: 0,
      satisfaction: 88,
      location: 'Belo Horizonte, MG',
      website: 'oliveiraconsultoria.com.br',
      tags: ['consultoria'],
      revenue: 3200,
      lastActivity: '10d atrás',
      priority: 'low'
    },
    {
      id: 'CLI-005',
      name: 'Fernanda Lima',
      email: 'fernanda@innovate.com',
      phone: '(47) 55555-5555',
      company: 'Innovate Solutions',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      status: 'pending',
      plan: 'pro',
      joinDate: '2024-01-14',
      lastContact: '2024-01-14',
      totalTickets: 1,
      openTickets: 1,
      satisfaction: 100,
      location: 'Florianópolis, SC',
      website: 'innovatesolutions.com',
      tags: ['new-client'],
      revenue: 8000,
      lastActivity: '5h atrás',
      priority: 'medium'
    }
  ];

  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesPlan = planFilter === 'all' || client.plan === planFilter;
      
      return matchesSearch && matchesStatus && matchesPlan;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'plan':
          aValue = a.plan;
          bValue = b.plan;
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'satisfaction':
          aValue = a.satisfaction;
          bValue = b.satisfaction;
          break;
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime();
          bValue = new Date(b.joinDate).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

  const getClientStats = () => {
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      inactive: clients.filter(c => c.status === 'inactive').length,
      pending: clients.filter(c => c.status === 'pending').length,
      totalRevenue: clients.reduce((sum, c) => sum + c.revenue, 0),
      avgSatisfaction: Math.round(clients.reduce((sum, c) => sum + c.satisfaction, 0) / clients.length),
      openTickets: clients.reduce((sum, c) => sum + c.openTickets, 0)
    };
  };

  const stats = getClientStats();

  // Transformar clientes para o formato unificado
  const entityItems = filteredAndSortedClients.map(client => ({
    ...transformClientToEntity(client),
    selected: selectedClient === client.id,
    onClick: () => setSelectedClient(selectedClient === client.id ? null : client.id),
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
          title="Gestão de Clientes"
          description="Gerencie relacionamentos e acompanhe o crescimento de sua base de clientes"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Clientes' }
          ]}
          actions={
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
              <Button className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </div>
          }
        />
      </div>

      {/* Stats Section */}
      <div className="px-6 py-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <CajaStatsCard
            title="Total"
            value={stats.total.toString()}
            icon={UsersIcon}
            variant="yellow"
          />
          <CajaStatsCard
            title="Ativos"
            value={stats.active.toString()}
            icon={Activity}
            variant="green"
          />
          <CajaStatsCard
            title="Pendentes"
            value={stats.pending.toString()}
            icon={Clock}
            variant="brown"
          />
          <CajaStatsCard
            title="Inativos"
            value={stats.inactive.toString()}
            icon={Archive}
            variant="default"
          />
          <CajaStatsCard
            title="Receita"
            value={`R$ ${(stats.totalRevenue / 1000).toFixed(0)}k`}
            icon={DollarSign}
            variant="green"
            change="+12% este mês"
            changeType="positive"
          />
          <CajaStatsCard
            title="Satisfação"
            value={`${stats.avgSatisfaction}%`}
            icon={Star}
            variant="yellow"
            change="+2% este mês"
            changeType="positive"
          />
          <CajaStatsCard
            title="Tickets"
            value={stats.openTickets.toString()}
            icon={Ticket}
            variant="default"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 max-w-md">
            <CajaSearchBar
              placeholder="Buscar por nome, email ou empresa..."
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
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-32 border-0 bg-[var(--muted)]/50">
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
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
        itemCount={filteredAndSortedClients.length}
        totalCount={clients.length}
        sortOptions={[
          { value: 'name', label: 'Nome' },
          { value: 'company', label: 'Empresa' },
          { value: 'status', label: 'Status' },
          { value: 'plan', label: 'Plano' },
          { value: 'revenue', label: 'Receita' },
          { value: 'satisfaction', label: 'Satisfação' },
          { value: 'joinDate', label: 'Data de Entrada' }
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
                <UsersIcon className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                <p className="text-lg font-medium text-[var(--muted-foreground)]">
                  Nenhum cliente encontrado
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Tente ajustar seus filtros de pesquisa ou adicione um novo cliente
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}