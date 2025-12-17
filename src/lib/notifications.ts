/**
 * Notification system utilities
 * Handles push notifications and coordinates with backend for email notifications
 */

export type NotificationType = 
  | 'reply_to_discussion'
  | 'reaction_to_post'
  | 'reaction_to_reply'
  | 'new_follower'
  | 'mention';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  url?: string;
  icon?: string;
  data?: Record<string, any>;
}

/**
 * Request push notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    console.warn('Notification permission denied');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Show a push notification
 */
export function showNotification(payload: NotificationPayload): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification(payload.title, {
    body: payload.body,
    icon: payload.icon || '/favicon.png',
    badge: '/favicon.png',
    tag: payload.type,
    data: payload.data,
    requireInteraction: false,
  });

  notification.onclick = () => {
    window.focus();
    if (payload.url) {
      window.location.href = payload.url;
    }
    notification.close();
  };

  // Auto-close after 5 seconds
  setTimeout(() => {
    notification.close();
  }, 5000);
}

/**
 * Format notification message based on type
 */
export function formatNotificationMessage(
  type: NotificationType,
  data: {
    authorName?: string;
    discussionTitle?: string;
    replyPreview?: string;
    reactionType?: string;
  }
): { title: string; body: string } {
  switch (type) {
    case 'reply_to_discussion':
      return {
        title: 'New reply to your discussion',
        body: `${data.authorName || 'Someone'} replied to "${data.discussionTitle || 'your discussion'}"`,
      };
    case 'reaction_to_post':
      return {
        title: 'New reaction',
        body: `${data.authorName || 'Someone'} ${data.reactionType || 'liked'} your post`,
      };
    case 'reaction_to_reply':
      return {
        title: 'New reaction',
        body: `${data.authorName || 'Someone'} ${data.reactionType || 'liked'} your reply`,
      };
    case 'new_follower':
      return {
        title: 'New follower',
        body: `${data.authorName || 'Someone'} started following you`,
      };
    default:
      return {
        title: 'New notification',
        body: 'You have a new notification',
      };
  }
}

