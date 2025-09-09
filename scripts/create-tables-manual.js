#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function createTables() {
  console.log('🚀 Criando tabelas via Supabase API...\n');

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas!');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔄 Testando conexão...');
    
    // Testar conexão básica
    const { data: testData, error: testError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(1);

    if (testError) {
      console.error('❌ Erro na conexão:', testError.message);
      process.exit(1);
    }

    console.log('✅ Conexão estabelecida!');

    // Verificar tabelas existentes
    console.log('\n🔄 Verificando tabelas existentes...');
    
    const { data: existingTables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['users', 'clients', 'tickets', 'conversations', 'notifications']);

    if (tablesError) {
      console.error('❌ Erro ao verificar tabelas:', tablesError.message);
    } else {
      const tableNames = existingTables.map(t => t.table_name);
      console.log('📋 Tabelas existentes:', tableNames);
      
      if (tableNames.length === 5) {
        console.log('✅ Todas as tabelas já existem!');
        console.log('\n🎉 Schema já está configurado!');
        console.log('\n📝 Próximos passos:');
        console.log('1. Execute: npm run dev');
        console.log('2. Acesse: http://localhost:3000');
        console.log('3. Crie um usuário admin no painel do Supabase');
        console.log('4. Faça login na aplicação');
        return;
      }
    }

    console.log('\n⚠️  As tabelas não foram criadas via API.');
    console.log('📋 Execute o schema SQL manualmente no painel do Supabase:');
    console.log('1. Acesse: https://supabase.com/dashboard/project/wsphcdeljnboalxsvuun');
    console.log('2. Vá em "SQL Editor"');
    console.log('3. Execute o arquivo supabase/schema.sql');
    console.log('4. Aguarde a execução completar');
    console.log('5. Execute: node scripts/test-connection.js');

  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
  }
}

createTables();
