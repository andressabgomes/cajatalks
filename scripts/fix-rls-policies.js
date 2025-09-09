const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function fixRLSPolicies() {
  console.log('🔧 Corrigindo políticas RLS...\n');

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas!');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔄 Removendo políticas problemáticas...');
    
    // Remover políticas existentes que podem estar causando recursão
    const policiesToRemove = [
      'DROP POLICY IF EXISTS "Users can read own profile" ON public.users;',
      'DROP POLICY IF EXISTS "Users can update own profile" ON public.users;',
      'DROP POLICY IF EXISTS "Admins and agents can read clients" ON public.clients;',
      'DROP POLICY IF EXISTS "Admins and agents can manage clients" ON public.clients;',
      'DROP POLICY IF EXISTS "Users can read relevant tickets" ON public.tickets;',
      'DROP POLICY IF EXISTS "Admins and agents can manage tickets" ON public.tickets;',
      'DROP POLICY IF EXISTS "Users can read relevant conversations" ON public.conversations;',
      'DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;',
      'DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;',
      'DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;',
      'DROP POLICY IF EXISTS "Admins and agents can create notifications" ON public.notifications;'
    ];

    for (const policy of policiesToRemove) {
      try {
        await supabase.rpc('exec_sql', { sql: policy });
        console.log(`✅ Removida: ${policy.split(' ')[5]}`);
      } catch (err) {
        console.log(`⚠️  ${policy.split(' ')[5]}: ${err.message}`);
      }
    }

    console.log('\n🔄 Criando políticas simplificadas...');
    
    // Criar políticas simplificadas sem recursão
    const newPolicies = [
      // Políticas para users
      `CREATE POLICY "users_select_policy" ON public.users FOR SELECT USING (true);`,
      `CREATE POLICY "users_update_policy" ON public.users FOR UPDATE USING (auth.uid() = id);`,
      
      // Políticas para clients
      `CREATE POLICY "clients_select_policy" ON public.clients FOR SELECT USING (true);`,
      `CREATE POLICY "clients_insert_policy" ON public.clients FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY "clients_update_policy" ON public.clients FOR UPDATE USING (true);`,
      `CREATE POLICY "clients_delete_policy" ON public.clients FOR DELETE USING (true);`,
      
      // Políticas para tickets
      `CREATE POLICY "tickets_select_policy" ON public.tickets FOR SELECT USING (true);`,
      `CREATE POLICY "tickets_insert_policy" ON public.tickets FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY "tickets_update_policy" ON public.tickets FOR UPDATE USING (true);`,
      `CREATE POLICY "tickets_delete_policy" ON public.tickets FOR DELETE USING (true);`,
      
      // Políticas para conversations
      `CREATE POLICY "conversations_select_policy" ON public.conversations FOR SELECT USING (true);`,
      `CREATE POLICY "conversations_insert_policy" ON public.conversations FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY "conversations_update_policy" ON public.conversations FOR UPDATE USING (true);`,
      `CREATE POLICY "conversations_delete_policy" ON public.conversations FOR DELETE USING (true);`,
      
      // Políticas para notifications
      `CREATE POLICY "notifications_select_policy" ON public.notifications FOR SELECT USING (true);`,
      `CREATE POLICY "notifications_insert_policy" ON public.notifications FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY "notifications_update_policy" ON public.notifications FOR UPDATE USING (true);`,
      `CREATE POLICY "notifications_delete_policy" ON public.notifications FOR DELETE USING (true);`
    ];

    for (const policy of newPolicies) {
      try {
        await supabase.rpc('exec_sql', { sql: policy });
        console.log(`✅ Criada: ${policy.split(' ')[2]}`);
      } catch (err) {
        console.log(`⚠️  ${policy.split(' ')[2]}: ${err.message}`);
      }
    }

    console.log('\n✅ Políticas RLS corrigidas!');
    console.log('\n📝 Testando conexão...');
    
    // Testar conexão
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Erro na conexão:', error.message);
    } else {
      console.log('✅ Conexão funcionando!');
    }

  } catch (error) {
    console.error('❌ Erro ao corrigir políticas:', error.message);
  }
}

fixRLSPolicies();
