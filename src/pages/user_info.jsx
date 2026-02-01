import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Globe,
  Calendar,
  Save,
  Lock,
  Shield,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const UserInfo = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const handleBackClick = useNavigateBack('/lucid_website_test', 400);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Gabriel',
    lastName: 'Gordon-Mensah',
    email: 'gordongabriel2004@gmail.com',
    phone: '+233 24 123 4567',
    dateOfBirth: '2004-01-15',
    gender: 'male'
  });

  const [locationInfo, setLocationInfo] = useState({
    address: '123 Main Street',
    city: 'Accra',
    region: 'Greater Accra',
    area: 'Achimota',
    postalCode: 'GA-123-4567'
  });

  

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleLocationInfoChange = (e) => {
    setLocationInfo({ ...locationInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handleSavePersonalInfo = async () => {
    setLoading(true);
    // Simulate API call
    setLoading(true);
     try {
    // simulate save (replace with API call later)
    await new Promise(resolve => setTimeout(resolve, 2000));

    showNotification('Personal information updated successfully!', 'success');
  } catch (error) {
    showNotification('Failed to update personal information', 'error');
  } finally {
    setLoading(false);
  }
  };

  const handleSaveLocationInfo = async () => {
    setLoading(true);
     try {
    // simulate save (replace with API call later)
    await new Promise(resolve => setTimeout(resolve, 2000));

    showNotification('Location information updated successfully!', 'success');
  } catch (error) {
    showNotification('Failed to update location information', 'error');
  } finally {
    setLoading(false);
  }
  };

  

  const handleChangePassword = async () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    if (passwordInfo.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters!', 'error');
      return;
    }
    setLoading(true);
     try {
    // simulate save (replace with API call later)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPasswordInfo({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showNotification('Password changed successfully!', 'success');
  } catch (error) {
    showNotification('Failed to change profile', 'error');
  } finally {
    setLoading(false);
  }
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action can be reversed within 30 days.')) {
      showNotification('Account deactivation requested. Check your email for confirmation.', 'warning');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ WARNING: This will permanently delete your account and all data. This action CANNOT be undone. Type "DELETE" to confirm.')) {
      showNotification('Account deletion initiated. Check your email to complete the process.', 'error');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'danger', label: 'Account', icon: AlertCircle }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-1"
          >
            <Card className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-3 space-y-6"
          >
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    required
                    endIcon={<Mail className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    required
                    endIcon={<Phone className="w-5 h-5 text-gray-400" />}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={handlePersonalInfoChange}
                    />
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-gray-700">Gender</label>
                      <select
                        name="gender"
                        value={personalInfo.gender}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-4 py-3 text-gray-700 bg-white border-2 rounded-lg border-gray-300 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    onClick={handleSavePersonalInfo}
                    loading={loading}
                    className="mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {/* Location Information */}
            {activeTab === 'location' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    name="address"
                    value={locationInfo.address}
                    onChange={handleLocationInfoChange}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={locationInfo.city}
                      onChange={handleLocationInfoChange}
                      required
                    />
                    <Input
                      label="Region"
                      name="region"
                      value={locationInfo.region}
                      onChange={handleLocationInfoChange}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Area"
                      name="area"
                      value={locationInfo.area}
                      onChange={handleLocationInfoChange}
                      required
                    />
                    <Input
                      label="Postal Code"
                      name="postalCode"
                      value={locationInfo.postalCode}
                      onChange={handleLocationInfoChange}
                    />
                  </div>
                  <Button
                    onClick={handleSaveLocationInfo}
                    loading={loading}
                    className="mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <Input
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordInfo.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      endIcon={<Lock className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordInfo.newPassword}
                      onChange={handlePasswordChange}
                      required
                      helperText="Must be at least 8 characters"
                      endIcon={<Lock className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordInfo.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      endIcon={<Lock className="w-5 h-5 text-gray-400" />}
                    />
                    <Button
                      onClick={handleChangePassword}
                      loading={loading}
                      className="mt-4"
                    >
                      <Shield className="w-4 h-4" />
                      Change Password
                    </Button>
                  </div>
                </Card>

                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
                  <p className="text-gray-600 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </Card>
              </div>
            )}

            {/* Danger Zone */}
            {activeTab === 'danger' && (
              <div className="space-y-6">
                <Card className="border-2 border-yellow-200 bg-yellow-50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Deactivate Account</h2>
                  <p className="text-gray-700 mb-4">
                    Temporarily deactivate your account. You can reactivate it within 30 days by logging in again.
                  </p>
                  <Button variant="secondary" onClick={handleDeactivateAccount}>
                    Deactivate Account
                  </Button>
                </Card>

                <Card className="border-2 border-red-200 bg-red-50">
                  <h2 className="text-2xl font-bold text-red-900 mb-4">Delete Account</h2>
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-900 mb-1">Warning: This action is permanent</h3>
                        <p className="text-red-800 text-sm">
                          Deleting your account will permanently remove all your data, including bookings, reviews, and messages. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="danger" onClick={handleDeleteAccount}>
                    <Trash2 className="w-4 h-4" />
                    Permanently Delete Account
                  </Button>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;