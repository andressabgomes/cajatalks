import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Ticket = Database['public']['Tables']['tickets']['Row']
type TicketInsert = Database['public']['Tables']['tickets']['Insert']
type TicketUpdate = Database['public']['Tables']['tickets']['Update']

export interface TicketWithDetails extends Ticket {
  client: Database['public']['Tables']['clients']['Row']
  assigned_user?: Database['public']['Tables']['users']['Row']
  created_by_user: Database['public']['Tables']['users']['Row']
  conversations_count: number
}

export class TicketService {
  // Get all tickets with pagination and filters
  static async getTickets(
    page = 1,
    limit = 10,
    filters?: {
      status?: string
      priority?: string
      assigned_to?: string
      client_id?: string
    }
  ) {
    let query = supabase
      .from('tickets')
      .select(`
        *,
        client:clients(*),
        assigned_user:users!assigned_to(*),
        created_by_user:users!created_by(*)
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to)
    }
    if (filters?.client_id) {
      query = query.eq('client_id', filters.client_id)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      data: data as TicketWithDetails[],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  }

  // Get ticket by ID
  static async getTicketById(id: string): Promise<TicketWithDetails> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        client:clients(*),
        assigned_user:users!assigned_to(*),
        created_by_user:users!created_by(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    // Get conversations count
    const { count } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('ticket_id', id)

    return {
      ...data,
      conversations_count: count || 0,
    } as TicketWithDetails
  }

  // Create new ticket
  static async createTicket(ticket: TicketInsert): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .insert({
        ...ticket,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Update ticket
  static async updateTicket(id: string, updates: TicketUpdate): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Delete ticket
  static async deleteTicket(id: string): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Assign ticket to user
  static async assignTicket(ticketId: string, userId: string): Promise<Ticket> {
    return this.updateTicket(ticketId, {
      assigned_to: userId,
      status: 'in_progress',
    })
  }

  // Resolve ticket
  static async resolveTicket(ticketId: string): Promise<Ticket> {
    return this.updateTicket(ticketId, {
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    })
  }

  // Close ticket
  static async closeTicket(ticketId: string): Promise<Ticket> {
    return this.updateTicket(ticketId, {
      status: 'closed',
    })
  }

  // Get ticket statistics
  static async getTicketStats() {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, priority, created_at')

    if (error) throw error

    const stats = {
      total: data.length,
      open: data.filter(t => t.status === 'open').length,
      in_progress: data.filter(t => t.status === 'in_progress').length,
      resolved: data.filter(t => t.status === 'resolved').length,
      closed: data.filter(t => t.status === 'closed').length,
      urgent: data.filter(t => t.priority === 'urgent').length,
      high: data.filter(t => t.priority === 'high').length,
      medium: data.filter(t => t.priority === 'medium').length,
      low: data.filter(t => t.priority === 'low').length,
    }

    return stats
  }

  // Subscribe to ticket changes
  static subscribeToTickets(callback: (ticket: Ticket) => void) {
    return supabase
      .channel('tickets_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets',
        },
        (payload) => {
          callback(payload.new as Ticket)
        }
      )
      .subscribe()
  }
}
