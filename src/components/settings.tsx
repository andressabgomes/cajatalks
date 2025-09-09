import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Webhook,
  Key,
  Globe,
  Users,
  CreditCard,
  Download,
  Upload,
  Save,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    tickets: true,
    mentions: true,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    position: 'Gerente de Suporte',
    company: 'Empresa Exemplo Ltda',
    location: 'São Paulo, SP',
    bio: 'Especialista em atendimento ao cliente com foco em satisfação e eficiência.',
    avatar: '👨‍💼'
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: '30',
    loginNotifications: true,
    deviceManagement: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    autoSave: true,
    soundNotifications: true
  });

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl">Configurações</h1>
        <p className="text-[var(--muted-foreground)]">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Preferências</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Webhook className="h-4 w-4" />
            <span className="hidden sm:inline">Integrações</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Faturamento</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="text-6xl">{profile.avatar}</div>
                <div className="space-y-2">
                  <Button variant="outline">Alterar Avatar</Button>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    JPG, GIF ou PNG. Máximo 1MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile({...profile, position: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Receba notificações por email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, email: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Receba notificações push no navegador
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, push: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Receba notificações por SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, sms: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos Tickets</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Notificar sobre novos tickets
                    </p>
                  </div>
                  <Switch
                    checked={notifications.tickets}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, tickets: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Menções</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Notificar quando você for mencionado
                    </p>
                  </div>
                  <Switch
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, mentions: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Receber emails promocionais e novidades
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, marketing: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Mantenha sua conta segura com estas configurações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => 
                      setSecurity({...security, twoFactor: checked})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Select value={security.sessionTimeout} onValueChange={(value) => 
                    setSecurity({...security, sessionTimeout: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="0">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Login</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Notificar sobre novos logins na conta
                    </p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => 
                      setSecurity({...security, loginNotifications: checked})
                    }
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Alterar Senha</Label>
                    <Button variant="outline">Alterar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Gerenciar Dispositivos</Label>
                    <Button variant="outline">Gerenciar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
              <CardDescription>
                Personalize sua experiência no Cajá Talks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={preferences.theme} onValueChange={(value) => 
                    setPreferences({...preferences, theme: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences({...preferences, language: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences({...preferences, timezone: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => 
                    setPreferences({...preferences, dateFormat: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Salvamento Automático</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Salvar automaticamente alterações
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, autoSave: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sons de Notificação</Label>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Reproduzir sons para notificações
                    </p>
                  </div>
                  <Switch
                    checked={preferences.soundNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, soundNotifications: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>
                Conecte o Cajá Talks com outras ferramentas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { name: 'WhatsApp Business', icon: '📱', connected: true, description: 'Integração com WhatsApp para atendimento' },
                  { name: 'Slack', icon: '💬', connected: false, description: 'Notificações no Slack' },
                  { name: 'Zapier', icon: '⚡', connected: true, description: 'Automações com Zapier' },
                  { name: 'Webhook', icon: '🔗', connected: false, description: 'Eventos personalizados via webhook' },
                  { name: 'Email Marketing', icon: '📧', connected: false, description: 'Sincronização com ferramentas de email' }
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-[var(--muted-foreground)]">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {integration.connected && (
                        <span className="text-sm text-[var(--caja-green)]">Conectado</span>
                      )}
                      <Button variant={integration.connected ? "outline" : "default"} size="sm">
                        {integration.connected ? 'Configurar' : 'Conectar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plano e Faturamento</CardTitle>
              <CardDescription>
                Gerencie seu plano e informações de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-[var(--caja-yellow-light)] rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Plano Pro</h3>
                    <p className="text-[var(--muted-foreground)]">R$ 99/mês • Próxima cobrança: 15/02/2024</p>
                  </div>
                  <Button variant="outline">Alterar Plano</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Método de Pagamento</h4>
                <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4532</p>
                      <p className="text-sm text-[var(--muted-foreground)]">Expira em 12/26</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Histórico de Faturas</h4>
                <div className="space-y-2">
                  {[
                    { date: '15/01/2024', amount: 'R$ 99,00', status: 'Pago' },
                    { date: '15/12/2023', amount: 'R$ 99,00', status: 'Pago' },
                    { date: '15/11/2023', amount: 'R$ 99,00', status: 'Pago' }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-[var(--border)] rounded">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">{invoice.date}</span>
                        <span className="font-medium">{invoice.amount}</span>
                        <span className="text-sm text-[var(--caja-green)]">{invoice.status}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-[var(--border)]">
        <Button 
          onClick={handleSave}
          className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)]"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}