import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, MessageSquare, UserPlus, ShieldCheck, ShieldX, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useNotifications, useUnreadNotificationCount, useMarkNotificationRead, useMarkAllNotificationsRead, type Notification } from '@/hooks/useNotifications';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

function formatNotificationTime(date: string): string {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return notificationDate.toLocaleDateString();
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'new_comment_on_discussion':
    case 'reply_to_discussion':
      return MessageSquare;
    case 'new_follower':
      return UserPlus;
    case 'moderation_discussion_approved':
    case 'moderation_reply_approved':
      return ShieldCheck;
    case 'moderation_discussion_rejected':
    case 'moderation_reply_rejected':
      return ShieldX;
    default:
      return AlertCircle;
  }
}

function groupNotificationsByDate(notifications: Notification[]): { label: string; notifications: Notification[] }[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups: { label: string; notifications: Notification[] }[] = [
    { label: 'Today', notifications: [] },
    { label: 'Yesterday', notifications: [] },
    { label: 'ThisWeek', notifications: [] },
    { label: 'Older', notifications: [] },
  ];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.created_at);
    
    if (notificationDate >= today) {
      groups[0].notifications.push(notification);
    } else if (notificationDate >= yesterday) {
      groups[1].notifications.push(notification);
    } else if (notificationDate >= weekAgo) {
      groups[2].notifications.push(notification);
    } else {
      groups[3].notifications.push(notification);
    }
  });

  return groups.filter((group) => group.notifications.length > 0);
}

export function NotificationDropdown() {
  const { t } = useTranslation({ namespace: 'ui' });
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const [open, setOpen] = useState(false);

  const groupedNotifications = groupNotificationsByDate(notifications);
  const hasUnread = unreadCount > 0;

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markRead.mutateAsync(notification.id);
    }
    
    if (notification.url) {
      navigate(notification.url);
      setOpen(false);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllRead.mutateAsync();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[500px] overflow-y-auto">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="px-0">{t('notifications.title', 'Notifications')}</DropdownMenuLabel>
          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={markAllRead.isPending}
              className="h-7 text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              {t('notifications.markAllRead', 'Mark all read')}
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        {isLoading ? (
          <div className="px-2 py-8 text-center text-sm text-muted-foreground">
            {t('common.loading', 'Loading...')}
          </div>
        ) : notifications.length === 0 ? (
          <div className="px-2 py-8 text-center text-sm text-muted-foreground">
            {t('notifications.empty', 'No notifications')}
          </div>
        ) : (
          <div className="py-1">
            {groupedNotifications.map((group, groupIndex) => (
              <div key={group.label}>
                {groupIndex > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {t(`notifications.${group.label.toLowerCase()}`, group.label)}
                </DropdownMenuLabel>
                {group.notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={cn(
                        'flex items-start gap-3 px-2 py-2 cursor-pointer',
                        !notification.read && 'bg-secondary/50'
                      )}
                    >
                      <div className={cn(
                        'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                        !notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn(
                            'text-sm',
                            !notification.read ? 'font-medium' : 'text-muted-foreground'
                          )}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.body}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatNotificationTime(notification.created_at)}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

