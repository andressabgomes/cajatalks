import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Download, Calendar, Filter, BarChart3, PieChart as PieChartIcon, Activity, Users, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function Reports() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample data for charts
  const dailyStats = [
    { name: 'Seg', tickets: 45, conversations: 78, satisfaction: 4.2 },
    { name: 'Ter', tickets: 52, conversations: 89, satisfaction: 4.5 },
    { name: 'Qua', tickets: 38, conversations: 67, satisfaction: 4.8 },
    { name: 'Qui', tickets: 61, conversations: 94, satisfaction: 4.3 },
    { name: 'Sex', tickets: 43, conversations: 76, satisfaction: 4.6 },
    { name: 'Sáb', tickets: 29, conversations: 45, satisfaction: 4.9 },
    { name: 'Dom', tickets: 22, conversations: 38, satisfaction: 4.7 }
  ];

  const hourlyActivity = [
    { hour: '00', activity: 12 },
    { hour: '02', activity: 8 },
    { hour: '04', activity: 5 },
    { hour: '06', activity: 15 },
    { hour: '08', activity: 45 },
    { hour: '10', activity: 78 },
    { hour: '12', activity: 89 },
    { hour: '14', activity: 92 },
    { hour: '16', activity: 85 },
    { hour: '18', activity: 67 },
    { hour: '20', activity: 43 },
    { hour: '22', activity: 28 }
  ];

  const departmentStats = [
    { name: 'Suporte Técnico', value: 35, color: 'var(--chart-1)' },
    { name: 'Customer Success', value: 28, color: 'var(--chart-2)' },
    { name: 'Vendas', value: 22, color: 'var(--chart-3)' },
    { name: 'Financeiro', value: 15, color: 'var(--chart-4)' }
  ];

  const teamPerformance = [
    { name: 'Ana Silva', tickets: 127, satisfaction: 4.8, responseTime: 2.3 },
    { name: 'Carlos Santos', tickets: 89, satisfaction: 4.6, responseTime: 3.1 },
    { name: 'Mariana Costa', tickets: 203, satisfaction: 4.9, responseTime: 1.8 },
    { name: 'Pedro Oliveira', tickets: 45, satisfaction: 4.5, responseTime: 4.2 },
    { name: 'Julia Ferreira', tickets: 67, satisfaction: 4.7, responseTime: 2.9 }
  ];

  const mainMetrics = [
    {
      title: 'Total de Tickets',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: MessageSquare,
      description: 'vs. período anterior'
    },
    {
      title: 'Tempo Médio de Resposta',
      value: '2.3min',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      description: 'vs. período anterior'
    },
    {
      title: 'Satisfação do Cliente',
      value: '4.7/5',
      change: '+0.2',
      trend: 'up',
      icon: TrendingUp,
      description: 'vs. período anterior'
    },
    {
      title: 'Taxa de Resolução',
      value: '94.2%',
      change: '+3%',
      trend: 'up',
      icon: Activity,
      description: 'vs. período anterior'
    }
  ];

  const exportReport = () => {
    console.log('Exporting report...');
  };

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
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Relatórios</h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Análise detalhada de performance e métricas
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Últimas 24h</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportReport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </motion.div>

        {/* Main Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mainMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-[var(--caja-green)]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-[var(--caja-green)]" />
                      )}
                      <span className="text-sm text-[var(--caja-green)]">{metric.change}</span>
                      <span className="text-xs text-[var(--muted-foreground)]">{metric.description}</span>
                    </div>
                  </div>
                  <metric.icon className="w-8 h-8 text-[var(--chart-1)]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="team">Equipe</TabsTrigger>
              <TabsTrigger value="trends">Tendências</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Tickets por Dia</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="tickets" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChartIcon className="w-5 h-5" />
                      <span>Distribuição por Departamento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={departmentStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Atividade por Hora</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={hourlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="activity" 
                        stroke="var(--chart-2)" 
                        fill="var(--chart-2)" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Satisfação do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="satisfaction" 
                          stroke="var(--chart-2)" 
                          strokeWidth={3}
                          dot={{ fill: 'var(--chart-2)', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversas vs Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="conversations" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="tickets" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <h3 className="text-2xl font-bold text-[var(--chart-1)]">96.2%</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">Taxa de Resolução</p>
                      <Badge variant="default" className="mt-2">+2.1%</Badge>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <h3 className="text-2xl font-bold text-[var(--chart-2)]">1.8h</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">Tempo Médio de Resolução</p>
                      <Badge variant="default" className="mt-2">-12%</Badge>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                      <h3 className="text-2xl font-bold text-[var(--chart-3)]">3.2</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">Interações por Ticket</p>
                      <Badge variant="secondary" className="mt-2">-0.3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Performance da Equipe</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Agente</th>
                          <th className="text-left p-4">Tickets Resolvidos</th>
                          <th className="text-left p-4">Satisfação</th>
                          <th className="text-left p-4">Tempo de Resposta</th>
                          <th className="text-left p-4">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamPerformance.map((member, index) => (
                          <tr key={index} className="border-b hover:bg-[var(--muted)]/50">
                            <td className="p-4 font-medium">{member.name}</td>
                            <td className="p-4">{member.tickets}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-1">
                                <span>{member.satisfaction}</span>
                                <span className="text-amber-400">⭐</span>
                              </div>
                            </td>
                            <td className="p-4">{member.responseTime}min</td>
                            <td className="p-4">
                              <Badge 
                                variant={member.satisfaction >= 4.7 ? 'default' : 'secondary'}
                              >
                                {member.satisfaction >= 4.7 ? 'Excelente' : 'Bom'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamPerformance
                        .sort((a, b) => b.satisfaction - a.satisfaction)
                        .slice(0, 3)
                        .map((member, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]/50">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[var(--chart-1)] rounded-full flex items-center justify-center text-sm font-bold text-white">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-[var(--muted-foreground)]">
                                  {member.tickets} tickets • {member.satisfaction} ⭐
                                </p>
                              </div>
                            </div>
                            <Badge variant="default">Top {index + 1}</Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Carga de Trabalho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={teamPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="tickets" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendências de Crescimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="tickets" 
                        stroke="var(--chart-1)" 
                        strokeWidth={3}
                        name="Tickets"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke="var(--chart-2)" 
                        strokeWidth={3}
                        name="Conversas"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Previsão Semanal</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-[var(--chart-2)]">+18%</div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">
                      Crescimento esperado nos próximos 7 dias
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Tendência Mensal</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-[var(--chart-1)]">+25%</div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">
                      Crescimento nos últimos 30 dias
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Meta Anual</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-[var(--chart-3)]">73%</div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">
                      Progresso em direção à meta anual
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}