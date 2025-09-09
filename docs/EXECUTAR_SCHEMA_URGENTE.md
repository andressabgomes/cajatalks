# 🚨 EXECUTAR SCHEMA SQL URGENTE

## ✅ Status Atual
- ✅ **Conexão com Supabase**: FUNCIONANDO
- ✅ **Variáveis de ambiente**: CONFIGURADAS
- ❌ **Tabelas do banco**: NÃO CRIADAS

## 🚀 AÇÃO NECESSÁRIA

### 1. Acesse o Painel do Supabase
**URL**: https://supabase.com/dashboard/project/wsphcdeljnboalxsvuun

### 2. Execute o Schema SQL
1. **Clique em "SQL Editor"** no menu lateral
2. **Clique em "New Query"**
3. **Copie TODO o conteúdo** do arquivo `supabase/schema.sql`
4. **Cole no editor SQL**
5. **Clique em "Run"** (botão azul)
6. **AGUARDE** a execução completar

### 3. Verificar Execução
Após executar, você deve ver:
- ✅ **5 tabelas criadas**: users, clients, tickets, conversations, notifications
- ✅ **Políticas RLS ativadas**
- ✅ **Triggers configurados**

### 4. Testar Novamente
Após executar o schema, execute:
```bash
node scripts/test-connection.js
```

## 📋 Schema SQL Completo

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('admin', 'agent', 'client')) DEFAULT 'client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    status TEXT CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
    assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sender_type TEXT CHECK (sender_type IN ('user', 'client')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('info', 'warning', 'error', 'success')) DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON public.tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON public.tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON public.tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_ticket_id ON public.conversations(ticket_id);
CREATE INDEX IF NOT EXISTS idx_conversations_sender_id ON public.conversations(sender_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON public.conversations(created_at);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'role', 'client')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users can read their own profile and admins can read all
CREATE POLICY "Users can read own profile" ON public.users
    FOR SELECT USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
    ));

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Admins and agents can read all clients
CREATE POLICY "Admins and agents can read clients" ON public.clients
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
    ));

-- Admins and agents can manage clients
CREATE POLICY "Admins and agents can manage clients" ON public.clients
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
    ));

-- Users can read tickets they created or are assigned to
CREATE POLICY "Users can read relevant tickets" ON public.tickets
    FOR SELECT USING (
        created_by = auth.uid() OR 
        assigned_to = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
        )
    );

-- Admins and agents can manage tickets
CREATE POLICY "Admins and agents can manage tickets" ON public.tickets
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
    ));

-- Users can read conversations for tickets they have access to
CREATE POLICY "Users can read relevant conversations" ON public.conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tickets 
            WHERE id = ticket_id AND (
                created_by = auth.uid() OR 
                assigned_to = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
                )
            )
        )
    );

-- Users can create conversations for tickets they have access to
CREATE POLICY "Users can create conversations" ON public.conversations
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.tickets 
            WHERE id = ticket_id AND (
                created_by = auth.uid() OR 
                assigned_to = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
                )
            )
        )
    );

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Admins and agents can create notifications
CREATE POLICY "Admins and agents can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'agent')
    ));
```

## ⚡ EXECUTE AGORA!

1. **Copie o SQL acima**
2. **Cole no SQL Editor do Supabase**
3. **Clique em "Run"**
4. **Aguarde completar**
5. **Teste novamente**: `node scripts/test-connection.js`
