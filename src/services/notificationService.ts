import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type Notification = Database['public']['Tables']['notifications']['Row'];

export const notificationService = {
  /**
   * Get the current user's notifications
   */
  async getUserNotifications(limit: number = 10, includeRead: boolean = false): Promise<Notification[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.warn('getUserNotifications called with no authenticated user');
        return [];
      }

      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!includeRead) {
        query = query.eq('is_read', false);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching notifications:', error.message || error);
        return [];
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching notifications:', error?.message || error);
      return [];
    }
  },

  /**
   * Get the count of unread notifications
   */
  async getUnreadCount(): Promise<number> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return 0;
      }

      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) {
        console.error('Error fetching notification count:', error.message || error);
        return 0;
      }

      return count || 0;
    } catch (error: any) {
      console.error('Error fetching notification count:', error?.message || error);
      return 0;
    }
  },

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: number): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  },

  /**
   * Create a notification
   */
  async createNotification(title: string, message: string, type: string, data?: any): Promise<Notification | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: user.id,
        title,
        message,
        type,
        data: data || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return notification;
  },

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: number): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting notification:', error);
      return false;
    }

    return true;
  }
};
