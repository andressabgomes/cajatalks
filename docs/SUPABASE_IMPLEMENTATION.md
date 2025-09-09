# Implementação Completa do Supabase - Cajá Talks

Este guia detalha como implementar completamente o Supabase no projeto Cajá Talks Interface Design.

## 🚀 Passo a Passo Completo

### 1. Criar Projeto no Supabase

1. **Acesse [supabase.com](https://supabase.com)**
2. **Faça login** ou crie uma conta
3. **Clique em "New Project"**
4. **Preencha os dados**:
   - **Name**: `Cajá Talks Interface Design`
   - **Database Password**: Crie uma senha forte (salve em local seguro)
   - **Region**: Escolha a região mais próxima (ex: South America - São Paulo)
5. **Aguarde a criação** (pode levar 2-3 minutos)

### 2. Configurar Variáveis de Ambiente

1. **No painel do Supabase**, vá em **Settings > API**
2. **Copie as credenciais**:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

3. **Crie o arquivo `.env`** na raiz do projeto:
```bash
# No terminal, na pasta do projeto
cp .env.example .env
```

4. **Edite o arquivo `.env`** com suas credenciais:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
VITE_APP_NAME=Cajá Talks Interface Design
VITE_APP_VERSION=0.1.0
```

### 3. Configurar Banco de Dados

1. **No painel do Supabase**, vá em **SQL Editor**
2. **Copie todo o conteúdo** do arquivo `supabase/schema.sql`
3. **Cole no editor SQL** e clique em **"Run"**
4. **Aguarde a execução** completar (pode levar alguns segundos)

### 4. Configurar Autenticação

1. **No painel do Supabase**, vá em **Authentication > Settings**
2. **Configure Site URL**:
   - **Desenvolvimento**: `http://localhost:3000`
   - **Produção**: `https://seu-projeto.vercel.app`

3. **Configure Redirect URLs**:
   - `http://localhost:3000/**`
   - `https://seu-projeto.vercel.app/**`

4. **Configure Email Templates** (opcional):
   - Personalize os templates de confirmação e reset de senha

### 5. Criar Primeiro Usuário Admin

1. **No painel do Supabase**, vá em **Authentication > Users**
2. **Clique em "Add user"**
3. **Preencha**:
   - **Email**: `admin@cajatalks.com`
   - **Password**: Crie uma senha forte
4. **Após criar**, vá em **SQL Editor** e execute:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@cajatalks.com';
```

### 6. Testar a Implementação

1. **Instale as dependências**:
```bash
npm install
```

2. **Execute o projeto**:
```bash
npm run dev
```

3. **Acesse** `http://localhost:3000`
4. **Teste o login** com o usuário admin criado
5. **Teste a criação de tickets**

## 🔧 Configurações Avançadas

### Row Level Security (RLS)

O schema já inclui RLS configurado. As políticas permitem:

- **Usuários**: Veem apenas seus próprios dados
- **Agentes**: Veem tickets atribuídos a eles
- **Admins**: Acesso total ao sistema

### Realtime

Para ativar funcionalidades em tempo real:

1. **No painel do Supabase**, vá em **Database > Replication**
2. **Ative as tabelas**:
   - `tickets`
   - `conversations`
   - `notifications`

### Storage (Opcional)

Para upload de arquivos:

1. **No painel do Supabase**, vá em **Storage**
2. **Crie um bucket** chamado `ticket-attachments`
3. **Configure as políticas** de acesso

## 📊 Monitoramento

### Logs
- **Acesse** **Logs** no painel do Supabase
- **Monitore** queries, autenticação e erros

### Métricas
- **Acesse** **Reports** para métricas de uso
- **Monitore** performance do banco

### Performance
- **Acesse** **Database > Performance**
- **Identifique** queries lentas

## 🚨 Troubleshooting

### Erro: "Missing Supabase environment variables"
- **Solução**: Verifique se o arquivo `.env` existe e tem as variáveis corretas

### Erro: "Invalid API key"
- **Solução**: Verifique se a chave anon está correta no `.env`

### Erro: "Permission denied"
- **Solução**: Verifique se o RLS está configurado e se o usuário tem permissão

### Erro: "Failed to fetch"
- **Solução**: Verifique se a URL do Supabase está correta

## 🔄 Deploy em Produção

### Vercel
1. **Configure as variáveis** no painel do Vercel
2. **Adicione**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_NAME`
   - `VITE_APP_VERSION`

### Outros Provedores
- Configure as mesmas variáveis de ambiente
- Certifique-se de que a URL de produção está no Supabase

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Guia de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Guia de Deploy](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## ✅ Checklist de Implementação

- [ ] Projeto criado no Supabase
- [ ] Variáveis de ambiente configuradas
- [ ] Schema SQL executado
- [ ] Autenticação configurada
- [ ] Usuário admin criado
- [ ] RLS ativado
- [ ] Realtime configurado (opcional)
- [ ] Testes realizados
- [ ] Deploy em produção (opcional)

## 🎯 Próximos Passos

1. **Execute o schema SQL**
2. **Configure as variáveis de ambiente**
3. **Teste a aplicação localmente**
4. **Crie usuários de teste**
5. **Configure o deploy em produção**
