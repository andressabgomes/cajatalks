import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Notification = Database['public']['Tables']['notifications']['Row']
type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

export class NotificationService {
  // Get notifications for a user
  static async getUserNotifications(
    userId: string,
    page = 1,
    limit = 20,
    unreadOnly = false
  ) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (unreadOnly) {
      query = query.eq('read', false)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  }

  // Create a notification
  static async createNotification(notification: NotificationInsert): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        ...notification,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Mark notification as read
  static async markAsRead(notificationId: string): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Mark all notifications as read for a user
  static async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) throw error
  }

  // Delete notification
  static async deleteNotification(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)

    if (error) throw error
  }

  // Get unread count for a user
  static async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) throw error
    return count || 0
  }

  // Subscribe to notifications for a user
  static subscribeToNotifications(
    userId: string,
    callback: (notification: Notification) => void
  ) {
    return supabase
      .channel(`user_${userId}_notifications`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification)
        }
      )
      .subscribe()
  }

  // Create notification for ticket assignment
  static async notifyTicketAssignment(
    ticketId: string,
    assignedToUserId: string,
    assignedByUserId: string
  ) {
    // Get ticket details
    const { data: ticket } = await supabase
      .from('tickets')
      .select('title')
      .eq('id', ticketId)
      .single()

    if (!ticket) return

    // Get assigned by user details
    const { data: assignedBy } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', assignedByUserId)
      .single()

    return this.createNotification({
      user_id: assignedToUserId,
      title: 'Novo Ticket Atribuído',
      message: `O ticket "${ticket.title}" foi atribuído a você por ${assignedBy?.full_name || 'Sistema'}`,
      type: 'info',
      read: false,
    })
  }

  // Create notification for ticket status change
  static async notifyTicketStatusChange(
    ticketId: string,
    clientId: string,
    newStatus: string
  ) {
    // Get ticket details
    const { data: ticket } = await supabase
      .from('tickets')
      .select('title')
      .eq('id', ticketId)
      .single()

    if (!ticket) return

    // Get client details
    const { data: client } = await supabase
      .from('clients')
      .select('name')
      .eq('id', clientId)
      .single()

    const statusMessages = {
      open: 'aberto',
      in_progress: 'em andamento',
      resolved: 'resolvido',
      closed: 'fechado',
    }

    return this.createNotification({
      user_id: clientId, // Assuming client has a user account
      title: 'Status do Ticket Atualizado',
      message: `O status do ticket "${ticket.title}" foi alterado para ${statusMessages[newStatus as keyof typeof statusMessages] || newStatus}`,
      type: 'info',
      read: false,
    })
  }
}
