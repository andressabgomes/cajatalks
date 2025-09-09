import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Conversation = Database['public']['Tables']['conversations']['Row']
type ConversationInsert = Database['public']['Tables']['conversations']['Insert']

export interface ConversationWithUser extends Conversation {
  sender: Database['public']['Tables']['users']['Row']
}

export class ConversationService {
  // Get conversations for a ticket
  static async getConversationsByTicketId(
    ticketId: string,
    page = 1,
    limit = 50
  ) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('conversations')
      .select(`
        *,
        sender:users!sender_id(*)
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })
      .range(from, to)

    if (error) throw error

    return {
      data: data as ConversationWithUser[],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  }

  // Send a message
  static async sendMessage(message: ConversationInsert): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        ...message,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    // Update ticket's updated_at timestamp
    await supabase
      .from('tickets')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', message.ticket_id)

    return data
  }

  // Delete a message
  static async deleteMessage(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', messageId)

    if (error) throw error
  }

  // Subscribe to new messages for a ticket
  static subscribeToTicketMessages(
    ticketId: string,
    callback: (message: ConversationWithUser) => void
  ) {
    return supabase
      .channel(`ticket_${ticketId}_messages`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations',
          filter: `ticket_id=eq.${ticketId}`,
        },
        async (payload) => {
          // Get the sender information
          const { data: sender } = await supabase
            .from('users')
            .select('*')
            .eq('id', payload.new.sender_id)
            .single()

          callback({
            ...payload.new,
            sender: sender!,
          } as ConversationWithUser)
        }
      )
      .subscribe()
  }

  // Get recent conversations across all tickets
  static async getRecentConversations(limit = 20) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        sender:users!sender_id(*),
        ticket:tickets!ticket_id(
          id,
          title,
          status,
          client:clients(name, company)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }

  // Mark messages as read (if implementing read receipts)
  static async markMessagesAsRead(ticketId: string, userId: string) {
    // This would require adding a read_by field to conversations table
    // For now, we'll just return success
    return { success: true }
  }
}
