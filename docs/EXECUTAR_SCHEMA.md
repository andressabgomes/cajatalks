# Executar Schema SQL no Supabase

## 🚀 Instruções para Executar o Schema

### 1. Acesse o Painel do Supabase
- Vá para: https://supabase.com/dashboard/project/wsphcdeljnboalxsvuun
- Faça login na sua conta

### 2. Execute o Schema SQL
1. **No painel do Supabase**, clique em **"SQL Editor"** no menu lateral
2. **Clique em "New Query"**
3. **Copie todo o conteúdo** do arquivo `supabase/schema.sql`
4. **Cole no editor SQL**
5. **Clique em "Run"** (botão azul)
6. **Aguarde a execução** completar (pode levar alguns segundos)

### 3. Verificar se foi executado corretamente
Após a execução, você deve ver:
- ✅ **5 tabelas criadas**: users, clients, tickets, conversations, notifications
- ✅ **Políticas RLS ativadas**
- ✅ **Triggers configurados**
- ✅ **Índices criados**

### 4. Configurar Autenticação
1. **Vá em "Authentication > Settings"**
2. **Configure Site URL**: `http://localhost:3000`
3. **Configure Redirect URLs**: `http://localhost:3000/**`
4. **Salve as configurações**

### 5. Criar Usuário Admin
1. **Vá em "Authentication > Users"**
2. **Clique em "Add user"**
3. **Preencha**:
   - **Email**: `admin@cajatalks.com`
   - **Password**: Crie uma senha forte
4. **Após criar**, vá em **"SQL Editor"** e execute:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@cajatalks.com';
```

### 6. Testar a Aplicação
1. **Acesse**: http://localhost:3000
2. **Faça login** com o usuário admin criado
3. **Teste a criação de tickets**

## 🔧 Troubleshooting

### Erro: "relation does not exist"
- **Solução**: Execute o schema SQL novamente

### Erro: "permission denied"
- **Solução**: Verifique se o RLS está configurado corretamente

### Erro: "invalid API key"
- **Solução**: Verifique se as variáveis de ambiente estão corretas

## ✅ Checklist de Verificação

- [ ] Schema SQL executado com sucesso
- [ ] 5 tabelas criadas no banco
- [ ] RLS ativado em todas as tabelas
- [ ] Autenticação configurada
- [ ] Usuário admin criado
- [ ] Aplicação funcionando localmente
- [ ] Login funcionando
- [ ] Criação de tickets funcionando

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no painel do Supabase
2. Confirme se todas as variáveis de ambiente estão corretas
3. Teste a conexão com o banco de dados
