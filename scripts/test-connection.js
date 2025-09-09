#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com o Supabase...\n');

  // Verificar variáveis de ambiente
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas!');
    console.error('Certifique-se de que o arquivo .env existe e contém:');
    console.error('- VITE_SUPABASE_URL');
    console.error('- VITE_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  console.log('✅ Variáveis de ambiente encontradas');
  console.log(`📍 URL: ${supabaseUrl}`);
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...\n`);

  try {
    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Testar conexão básica
    console.log('🔄 Testando conexão básica...');
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Erro na conexão:', error.message);
      
      if (error.message.includes('relation "users" does not exist')) {
        console.log('\n💡 Solução: Execute o schema SQL no painel do Supabase');
        console.log('1. Acesse: https://supabase.com/dashboard/project/wsphcdeljnboalxsvuun');
        console.log('2. Vá em "SQL Editor"');
        console.log('3. Execute o arquivo supabase/schema.sql');
      }
      
      process.exit(1);
    }

    console.log('✅ Conexão com Supabase estabelecida!');

    // Testar autenticação
    console.log('\n🔄 Testando autenticação...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('⚠️  Erro na autenticação:', authError.message);
    } else {
      console.log('✅ Sistema de autenticação funcionando');
    }

    // Testar tabelas
    console.log('\n🔄 Testando tabelas...');
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

    console.log('\n🎉 Teste de conexão concluído!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Execute: npm run dev');
    console.log('2. Acesse: http://localhost:3000');
    console.log('3. Crie um usuário admin no painel do Supabase');
    console.log('4. Faça login na aplicação');

  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
  }
}

testSupabaseConnection();
