import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Lock, Bell, Globe, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export function Profile() {
  const [userData, setUserData] = useState({
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, SP',
    role: 'Gerente de Atendimento',
    department: 'Customer Success',
    joinDate: '2023-01-15',
    avatar: null
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'light'
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    lastLogin: '2024-01-15 14:30',
    activeSessions: 3
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data...');
  };

  const stats = [
    { label: 'Conversas Atendidas', value: '1,247', change: '+12%' },
    { label: 'Tickets Resolvidos', value: '892', change: '+8%' },
    { label: 'Satisfação Média', value: '4.8/5', change: '+0.2' },
    { label: 'Tempo Resposta', value: '2.3min', change: '-15%' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Meu Perfil</h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.avatar || undefined} />
                    <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-[var(--caja-yellow)] rounded-full hover:bg-[var(--caja-yellow)]/80 transition-colors">
                    <Camera className="w-4 h-4 text-[var(--caja-black)]" />
                  </button>
                </div>
                <h3 className="font-semibold">{userData.name}</h3>
                <p className="text-[var(--muted-foreground)] text-sm">{userData.role}</p>
                <Badge variant="secondary" className="mt-2">{userData.department}</Badge>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <span className="truncate">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <span>Desde {new Date(userData.joinDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                      <Badge 
                        variant={stat.change.startsWith('+') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="preferences">Preferências</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="activity">Atividade</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Atualize suas informações de contato e detalhes profissionais
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={userData.location}
                          onChange={(e) => setUserData({...userData, location: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Input
                          id="role"
                          value={userData.role}
                          onChange={(e) => setUserData({...userData, role: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input
                          id="department"
                          value={userData.department}
                          onChange={(e) => setUserData({...userData, department: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Configure suas preferências de notificação e interface
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por Email</Label>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Receba notificações importantes por email
                          </p>
                        </div>
                        <Switch
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, emailNotifications: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações Push</Label>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Receba notificações em tempo real no navegador
                          </p>
                        </div>
                        <Switch
                          checked={preferences.pushNotifications}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, pushNotifications: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por SMS</Label>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Receba alertas críticos por mensagem de texto
                          </p>
                        </div>
                        <Switch
                          checked={preferences.smsNotifications}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, smsNotifications: checked})
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <select 
                          id="language"
                          className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--input-background)]"
                          value={preferences.language}
                          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso Horário</Label>
                        <select 
                          id="timezone"
                          className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--input-background)]"
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                        >
                          <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                          <option value="America/New_York">New York (GMT-5)</option>
                          <option value="Europe/London">London (GMT+0)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Gerencie suas configurações de segurança e acesso
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Autenticação de Dois Fatores</Label>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <Switch
                          checked={security.twoFactorEnabled}
                          onCheckedChange={(checked) => 
                            setSecurity({...security, twoFactorEnabled: checked})
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <Label>Último Login</Label>
                        <p className="text-sm text-[var(--muted-foreground)] mt-1">
                          {security.lastLogin}
                        </p>
                      </div>
                      <div>
                        <Label>Sessões Ativas</Label>
                        <p className="text-sm text-[var(--muted-foreground)] mt-1">
                          {security.activeSessions} dispositivos conectados
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <Lock className="w-4 h-4 mr-2" />
                        Alterar Senha
                      </Button>
                      <Button variant="outline" className="w-full">
                        Gerenciar Sessões Ativas
                      </Button>
                      <Button variant="outline" className="w-full">
                        Baixar Dados da Conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividade Recente</CardTitle>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Visualize suas atividades recentes no sistema
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Login realizado', time: 'Há 2 horas', details: 'Chrome - São Paulo, SP' },
                        { action: 'Ticket #1234 atualizado', time: 'Há 3 horas', details: 'Status alterado para Resolvido' },
                        { action: 'Conversa com cliente finalizada', time: 'Há 5 horas', details: 'Tempo: 15 minutos' },
                        { action: 'Perfil atualizado', time: 'Ontem', details: 'Telefone alterado' },
                        { action: 'Nova integração configurada', time: 'Há 2 dias', details: 'WhatsApp Business conectado' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-[var(--muted)]/50">
                          <div className="w-2 h-2 bg-[var(--caja-yellow)] rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-[var(--muted-foreground)]">{activity.details}</p>
                            <p className="text-xs text-[var(--muted-foreground)] mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}