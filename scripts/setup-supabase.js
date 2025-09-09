#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuração do Supabase - Cajá Talks Interface Design\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupSupabase() {
  try {
    console.log('📋 Vamos configurar o Supabase para o seu projeto!\n');
    
    // Verificar se o arquivo .env já existe
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const overwrite = await askQuestion('⚠️  O arquivo .env já existe. Deseja sobrescrever? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Configuração cancelada.');
        rl.close();
        return;
      }
    }

    console.log('\n🔗 Primeiro, você precisa criar um projeto no Supabase:');
    console.log('1. Acesse https://supabase.com');
    console.log('2. Faça login ou crie uma conta');
    console.log('3. Clique em "New Project"');
    console.log('4. Preencha os dados do projeto');
    console.log('5. Aguarde a criação (2-3 minutos)\n');

    const supabaseUrl = await askQuestion('🔗 Cole aqui a URL do seu projeto Supabase: ');
    const supabaseKey = await askQuestion('🔑 Cole aqui a chave anon do Supabase: ');
    const appName = await askQuestion('📱 Nome da aplicação (padrão: Cajá Talks Interface Design): ') || 'Cajá Talks Interface Design';
    const appVersion = await askQuestion('📦 Versão da aplicação (padrão: 0.1.0): ') || '0.1.0';

    // Validar URLs
    if (!supabaseUrl.includes('supabase.co')) {
      console.log('❌ URL do Supabase inválida. Deve conter "supabase.co"');
      rl.close();
      return;
    }

    if (!supabaseKey.startsWith('eyJ')) {
      console.log('❌ Chave do Supabase inválida. Deve começar com "eyJ"');
      rl.close();
      return;
    }

    // Criar arquivo .env
    const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# App Configuration
VITE_APP_NAME=${appName}
VITE_APP_VERSION=${appVersion}
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Arquivo .env criado com sucesso!');

    console.log('\n📊 Agora você precisa configurar o banco de dados:');
    console.log('1. No painel do Supabase, vá em "SQL Editor"');
    console.log('2. Copie todo o conteúdo do arquivo supabase/schema.sql');
    console.log('3. Cole no editor SQL e clique em "Run"');
    console.log('4. Aguarde a execução completar\n');

    const runSchema = await askQuestion('✅ Você já executou o schema SQL? (y/N): ');
    if (runSchema.toLowerCase() !== 'y' && runSchema.toLowerCase() !== 'yes') {
      console.log('\n⚠️  Lembre-se de executar o schema SQL antes de usar a aplicação!');
    }

    console.log('\n🔐 Configure a autenticação:');
    console.log('1. No painel do Supabase, vá em "Authentication > Settings"');
    console.log('2. Configure Site URL: http://localhost:3000');
    console.log('3. Configure Redirect URLs: http://localhost:3000/**');
    console.log('4. Crie um usuário admin em "Authentication > Users"');
    console.log('5. Execute este SQL para tornar o usuário admin:');
    console.log('   UPDATE public.users SET role = \'admin\' WHERE email = \'seu-email@admin.com\';');

    console.log('\n🎉 Configuração concluída!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Execute: npm install');
    console.log('2. Execute: npm run dev');
    console.log('3. Acesse: http://localhost:3000');
    console.log('4. Faça login com seu usuário admin');

    console.log('\n📚 Documentação completa: docs/SUPABASE_IMPLEMENTATION.md');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);
  } finally {
    rl.close();
  }
}

setupSupabase();
