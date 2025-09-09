
# Cajá Talks Interface Design

Este é um sistema completo de interface para gerenciamento de tickets e suporte ao cliente, baseado no design original disponível em https://www.figma.com/design/i9AMDzjoN8zMuYp3yNR50U/Caj%C3%A1-Talks-Interface-Design.

## 🚀 Funcionalidades

- **Sistema de Autenticação** completo com Supabase Auth
- **Gerenciamento de Tickets** com status, prioridades e atribuição
- **Gestão de Clientes** com histórico e estatísticas
- **Sistema de Conversas** em tempo real
- **Notificações** push e em tempo real
- **Interface Responsiva** com design moderno
- **Temas** claro e escuro
- **Componentes Reutilizáveis** baseados em Radix UI

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **UI**: Radix UI + Tailwind CSS
- **Estado**: React Context + Hooks
- **Formulários**: React Hook Form
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- npm ou yarn instalado

## ⚡ Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Backend

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie `.env.example` para `.env` e configure suas credenciais
3. Execute o schema SQL em `supabase/schema.sql` no painel do Supabase
4. Siga o guia completo em [docs/BACKEND_SETUP.md](docs/BACKEND_SETUP.md)

### 3. Deploy no Vercel (Recomendado)

1. Conecte o Supabase ao Vercel (integração automática)
2. Importe o repositório no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Siga o guia em [docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md)

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

### 5. Build para Produção

```bash
npm run build
```

### 6. Deploy no Vercel

```bash
# Push para o GitHub (deploy automático)
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

## 📚 Documentação

- **[Configuração do Backend](docs/BACKEND_SETUP.md)** - Guia completo para configurar o Supabase
- **[Deploy no Vercel](docs/VERCEL_DEPLOYMENT.md)** - Deploy e configuração no Vercel
- **[Integração Supabase + Vercel](docs/SUPABASE_VERCEL_INTEGRATION.md)** - Integração automática
- **[Exemplo de Uso](src/examples/BackendUsage.tsx)** - Demonstração das funcionalidades do backend

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── contexts/           # Contextos da aplicação
├── hooks/              # Hooks customizados
├── lib/                # Configurações e utilitários
├── services/           # Serviços do backend
├── examples/           # Exemplos de uso
└── styles/             # Estilos globais

supabase/
└── schema.sql          # Schema do banco de dados

docs/
└── BACKEND_SETUP.md    # Documentação do backend
```

## 🔐 Sistema de Autenticação

O sistema implementa três tipos de usuários:

- **Admin**: Acesso total ao sistema
- **Agente**: Pode gerenciar tickets e clientes
- **Cliente**: Pode criar tickets e ver suas conversas

## 📊 Funcionalidades do Backend

### Tickets
- Criação, edição e exclusão
- Sistema de status (aberto, em andamento, resolvido, fechado)
- Prioridades (baixa, média, alta, urgente)
- Atribuição a agentes
- Histórico completo

### Clientes
- Cadastro e gestão
- Histórico de tickets
- Estatísticas de uso
- Status (ativo, inativo, suspenso)

### Conversas
- Mensagens em tempo real
- Histórico completo
- Tipos de remetente (usuário/cliente)
- Notificações automáticas

### Notificações
- Sistema de notificações push
- Diferentes tipos (info, warning, error, success)
- Marcação de lida/não lida
- Tempo real

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Radix UI** para componentes acessíveis
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **Temas** claro e escuro
- **Componentes** totalmente customizáveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Design original: [Figma - Cajá Talks Interface Design](https://www.figma.com/design/i9AMDzjoN8zMuYp3yNR50U/Caj%C3%A1-Talks-Interface-Design)
- Componentes: [Radix UI](https://www.radix-ui.com/)
- Backend: [Supabase](https://supabase.com/)
  