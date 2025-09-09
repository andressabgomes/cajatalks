import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { TicketService, type TicketWithDetails } from '@/services/tickets'
import { ClientService, type ClientWithStats } from '@/services/clients'
import { ConversationService, type ConversationWithUser } from '@/services/conversations'
import { NotificationService, type Notification } from '@/services/notifications'

/**
 * Exemplo de como usar os serviços do backend no frontend
 * Este arquivo demonstra as principais funcionalidades implementadas
 */
export function BackendUsageExample() {
  const { user, isAuthenticated, isAdmin, isAgent } = useAuth()
  const [tickets, setTickets] = useState<TicketWithDetails[]>([])
  const [clients, setClients] = useState<ClientWithStats[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar dados iniciais
  useEffect(() => {
    if (isAuthenticated) {
      loadInitialData()
    }
  }, [isAuthenticated])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Carregar tickets
      const ticketsData = await TicketService.getTickets(1, 10)
      setTickets(ticketsData.data)

      // Carregar clientes (apenas para admins e agentes)
      if (isAdmin || isAgent) {
        const clientsData = await ClientService.getClients(1, 10)
        setClients(clientsData.data)
      }

      // Carregar notificações
      if (user) {
        const notificationsData = await NotificationService.getUserNotifications(user.id)
        setNotifications(notificationsData.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  // Exemplo: Criar um novo ticket
  const createTicket = async () => {
    if (!user) return

    try {
      const newTicket = await TicketService.createTicket({
        title: 'Novo Ticket de Exemplo',
        description: 'Este é um ticket criado via exemplo',
        client_id: clients[0]?.id || '', // Usar primeiro cliente disponível
        created_by: user.id,
        priority: 'medium',
      })

      setTickets(prev => [newTicket, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar ticket')
    }
  }

  // Exemplo: Atribuir ticket
  const assignTicket = async (ticketId: string) => {
    if (!user) return

    try {
      await TicketService.assignTicket(ticketId, user.id)
      // Atualizar lista local
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, assigned_to: user.id, status: 'in_progress' }
            : ticket
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atribuir ticket')
    }
  }

  // Exemplo: Enviar mensagem
  const sendMessage = async (ticketId: string, message: string) => {
    if (!user) return

    try {
      await ConversationService.sendMessage({
        ticket_id: ticketId,
        message,
        sender_id: user.id,
        sender_type: 'user',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem')
    }
  }

  // Exemplo: Marcar notificação como lida
  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId)
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao marcar notificação')
    }
  }

  // Exemplo: Configurar subscrições em tempo real
  useEffect(() => {
    if (!isAuthenticated) return

    // Escutar mudanças em tickets
    const ticketSubscription = TicketService.subscribeToTickets((ticket) => {
      setTickets(prev => {
        const existingIndex = prev.findIndex(t => t.id === ticket.id)
        if (existingIndex >= 0) {
          // Atualizar ticket existente
          const updated = [...prev]
          updated[existingIndex] = { ...updated[existingIndex], ...ticket }
          return updated
        } else {
          // Adicionar novo ticket
          return [ticket as TicketWithDetails, ...prev]
        }
      })
    })

    // Escutar novas notificações
    if (user) {
      const notificationSubscription = NotificationService.subscribeToNotifications(
        user.id,
        (notification) => {
          setNotifications(prev => [notification, ...prev])
        }
      )

      return () => {
        ticketSubscription.unsubscribe()
        notificationSubscription.unsubscribe()
      }
    }

    return () => {
      ticketSubscription.unsubscribe()
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return <div>Faça login para ver os dados</div>
  }

  if (loading) {
    return <div>Carregando dados...</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Exemplo de Uso do Backend</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Informações do usuário */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Usuário Logado</h2>
        <p><strong>Nome:</strong> {user?.full_name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Função:</strong> {user?.role}</p>
        <p><strong>Admin:</strong> {isAdmin ? 'Sim' : 'Não'}</p>
        <p><strong>Agente:</strong> {isAgent ? 'Sim' : 'Não'}</p>
      </div>

      {/* Ações */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Ações</h2>
        <div className="space-x-2">
          <button
            onClick={createTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={clients.length === 0}
          >
            Criar Ticket
          </button>
          <button
            onClick={loadInitialData}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Recarregar Dados
          </button>
        </div>
      </div>

      {/* Tickets */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Tickets ({tickets.length})</h2>
        <div className="space-y-2">
          {tickets.map(ticket => (
            <div key={ticket.id} className="border p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-500">
                    Status: {ticket.status} | Prioridade: {ticket.priority}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => assignTicket(ticket.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    disabled={ticket.assigned_to === user?.id}
                  >
                    Atribuir
                  </button>
                  <button
                    onClick={() => sendMessage(ticket.id, 'Mensagem de exemplo')}
                    className="bg-purple-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clientes (apenas para admins e agentes) */}
      {(isAdmin || isAgent) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Clientes ({clients.length})</h2>
          <div className="space-y-2">
            {clients.map(client => (
              <div key={client.id} className="border p-4 rounded">
                <h3 className="font-medium">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.email}</p>
                <p className="text-xs text-gray-500">
                  Empresa: {client.company} | Status: {client.status}
                </p>
                <p className="text-xs text-gray-500">
                  Tickets: {client.tickets_count} | Abertos: {client.open_tickets_count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notificações */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Notificações ({notifications.length})</h2>
        <div className="space-y-2">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`border p-4 rounded ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    Tipo: {notification.type} | Lida: {notification.read ? 'Sim' : 'Não'}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Marcar como Lida
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BackendUsageExample
