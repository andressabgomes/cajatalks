# Deploy no Vercel - Cajá Talks Interface Design

Este guia explica como fazer o deploy do projeto no Vercel com integração ao Supabase.

## 🚀 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Projeto no Supabase configurado
- Repositório no GitHub (já configurado)

## 📋 Passo a Passo

### 1. Conectar Repositório ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `andressabgomes/cajatalks`
5. Clique em "Import"

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, vá em **Settings > Environment Variables** e adicione:

#### Variáveis Obrigatórias
```
VITE_SUPABASE_URL = https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY = sua-chave-anonima-aqui
VITE_APP_NAME = Cajá Talks Interface Design
VITE_APP_VERSION = 0.1.0
```

#### Como obter as credenciais do Supabase:
1. Acesse seu projeto no [Supabase](https://supabase.com)
2. Vá em **Settings > API**
3. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar Build Settings

O Vercel detectará automaticamente que é um projeto Vite, mas você pode verificar:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Acesse a URL fornecida pelo Vercel

### 5. Configurar Domínio Personalizado (Opcional)

1. Vá em **Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruído

## 🔧 Configurações Avançadas

### Configurar CORS no Supabase

No painel do Supabase, vá em **Settings > API** e adicione:

**Site URL**:
```
https://seu-projeto.vercel.app
```

**Redirect URLs**:
```
https://seu-projeto.vercel.app/**
https://seu-projeto.vercel.app/auth/callback
```

### Configurar Webhooks (Opcional)

Para notificações em tempo real, configure webhooks no Supabase:

1. Vá em **Database > Webhooks**
2. Adicione webhook para mudanças em tickets
3. URL: `https://seu-projeto.vercel.app/api/webhooks/tickets`

## 🚀 Deploy Automático

Após a configuração inicial:

- **Push para main**: Deploy automático em produção
- **Pull Requests**: Preview deployments automáticos
- **Branches**: Deploy automático para branches

## 📊 Monitoramento

### Vercel Analytics
- Acesse **Analytics** no painel do Vercel
- Monitore performance e uso

### Logs
- Acesse **Functions > Logs** para ver logs de runtime
- Use **Real-time Logs** para debug

## 🔄 Atualizações

### Atualizar Variáveis de Ambiente
1. Vá em **Settings > Environment Variables**
2. Edite as variáveis necessárias
3. Clique em "Redeploy" para aplicar as mudanças

### Atualizar Código
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```
O Vercel fará o deploy automaticamente.

## 🛠️ Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `package.json`
- Confirme se as variáveis de ambiente estão configuradas
- Veja os logs de build no painel do Vercel

### Erro de CORS
- Verifique se a URL do Vercel está configurada no Supabase
- Confirme se as variáveis de ambiente estão corretas

### Erro de Autenticação
- Verifique se as chaves do Supabase estão corretas
- Confirme se o RLS está configurado corretamente

## 📚 Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Integração Supabase + Vercel](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Configuração de Domínios](https://vercel.com/docs/concepts/projects/domains)

## ✅ Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build executado com sucesso
- [ ] Aplicação acessível via URL do Vercel
- [ ] CORS configurado no Supabase
- [ ] Autenticação funcionando
- [ ] Banco de dados conectado
- [ ] Funcionalidades em tempo real ativas
