import React, { useState } from 'react';
import { Edit2, Save, X, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BackToTop from '../components/back_the_top_btn.jsx';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'save', 'deactivate', 'delete'
  const [verificationInput, setVerificationInput] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    otherName: 'Michael',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    region: 'Accra',
    city: 'Tema'
  });

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      showNotification('Edit mode enabled');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setVerificationInput('');
  };

  const closeModal = () => {
    setShowModal(false);
    setVerificationInput('');
  };

  const handleModalConfirm = () => {
    if (modalType === 'save') {
      setIsEditing(false);
      showNotification('Changes saved successfully!');
      console.log('Saved data:', formData);
      closeModal();
    } else if (modalType === 'deactivate') {
      if (verificationInput.toLowerCase() === 'deactivate') {
        showNotification('Account deactivated successfully');
        closeModal();
        // Add deactivation logic here
      } else {
        showNotification('Incorrect verification text');
      }
    } else if (modalType === 'delete') {
      if (verificationInput.toLowerCase() === 'delete') {
        showNotification('Account deletion request submitted');
        closeModal();
        // Add deletion logic here
      } else {
        showNotification('Incorrect verification text');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    showNotification('Changes cancelled');
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'save':
        return {
          icon: <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />,
          title: 'Confirm Changes',
          message: 'Are you sure you want to save these changes to your account?',
          confirmText: 'Save Changes',
          confirmColor: 'bg-blue-600 hover:bg-blue-700',
          showInput: false
        };
      case 'deactivate':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />,
          title: 'Deactivate Account',
          message: 'This will temporarily disable your account. You can reactivate it by logging in again.',
          verificationText: 'DEACTIVATE',
          placeholder: 'Type "DEACTIVATE" to confirm',
          confirmText: 'Deactivate Account',
          confirmColor: 'bg-blue-600 hover:bg-blue-700',
          showInput: true
        };
      case 'delete':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />,
          title: 'Delete Account',
          message: 'This action cannot be undone. All your data will be permanently deleted.',
          verificationText: 'DELETE',
          placeholder: 'Type "DELETE" to confirm',
          confirmText: 'Delete Account',
          confirmColor: 'bg-red-600 hover:bg-red-700',
          showInput: true
        };
      default:
        return {};
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="bg-white min-h-screen flex justify-center items-start p-8">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          {notification}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            {modalContent.icon}
            
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {modalContent.title}
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              {modalContent.message}
            </p>

            {modalContent.showInput && (
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  Type <span className="font-bold text-gray-900">{modalContent.verificationText}</span> to confirm:
                </p>
                <input
                  type="text"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                  placeholder={modalContent.placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-medium px-6 py-3 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirm}
                disabled={modalContent.showInput && verificationInput.toLowerCase() !== modalContent.verificationText.toLowerCase()}
                className={`flex-1 ${modalContent.confirmColor} text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {modalContent.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl w-full bg-white rounded-xl p-8 shadow-lg">
        <button 
          onClick={() => {
            showNotification('Navigating back...');
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/'); // fallback home page
            }
          }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        {/* User Information Section */}
        <div className="relative pb-4 mb-8 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="flex-1 text-center text-2xl font-semibold text-gray-800">
              User Information
            </h2>
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 bg-transparent hover:bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-md transition-all duration-200"
              >
                <Edit2 size={20} />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          {/* First and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                  isEditing
                    ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                  isEditing
                    ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Other Name */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-gray-400 text-sm font-medium">Other Name</label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                isEditing
                  ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-gray-400 text-sm font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                isEditing
                  ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                isEditing
                  ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="pb-4 mb-8 border-b border-gray-200">
          <h2 className="text-center text-2xl font-semibold text-gray-800">Location</h2>
        </div>

        <div className="mb-12">
          {/* Region and City Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm font-medium">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                  isEditing
                    ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm font-medium">City/Town</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`px-4 py-3 border rounded-md text-base transition-all duration-200 ${
                  isEditing
                    ? 'bg-white text-gray-700 border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    : 'bg-gray-50 text-gray-600 border-gray-300 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Account Status Section - Only show when not editing */}
        {!isEditing && (
          <div className="transition-all duration-300 ease-in-out">
            <div className="mb-4">
              <h2 className="text-center text-2xl font-semibold text-gray-800">
                Account Status
              </h2>
            </div>

            <div className="pt-8">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => openModal('deactivate')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg min-w-[160px]"
                >
                  Deactivate Account
                </button>
                <button
                  onClick={() => openModal('delete')}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg min-w-[160px]"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save/Cancel Buttons - Only show when editing */}
        {isEditing && (
          <div className="pt-8 transition-all duration-300 ease-in-out animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => openModal('save')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg min-w-[160px] flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white border-2 border-blue-600 font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg min-w-[160px] flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
      <BackToTop />
    </div>
  );
};

export default AccountSettings;