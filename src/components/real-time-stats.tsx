import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock,
  Users,
  MessageSquare,
  Zap
} from 'lucide-react';

interface RealTimeStatsProps {
  className?: string;
}

interface StatUpdate {
  activeConversations: number;
  avgResponseTime: number;
  onlineAgents: number;
  satisfactionRate: number;
  ticketsResolved: number;
}

export function RealTimeStats({ className = '' }: RealTimeStatsProps) {
  const [stats, setStats] = useState<StatUpdate>({
    activeConversations: 247,
    avgResponseTime: 2.3,
    onlineAgents: 12,
    satisfactionRate: 94,
    ticketsResolved: 18
  });
  
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        activeConversations: prev.activeConversations + Math.floor(Math.random() * 5) - 2,
        avgResponseTime: Math.max(0.5, prev.avgResponseTime + (Math.random() - 0.5) * 0.2),
        onlineAgents: Math.max(8, Math.min(15, prev.onlineAgents + Math.floor(Math.random() * 3) - 1)),
        satisfactionRate: Math.max(85, Math.min(100, prev.satisfactionRate + (Math.random() - 0.5) * 2)),
        ticketsResolved: prev.ticketsResolved + (Math.random() > 0.7 ? 1 : 0)
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <Card className={`${className} border-0 shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[var(--caja-green)]" />
            <span>Estatísticas ao Vivo</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-[var(--caja-green)] animate-pulse' : 'bg-gray-400'}`}></div>
            <Badge 
              variant={isLive ? "default" : "secondary"}
              className={isLive ? "bg-[var(--caja-green)] text-white" : ""}
            >
              {isLive ? 'AO VIVO' : 'PAUSADO'}
            </Badge>
            <button
              onClick={() => setIsLive(!isLive)}
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              {isLive ? 'Pausar' : 'Retomar'}
            </button>
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Última atualização: {formatTime(lastUpdate)}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Active Conversations */}
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--chart-1)] rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Conversas Ativas</p>
              <p className="text-sm text-[var(--muted-foreground)]">Em andamento agora</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{stats.activeConversations}</p>
            <div className="flex items-center space-x-1 text-xs text-[var(--caja-green)]">
              <TrendingUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--chart-2)] rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Tempo Resposta</p>
              <p className="text-sm text-[var(--muted-foreground)]">Média atual</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{stats.avgResponseTime.toFixed(1)}min</p>
            <div className="flex items-center space-x-1 text-xs text-[var(--caja-green)]">
              <TrendingDown className="h-3 w-3" />
              <span>-8%</span>
            </div>
          </div>
        </div>

        {/* Online Agents */}
        <div className="flex items-center justify-between p-3 bg-[var(--caja-brown-light)] rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--caja-brown)] rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">Agentes Online</p>
              <p className="text-sm text-[var(--muted-foreground)]">Disponíveis agora</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{stats.onlineAgents}/15</p>
            <Progress value={(stats.onlineAgents / 15) * 100} className="w-16 h-2" />
          </div>
        </div>

        {/* Satisfaction & Tickets */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border border-[var(--border)] rounded-lg">
            <p className="text-lg font-bold text-[var(--caja-green)]">{stats.satisfactionRate.toFixed(0)}%</p>
            <p className="text-xs text-[var(--muted-foreground)]">Satisfação</p>
          </div>
          <div className="text-center p-3 border border-[var(--border)] rounded-lg">
            <p className="text-lg font-bold text-[var(--caja-yellow)]">{stats.ticketsResolved}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Resolvidos hoje</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}