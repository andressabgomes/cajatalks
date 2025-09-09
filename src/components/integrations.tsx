import { useState } from 'react';
import { motion } from 'motion/react';
import { Plug, Plus, Settings, CheckCircle, XCircle, AlertTriangle, ExternalLink, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);

  const integrationCategories = [
    { id: 'all', name: 'Todas', count: 24 },
    { id: 'messaging', name: 'Mensagens', count: 8 },
    { id: 'crm', name: 'CRM', count: 6 },
    { id: 'analytics', name: 'Analytics', count: 4 },
    { id: 'productivity', name: 'Produtividade', count: 6 }
  ];

  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'WhatsApp Business',
      description: 'Conecte sua conta do WhatsApp Business para receber e enviar mensagens diretamente no Cajá Talks.',
      category: 'messaging',
      icon: '💬',
      status: 'connected',
      isActive: true,
      connectedAt: '2024-01-15',
      metrics: { messages: 1247, contacts: 856 },
      configuration: {
        apiKey: '****-****-****-1234',
        webhook: 'https://app.cajatalks.com/webhook/whatsapp'
      }
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Receba notificações e gerencie tickets diretamente do Slack.',
      category: 'productivity',
      icon: '💼',
      status: 'connected',
      isActive: true,
      connectedAt: '2024-01-12',
      metrics: { notifications: 234, channels: 5 },
      configuration: {
        workspace: 'empresa-workspace',
        botToken: '****-****-****-5678'
      }
    },
    {
      id: 3,
      name: 'HubSpot CRM',
      description: 'Sincronize contatos e histórico de conversas com o HubSpot.',
      category: 'crm',
      icon: '🏢',
      status: 'connected',
      isActive: false,
      connectedAt: '2024-01-10',
      metrics: { contacts: 2341, deals: 45 },
      configuration: {
        apiKey: '****-****-****-9012',
        portalId: '12345678'
      }
    },
    {
      id: 4,
      name: 'Google Analytics',
      description: 'Acompanhe métricas de conversão e comportamento do usuário.',
      category: 'analytics',
      icon: '📊',
      status: 'error',
      isActive: false,
      connectedAt: '2024-01-08',
      metrics: { sessions: 0, conversions: 0 },
      configuration: {
        trackingId: 'GA-****-****-3456',
        propertyId: '987654321'
      }
    },
    {
      id: 5,
      name: 'Zendesk',
      description: 'Importe tickets e histórico de atendimento do Zendesk.',
      category: 'crm',
      icon: '🎫',
      status: 'available',
      isActive: false,
      connectedAt: null,
      metrics: {},
      configuration: {}
    },
    {
      id: 6,
      name: 'Telegram',
      description: 'Conecte seu bot do Telegram para atendimento multicanal.',
      category: 'messaging',
      icon: '✈️',
      status: 'available',
      isActive: false,
      connectedAt: null,
      metrics: {},
      configuration: {}
    }
  ]);

  const [newIntegration, setNewIntegration] = useState({
    name: '',
    category: '',
    description: '',
    apiKey: '',
    webhook: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-[var(--caja-green)]" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[var(--caja-yellow)]" />;
      default:
        return <Plug className="w-5 h-5 text-[var(--muted-foreground)]" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'error': return 'Erro';
      case 'warning': return 'Atenção';
      default: return 'Disponível';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-[var(--caja-green)]';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-[var(--caja-yellow)]';
      default: return 'bg-[var(--muted-foreground)]';
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    return selectedCategory === 'all' || integration.category === selectedCategory;
  });

  const toggleIntegration = (id: number) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isActive: !integration.isActive }
        : integration
    ));
  };

  const handleAddIntegration = () => {
    console.log('Adding custom integration:', newIntegration);
    setIsAddIntegrationOpen(false);
    setNewIntegration({ name: '', category: '', description: '', apiKey: '', webhook: '' });
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const activeCount = integrations.filter(i => i.isActive).length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

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
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Integrações</h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Conecte suas ferramentas favoritas ao Cajá Talks
            </p>
          </div>
          <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Integração Personalizada</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Integração Personalizada</DialogTitle>
                <DialogDescription>
                  Configure uma nova integração personalizada preenchendo as informações abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="integrationName">Nome da Integração</Label>
                  <Input
                    id="integrationName"
                    value={newIntegration.name}
                    onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                    placeholder="Nome da sua integração"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="integrationCategory">Categoria</Label>
                  <Select value={newIntegration.category} onValueChange={(value) => setNewIntegration({...newIntegration, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="messaging">Mensagens</SelectItem>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="productivity">Produtividade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="integrationDescription">Descrição</Label>
                  <Textarea
                    id="integrationDescription"
                    value={newIntegration.description}
                    onChange={(e) => setNewIntegration({...newIntegration, description: e.target.value})}
                    placeholder="Descreva o que esta integração faz"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="integrationApiKey">API Key</Label>
                  <Input
                    id="integrationApiKey"
                    type="password"
                    value={newIntegration.apiKey}
                    onChange={(e) => setNewIntegration({...newIntegration, apiKey: e.target.value})}
                    placeholder="Sua chave de API"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="integrationWebhook">Webhook URL</Label>
                  <Input
                    id="integrationWebhook"
                    value={newIntegration.webhook}
                    onChange={(e) => setNewIntegration({...newIntegration, webhook: e.target.value})}
                    placeholder="https://sua-api.com/webhook"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleAddIntegration} className="flex-1">Adicionar</Button>
                  <Button variant="outline" onClick={() => setIsAddIntegrationOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Total de Integrações</p>
                  <p className="text-2xl font-bold">{integrations.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Disponíveis</p>
                </div>
                <Plug className="w-8 h-8 text-[var(--caja-yellow)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Conectadas</p>
                  <p className="text-2xl font-bold">{connectedCount}</p>
                  <p className="text-xs text-[var(--caja-green)] mt-1">Funcionando</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[var(--caja-green)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Ativas</p>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-xs text-[var(--caja-green)] mt-1">Em uso</p>
                </div>
                <Settings className="w-8 h-8 text-[var(--caja-brown)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Com Problemas</p>
                  <p className="text-2xl font-bold">{errorCount}</p>
                  <p className="text-xs text-red-500 mt-1">Precisam atenção</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {integrationCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList>
              <TabsTrigger value="grid">Visualização em Grade</TabsTrigger>
              <TabsTrigger value="list">Visualização em Lista</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map(integration => (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[var(--muted)] rounded-lg flex items-center justify-center text-2xl">
                            {integration.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              {getStatusIcon(integration.status)}
                              <Badge className={`${getStatusColor(integration.status)} text-white`}>
                                {getStatusLabel(integration.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {integration.status === 'connected' && (
                          <Switch
                            checked={integration.isActive}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[var(--muted-foreground)] text-sm mb-4">
                        {integration.description}
                      </p>

                      {integration.status === 'connected' && integration.metrics && (
                        <div className="space-y-2 mb-4">
                          {Object.entries(integration.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-[var(--muted-foreground)] capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {integration.status === 'connected' ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="w-4 h-4 mr-2" />
                              Configurar
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button className="flex-1" size="sm">
                            <Plug className="w-4 h-4 mr-2" />
                            Conectar
                          </Button>
                        )}
                      </div>

                      {integration.connectedAt && (
                        <p className="text-xs text-[var(--muted-foreground)] mt-3">
                          Conectado em {new Date(integration.connectedAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-[var(--border)]">
                        <tr>
                          <th className="text-left p-4">Integração</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Categoria</th>
                          <th className="text-left p-4">Conectado em</th>
                          <th className="text-left p-4">Ativo</th>
                          <th className="text-right p-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIntegrations.map(integration => (
                          <tr key={integration.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[var(--muted)] rounded-md flex items-center justify-center">
                                  {integration.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{integration.name}</p>
                                  <p className="text-sm text-[var(--muted-foreground)]">
                                    {integration.description.substring(0, 50)}...
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(integration.status)}
                                <Badge className={`${getStatusColor(integration.status)} text-white`}>
                                  {getStatusLabel(integration.status)}
                                </Badge>
                              </div>
                            </td>
                            <td className="p-4 text-[var(--muted-foreground)] capitalize">
                              {integration.category}
                            </td>
                            <td className="p-4 text-[var(--muted-foreground)]">
                              {integration.connectedAt 
                                ? new Date(integration.connectedAt).toLocaleDateString('pt-BR')
                                : '-'
                              }
                            </td>
                            <td className="p-4">
                              {integration.status === 'connected' ? (
                                <Switch
                                  checked={integration.isActive}
                                  onCheckedChange={() => toggleIntegration(integration.id)}
                                />
                              ) : (
                                <span className="text-[var(--muted-foreground)]">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                {integration.status === 'connected' ? (
                                  <>
                                    <Button variant="ghost" size="sm">
                                      <Settings className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <Button size="sm">
                                    Conectar
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}