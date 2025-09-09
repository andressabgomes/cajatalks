import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { CajaEntityList, CajaSearchBar, CajaStatsCard, CajaHeader } from './ui/design-system';
import { useTeamData, TeamMember } from '../hooks/useEntityData';
import { 
  UserPlus,
  MoreHorizontal,
  Users,
  Activity,
  Star,
  Crown,
  Shield,
  User
} from 'lucide-react';

export function Team() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { transformMemberToEntity } = useTeamData();

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      role: 'admin',
      department: 'Customer Success',
      status: 'online',
      avatar: null,
      joinDate: '2023-01-15',
      lastActive: 'Agora',
      stats: { tickets: 127, conversations: 245, rating: 4.8 }
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos.santos@empresa.com',
      role: 'agent',
      department: 'Suporte Técnico',
      status: 'online',
      avatar: null,
      joinDate: '2023-03-10',
      lastActive: 'Há 5 minutos',
      stats: { tickets: 89, conversations: 156, rating: 4.6 }
    },
    {
      id: 3,
      name: 'Mariana Costa',
      email: 'mariana.costa@empresa.com',
      role: 'supervisor',
      department: 'Customer Success',
      status: 'away',
      avatar: null,
      joinDate: '2022-11-20',
      lastActive: 'Há 1 hora',
      stats: { tickets: 203, conversations: 378, rating: 4.9 }
    },
    {
      id: 4,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@empresa.com',
      role: 'agent',
      department: 'Vendas',
      status: 'offline',
      avatar: null,
      joinDate: '2023-06-05',
      lastActive: 'Há 2 horas',
      stats: { tickets: 45, conversations: 98, rating: 4.5 }
    },
    {
      id: 5,
      name: 'Julia Ferreira',
      email: 'julia.ferreira@empresa.com',
      role: 'agent',
      department: 'Suporte Técnico',
      status: 'online',
      avatar: null,
      joinDate: '2023-08-12',
      lastActive: 'Agora',
      stats: { tickets: 67, conversations: 134, rating: 4.7 }
    }
  ];

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'agent',
    department: ''
  });

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || member.role === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'agent', department: '' });
  };

  const teamStats = [
    { label: 'Total de Membros', value: teamMembers.length, change: '+2 este mês' },
    { label: 'Online Agora', value: teamMembers.filter(m => m.status === 'online').length, change: 'Ativo' },
    { label: 'Taxa de Resposta', value: '96%', change: '+3% este mês' },
    { label: 'Satisfação Média', value: '4.7/5', change: '+0.1 este mês' }
  ];

  // Transformar membros para o formato unificado
  const entityItems = filteredMembers.map(member => ({
    ...transformMemberToEntity(member),
    selected: selectedMember === member.id.toString(),
    onClick: () => setSelectedMember(selectedMember === member.id.toString() ? null : member.id.toString()),
    actions: (
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    )
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[var(--border)] bg-white/50 backdrop-blur-sm">
        <CajaHeader
          title="Gestão de Equipe"
          description="Gerencie membros da equipe e permissões"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Equipe' }
          ]}
          actions={
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] shadow-sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Membro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Membro</DialogTitle>
                  <DialogDescription>
                    Adicione um novo membro à sua equipe preenchendo as informações abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newName">Nome Completo</Label>
                    <Input
                      id="newName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Digite o email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newRole">Cargo</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent">Agente</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newDepartment">Departamento</Label>
                    <Input
                      id="newDepartment"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      placeholder="Digite o departamento"
                    />
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleAddUser} className="flex-1">Adicionar</Button>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          }
        />
      </div>

      {/* Stats Section */}
      <div className="px-6 py-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CajaStatsCard
            title="Total de Membros"
            value={teamStats[0].value.toString()}
            icon={Users}
            variant="yellow"
            change={teamStats[0].change}
            changeType="positive"
          />
          <CajaStatsCard
            title="Online Agora"
            value={teamStats[1].value.toString()}
            icon={Activity}
            variant="green"
            change={teamStats[1].change}
            changeType="neutral"
          />
          <CajaStatsCard
            title="Taxa de Resposta"
            value={teamStats[2].value}
            icon={Activity}
            variant="brown"
            change={teamStats[2].change}
            changeType="positive"
          />
          <CajaStatsCard
            title="Satisfação Média"
            value={teamStats[3].value}
            icon={Star}
            variant="yellow"
            change={teamStats[3].change}
            changeType="positive"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 max-w-md">
            <CajaSearchBar
              placeholder="Buscar membros..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48 border-0 bg-[var(--muted)]/50">
              <SelectValue placeholder="Filtrar por cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os cargos</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
              <SelectItem value="supervisor">Supervisores</SelectItem>
              <SelectItem value="agent">Agentes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--muted)]/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">
            Mostrando {filteredMembers.length} de {teamMembers.length} membros
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <CajaEntityList
            items={entityItems}
            viewMode={viewMode}
            emptyState={
              <div className="text-center space-y-2">
                <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                <p className="text-lg font-medium text-[var(--muted-foreground)]">
                  Nenhum membro encontrado
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Tente ajustar sua pesquisa ou adicione um novo membro
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}