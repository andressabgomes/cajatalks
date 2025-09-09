import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Search, Filter, Download, Calendar, User, MessageSquare, Settings, Bell, Lock, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const activityTypes = [
    { id: 'all', name: 'Todas as Atividades', count: 156 },
    { id: 'login', name: 'Login/Logout', count: 45 },
    { id: 'ticket', name: 'Tickets', count: 67 },
    { id: 'message', name: 'Mensagens', count: 23 },
    { id: 'settings', name: 'Configurações', count: 12 },
    { id: 'integration', name: 'Integrações', count: 9 }
  ];

  const users = [
    { id: 'all', name: 'Todos os Usuários' },
    { id: 'ana', name: 'Ana Silva' },
    { id: 'carlos', name: 'Carlos Santos' },
    { id: 'mariana', name: 'Mariana Costa' },
    { id: 'pedro', name: 'Pedro Oliveira' },
    { id: 'julia', name: 'Julia Ferreira' }
  ];

  const activities = [
    {
      id: 1,
      type: 'login',
      user: 'Ana Silva',
      action: 'Realizou login no sistema',
      details: 'Login via Chrome - IP: 192.168.1.100',
      timestamp: '2024-01-15 14:30:25',
      severity: 'info',
      metadata: {
        ip: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        location: 'São Paulo, SP'
      }
    },
    {
      id: 2,
      type: 'ticket',
      user: 'Carlos Santos',
      action: 'Ticket #1234 atualizado',
      details: 'Status alterado de "Em Andamento" para "Resolvido"',
      timestamp: '2024-01-15 14:25:10',
      severity: 'success',
      metadata: {
        ticketId: '1234',
        oldStatus: 'Em Andamento',
        newStatus: 'Resolvido',
        customer: 'João da Silva'
      }
    },
    {
      id: 3,
      type: 'message',
      user: 'Mariana Costa',
      action: 'Nova mensagem enviada',
      details: 'Mensagem enviada para cliente via WhatsApp',
      timestamp: '2024-01-15 14:20:45',
      severity: 'info',
      metadata: {
        channel: 'WhatsApp',
        customer: 'Maria Oliveira',
        messageLength: 125
      }
    },
    {
      id: 4,
      type: 'settings',
      user: 'Ana Silva',
      action: 'Configurações de notificação alteradas',
      details: 'Notificações por email desabilitadas',
      timestamp: '2024-01-15 14:15:30',
      severity: 'warning',
      metadata: {
        setting: 'emailNotifications',
        oldValue: true,
        newValue: false
      }
    },
    {
      id: 5,
      type: 'integration',
      user: 'Pedro Oliveira',
      action: 'Nova integração configurada',
      details: 'WhatsApp Business API conectado com sucesso',
      timestamp: '2024-01-15 14:10:15',
      severity: 'success',
      metadata: {
        integration: 'WhatsApp Business',
        apiVersion: 'v17.0',
        phoneNumber: '+55 11 99999-9999'
      }
    },
    {
      id: 6,
      type: 'login',
      user: 'Julia Ferreira',
      action: 'Tentativa de login falhada',
      details: 'Senha incorreta - 3ª tentativa',
      timestamp: '2024-01-15 14:05:20',
      severity: 'error',
      metadata: {
        ip: '192.168.1.200',
        attemptNumber: 3,
        reason: 'invalid_password'
      }
    },
    {
      id: 7,
      type: 'ticket',
      user: 'Carlos Santos',
      action: 'Novo ticket criado',
      details: 'Ticket #1235 criado para cliente Premium',
      timestamp: '2024-01-15 14:00:10',
      severity: 'info',
      metadata: {
        ticketId: '1235',
        priority: 'Alta',
        category: 'Suporte Técnico',
        customer: 'Empresa XYZ'
      }
    },
    {
      id: 8,
      type: 'message',
      user: 'Mariana Costa',
      action: 'Conversa finalizada',
      details: 'Conversa com cliente finalizada - Duração: 15 minutos',
      timestamp: '2024-01-15 13:55:30',
      severity: 'success',
      metadata: {
        conversationId: 'conv_789',
        duration: 900,
        satisfaction: 5,
        customer: 'Ana Pereira'
      }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <User className="w-4 h-4" />;
      case 'ticket': return <MessageSquare className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      case 'settings': return <Settings className="w-4 h-4" />;
      case 'integration': return <RefreshCw className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-[var(--caja-green)]';
      case 'warning': return 'text-[var(--caja-yellow)]';
      case 'error': return 'text-red-500';
      default: return 'text-[var(--muted-foreground)]';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'success': return <Badge className="bg-[var(--caja-green)] text-white">Sucesso</Badge>;
      case 'warning': return <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)]">Atenção</Badge>;
      case 'error': return <Badge className="bg-red-500 text-white">Erro</Badge>;
      default: return <Badge variant="secondary">Info</Badge>;
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
    const matchesUser = selectedUser === 'all' || activity.user.toLowerCase().includes(selectedUser);
    
    return matchesSearch && matchesFilter && matchesUser;
  });

  const exportLogs = () => {
    console.log('Exporting activity logs...');
  };

  const activityStats = [
    { label: 'Total de Atividades', value: activities.length, change: '+23 hoje' },
    { label: 'Logins Únicos', value: new Set(activities.filter(a => a.type === 'login').map(a => a.user)).size, change: '+3 hoje' },
    { label: 'Ações de Risco', value: activities.filter(a => a.severity === 'error').length, change: 'Última: há 2h' },
    { label: 'Usuários Ativos', value: new Set(activities.map(a => a.user)).size, change: 'Agora online: 4' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Log de Atividades</h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Monitore todas as ações realizadas no sistema
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Última hora</SelectItem>
                <SelectItem value="24h">Últimas 24h</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportLogs} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activityStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-[var(--caja-green)] mt-1">{stat.change}</p>
                  </div>
                  <Activity className="w-8 h-8 text-[var(--caja-yellow)]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-4 h-4" />
            <Input
              placeholder="Buscar atividades, usuários ou ações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tipo de atividade" />
            </SelectTrigger>
            <SelectContent>
              {activityTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-full lg:w-48">
              <User className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Usuário" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Activity Types Quick Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {activityTypes.map(type => (
            <Button
              key={type.id}
              variant={selectedFilter === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(type.id)}
              className="flex items-center space-x-2"
            >
              {getActivityIcon(type.id)}
              <span>{type.name}</span>
              <Badge variant="secondary" className="ml-2">
                {type.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Lista Detalhada</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-[var(--border)]">
                        <tr>
                          <th className="text-left p-4">Usuário</th>
                          <th className="text-left p-4">Ação</th>
                          <th className="text-left p-4">Detalhes</th>
                          <th className="text-left p-4">Tipo</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredActivities.map(activity => (
                          <tr key={activity.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50">
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs">
                                    {activity.user.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{activity.user}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className={`${getSeverityColor(activity.severity)}`}>
                                  {getActivityIcon(activity.type)}
                                </div>
                                <span className="font-medium">{activity.action}</span>
                              </div>
                            </td>
                            <td className="p-4 text-[var(--muted-foreground)] text-sm max-w-xs truncate">
                              {activity.details}
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className="capitalize">
                                {activity.type}
                              </Badge>
                            </td>
                            <td className="p-4">
                              {getSeverityBadge(activity.severity)}
                            </td>
                            <td className="p-4 text-[var(--muted-foreground)] text-sm">
                              {new Date(activity.timestamp).toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                  <Card key={activity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full border-2 border-[var(--border)] bg-[var(--background)] flex items-center justify-center ${getSeverityColor(activity.severity)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          {index < filteredActivities.length - 1 && (
                            <div className="w-0.5 h-12 bg-[var(--border)] mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs">
                                  {activity.user.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-[var(--muted-foreground)]">•</span>
                              <span className="text-sm text-[var(--muted-foreground)]">
                                {new Date(activity.timestamp).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            {getSeverityBadge(activity.severity)}
                          </div>
                          <h3 className="font-semibold mb-1">{activity.action}</h3>
                          <p className="text-[var(--muted-foreground)] text-sm mb-3">{activity.details}</p>
                          
                          {activity.metadata && (
                            <div className="bg-[var(--muted)]/50 rounded-lg p-3">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(activity.metadata).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-[var(--muted-foreground)] capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                                    </span>
                                    <span className="font-medium">{String(value)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}