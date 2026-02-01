import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { 
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  Send,
  FileText,
  BookOpen,
  Video,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HelpSupport = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const handleBackClick = useNavigateBack('/provider_dashboard', 600);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'bookings', name: 'Bookings', icon: FileText },
    { id: 'payments', name: 'Payments', icon: AlertCircle },
    { id: 'account', name: 'Account', icon: Users },
    { id: 'technical', name: 'Technical', icon: HelpCircle }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I start accepting bookings?',
      answer: 'To start accepting bookings, complete your profile with all required information including your skills, hourly rate, and availability. Once approved, your profile will be visible to clients in your area.'
    },
    {
      category: 'getting-started',
      question: 'What documents do I need to provide?',
      answer: 'You need to provide a valid government ID, proof of address, and any professional certifications relevant to your trade. These help build trust with clients.'
    },
    {
      category: 'bookings',
      question: 'How do I accept or decline a booking request?',
      answer: 'When you receive a booking request, you\'ll get a notification. Open the request to view details, then tap "Accept" to confirm or "Decline" if you\'re unavailable. Always respond within 24 hours.'
    },
    {
      category: 'bookings',
      question: 'Can I reschedule a booking?',
      answer: 'Yes, you can request to reschedule a booking by contacting the client through the messaging feature. Both parties must agree on the new time.'
    },
    {
      category: 'bookings',
      question: 'What happens if a client cancels?',
      answer: 'If a client cancels more than 24 hours before the scheduled time, no penalty applies. Cancellations within 24 hours may result in a partial payment to you as compensation.'
    },
    {
      category: 'payments',
      question: 'When do I receive payment?',
      answer: 'Payments are processed within 2-3 business days after job completion. The client must confirm the job is complete before payment is released.'
    },
    {
      category: 'payments',
      question: 'What payment methods are supported?',
      answer: 'We support Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, and cash payments. You can set your preferred payment method in your account settings.'
    },
    {
      category: 'payments',
      question: 'Are there any fees?',
      answer: 'Lucid charges a service fee of 15% on completed bookings. This fee covers platform maintenance, customer support, and payment processing.'
    },
    {
      category: 'account',
      question: 'How do I update my profile?',
      answer: 'Go to Account > Account Settings to update your personal information, professional details, and service areas. Keep your profile updated to attract more clients.'
    },
    {
      category: 'account',
      question: 'How can I improve my rating?',
      answer: 'Provide excellent service, communicate clearly, arrive on time, and maintain professionalism. Respond promptly to messages and complete jobs as agreed.'
    },
    {
      category: 'technical',
      question: 'The app is not working properly',
      answer: 'Try closing and reopening the app. If issues persist, clear the app cache or update to the latest version. Contact support if problems continue.'
    },
    {
      category: 'technical',
      question: 'I\'m not receiving notifications',
      answer: 'Check your notification settings in both the app and your device settings. Ensure notifications are enabled and that Do Not Disturb mode is off.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    showNotification('Your message has been sent! We\'ll respond within 24 hours.', 'success');
    setContactForm({ subject: '', category: 'general', message: '' });
  };

  const FAQItem = ({ faq, index }) => {
    const isExpanded = expandedFaq === index;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="border-b border-gray-200 last:border-0"
      >
        <button
          onClick={() => setExpandedFaq(isExpanded ? null : index)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
        >
          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
          )}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 pb-4 px-4">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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
              <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600 mt-1">Find answers and get assistance</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Contact Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card hoverable className="text-center">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
            <Button variant="outline" size="sm" fullWidth>Start Chat</Button>
          </Card>

          <Card hoverable className="text-center">
            <div className="p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm mb-4">Mon-Fri: 8am - 6pm</p>
            <Button variant="outline" size="sm" fullWidth>+233 30 123 4567</Button>
          </Card>

          <Card hoverable className="text-center">
            <div className="p-4 bg-orange-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 text-sm mb-4">We'll respond within 24 hours</p>
            <Button variant="outline" size="sm" fullWidth>support@lucid.com</Button>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQs Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* FAQ List */}
              <div>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} index={index} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Resources */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-left">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">User Guide</h4>
                    <p className="text-sm text-gray-600">Complete platform guide</p>
                  </div>
                </button>

                <button className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-left">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Video className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Video Tutorials</h4>
                    <p className="text-sm text-gray-600">Learn through videos</p>
                  </div>
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  label="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Brief description of your issue"
                  required
                />

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Category</label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-700 border-gray-300 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="account">Account Issue</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border-2 rounded-lg text-gray-700 bg-white border-gray-300 focus:border-blue-600 focus:outline-none"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>

                <Button type="submit" loading={loading} fullWidth>
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Status Banner */}
            <Card className="bg-green-50 border-2 border-green-200 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">All Systems Operational</h4>
                  <p className="text-sm text-green-800">
                    All services are running smoothly. Average response time: 2 hours.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;