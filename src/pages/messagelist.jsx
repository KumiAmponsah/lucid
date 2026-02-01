import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import {
  ArrowLeft, Search, Edit, Archive, Trash2, Pin, Volume2, 
  VolumeX, CheckCheck, Check, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import Profilepic from '../assets/profile.svg';

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
  { id: 'pinned', label: 'Pinned' },
  { id: 'archived', label: 'Archived' }
];

// Confirmation Modal Component
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
              <p className="text-sm text-gray-700 font-semibold">{preview.name}</p>
              <p className="text-sm text-gray-600 mt-1 truncate">{preview.lastMessage}</p>
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

// Actions Menu Component
const ActionsMenu = memo(({ conversation, onPin, onMute, onArchive, onDelete, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 min-w-48 conversation-actions-menu"
  >
    <button
      onClick={() => onPin(conversation.id)}
      className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3 text-sm"
    >
      <Pin className={`w-4 h-4 ${conversation.pinned ? 'fill-blue-600' : ''}`} />
      <span>{conversation.pinned ? 'Unpin' : 'Pin'}</span>
    </button>
    
    <button
      onClick={() => onMute(conversation.id)}
      className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3 text-sm"
    >
      {conversation.muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span>{conversation.muted ? 'Unmute' : 'Mute'}</span>
    </button>
    
    <button
      onClick={() => onArchive(conversation.id)}
      className="w-full px-4 py-3 text-left hover:bg-gray-100 text-orange-600 flex items-center space-x-3 text-sm"
    >
      <Archive className="w-4 h-4" />
      <span>{conversation.archived ? 'Unarchive' : 'Archive'}</span>
    </button>
    
    <button
      onClick={() => {
        onDelete(conversation);
        onClose();
      }}
      className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center space-x-3 text-sm"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  </motion.div>
));

// Conversation Item Component
const ConversationItem = memo(({ conversation, onSelect, onShowActions }) => {
  const longPressTimer = useRef(null);

  const startLongPress = useCallback(() => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      onShowActions(conversation.id);
    }, LONG_PRESS_DURATION);
  }, [conversation.id, onShowActions]);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    onShowActions(conversation.id);
  }, [conversation.id, onShowActions]);

  const getStatusIcon = () => {
    if (conversation.status === 'read') {
      return <CheckCheck className="w-4 h-4 text-blue-600" />;
    } else if (conversation.status === 'delivered') {
      return <CheckCheck className="w-4 h-4 text-gray-400" />;
    } else if (conversation.status === 'sent') {
      return <Check className="w-4 h-4 text-gray-400" />;
    }
    return null;
  };

  return (
    <motion.div
      variants={slideIn}
      onContextMenu={handleContextMenu}
      onMouseDown={startLongPress}
      onMouseUp={cancelLongPress}
      onMouseLeave={cancelLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={cancelLongPress}
      onClick={() => onSelect(conversation)}
      className={`relative flex items-center gap-4 p-4 border-b border-gray-200 transition-all duration-200 hover:bg-gray-50 cursor-pointer ${
        conversation.unreadCount > 0 ? 'bg-blue-50' : 'bg-white'
      } ${conversation.pinned ? 'border-l-4 border-l-blue-600' : ''}`}
    >
      {/* Profile Picture */}
      <div className="relative flex-shrink-0">
        <img
          src={conversation.avatar || Profilepic}
          alt={conversation.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        {conversation.online && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
            {conversation.time}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {conversation.isOutgoing && getStatusIcon()}
          <p className={`text-sm truncate ${
            conversation.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'
          }`}>
            {conversation.lastMessage}
          </p>
        </div>
      </div>

      {/* Unread Badge & Icons */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {conversation.unreadCount > 0 && (
          <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          {conversation.pinned && <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />}
          {conversation.muted && <VolumeX className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
    </motion.div>
  );
});

// Empty State Component
const EmptyState = memo(({ searchQuery }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
      <Search className="w-16 h-16 text-gray-400" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      {searchQuery ? 'No Results Found' : 'No Messages Yet'}
    </h2>
    <p className="text-gray-600 text-center max-w-xs">
      {searchQuery 
        ? `No conversations match "${searchQuery}"`
        : "Start a new conversation to see it here"
      }
    </p>
  </motion.div>
));

// Filter Button Component
const FilterButton = memo(({ filter, isActive, count, onClick }) => (
  <button
    onClick={onClick}
    className={`relative top-2 mb-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
    }`}
  >
    {filter.label}
    {count > 0 && !isActive && (
      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    )}
  </button>
));

// Main Messages List Page
const MessagesListPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Gabriel A. Gordon-Mensah',
      avatar: Profilepic,
      lastMessage: 'Hey, how are you doing today?',
      time: '10:30 AM',
      unreadCount: 3,
      online: true,
      pinned: true,
      muted: false,
      archived: false,
      isOutgoing: false,
      status: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: null,
      lastMessage: 'Thanks for your help earlier!',
      time: 'Yesterday',
      unreadCount: 0,
      online: false,
      pinned: false,
      muted: false,
      archived: false,
      isOutgoing: true,
      status: 'read'
    },
    {
      id: 3,
      name: 'Michael Chen',
      avatar: null,
      lastMessage: 'Can we meet tomorrow at 3pm?',
      time: 'Yesterday',
      unreadCount: 1,
      online: true,
      pinned: false,
      muted: false,
      archived: false,
      isOutgoing: false,
      status: null
    },
    {
      id: 4,
      name: 'Project Team',
      avatar: null,
      lastMessage: 'Meeting scheduled for next week',
      time: '2 days ago',
      unreadCount: 0,
      online: false,
      pinned: true,
      muted: true,
      archived: false,
      isOutgoing: true,
      status: 'delivered'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      avatar: null,
      lastMessage: 'Did you receive my email?',
      time: '3 days ago',
      unreadCount: 0,
      online: false,
      pinned: false,
      muted: false,
      archived: true,
      isOutgoing: false,
      status: null
    }
  ]);

  // Close actions menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (selectedConversation) {
        const openMenu = document.querySelector('.conversation-actions-menu');
        if (openMenu && !openMenu.contains(e.target)) {
          setSelectedConversation(null);
        }
      }
    };

    document.addEventListener('click', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [selectedConversation]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedConversation(null);
        setConfirmDelete(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Calculate counts
  const counts = {
    unread: conversations.filter(c => c.unreadCount > 0 && !c.archived).length,
    pinned: conversations.filter(c => c.pinned && !c.archived).length,
    archived: conversations.filter(c => c.archived).length
  };

  // Filter conversations
  const filteredConversations = conversations
    .filter(c => {
      // Filter by selected filter
      if (selectedFilter === 'unread' && c.unreadCount === 0) return false;
      if (selectedFilter === 'pinned' && !c.pinned) return false;
      if (selectedFilter === 'archived' && !c.archived) return false;
      if (selectedFilter === 'all' && c.archived) return false;
      
      // Filter by search query
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Pinned conversations first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  const handleDelete = useCallback((id) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    showNotification('Conversation deleted', 'success');
  }, [showNotification]);

  const handlePin = useCallback((id) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, pinned: !c.pinned } : c
    ));
    const conv = conversations.find(c => c.id === id);
    setSelectedConversation(null);
    showNotification(conv?.pinned ? 'Conversation unpinned' : 'Conversation pinned', 'success');
  }, [conversations, showNotification]);

  const handleMute = useCallback((id) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, muted: !c.muted } : c
    ));
    const conv = conversations.find(c => c.id === id);
    setSelectedConversation(null);
    showNotification(conv?.muted ? 'Notifications enabled' : 'Notifications muted', 'info');
  }, [conversations, showNotification]);

  const handleArchive = useCallback((id) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, archived: !c.archived } : c
    ));
    const conv = conversations.find(c => c.id === id);
    setSelectedConversation(null);
    showNotification(conv?.archived ? 'Conversation unarchived' : 'Conversation archived', 'info');
  }, [conversations, showNotification]);

  const handleSelectConversation = useCallback((conversation) => {
    showNotification(`Opening chat with ${conversation.name}...`, 'info');
    setTimeout(() => {
      navigate('/messagePage');
    }, 300);
  }, [navigate, showNotification]);

  const handleBackClick = useNavigateBack('/lucid', 400);

  const handleNewMessage = useCallback(() => {
    showNotification('New message feature coming soon!', 'info');
  }, [showNotification]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          handleDelete(confirmDelete.id);
          setConfirmDelete(null);
        }}
        title="Delete Conversation?"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
        preview={confirmDelete}
        confirmText="Delete"
        confirmColor="red"
      />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            
            <motion.button
              onClick={handleNewMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map(filter => (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={selectedFilter === filter.id}
                count={counts[filter.id] || 0}
                onClick={() => setSelectedFilter(filter.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredConversations.map(conversation => (
              <div key={conversation.id} className="relative">
                <ConversationItem
                  conversation={conversation}
                  onSelect={handleSelectConversation}
                  onShowActions={setSelectedConversation}
                />
                
                {/* Actions Menu */}
                <AnimatePresence>
                  {selectedConversation === conversation.id && (
                    <ActionsMenu
                      conversation={conversation}
                      onPin={handlePin}
                      onMute={handleMute}
                      onArchive={handleArchive}
                      onDelete={setConfirmDelete}
                      onClose={() => setSelectedConversation(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </AnimatePresence>
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default memo(MessagesListPage);