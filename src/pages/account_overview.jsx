import React, { useState, useCallback } from "react";
import BackToTop from '../components/back_the_top_btn.jsx';
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext.jsx";
import { useImageUpload } from "../hooks/useImageUpload";
import ImageUploadModal from "../components/ImageUploadModal";
import { 
  ArrowLeft, 
  Upload, 
  Camera, 
  MapPin, 
  Settings, 
  Bell, 
  LogOut, 
  History, 
  ClipboardList,
  DollarSign,
  HelpCircle,
  ChevronRight
} from "lucide-react";

function AccountOverview() {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const upload = useImageUpload();

  const handleBackClick = useCallback(() => {
    showNotification('Going Back', 'info');
    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/dashboard');
      }
    }, 800);
  }, [showNotification, navigate]);

  // Navigation items configuration
  const navigationItems = [
    {
      to: "/User_info",
      icon: Settings,
      label: "Account Settings",
      description: "Manage your personal information"
    },
    {
      to: "/provider_bookings",
      icon: ClipboardList,
      label: "My Tasks",
      description: "View and manage bookings"
    },
    {
      to: "/earnings",
      icon: DollarSign,
      label: "Earnings & Payments",
      description: "Track earnings and withdrawals"
    },
    {
      to: "/history",
      icon: History,
      label: "History",
      description: "View past jobs and transactions"
    },
    {
      to: "/notification-settings",
      icon: Bell,
      label: "Notification Settings",
      description: "Customize your notifications"
    },
    {
      to: "/help",
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5 pb-20 md:pb-5 font-sans">
      {/* Back Button - Desktop */}
      <button 
        onClick={handleBackClick}
        className="absolute hidden md:inline-flex items-center top-4 left-4 md:top-6 md:left-10 p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft size={22} className="text-blue-600" />
        <span className="ml-1 text-lg">Go back</span>
      </button>

      {/* Back Button - Mobile */}
      <button 
        onClick={handleBackClick}
        className="absolute md:hidden inline-flex items-center top-6 left-5 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft size={22} className="text-white" />
        <span className="ml-1 text-lg">Go back</span>
      </button>

      <div className="w-full mt-16 md:mt-0 max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {/* Profile Card */}
        <div 
          className="md:col-span-2 bg-white rounded-3xl p-8 shadow-custom border text-center backdrop-blur-sm animate-fade-in"
        >
          {/* Profile Picture with Hover Effect */}
          <div 
            className="relative w-24 h-24 mx-auto mb-4 cursor-pointer transition-transform duration-300 hover:scale-105 group"
            onClick={upload.openModal}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              GG
            </div>
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Upload Button */}
          <button 
            onClick={upload.openModal}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 mx-auto mb-5 shadow-md hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Gabriel Gordon-Mensah
          </h2>
          <p className="text-gray-500 mb-2 text-base">
            gordongabriel2004@gmail.com
          </p>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-4 h-4" />
            Achimota, Accra
          </p>

          {/* Stats */}
          <div className="flex justify-around items-center bg-slate-50 rounded-2xl p-5 mt-4 border border-slate-200">
            <div className="text-center flex-1">
              <p className="text-gray-500 text-sm mb-1">Completed Projects</p>
              <p className="text-indigo-500 text-2xl font-bold">10</p>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="text-center flex-1">
              <p className="text-gray-500 text-sm mb-1">Active Projects</p>
              <p className="text-indigo-500 text-2xl font-bold">1</p>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div 
          className="md:col-span-3 flex flex-col gap-4 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link 
                key={index}
                to={item.to} 
                className="bg-white w-full border-2 border-slate-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between text-left hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-xl group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-semibold text-base block mb-1">
                      {item.label}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="mt-2">
            <Link 
              to="/signin"
              className="bg-gradient-to-r w-full from-red-600 to-red-700 text-white px-6 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 hover:shadow-xl"
            >
              <LogOut size={20} />
              Log out
            </Link>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        open={upload.open}
        onClose={upload.closeModal}
        dragActive={upload.dragActive}
        onDrag={upload.onDrag}
        onDrop={upload.onDrop}
        onFileChange={upload.onFileChange}
        selectedFile={upload.selectedFile}
        isUploading={upload.isUploading}
        uploadProgress={upload.uploadProgress}
        onSave={upload.onSave}
        title="Upload Image"
      />

      <BackToTop />
    </div>
  );
}

export default AccountOverview;