import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Client = Database['public']['Tables']['clients']['Row']
type ClientInsert = Database['public']['Tables']['clients']['Insert']
type ClientUpdate = Database['public']['Tables']['clients']['Update']

export interface ClientWithStats extends Client {
  tickets_count: number
  open_tickets_count: number
  resolved_tickets_count: number
}

export class ClientService {
  // Get all clients with pagination and filters
  static async getClients(
    page = 1,
    limit = 10,
    filters?: {
      status?: string
      search?: string
    }
  ) {
    let query = supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    // Get ticket counts for each client
    const clientsWithStats: ClientWithStats[] = []
    if (data) {
      for (const client of data) {
        const { count: totalTickets } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', client.id)

        const { count: openTickets } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', client.id)
          .in('status', ['open', 'in_progress'])

        const { count: resolvedTickets } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', client.id)
          .eq('status', 'resolved')

        clientsWithStats.push({
          ...client,
          tickets_count: totalTickets || 0,
          open_tickets_count: openTickets || 0,
          resolved_tickets_count: resolvedTickets || 0,
        })
      }
    }

    return {
      data: clientsWithStats,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  }

  // Get client by ID
  static async getClientById(id: string): Promise<ClientWithStats> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Get ticket counts
    const { count: totalTickets } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', id)

    const { count: openTickets } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', id)
      .in('status', ['open', 'in_progress'])

    const { count: resolvedTickets } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', id)
      .eq('status', 'resolved')

    return {
      ...data,
      tickets_count: totalTickets || 0,
      open_tickets_count: openTickets || 0,
      resolved_tickets_count: resolvedTickets || 0,
    }
  }

  // Create new client
  static async createClient(client: ClientInsert): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...client,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Update client
  static async updateClient(id: string, updates: ClientUpdate): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
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

  // Delete client
  static async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Get client statistics
  static async getClientStats() {
    const { data, error } = await supabase
      .from('clients')
      .select('status, created_at')

    if (error) throw error

    const stats = {
      total: data.length,
      active: data.filter(c => c.status === 'active').length,
      inactive: data.filter(c => c.status === 'inactive').length,
      suspended: data.filter(c => c.status === 'suspended').length,
    }

    return stats
  }

  // Subscribe to client changes
  static subscribeToClients(callback: (client: Client) => void) {
    return supabase
      .channel('clients_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clients',
        },
        (payload) => {
          callback(payload.new as Client)
        }
      )
      .subscribe()
  }
}
