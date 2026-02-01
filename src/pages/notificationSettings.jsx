import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { 
  ArrowLeft,
  Bell,
  MessageSquare,
  Mail,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Shield,
  Volume2,
  Smartphone,
  Save
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const NotificationSettings = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const handleBackClick = useNavigateBack('/provider_dashboard', 400);
    

  const [settings, setSettings] = useState({
    // Push Notifications
    pushBookingRequests: true,
    pushMessages: true,
    pushPayments: true,
    pushReviews: true,
    pushReminders: true,
    pushPromotions: false,
    
    // Email Notifications
    emailBookingConfirm: true,
    emailMessages: false,
    emailPayments: true,
    emailWeeklySummary: true,
    emailMonthlyReport: true,
    emailPromotions: false,
    emailTips: true,
    
    // SMS Notifications
    smsBookingRequests: true,
    smsPayments: true,
    smsReminders: true,
    smsPromotions: false,
    
    // Sound & Vibration
    soundEnabled: true,
    vibrationEnabled: true,
    
    // Do Not Disturb
    dndEnabled: false,
    dndStart: '22:00',
    dndEnd: '07:00'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTimeChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    showNotification('Notification settings saved successfully!', 'success');
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  const NotificationItem = ({ icon: Icon, title, description, settingKey }) => (
    <div className="flex items-start justify-between py-4 border-b border-gray-200 last:border-0">
      <div className="flex gap-4 flex-1">
        <div className="p-2 bg-blue-50 rounded-lg h-fit">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ToggleSwitch
        enabled={settings[settingKey]}
        onChange={() => handleToggle(settingKey)}
      />
    </div>
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
              <p className="text-gray-600 mt-1">Customize how you receive notifications</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Push Notifications */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Push Notifications</h2>
            </div>
            <div className="space-y-2">
              <NotificationItem
                icon={Calendar}
                title="Booking Requests"
                description="Get notified when clients request your services"
                settingKey="pushBookingRequests"
              />
              <NotificationItem
                icon={MessageSquare}
                title="Messages"
                description="Receive alerts for new messages from clients"
                settingKey="pushMessages"
              />
              <NotificationItem
                icon={DollarSign}
                title="Payments"
                description="Get notified about payment confirmations and receipts"
                settingKey="pushPayments"
              />
              <NotificationItem
                icon={Star}
                title="Reviews & Ratings"
                description="Know when clients leave reviews for your work"
                settingKey="pushReviews"
              />
              <NotificationItem
                icon={Bell}
                title="Reminders"
                description="Receive reminders for upcoming appointments"
                settingKey="pushReminders"
              />
              <NotificationItem
                icon={TrendingUp}
                title="Promotions"
                description="Get updates about special offers and promotions"
                settingKey="pushPromotions"
              />
            </div>
          </Card>
        </motion.div>

        {/* Email Notifications */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Email Notifications</h2>
            </div>
            <div className="space-y-2">
              <NotificationItem
                icon={Calendar}
                title="Booking Confirmations"
                description="Receive email confirmations for all bookings"
                settingKey="emailBookingConfirm"
              />
              <NotificationItem
                icon={MessageSquare}
                title="Message Summaries"
                description="Get daily summaries of your messages"
                settingKey="emailMessages"
              />
              <NotificationItem
                icon={DollarSign}
                title="Payment Receipts"
                description="Receive detailed payment receipts via email"
                settingKey="emailPayments"
              />
              <NotificationItem
                icon={TrendingUp}
                title="Weekly Summary"
                description="Get a weekly summary of your performance"
                settingKey="emailWeeklySummary"
              />
              <NotificationItem
                icon={TrendingUp}
                title="Monthly Report"
                description="Receive comprehensive monthly performance reports"
                settingKey="emailMonthlyReport"
              />
              <NotificationItem
                icon={Star}
                title="Tips & Best Practices"
                description="Get helpful tips to improve your service"
                settingKey="emailTips"
              />
              <NotificationItem
                icon={TrendingUp}
                title="Marketing Emails"
                description="Receive promotional offers and news"
                settingKey="emailPromotions"
              />
            </div>
          </Card>
        </motion.div>

        {/* SMS Notifications */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">SMS Notifications</h2>
            </div>
            <div className="space-y-2">
              <NotificationItem
                icon={Calendar}
                title="Booking Alerts"
                description="Get SMS alerts for urgent booking requests"
                settingKey="smsBookingRequests"
              />
              <NotificationItem
                icon={DollarSign}
                title="Payment Confirmations"
                description="Receive SMS for payment confirmations"
                settingKey="smsPayments"
              />
              <NotificationItem
                icon={Bell}
                title="Appointment Reminders"
                description="Get SMS reminders 1 hour before appointments"
                settingKey="smsReminders"
              />
              <NotificationItem
                icon={TrendingUp}
                title="Promotional SMS"
                description="Receive promotional messages via SMS"
                settingKey="smsPromotions"
              />
            </div>
          </Card>
        </motion.div>

        {/* Sound & Vibration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Sound & Vibration</h2>
            </div>
            <div className="space-y-2">
              <NotificationItem
                icon={Volume2}
                title="Notification Sounds"
                description="Play sound when notifications arrive"
                settingKey="soundEnabled"
              />
              <NotificationItem
                icon={Smartphone}
                title="Vibration"
                description="Vibrate device for notifications"
                settingKey="vibrationEnabled"
              />
            </div>
          </Card>
        </motion.div>

        {/* Do Not Disturb */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Do Not Disturb</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Silence notifications during specific hours
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.dndEnabled}
                onChange={() => handleToggle('dndEnabled')}
              />
            </div>
            
            {settings.dndEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings.dndStart}
                    onChange={(e) => handleTimeChange('dndStart', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings.dndEnd}
                    onChange={(e) => handleTimeChange('dndEnd', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
          className="sticky bottom-4"
        >
          <Button
            onClick={handleSaveSettings}
            loading={loading}
            size="lg"
            fullWidth
          >
            <Save className="w-5 h-5" />
            Save Notification Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationSettings;