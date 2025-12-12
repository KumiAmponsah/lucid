import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, SendHorizontal, Phone, Video, MoreVertical, Paperclip, Smile, Camera, Mic,
  Copy, Edit2, Trash2, X, Image, FileText, Music, Film, Check, Volume2, VolumeX
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BackToBottom from '../components/back_to_bottom_btn.jsx';
import Profilepic from '../assets/profile.svg';

export default function ChatMessagingPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey There!', sender: 'other', time: 'Today, 8:30pm', type: 'text' },
    { id: 2, text: 'How are you?', sender: 'other', time: 'Today, 8:30pm', type: 'text' },
    { id: 3, text: 'Hello!', sender: 'user', time: 'Today, 8:33pm', type: 'text' },
    { id: 4, text: 'I am fine and how are you?', sender: 'user', time: 'Today, 8:34pm', type: 'text' },
    { id: 5, text: 'I am doing well, Can we meet tomorrow?', sender: 'other', time: 'Today, 8:36pm', type: 'text' },
    { id: 6, text: 'Yes Sure!', sender: 'user', time: 'Today, 8:58pm', type: 'text' },
    { id: 7, text: 'Are you there?', sender: 'user', time: 'Today, 9:02pm', type: 'text' },
    { id: 8, text: 'Hey', sender: 'user', time: 'Today, 9:05pm', type: 'text' },
  ]);
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();

  // UI state
  const [selectedMessage, setSelectedMessage] = useState(null); // id for message menu
  const [editingMessage, setEditingMessage] = useState(null);
  const [showCopied, setShowCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmEdit, setConfirmEdit] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showCallModal, setShowCallModal] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [notification, setNotification] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [confirmClearChat, setConfirmClearChat] = useState(false);
  const [confirmBlockUser, setConfirmBlockUser] = useState(false);

  // refs
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const attachmentBtnRef = useRef(null);
  const attachmentMenuRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const emojiMenuRef = useRef(null);
  const recordingInterval = useRef(null);

  // long-press detection
  const longPressTimer = useRef(null);
  const LONG_PRESS_DURATION = 600; // ms

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '😍', '🤔', '😎', '👋', '🔥', '💯', '✨',
                 '🙏', '💪', '🎊', '😱','😒', '🤷‍♂️', '✌️', '🤣', '😎', '🥲', '🫥', '😮',
                 '😶‍🌫️', '🤐', '😌', '😓'];

  // autoscroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // recording timer
  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) clearInterval(recordingInterval.current);
      setRecordingTime(0);
    }
    return () => {
      if (recordingInterval.current) clearInterval(recordingInterval.current);
    };
  }, [isRecording]);

  // close menus when clicking/touching outside
  useEffect(() => {
    function handleOutside(e) {
      // attachment menu
      if (showAttachmentMenu) {
        if (
          attachmentMenuRef.current &&
          !attachmentMenuRef.current.contains(e.target) &&
          attachmentBtnRef.current &&
          !attachmentBtnRef.current.contains(e.target)
        ) {
          setShowAttachmentMenu(false);
        }
      }
      // emoji picker
      if (showEmojiPicker) {
        if (
          emojiMenuRef.current &&
          !emojiMenuRef.current.contains(e.target) &&
          emojiBtnRef.current &&
          !emojiBtnRef.current.contains(e.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
      // more menu in header
      if (showMoreMenu) {
        const moreMenu = document.querySelector('.header-more-menu');
        const moreBtn = document.querySelector('.header-more-btn');
        if (moreMenu && moreBtn && !moreMenu.contains(e.target) && !moreBtn.contains(e.target)) {
          setShowMoreMenu(false);
        }
      }
      // message actions menu
      if (selectedMessage) {
        const openMenu = document.querySelector('.message-actions-menu');
        if (openMenu && !openMenu.contains(e.target)) {
          setSelectedMessage(null);
        }
      }
    }

    document.addEventListener('click', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [showAttachmentMenu, showEmojiPicker, showMoreMenu, selectedMessage]);

  // close attachment menu on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setShowAttachmentMenu(false);
        setShowEmojiPicker(false);
        setShowMoreMenu(false);
        setSelectedMessage(null);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 2000);
  };

  // send message
  const handleSendMessage = () => {
    if (message.trim()) {
      if (editingMessage) {
        setMessages(messages.map(msg =>
          msg.id === editingMessage.id
            ? { ...msg, text: message, edited: true }
            : msg
        ));
        setEditingMessage(null);
      } else {
        const newMessage = {
          id: messages.length + 1,
          text: message,
          sender: 'user',
          time: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          type: 'text'
        };
        setMessages([...messages, newMessage]);
      }
      setMessage('');
      setSelectedMessage(null);
      // reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // keyboard handling in textarea: Enter sends (unless shift)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEditMessage = (msg) => {
    setConfirmEdit(msg);
    setSelectedMessage(null);
  };

  const confirmClearChatAction = () => {
    setMessages([]);
    showNotification("Chat cleared!");
    setConfirmClearChat(false);
  };

  const confirmBlockUserAction = () => {
    showNotification("User has been blocked");
    setConfirmBlockUser(false);
  };

  const confirmEditAction = () => {
    setEditingMessage(confirmEdit);
    setMessage(confirmEdit.text);
    setConfirmEdit(null);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleCopyMessage = (msg) => {
    navigator.clipboard.writeText(msg.text);
    setShowCopied(true);
    setSelectedMessage(null);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDeleteMessage = (msg) => {
    setConfirmDelete(msg);
    setSelectedMessage(null);
  };

  const confirmDeleteAction = () => {
    setMessages(messages.filter(msg => msg.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setMessage('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleEmojiClick = (emoji) => {
    // append emoji; focusing afterwards
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleAttachment = (type) => {
    const attachmentTypes = {
      image: '📷 Photo',
      document: '📄 Document',
      audio: '🎵 Audio',
      video: '🎬 Video'
    };

    const newMessage = {
      id: messages.length + 1,
      text: `[${attachmentTypes[type]} attached]`,
      sender: 'user',
      time: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: type
    };
    setMessages([...messages, newMessage]);
    showNotification(`${attachmentTypes[type]} sent successfully!`);
    setShowAttachmentMenu(false);
  };

  const handleCall = (type) => {
    setShowCallModal(type);
  };

  const endCall = () => {
    showNotification(`${showCallModal === 'voice' ? 'Voice' : 'Video'} call ended`);
    setShowCallModal(null);
  };

  const startRecording = () => {
    setIsRecording(true);
    showNotification('Recording started...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    const newMessage = {
      id: messages.length + 1,
      text: `Voice message (${recordingTime}s)`,
      sender: 'user',
      time: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'voice'
    };
    setMessages([...messages, newMessage]);
    showNotification('Voice message sent!');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // textarea autosize on input
  const handleTextareaInput = (e) => {
    setMessage(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      const maxHeight = 160; // px, ~5-6 lines
      ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px';
    }
  };

  // message bubble long-press + right-click handlers
  const openMessageMenu = (id) => {
    setSelectedMessage(id);
  };

  const startLongPress = (msgId) => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      openMessageMenu(msgId);
    }, LONG_PRESS_DURATION);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              showNotification('Navigating back...');
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/lucid_website_test');
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={Profilepic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[140px] sm:max-w-[180px]">
                Gabriel A. Gordon-Mensah
              </h1>
              <p className="text-sm text-gray-500 truncate max-w-[120px] sm:max-w-[170px]">
                Online - Last seen, 2:02pm
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCall('voice')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone className="w-6 h-6 text-orange-500" />
          </button>

          <button
            onClick={() => handleCall('video')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Video className="w-6 h-6 text-orange-500" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(prev => !prev)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors header-more-btn"
            >
              <MoreVertical className="w-6 h-6 text-orange-500" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10 min-w-48 header-more-menu">
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    showNotification(isMuted ? 'Notifications enabled' : 'Notifications muted');
                    setShowMoreMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3"
                >
                  {isMuted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'} Notifications</span>
                </button>
                <button
                  onClick={() => {
                    setConfirmClearChat(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-3"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Clear Chat</span>
                </button>

                <button
                  onClick={() => {
                    setConfirmBlockUser(true);
                    setShowMoreMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center space-x-3"
                >
                  <X className="w-5 h-5" />
                  <span>Block User</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Copied Notification */}
      {showCopied && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Message copied!
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              {showCallModal === 'video' ? (
                <Video className="w-16 h-16 text-white" />
              ) : (
                <Phone className="w-16 h-16 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Gabriel A. Gordon-Mensah</h2>
            <p className="text-gray-400">{showCallModal === 'video' ? 'Video' : 'Voice'} calling...</p>
          </div>
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center space-x-2 transition-colors"
          >
            <Phone className="w-6 h-6 rotate-135" />
            <span>End Call</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Delete Message?</h2>
            </div>
            <p className="text-gray-600 mb-2">Are you sure you want to delete this message?</p>
            <div className="bg-gray-50 p-3 rounded-lg mb-6 border border-gray-200">
              <p className="text-sm text-gray-700 italic">"{confirmDelete.text}"</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {confirmEdit && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Edit2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Message?</h2>
            </div>
            <p className="text-gray-600 mb-2">You're about to edit this message:</p>
            <div className="bg-gray-50 p-3 rounded-lg mb-6 border border-gray-200">
              <p className="text-sm text-gray-700 italic">"{confirmEdit.text}"</p>
            </div>
            <p className="text-xs text-gray-500 mb-6">The recipient will see that this message has been edited.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmEdit(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmEditAction}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear chat Confirmation Modal */}
      {confirmClearChat && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Trash2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Clear Chat?</h2>
            </div>

            <p className="text-gray-600 mb-2">
              This will delete ALL messages in this conversation.
            </p>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setConfirmClearChat(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearChatAction}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block user Confirmation Modal */}
      {confirmBlockUser && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Block User?</h2>
            </div>

            <p className="text-gray-600 mb-2">
              You will no longer receive messages, calls, or notifications from this user.
            </p>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setConfirmBlockUser(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockUserAction}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div ref={emojiMenuRef} className="absolute bottom-24 right-20 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10">
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <BackToBottom
          messagesContainerRef={messagesContainerRef}
          messagesEndRef={messagesEndRef}
        />
        {messages.map((msg, index) => {
          const showTime = index === 0 ||
            messages[index - 1].sender !== msg.sender ||
            messages[index - 1].time !== msg.time;

          return (
            <div key={msg.id}>
              <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end space-x-2 relative">
                  {msg.sender === 'other' && (
                    <div className="w-2 h-2 rounded-full bg-gray-400 mb-3 flex-shrink-0"></div>
                  )}

                  <div className="relative">
                    <div
                      // right-click + long-press triggers menu
                      onContextMenu={(e) => { e.preventDefault(); if (msg.sender === 'user') openMessageMenu(msg.id); }}
                      onMouseDown={() => startLongPress(msg.id)}
                      onMouseUp={cancelLongPress}
                      onMouseLeave={cancelLongPress}
                      onTouchStart={() => startLongPress(msg.id)}
                      onTouchEnd={cancelLongPress}
                      className={`px-4 py-3 rounded-3xl cursor-pointer transition-all max-w-[75vw] break-words whitespace-pre-wrap overflow-hidden ${
                        msg.sender === 'user'
                          ? 'bg-orange-500 text-white rounded-br-sm hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                      } ${selectedMessage === msg.id ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <p className="text-base">{msg.text}</p>
                      {msg.edited && <p className="text-xs opacity-70 mt-1">Edited</p>}
                    </div>

                    {/* Message Actions Menu */}
                    {selectedMessage === msg.id && msg.sender === 'user' && (
                      <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10 min-w-32 message-actions-menu">
                        <button
                          onClick={() => handleEditMessage(msg)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-2 text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleCopyMessage(msg)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-600 flex items-center space-x-2 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg)}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center space-x-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && <div className="w-2 h-2 rounded-full bg-orange-500 mb-3 flex-shrink-0"></div>}
                </div>
              </div>

              {showTime && (
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mt-1`}>
                  <p className={`text-xs text-gray-400 ${msg.sender === 'other' ? 'ml-6' : 'mr-6'}`}>
                    {msg.time}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Editing Indicator */}
      {editingMessage && (
        <div className="bg-blue-50 px-4 py-2 border-t border-blue-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">Editing message...</span>
          </div>
          <button
            onClick={cancelEdit}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="bg-red-50 px-4 py-2 border-t border-red-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600">Recording: {formatTime(recordingTime)}</span>
          </div>
          <button
            onClick={stopRecording}
            className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
          >
            <Check className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      )}

      {/* Message Input */}
      {/* Outer wrapper is relative so the floating attachment menu can be positioned above the bar */}
      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <div className="relative w-full">
          <div className="flex items-center space-x-3 w-full overflow-hidden">
            <div className="flex-1 flex items-center bg-blue-700 rounded-full px-3 py-2 min-w-0">
              {/* Paperclip and menu are visually inside this area, but the menu DOM is rendered after the blue bar
                  and positioned absolutely relative to the outer wrapper (so it floats above) */}
              <div className="flex items-center">
                <button
                  ref={attachmentBtnRef}
                  onClick={() => setShowAttachmentMenu(prev => !prev)}
                  aria-expanded={showAttachmentMenu}
                  aria-haspopup="menu"
                  className="p-1 hover:bg-blue-600 rounded-full transition-colors mr-2"
                >
                  <Paperclip className="w-5 h-5 text-white" />
                </button>
              </div>

              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-blue-200 outline-none min-w-0 resize-none overflow-hidden"
              />

              <button
                ref={emojiBtnRef}
                onClick={() => setShowEmojiPicker(prev => !prev)}
                className="p-1 hover:bg-blue-600 rounded-full transition-colors ml-2"
              >
                <Smile className="w-5 h-5 text-white" />
              </button>

              {!message.trim() && (
                <button
                  onClick={() => handleAttachment('image')}
                  className="p-1 hover:bg-blue-600 rounded-full transition-colors ml-2"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            <button
              onClick={message.trim() ? handleSendMessage : startRecording}
              className="bg-blue-700 p-4 rounded-full hover:bg-blue-800 transition-colors"
            >
              {message.trim() ? (
                <SendHorizontal className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Backdrop to close the menu when tapping outside (keeps consistent behavior) */}
          {showAttachmentMenu && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowAttachmentMenu(false)}
            />
          )}

          {/* Floating bubble above the button (telegram-style). Positioned relative to the outer wrapper */}
          <div
            ref={attachmentMenuRef}
            role="menu"
            aria-label="Attachments"
            className={`absolute bottom-full left-3 mb-2 w-48 flex flex-col items-stretch space-y-2 z-50 transform transition-all duration-150 ${
              showAttachmentMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
              <button
                onClick={() => { handleAttachment('image'); setShowAttachmentMenu(false); }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Photo</span>
              </button>

              <button
                onClick={() => { handleAttachment('document'); setShowAttachmentMenu(false); }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-3 mt-1"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Document</span>
              </button>

              <button
                onClick={() => { handleAttachment('audio'); setShowAttachmentMenu(false); }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-3 mt-1"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Audio</span>
              </button>

              <button
                onClick={() => { handleAttachment('video'); setShowAttachmentMenu(false); }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-3 mt-1"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
