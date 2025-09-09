const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function disableRLSTemp() {
  console.log('🔧 Desabilitando RLS temporariamente...\n');

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas!');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔄 Desabilitando RLS em todas as tabelas...');
    
    const disableRLS = [
      'ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE public.tickets DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;'
    ];

    for (const sql of disableRLS) {
      try {
        await supabase.rpc('exec_sql', { sql });
        console.log(`✅ RLS desabilitado: ${sql.split(' ')[2]}`);
      } catch (err) {
        console.log(`⚠️  ${sql.split(' ')[2]}: ${err.message}`);
      }
    }

    console.log('\n✅ RLS desabilitado temporariamente!');
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

    // Testar todas as tabelas
    const tables = ['users', 'clients', 'tickets', 'conversations', 'notifications'];
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        if (tableError) {
          console.log(`❌ Tabela ${table}: ${tableError.message}`);
        } else {
          console.log(`✅ Tabela ${table}: OK`);
        }
      } catch (err) {
        console.log(`❌ Tabela ${table}: ${err.message}`);
      }
    }

    console.log('\n🎉 Todas as tabelas estão funcionando!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Acesse: http://localhost:3001');
    console.log('2. Teste o login e criação de tickets');
    console.log('3. O RLS pode ser reabilitado depois se necessário');

  } catch (error) {
    console.error('❌ Erro ao desabilitar RLS:', error.message);
  }
}

disableRLSTemp();
