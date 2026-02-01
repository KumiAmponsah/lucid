import React, { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { ArrowLeft, Settings, Bell, CreditCard, MessageSquare, UserCheck, AlertCircle, CheckCircle, Trash2, Bookmark, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import emptyNotificationsImage from '../assets/No Messages.png';
import { NotificationBadge } from '../components/ui/NotificationBadge.jsx';
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

// Constants
const LONG_PRESS_DURATION = 600;

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'read', label: 'Read' },
  { id: 'payment', label: 'Payment' },
  { id: 'bookmark', label: 'Bookmark' }
];

const NOTIFICATION_TYPES = {
  payment: {
    icon: CreditCard,
    getBg: (status) => status === 'success' ? 'bg-green-100' : 'bg-red-100',
    getColor: (status) => status === 'success' ? 'text-green-600' : 'text-red-600'
  },
  message: {
    icon: MessageSquare,
    getBg: () => 'bg-blue-100',
    getColor: () => 'text-blue-600'
  },
  profile: {
    icon: UserCheck,
    getBg: () => 'bg-purple-100',
    getColor: () => 'text-purple-600'
  },
  error: {
    icon: AlertCircle,
    getBg: () => 'bg-red-100',
    getColor: () => 'text-red-600'
  },
  default: {
    icon: Bell,
    getBg: () => 'bg-gray-100',
    getColor: () => 'text-gray-600'
  }
};

// Memoized Confirmation Modal Component
const ConfirmationModal = memo(({ isOpen, onClose, onConfirm, title, message, preview, confirmText, confirmColor = 'blue' }) => {
  if (!isOpen) return null;

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`${confirmColor === 'red' ? 'bg-red-100' : 'bg-blue-100'} p-3 rounded-full`}>
              <Trash2 className={`w-6 h-6 ${confirmColor === 'red' ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <p className="text-gray-600 mb-2">{message}</p>
          {preview && (
            <div className="bg-gray-50 p-3 rounded-lg mb-6 border border-gray-200">
              <p className="text-sm text-gray-700 font-semibold">{preview.title}</p>
              <p className="text-sm text-gray-600 mt-1">{preview.message}</p>
            </div>
          )}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${colorClasses[confirmColor]}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Memoized Actions Menu Component
const ActionsMenu = memo(({ notification, onMarkAsRead, onMarkAsUnread, onBookmark, onDelete, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 min-w-48 notification-actions-menu"
  >
    {notification.read ? (
      <button
        onClick={() => onMarkAsUnread(notification.id)}
        className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3 text-sm"
      >
        <EyeOff className="w-4 h-4" />
        <span>Mark as Unread</span>
      </button>
    ) : (
      <button
        onClick={() => onMarkAsRead(notification.id)}
        className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3 text-sm"
      >
        <Eye className="w-4 h-4" />
        <span>Mark as Read</span>
      </button>
    )}
    
    <button
      onClick={() => onBookmark(notification.id)}
      className="w-full px-4 py-3 text-left hover:bg-gray-100 text-orange-600 flex items-center space-x-3 text-sm"
    >
      <Bookmark className={`w-4 h-4 ${notification.bookmarked ? 'fill-orange-600' : ''}`} />
      <span>{notification.bookmarked ? 'Remove Bookmark' : 'Bookmark'}</span>
    </button>
    
    <button
      onClick={() => {
        onDelete(notification);
        onClose();
      }}
      className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center space-x-3 text-sm"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  </motion.div>
));

// Memoized Notification Item Component
const NotificationItem = memo(({ notification, onDelete, onMarkAsRead, onMarkAsUnread, onBookmark, onShowActions }) => {
  const longPressTimer = useRef(null);

  const startLongPress = useCallback(() => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      onShowActions(notification.id);
    }, LONG_PRESS_DURATION);
  }, [notification.id, onShowActions]);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    onShowActions(notification.id);
  }, [notification.id, onShowActions]);

  const typeConfig = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.default;
  const Icon = typeConfig.icon;
  const iconBg = typeConfig.getBg(notification.status);
  const iconColor = typeConfig.getColor(notification.status);

  return (
    <motion.div
      variants={slideIn}
      onContextMenu={handleContextMenu}
      onMouseDown={startLongPress}
      onMouseUp={cancelLongPress}
      onMouseLeave={cancelLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={cancelLongPress}
      className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md relative group cursor-pointer ${
        notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
      } ${notification.bookmarked ? 'ring-2 ring-orange-400' : ''}`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <Link to={notification.loc}>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
          <span className="absolute bottom-2 right-2 text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed truncate max-w-[260px] sm:max-w-full">{notification.message}</p>
      </div>
      </Link>

      {/* Quick Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification);
        }}
        className="absolute top-2 right-8 p-1 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <span className="text-sm text-gray-500 hover:text-red-600">Delete</span>
      </button>

      {/* Bookmark Indicator */}
      {notification.bookmarked && (
        <div className="absolute top-3 right-2 p-1">
          <Bookmark className="w-5 h-5 text-orange-500 fill-orange-500" />
        </div>
      )}

      {/* Unread Indicator */}
      {!notification.read && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </motion.div>
  );
});

// Memoized Empty State Component
const EmptyState = memo(() => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <motion.img
      src={emptyNotificationsImage}
      alt="No Notifications"
      className="w-44 h-44 object-cover mb-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
    />
    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Notification Yet</h2>
    <p className="text-gray-600 text-center max-w-xs">
      You don't have any notification at the moment, check back later
    </p>
  </motion.div>
));

// Memoized Filter Button Component
const FilterButton = memo(({ filter, isActive, badgeCount, onClick }) => (
  <button
    onClick={onClick}
    className={`relative my-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
    }`}
  >
    {filter.label}
    {badgeCount > 0 && !isActive && (
      <NotificationBadge count={badgeCount} />
    )}
  </button>
));

// Main Notifications Page
const NotificationsPage = () => {
  const handleBackClick = useNavigateBack('/lucid', 400);
  const { showNotification } = useNotification();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      status: 'success',
      title: 'Payment Successful!',
      message: 'Thank you for your purchase! A confirmation email has been sent to your address.',
      time: '10 min',
      read: false,
      date: 'Today',
      category: 'payment',
      bookmarked: false,
      loc: '#'
    },
    {
      id: 2,
      type: 'payment',
      status: 'error',
      title: 'Payment Failed!',
      message: 'Your payment could not be processed. Please check your payment details and try again.',
      time: '25 min',
      read: false,
      date: 'Today',
      category: 'payment',
      bookmarked: false,
      loc: '#'
    },
    {
      id: 3,
      type: 'profile',
      status: 'success',
      title: 'Profile Updated!',
      message: 'Your profile information has been successfully updated.',
      time: '1 hr',
      read: false,
      date: 'Today',
      category: 'bookmark',
      bookmarked: true,
      loc: '#'
    },
    {
      id: 4,
      type: 'message',
      status: 'info',
      title: 'New Message',
      message: 'You have a new message from your Client.',
      time: '2 hrs',
      read: true,
      date: 'Yesterday',
      category: 'read',
      bookmarked: false,
      loc: '/messagePage'
    },
    {
      id: 5,
      type: 'payment',
      status: 'error',
      title: 'Payment Failed!',
      message: 'Your payment could not be processed. Please check your payment details and try again.',
      time: '1 day',
      read: true,
      date: 'Yesterday',
      category: 'payment',
      bookmarked: false,
      loc: '#'
    },
    {
      id: 6,
      type: 'message',
      status: 'info',
      title: 'New Message',
      message: 'You have a new message from your Client.',
      time: '3 days',
      read: true,
      date: 'October 21, 2025',
      category: 'read',
      bookmarked: false,
      loc: '/messagePage'
    },
    {
      id: 7,
      type: 'message',
      status: 'info',
      title: 'New Message',
      message: 'You have a new message from your Client.',
      time: '4 days',
      read: true,
      date: 'October 20, 2025',
      category: 'bookmark',
      bookmarked: true,
      loc: '/messagePage'
    },
    {
      id: 8,
      type: 'message',
      status: 'info',
      title: 'New Message',
      message: 'You have a new message from your Client.',
      time: '4 days',
      read: false,
      date: 'October 20, 2025',
      category: 'bookmark',
      bookmarked: true,
      loc: '/messagePage'
    },
  ]);

  // Close actions menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (selectedNotification) {
        const openMenu = document.querySelector('.notification-actions-menu');
        if (openMenu && !openMenu.contains(e.target)) {
          setSelectedNotification(null);
        }
      }
    };

    document.addEventListener('click', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [selectedNotification]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedNotification(null);
        setConfirmDelete(null);
        setConfirmClearAll(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Calculate badge counts
  const badgeCounts = useMemo(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const hasUnread = unreadCount > 0;
    
    return {
      all: hasUnread ? notifications.length : 0,
      unread: unreadCount,
      read: hasUnread ? notifications.filter(n => n.read).length : 0,
      payment: hasUnread ? notifications.filter(n => n.category === 'payment' && !n.read).length : 0,
      bookmark: hasUnread ? notifications.filter(n => n.category === 'bookmark' && !n.read).length : 0
    };
  }, [notifications]);

  // Filter and group notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;
    
    if (selectedFilter === 'unread') {
      filtered = notifications.filter(n => !n.read);
    } else if (selectedFilter === 'read') {
      filtered = notifications.filter(n => n.read);
    } else if (selectedFilter === 'payment') {
      filtered = notifications.filter(n => n.category === 'payment');
    } else if (selectedFilter === 'bookmark') {
      filtered = notifications.filter(n => n.category === 'bookmark');
    }

    return filtered.reduce((acc, notification) => {
      const date = notification.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(notification);
      return acc;
    }, {});
  }, [notifications, selectedFilter]);

  const handleDelete = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showNotification('Notification deleted', 'success');
  }, [showNotification]);

  const handleMarkAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setSelectedNotification(null);
    showNotification('Marked as read', 'success');
  }, [showNotification]);

  const handleMarkAsUnread = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
    setSelectedNotification(null);
    showNotification('Marked as unread', 'info');
  }, [showNotification]);

  const handleBookmark = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, bookmarked: !n.bookmarked, category: !n.bookmarked ? 'bookmark' : n.category } : n
    ));
    const notif = notifications.find(n => n.id === id);
    setSelectedNotification(null);
    showNotification(
      notif?.bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 
      'success'
    );
  }, [notifications, showNotification]);

  const handleMarkAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showNotification('All notifications marked as read', 'success');
  }, [showNotification]);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
    setConfirmClearAll(false);
    showNotification('All notifications cleared', 'success');
  }, [showNotification]);


  const hasNotifications = Object.keys(filteredNotifications).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          handleDelete(confirmDelete.id);
          setConfirmDelete(null);
        }}
        title="Delete Notification?"
        message="Are you sure you want to delete this notification?"
        preview={confirmDelete}
        confirmText="Delete"
        confirmColor="red"
      />

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmClearAll}
        onClose={() => setConfirmClearAll(false)}
        onConfirm={handleClearAll}
        title="Clear All Notifications?"
        message="This will delete ALL notifications. This action cannot be undone."
        confirmText="Clear All"
        confirmColor="blue"
      />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="w-full mx-auto px-10 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <Link to='/notification-settings'>
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-6 h-6 text-gray-700" />
            </motion.button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map(filter => (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={selectedFilter === filter.id}
                badgeCount={badgeCounts[filter.id]}
                onClick={() => setSelectedFilter(filter.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full mx-auto px-10 py-6">
        {hasNotifications ? (
          <>
            {/* Action Buttons */}
            {badgeCounts.unread > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-4"
              >
                <button
                  onClick={handleMarkAllRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark all as read
                </button>
                <button
                  onClick={() => setConfirmClearAll(true)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Notifications */}
            <AnimatePresence mode="popLayout">
              {Object.entries(filteredNotifications).map(([date, items]) => (
                <motion.div
                  key={date}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">{date}</h3>
                  <div className="space-y-3">
                    {items.map(notification => (
                      <div key={notification.id} className="relative">
                        <NotificationItem
                          notification={notification}
                          onDelete={setConfirmDelete}
                          onMarkAsRead={handleMarkAsRead}
                          onMarkAsUnread={handleMarkAsUnread}
                          onBookmark={handleBookmark}
                          onShowActions={setSelectedNotification}
                        />
                        
                        {/* Actions Menu */}
                        <AnimatePresence>
                          {selectedNotification === notification.id && (
                            <ActionsMenu
                              notification={notification}
                              onMarkAsRead={handleMarkAsRead}
                              onMarkAsUnread={handleMarkAsUnread}
                              onBookmark={handleBookmark}
                              onDelete={setConfirmDelete}
                              onClose={() => setSelectedNotification(null)}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default memo(NotificationsPage);