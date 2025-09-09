import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RealTimeStats } from './real-time-stats';
import { PageLayout } from './layout/PageLayout';
import { CajaStatsCard, CajaCard, CajaListItem, CajaButton } from './ui/design-system';
import { 
  MessageSquare, 
  Users, 
  Ticket, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Star
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Conversas Ativas',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'bg-[var(--caja-yellow)]'
    },
    {
      title: 'Tickets Abertos',
      value: '32',
      change: '-8%',
      changeType: 'positive' as const,
      icon: Ticket,
      color: 'bg-[var(--caja-green)]'
    },
    {
      title: 'Clientes Ativos',
      value: '1,235',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-[var(--caja-brown)]'
    },
    {
      title: 'Satisfação',
      value: '94%',
      change: '+2%',
      changeType: 'positive' as const,
      icon: Star,
      color: 'bg-[var(--caja-yellow)]'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'message',
      title: 'Nova mensagem de Maria Santos',
      description: 'Preciso de ajuda com o pedido #12345',
      time: '2 min atrás',
      priority: 'high'
    },
    {
      id: 2,
      type: 'ticket',
      title: 'Ticket #456 foi resolvido',
      description: 'Cliente satisfeito com a solução',
      time: '15 min atrás',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'client',
      title: 'Novo cliente cadastrado',
      description: 'Tech Solutions Ltda',
      time: '1 hora atrás',
      priority: 'low'
    },
    {
      id: 4,
      type: 'message',
      title: 'Conversa escalada para supervisor',
      description: 'Cliente solicita falar com gerente',
      time: '2 horas atrás',
      priority: 'high'
    }
  ];

  const teamPerformance = [
    { name: 'Ana Silva', messages: 45, satisfaction: 98, avatar: '👩‍💼' },
    { name: 'Carlos Santos', messages: 38, satisfaction: 95, avatar: '👨‍💼' },
    { name: 'Mariana Costa', messages: 42, satisfaction: 92, avatar: '👩‍💻' },
    { name: 'Rafael Lima', messages: 35, satisfaction: 96, avatar: '👨‍💻' }
  ];

  return (
    <PageLayout
      title="Dashboard"
      description="Visão geral das suas operações"
      secondaryActions={[
        {
          label: 'Últimos 30 dias',
          icon: Calendar,
          variant: 'outline',
          onClick: () => console.log('Calendar filter')
        }
      ]}
      primaryAction={{
        label: 'Relatório',
        icon: TrendingUp,
        variant: 'yellow',
        onClick: () => console.log('Generate report')
      }}
      showRefresh={true}
      onRefresh={() => console.log('Refreshing dashboard')}
    >
      <div className="space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <CajaStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              variant={stat.color === 'bg-[var(--caja-yellow)]' ? 'yellow' : 
                      stat.color === 'bg-[var(--caja-green)]' ? 'green' : 
                      stat.color === 'bg-[var(--caja-brown)]' ? 'brown' : 'default'}
              animated={true}
              className="animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <CajaCard
            title="Atividade Recente"
            variant="default"
            hoverable={false}
            className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span></span>
              <CajaButton variant="ghost" size="sm">
                Ver tudo
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </CajaButton>
            </div>
            <div className="space-y-2">
              {recentActivity.map((activity) => (
                <CajaListItem
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  timestamp={activity.time}
                  icon={activity.type === 'message' ? MessageSquare :
                        activity.type === 'ticket' ? Ticket : Users}
                  badges={[{
                    text: activity.priority === 'high' ? 'Alta' : 
                          activity.priority === 'medium' ? 'Média' : 'Baixa',
                    variant: activity.priority === 'high' ? 'red' : 
                            activity.priority === 'medium' ? 'yellow' : 'green'
                  }]}
                  hoverable={true}
                  animated={true}
                  onClick={() => console.log('Activity clicked:', activity.id)}
                />
              ))}
            </div>
          </CajaCard>

          {/* Real-time Stats */}
          <RealTimeStats className="animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-400" />
        </div>

        {/* Team Performance */}
        <CajaCard
          title="Performance da Equipe"
          description="Métricas dos últimos 7 dias"
          variant="default"
          animated={false}
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-500"
        >
          <div className="space-y-2">
            {teamPerformance.map((member, index) => (
              <CajaListItem
                key={index}
                title={member.name}
                avatar={<span className="text-lg">{member.avatar}</span>}
                badges={[
                  { text: `${member.messages} msgs`, variant: 'default' },
                  { text: `${member.satisfaction}%`, variant: 'yellow' }
                ]}
                hoverable={true}
                animated={true}
                onClick={() => console.log('Team member clicked:', member.name)}
              >
                <div className="mt-2">
                  <Progress value={member.satisfaction} className="h-2" />
                </div>
              </CajaListItem>
            ))}
          </div>
        </CajaCard>

        {/* Quick Actions */}
        <CajaCard
          title="Ações Rápidas"
          description="Acesse rapidamente as funcionalidades mais usadas"
          variant="feature"
          animated={false}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MessageSquare, label: 'Nova Conversa', action: () => console.log('New conversation') },
              { icon: Ticket, label: 'Criar Ticket', action: () => console.log('Create ticket') },
              { icon: Users, label: 'Adicionar Cliente', action: () => console.log('Add client') },
              { icon: TrendingUp, label: 'Relatórios', action: () => console.log('Reports') }
            ].map((item, index) => (
              <CajaButton
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2 hover:bg-[var(--caja-yellow)]/10 hover:border-[var(--caja-yellow)]/30"
                onClick={item.action}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-sm">{item.label}</span>
              </CajaButton>
            ))}
          </div>
        </CajaCard>
      </div>
    </PageLayout>
  );
}