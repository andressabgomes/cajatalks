# Integração Supabase + Vercel

Este guia específico explica como configurar a integração entre Supabase e Vercel para o projeto Cajá Talks.

## 🔗 Integração Automática

### 1. Conectar Supabase ao Vercel

1. **No painel do Vercel**:
   - Vá em **Settings > Integrations**
   - Procure por "Supabase"
   - Clique em "Add Integration"
   - Autorize a conexão

2. **No painel do Supabase**:
   - Vá em **Settings > Integrations**
   - Procure por "Vercel"
   - Clique em "Connect Vercel"
   - Selecione seu projeto

### 2. Configuração Automática de Variáveis

Após conectar as integrações, o Vercel automaticamente:

- ✅ Detecta as variáveis do Supabase
- ✅ Configura `VITE_SUPABASE_URL`
- ✅ Configura `VITE_SUPABASE_ANON_KEY`
- ✅ Sincroniza as configurações

## 🚀 Deploy com Integração

### 1. Deploy Inicial

```bash
# Fazer push das mudanças
git add .
git commit -m "feat: configuração para Vercel"
git push origin main
```

### 2. Configuração no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório `andressabgomes/cajatalks`
4. O Vercel detectará automaticamente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Variáveis de Ambiente

Com a integração ativa, as variáveis são configuradas automaticamente:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
VITE_APP_NAME=Cajá Talks Interface Design
VITE_APP_VERSION=0.1.0
```

## 🔧 Configurações Específicas

### CORS no Supabase

Configure no painel do Supabase:

**Settings > API > Site URL**:
```
https://seu-projeto.vercel.app
```

**Settings > API > Redirect URLs**:
```
https://seu-projeto.vercel.app/**
https://seu-projeto.vercel.app/auth/callback
```

### RLS (Row Level Security)

O schema SQL já está configurado com RLS. Certifique-se de que foi executado:

```sql
-- Execute o arquivo supabase/schema.sql no painel do Supabase
```

## 📊 Monitoramento

### Vercel Analytics
- Performance em tempo real
- Métricas de uso
- Erros e logs

### Supabase Dashboard
- Queries do banco de dados
- Autenticação
- Storage usage

## 🔄 Deploy Contínuo

### Branches
- `main` → Deploy em produção
- `develop` → Deploy de preview
- `feature/*` → Deploy de preview

### Webhooks
Configure webhooks no Supabase para notificações:

1. **Database > Webhooks**
2. **URL**: `https://seu-projeto.vercel.app/api/webhooks`
3. **Events**: Insert, Update, Delete

## 🛠️ Troubleshooting

### Erro de Build
```bash
# Verificar logs no Vercel
# Verificar se as dependências estão corretas
npm install
npm run build
```

### Erro de CORS
- Verificar se a URL do Vercel está no Supabase
- Verificar se as variáveis de ambiente estão corretas

### Erro de Autenticação
- Verificar se as chaves do Supabase estão corretas
- Verificar se o RLS está configurado

## 📈 Otimizações

### Performance
- **Edge Functions**: Para APIs serverless
- **CDN**: Distribuição global automática
- **Caching**: Configuração automática

### Segurança
- **HTTPS**: Automático no Vercel
- **Environment Variables**: Criptografadas
- **RLS**: Configurado no Supabase

## ✅ Checklist de Deploy

- [ ] Supabase conectado ao Vercel
- [ ] Variáveis de ambiente sincronizadas
- [ ] CORS configurado no Supabase
- [ ] Schema SQL executado
- [ ] Deploy inicial realizado
- [ ] Aplicação funcionando
- [ ] Autenticação testada
- [ ] Banco de dados conectado
- [ ] Funcionalidades em tempo real ativas

## 🎯 Próximos Passos

1. **Conectar as integrações** (Supabase ↔ Vercel)
2. **Fazer deploy inicial**
3. **Testar todas as funcionalidades**
4. **Configurar domínio personalizado** (opcional)
5. **Configurar monitoramento** (opcional)
