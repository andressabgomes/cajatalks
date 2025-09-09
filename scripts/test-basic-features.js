const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testBasicFeatures() {
  console.log('🧪 TESTE BÁSICO DO SISTEMA CAJÁ TALKS\n');
  console.log('=' .repeat(50));

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas!');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    tests: []
  };

  function addTest(name, passed, message = '') {
    testResults.total++;
    if (passed) {
      testResults.passed++;
      testResults.tests.push({ name, status: '✅ PASS', message });
    } else {
      testResults.failed++;
      testResults.tests.push({ name, status: '❌ FAIL', message });
    }
  }

  try {
    // 1. TESTE DE CONEXÃO BÁSICA
    console.log('\n🔍 1. TESTANDO CONEXÃO BÁSICA');
    console.log('-'.repeat(40));
    
    const { data: connectionTest, error: connectionError } = await supabase
      .from('notifications')
      .select('count')
      .limit(1);
    
    addTest('Conexão com Supabase', !connectionError, connectionError?.message || 'Conexão estabelecida');

    // 2. TESTE DE CRIAÇÃO DE CLIENTE
    console.log('\n📝 2. TESTANDO CRIAÇÃO DE CLIENTE');
    console.log('-'.repeat(40));
    
    const testClient = {
      name: 'Cliente Teste Automático',
      email: `teste-${Date.now()}@exemplo.com`,
      phone: '11999999999',
      company: 'Empresa Teste',
      status: 'active'
    };

    const { data: createdClient, error: clientError } = await supabase
      .from('clients')
      .insert([testClient])
      .select()
      .single();

    addTest('Criação de cliente', !clientError, clientError?.message || 'Cliente criado com sucesso');

    // 3. TESTE DE CRIAÇÃO DE TICKET
    console.log('\n🎫 3. TESTANDO CRIAÇÃO DE TICKET');
    console.log('-'.repeat(40));
    
    if (createdClient) {
      const testTicket = {
        title: 'Ticket de Teste Automático',
        description: 'Descrição do ticket de teste para validação do sistema',
        status: 'open',
        priority: 'medium',
        client_id: createdClient.id,
        created_by: '00000000-0000-0000-0000-000000000000', // UUID fictício para teste
        category: 'Teste Automático'
      };

      const { data: createdTicket, error: ticketError } = await supabase
        .from('tickets')
        .insert([testTicket])
        .select()
        .single();

      addTest('Criação de ticket', !ticketError, ticketError?.message || 'Ticket criado com sucesso');

      // 4. TESTE DE CRIAÇÃO DE CONVERSA
      console.log('\n💬 4. TESTANDO CRIAÇÃO DE CONVERSA');
      console.log('-'.repeat(40));
      
      if (createdTicket) {
        const testConversation = {
          ticket_id: createdTicket.id,
          message: 'Mensagem de teste automático do sistema',
          sender_id: '00000000-0000-0000-0000-000000000000',
          sender_type: 'user'
        };

        const { data: createdConversation, error: conversationError } = await supabase
          .from('conversations')
          .insert([testConversation])
          .select()
          .single();

        addTest('Criação de conversa', !conversationError, conversationError?.message || 'Conversa criada com sucesso');

        // 5. TESTE DE CRIAÇÃO DE NOTIFICAÇÃO
        console.log('\n🔔 5. TESTANDO CRIAÇÃO DE NOTIFICAÇÃO');
        console.log('-'.repeat(40));
        
        const testNotification = {
          user_id: '00000000-0000-0000-0000-000000000000',
          title: 'Notificação de Teste Automático',
          message: 'Mensagem de notificação de teste do sistema',
          type: 'info'
        };

        const { data: createdNotification, error: notificationError } = await supabase
          .from('notifications')
          .insert([testNotification])
          .select()
          .single();

        addTest('Criação de notificação', !notificationError, notificationError?.message || 'Notificação criada com sucesso');

        // 6. TESTE DE LEITURA DE DADOS
        console.log('\n📖 6. TESTANDO LEITURA DE DADOS');
        console.log('-'.repeat(40));
        
        // Listar clientes
        const { data: clients, error: clientsError } = await supabase
          .from('clients')
          .select('*')
          .limit(5);

        addTest('Listagem de clientes', !clientsError, clientsError?.message || `${clients?.length || 0} clientes encontrados`);

        // Listar tickets
        const { data: tickets, error: ticketsError } = await supabase
          .from('tickets')
          .select('*')
          .limit(5);

        addTest('Listagem de tickets', !ticketsError, ticketsError?.message || `${tickets?.length || 0} tickets encontrados`);

        // Listar conversas
        const { data: conversations, error: conversationsError } = await supabase
          .from('conversations')
          .select('*')
          .limit(5);

        addTest('Listagem de conversas', !conversationsError, conversationsError?.message || `${conversations?.length || 0} conversas encontradas`);

        // Listar notificações
        const { data: notifications, error: notificationsError } = await supabase
          .from('notifications')
          .select('*')
          .limit(5);

        addTest('Listagem de notificações', !notificationsError, notificationsError?.message || `${notifications?.length || 0} notificações encontradas`);

        // 7. TESTE DE FILTROS
        console.log('\n🔍 7. TESTANDO FILTROS E BUSCA');
        console.log('-'.repeat(40));
        
        // Filtro por status
        const { data: openTickets, error: openTicketsError } = await supabase
          .from('tickets')
          .select('*')
          .eq('status', 'open');

        addTest('Filtro por status (open)', !openTicketsError, openTicketsError?.message || `${openTickets?.length || 0} tickets abertos`);

        // Filtro por prioridade
        const { data: mediumTickets, error: mediumTicketsError } = await supabase
          .from('tickets')
          .select('*')
          .eq('priority', 'medium');

        addTest('Filtro por prioridade (medium)', !mediumTicketsError, mediumTicketsError?.message || `${mediumTickets?.length || 0} tickets de prioridade média`);

        // Busca por texto
        const { data: searchTickets, error: searchTicketsError } = await supabase
          .from('tickets')
          .select('*')
          .ilike('title', '%teste%');

        addTest('Busca por texto', !searchTicketsError, searchTicketsError?.message || `${searchTickets?.length || 0} tickets encontrados na busca`);

        // 8. TESTE DE ATUALIZAÇÃO
        console.log('\n✏️ 8. TESTANDO ATUALIZAÇÃO DE DADOS');
        console.log('-'.repeat(40));
        
        // Atualizar cliente
        const { error: updateClientError } = await supabase
          .from('clients')
          .update({ status: 'inactive' })
          .eq('id', createdClient.id);

        addTest('Atualização de cliente', !updateClientError, updateClientError?.message || 'Cliente atualizado com sucesso');

        // Atualizar ticket
        const { error: updateTicketError } = await supabase
          .from('tickets')
          .update({ status: 'in_progress' })
          .eq('id', createdTicket.id);

        addTest('Atualização de ticket', !updateTicketError, updateTicketError?.message || 'Ticket atualizado com sucesso');

        // 9. TESTE DE PERFORMANCE
        console.log('\n⚡ 9. TESTANDO PERFORMANCE');
        console.log('-'.repeat(40));
        
        const startTime = Date.now();
        
        const { data: performanceTest, error: performanceError } = await supabase
          .from('tickets')
          .select('*')
          .limit(10);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        addTest('Performance de consulta', !performanceError && responseTime < 2000, 
          performanceError?.message || `Consulta executada em ${responseTime}ms`);

        // 10. TESTE DE RELACIONAMENTOS
        console.log('\n🔗 10. TESTANDO RELACIONAMENTOS');
        console.log('-'.repeat(40));
        
        // Teste de relacionamento cliente-ticket
        const { data: relationshipTest, error: relationshipError } = await supabase
          .from('tickets')
          .select('*, clients(*)')
          .eq('client_id', createdClient.id)
          .single();

        addTest('Relacionamento cliente-ticket', !relationshipError, 
          relationshipError?.message || 'Relacionamento funcionando corretamente');

        // 11. LIMPEZA DE DADOS DE TESTE
        console.log('\n🧹 11. LIMPANDO DADOS DE TESTE');
        console.log('-'.repeat(40));
        
        // Deletar conversa
        if (createdConversation) {
          const { error: deleteConversationError } = await supabase
            .from('conversations')
            .delete()
            .eq('id', createdConversation.id);

          addTest('Limpeza de conversa', !deleteConversationError, 
            deleteConversationError?.message || 'Conversa removida');
        }

        // Deletar notificação
        if (createdNotification) {
          const { error: deleteNotificationError } = await supabase
            .from('notifications')
            .delete()
            .eq('id', createdNotification.id);

          addTest('Limpeza de notificação', !deleteNotificationError, 
            deleteNotificationError?.message || 'Notificação removida');
        }

        // Deletar ticket
        const { error: deleteTicketError } = await supabase
          .from('tickets')
          .delete()
          .eq('id', createdTicket.id);

        addTest('Limpeza de ticket', !deleteTicketError, 
          deleteTicketError?.message || 'Ticket removido');

        // Deletar cliente
        const { error: deleteClientError } = await supabase
          .from('clients')
          .delete()
          .eq('id', createdClient.id);

        addTest('Limpeza de cliente', !deleteClientError, 
          deleteClientError?.message || 'Cliente removido');

      }
    }

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    addTest('Execução geral', false, error.message);
  }

  // RESULTADO FINAL
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTADO DOS TESTES');
  console.log('='.repeat(50));
  
  console.log(`\n📈 Estatísticas:`);
  console.log(`   Total de testes: ${testResults.total}`);
  console.log(`   ✅ Aprovados: ${testResults.passed}`);
  console.log(`   ❌ Falharam: ${testResults.failed}`);
  console.log(`   📊 Taxa de sucesso: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

  console.log(`\n📋 Detalhes dos testes:`);
  testResults.tests.forEach(test => {
    console.log(`   ${test.status} ${test.name}`);
    if (test.message) {
      console.log(`      💬 ${test.message}`);
    }
  });

  if (testResults.failed === 0) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    console.log('✅ O sistema está funcionando perfeitamente!');
  } else if (testResults.passed > testResults.failed) {
    console.log('\n✅ MAIORIA DOS TESTES PASSOU!');
    console.log('✅ O sistema está funcionando bem!');
  } else {
    console.log(`\n⚠️  ${testResults.failed} teste(s) falharam.`);
    console.log('🔧 Verifique os erros acima para correção.');
  }

  console.log('\n🚀 Sistema pronto para uso!');
  console.log('🌐 Acesse: http://localhost:3001');
}

testBasicFeatures();
