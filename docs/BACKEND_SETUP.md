# Configuração do Backend - Cajá Talks Interface Design

Este documento explica como configurar e usar o backend implementado com Supabase.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js 18+ instalado
- npm ou yarn instalado

## 🚀 Configuração Inicial

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Preencha os dados do projeto:
   - **Name**: Cajá Talks Interface Design
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima
4. Aguarde a criação do projeto (pode levar alguns minutos)

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. No painel do Supabase, vá em **Settings > API**
3. Copie as seguintes informações:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

4. Edite o arquivo `.env` com suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima
   VITE_APP_NAME=Cajá Talks Interface Design
   VITE_APP_VERSION=0.1.0
   ```

### 3. Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Copie todo o conteúdo do arquivo `supabase/schema.sql`
3. Cole no editor SQL e execute (botão "Run")
4. Aguarde a execução completar

### 4. Instalar Dependências

```bash
npm install
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `users`
- Armazena informações dos usuários do sistema
- Estende a tabela `auth.users` do Supabase
- Campos: id, email, full_name, avatar_url, role, created_at, updated_at

#### `clients`
- Armazena informações dos clientes
- Campos: id, name, email, phone, company, status, created_at, updated_at

#### `tickets`
- Armazena os tickets de suporte
- Campos: id, title, description, status, priority, client_id, assigned_to, created_by, created_at, updated_at, resolved_at

#### `conversations`
- Armazena as mensagens das conversas
- Campos: id, ticket_id, message, sender_id, sender_type, created_at

#### `notifications`
- Armazena notificações do sistema
- Campos: id, user_id, title, message, type, read, created_at

### Políticas de Segurança (RLS)

O sistema implementa Row Level Security (RLS) com as seguintes políticas:

- **Usuários**: Podem ler/editar apenas seu próprio perfil
- **Clientes**: Apenas admins e agentes podem gerenciar
- **Tickets**: Usuários podem ver tickets que criaram ou foram atribuídos
- **Conversas**: Usuários podem ver conversas de tickets que têm acesso
- **Notificações**: Usuários podem ver apenas suas próprias notificações

## 🔧 Serviços Disponíveis

### AuthService
```typescript
import { AuthService } from '@/services/auth'

// Fazer login
await AuthService.signIn('email@exemplo.com', 'senha123')

// Criar conta
await AuthService.signUp('email@exemplo.com', 'senha123', 'Nome Completo')

// Fazer logout
await AuthService.signOut()

// Obter usuário atual
const user = await AuthService.getCurrentUser()
```

### TicketService
```typescript
import { TicketService } from '@/services/tickets'

// Listar tickets
const { data, total } = await TicketService.getTickets(1, 10, {
  status: 'open',
  priority: 'high'
})

// Criar ticket
const ticket = await TicketService.createTicket({
  title: 'Problema no sistema',
  description: 'Descrição detalhada',
  client_id: 'uuid-do-cliente',
  created_by: 'uuid-do-usuario'
})

// Atribuir ticket
await TicketService.assignTicket('ticket-id', 'user-id')
```

### ClientService
```typescript
import { ClientService } from '@/services/clients'

// Listar clientes
const { data } = await ClientService.getClients(1, 10, {
  status: 'active',
  search: 'empresa'
})

// Criar cliente
const client = await ClientService.createClient({
  name: 'João Silva',
  email: 'joao@empresa.com',
  company: 'Empresa ABC'
})
```

### ConversationService
```typescript
import { ConversationService } from '@/services/conversations'

// Enviar mensagem
await ConversationService.sendMessage({
  ticket_id: 'ticket-id',
  message: 'Olá, como posso ajudar?',
  sender_id: 'user-id',
  sender_type: 'user'
})

// Obter conversas de um ticket
const { data } = await ConversationService.getConversationsByTicketId('ticket-id')
```

### NotificationService
```typescript
import { NotificationService } from '@/services/notifications'

// Obter notificações
const { data } = await NotificationService.getUserNotifications('user-id')

// Marcar como lida
await NotificationService.markAsRead('notification-id')
```

## 🎣 Hooks Disponíveis

### useAuth
```typescript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const {
    user,
    loading,
    error,
    signIn,
    signOut,
    isAuthenticated,
    isAdmin,
    isAgent
  } = useAuth()

  if (loading) return <div>Carregando...</div>
  if (!isAuthenticated) return <LoginForm />

  return <div>Olá, {user?.full_name}!</div>
}
```

## 🔄 Funcionalidades em Tempo Real

O sistema suporta atualizações em tempo real usando Supabase Realtime:

```typescript
// Escutar mudanças em tickets
const subscription = TicketService.subscribeToTickets((ticket) => {
  console.log('Ticket atualizado:', ticket)
})

// Escutar novas mensagens
const subscription = ConversationService.subscribeToTicketMessages(
  'ticket-id',
  (message) => {
    console.log('Nova mensagem:', message)
  }
)

// Escutar notificações
const subscription = NotificationService.subscribeToNotifications(
  'user-id',
  (notification) => {
    console.log('Nova notificação:', notification)
  }
)

// Cancelar subscrição
subscription.unsubscribe()
```

## 🚀 Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔐 Configuração de Autenticação

### Criar Primeiro Usuário Admin

1. No painel do Supabase, vá em **Authentication > Users**
2. Clique em "Add user"
3. Preencha email e senha
4. Após criar, vá em **SQL Editor** e execute:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'seu-email@admin.com';
```

### Configurar Políticas de Autenticação

No painel do Supabase, vá em **Authentication > Settings** e configure:

- **Site URL**: `http://localhost:3000` (desenvolvimento)
- **Redirect URLs**: Adicione URLs de redirecionamento necessárias
- **Email Templates**: Personalize os templates de email

## 📊 Monitoramento

### Logs
- Acesse **Logs** no painel do Supabase para ver logs de API e autenticação

### Métricas
- Acesse **Reports** para ver métricas de uso do banco de dados

### Performance
- Use **Database > Performance** para monitorar queries lentas

## 🛠️ Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, verifique se as URLs estão configuradas corretamente no Supabase.

### Erro de RLS
Se receber erros de "permission denied", verifique se as políticas RLS estão configuradas corretamente.

### Erro de Conexão
Verifique se as variáveis de ambiente estão configuradas corretamente.

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
