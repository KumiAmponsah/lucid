import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  MapPin,
  DollarSign,
  User,
  MoreVertical,
  Eye,
  MessageCircle,
  Star,
  X,
  Phone,
  Mail,
  FileText,
  Image as ImageIcon,
  ThumbsUp,
  ThumbsDown,
  Navigation
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ProviderBookings = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleBackClick = useCallback(() => {
    showNotification('Going Back', 'info');
    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/dashboard');
      }
    }, 600);
  }, [showNotification, navigate]);

  // Mock task data with full details
  const tasks = useMemo(() => [
    {
      id: 1,
      title: 'Plumbing Repair',
      client: 'John Mensah',
      status: 'pending',
      date: '2025-12-20',
      time: '10:00 AM',
      location: 'Spintex, Accra',
      price: 250,
      description: 'Fix leaking kitchen sink that has been dripping for 2 weeks. Also need to check water pressure in the bathroom.',
      duration: '2 hours',
      urgency: 'normal',
      contactPhone: '+233 24 123 4567',
      contactEmail: 'john.mensah@email.com',
      address: '123 Main Street, House 45',
      area: 'Spintex',
      city: 'Accra',
      landmark: 'Near Total Gas Station',
      postalCode: 'GA-123-4567',
      budgetMin: 200,
      budgetMax: 300,
      alternateDate: '2025-12-21',
      alternateTime: '2:00 PM',
      estimatedDuration: '2-3 hours',
      additionalNotes: 'Please bring all necessary tools. I will be available all day.',
      images: [] // Would contain uploaded images
    },
    {
      id: 2,
      title: 'Electrical Installation',
      client: 'Grace Osei',
      status: 'in-progress',
      date: '2025-12-19',
      time: '2:00 PM',
      location: 'North Ridge, Accra',
      price: 450,
      description: 'Install new ceiling fan and lights in living room and bedroom',
      duration: '4 hours',
      urgency: 'normal',
      contactPhone: '+233 20 987 6543',
      contactEmail: 'grace.osei@email.com',
      address: '456 Oak Avenue, Apartment 2B',
      area: 'North Ridge',
      city: 'Accra',
      landmark: 'Behind Ridge Hospital',
      postalCode: 'GA-456-7890',
      budgetMin: 400,
      budgetMax: 500,
      estimatedDuration: '4-5 hours',
      additionalNotes: 'Fan and lights already purchased. Just need installation.',
      images: []
    },
    {
      id: 3,
      title: 'Carpentry Work',
      client: 'Kwame Asante',
      status: 'completed',
      date: '2025-12-18',
      time: '9:00 AM',
      location: 'Madina, Accra',
      price: 380,
      description: 'Build custom bookshelf with 5 shelves to fit specific wall space',
      duration: '6 hours',
      rating: 5,
      urgency: 'normal',
      contactPhone: '+233 27 555 1234',
      contactEmail: 'kwame.asante@email.com',
      address: '789 Elm Street',
      area: 'Madina',
      city: 'Accra',
      landmark: 'Near Madina Market',
      budgetMin: 350,
      budgetMax: 400,
      estimatedDuration: '1 day',
      additionalNotes: 'Wood specifications: Oak, dark finish. Measurements provided.',
      images: []
    },
    {
      id: 4,
      title: 'AC Maintenance',
      client: 'Sarah Johnson',
      status: 'cancelled',
      date: '2025-12-17',
      time: '3:00 PM',
      location: 'Osu, Accra',
      price: 200,
      description: 'Annual AC servicing for 3 units',
      duration: '1.5 hours',
      urgency: 'normal',
      contactPhone: '+233 24 777 8888',
      contactEmail: 'sarah.johnson@email.com',
      address: '321 Beach Road',
      area: 'Osu',
      city: 'Accra',
      budgetMin: 150,
      budgetMax: 250,
      estimatedDuration: '2 hours',
      additionalNotes: 'Client cancelled due to schedule conflict.',
      images: []
    },
    {
      id: 5,
      title: 'Painting Project',
      client: 'Michael Owusu',
      status: 'pending',
      date: '2025-12-21',
      time: '8:00 AM',
      location: 'Tema, Greater Accra',
      price: 800,
      description: 'Paint entire 3-bedroom apartment - walls and ceilings. Fresh coat needed.',
      duration: '2 days',
      urgency: 'urgent',
      contactPhone: '+233 26 333 4444',
      contactEmail: 'michael.owusu@email.com',
      address: '567 Community 5, Flat 12',
      area: 'Tema',
      city: 'Greater Accra',
      landmark: 'Tema Community 5',
      budgetMin: 700,
      budgetMax: 900,
      estimatedDuration: '2-3 days',
      additionalNotes: 'Paint colors already selected. Need primer coat on all walls first.',
      images: []
    },
    {
      id: 6,
      title: 'Door Lock Replacement',
      client: 'Ama Frimpong',
      status: 'completed',
      date: '2025-12-16',
      time: '11:00 AM',
      location: 'Achimota, Accra',
      price: 150,
      description: 'Replace main door lock with new security lock',
      duration: '1 hour',
      rating: 4,
      urgency: 'emergency',
      contactPhone: '+233 55 999 0000',
      contactEmail: 'ama.frimpong@email.com',
      address: '890 Achimota Road',
      area: 'Achimota',
      city: 'Accra',
      budgetMin: 100,
      budgetMax: 200,
      estimatedDuration: '1 hour',
      additionalNotes: 'Lock was broken. Needed urgent replacement for security.',
      images: []
    }
  ], []);

  const filterButtons = [
    { id: 'all', label: 'All Tasks', count: tasks.length },
    { id: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
    { id: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: tasks.filter(t => t.status === 'cancelled').length }
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, searchQuery]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock,
        label: 'Pending'
      },
      'in-progress': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: AlertCircle,
        label: 'In Progress'
      },
      completed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'Completed'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle,
        label: 'Cancelled'
      }
    };
    return configs[status];
  };

  const getUrgencyConfig = (urgency) => {
    const configs = {
      normal: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Normal' },
      urgent: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Urgent' },
      emergency: { bg: 'bg-red-100', text: 'text-red-700', label: 'Emergency' }
    };
    return configs[urgency] || configs.normal;
  };

  const handleAcceptTask = (taskId) => {
    showNotification('Task accepted successfully!', 'success');
    setSelectedTask(null);
    // Update task status in backend
  };

  const handleDeclineTask = (taskId) => {
    showNotification('Task declined', 'info');
    setSelectedTask(null);
    // Update task status in backend
  };

  const TaskCard = ({ task }) => {
    const statusConfig = getStatusConfig(task.status);
    const StatusIcon = statusConfig.icon;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        whileHover={{ scale: 1.01 }}
      >
        <Card hoverable className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{task.client}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{task.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{task.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{task.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{task.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-xl font-bold text-gray-900">GH₵{task.price}</span>
            </div>
            <div className="flex gap-2">
              {task.status === 'completed' && task.rating && (
                <div className="flex items-center gap-1 mr-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{task.rating}.0</span>
                </div>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedTask(task)}
              >
                <Eye className="w-4 h-4" />
                Details
              </Button>
              {task.status !== 'cancelled' && (
                <Link to='/messagePage'>
                  <Button size="sm">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  // Task Details Modal
  const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    const statusConfig = getStatusConfig(task.status);
    const urgencyConfig = getUrgencyConfig(task.urgency);
    const StatusIcon = statusConfig.icon;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyConfig.bg} ${urgencyConfig.text}`}>
                    {urgencyConfig.label}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Client Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-semibold text-gray-900">{task.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a href={`tel:${task.contactPhone}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {task.contactPhone}
                    </a>
                  </div>
                  {task.contactEmail && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href={`mailto:${task.contactEmail}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {task.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Job Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{task.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Duration</p>
                      <p className="font-semibold text-gray-900">{task.estimatedDuration || task.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                      <p className="font-semibold text-gray-900">
                        GH₵{task.budgetMin} - GH₵{task.budgetMax}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Quoted Price</p>
                      <p className="font-semibold text-green-600 text-lg">GH₵{task.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Preferred Date & Time</p>
                    <p className="font-semibold text-gray-900">{task.date} at {task.time}</p>
                  </div>
                  {task.alternateDate && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Alternate Date & Time</p>
                      <p className="font-semibold text-gray-900">{task.alternateDate} at {task.alternateTime}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Location
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="font-semibold text-gray-900">{task.address}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Area</p>
                      <p className="font-semibold text-gray-900">{task.area}, {task.city}</p>
                    </div>
                    {task.landmark && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Landmark</p>
                        <p className="font-semibold text-gray-900">{task.landmark}</p>
                      </div>
                    )}
                  </div>
                  {task.postalCode && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Postal Code</p>
                      <p className="font-semibold text-gray-900">{task.postalCode}</p>
                    </div>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.address + ', ' + task.area + ', ' + task.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Navigation className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Additional Notes */}
              {task.additionalNotes && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Notes</h3>
                  <p className="text-gray-900 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    {task.additionalNotes}
                  </p>
                </div>
              )}

              {/* Images */}
              {task.images && task.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Attached Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {task.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              {task.status === 'pending' && (
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleAcceptTask(task.id)}
                    size="md"
                    className="flex-1"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Accept Booking
                  </Button>
                  <Button
                    onClick={() => handleDeclineTask(task.id)}
                    variant="danger"
                    size="md"
                    className="flex-1"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Decline
                  </Button>
                </div>
              )}
              {task.status === 'in-progress' && (
                <div className="flex gap-4">
                  <Link to="/messagePage" className="flex-1">
                    <Button size="md" fullWidth>
                      <MessageCircle className="w-5 h-5" />
                      Message Client
                    </Button>
                  </Link>
                </div>
              )}
              {task.status === 'completed' && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Job Completed</span>
                  </div>
                  {task.rating && (
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-gray-600">Client Rating:</span>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{task.rating}.0</span>
                    </div>
                  )}
                </div>
              )}
              {task.status === 'cancelled' && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Booking Cancelled</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-gray-600 mt-1">Manage all your bookings and appointments</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, client, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white/20'
                    : 'bg-gray-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "You don't have any tasks in this category"}
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
};

export default ProviderBookings;