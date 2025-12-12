import React, { useState, useEffect, useRef } from "react";
import BackToTop from '../components/back_the_top_btn.jsx';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, X, Upload, Camera, MapPin, Settings, Bell, LogOut } from "lucide-react";

export default function ClientSignProfile() {
const navigate = useNavigate();

  const [showImageUpload, setShowImageUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
   const [notification, setNotification] = useState('');

  const openImageUpload = () => {
    setShowImageUpload(true);
  };

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 2000);
  };

  const handleBackClick = () => {
  showNotification('Navigating Back...');
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate('/userEdit');
  }
};

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setShowImageUpload(false);
            setSelectedFile(null);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCancel = () => {
    setShowImageUpload(false);
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5 pb-20 md:pb-5 font-sans">
       {/* Notification Toast - Fixed to bottom */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

        <button 
          onClick={handleBackClick}
            className="absolute hidden md:inline-flex items-center top-4 left-4 md:top-6 md:left-10 p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={22} color="#2563eb"/>
            <span className="ml-1 text-lg" >Go back</span>
        </button>
        <button 
          onClick={handleBackClick}
            className="absolute md:hidden inline-flex items-center top-6 left-5 md:top-6 p-2 text-white bg-blue-600 rounded-lg"
          >
            <ArrowLeft size={22} color="white"/>
            <span className="ml-1 text-lg" >Go back</span>
        </button>

      <div className="w-full mt-16 md:mt-0 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border text-center backdrop-blur-sm animate-[fadeInUp_0.6s_ease-out]"
             style={{ boxShadow: '8px 8px 15px rgba(94, 93, 93, 0.25), 5px 5px 10px rgba(0, 0, 0, 0.25)' }}>
              
          <div className="relative w-24 h-24 mx-auto mb-4 cursor-pointer transition-transform duration-300 hover:scale-105 group"
               onClick={openImageUpload}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              GG
            </div>
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <button 
            onClick={openImageUpload}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 mx-auto mb-5 shadow-md hover:-translate-y-0.5 hover:shadow-xl">
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Gabriel Gordon-Mensah</h2>
          <p className="text-gray-500 mb-2 text-base">gordongabriel2004@gmail.com</p>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-4 h-4" />
            Achimota, Accra
          </p>

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
        <div className="flex flex-col gap-4 animate-[fadeInUp_0.6s_ease-out] [animation-delay:0.2s]">
          <Link to="/accountsettings">
          <button className="bg-white w-[28rem] md:w-[27rem] border-2 border-slate-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between text-left hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-blue-800" />
              <span className="text-gray-800 font-semibold text-base">Account Settings</span>
            </div>
            <span className="text-indigo-500 text-xl font-semibold transition-transform duration-300 hover:translate-x-1">›</span>
          </button>
          </Link>

          <Link to="/notificationsettings">
          <button className="bg-white w-[28rem] md:w-[27rem] border-2 border-slate-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between text-left hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-800" />
              <span className="text-gray-800 font-semibold text-base">Notification Settings</span>
            </div>
            <span className="text-indigo-500 text-xl font-semibold transition-transform duration-300 hover:translate-x-1">›</span>
          </button>
          </Link>

          <div className="mt-6">
            <Link to="/signin">
            <button className="bg-gradient-to-r md:w-[27rem] from-red-600 to-red-700 text-white border-none px-6 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-md hover:-translate-y-0.5 hover:shadow-xl">
              <LogOut size={20} color="white"/>
              Log out
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={handleCancel}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add an Image</h2>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? 'border-blue-600 bg-blue-50' : 'border-blue-600'
              }`}
            >
              {!isUploading ? (
                <>
                  <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                      Browse
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.webp"
                      onChange={handleFileChange}
                    />
                  </label>

                  <p className="text-gray-600 text-lg mb-2">Drop a file here</p>
                  
                  {selectedFile && !isUploading && (
                    <p className="text-green-600 font-semibold mt-4">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="relative mx-auto mb-6 w-32 h-32">
                    <svg viewBox="0 0 120 100" className="w-full h-full">
                      <path d="M10 30 L10 90 L110 90 L110 30 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
                      <path d="M10 30 L10 20 L50 20 L55 30 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2" />
                      <rect x="65" y="10" width="30" height="40" fill="white" stroke="#D1D5DB" strokeWidth="1.5" rx="2" />
                      <rect x="68" y="13" width="24" height="8" fill="#A78BFA" rx="1" />
                      <line x1="70" y1="26" x2="90" y2="26" stroke="#D1D5DB" strokeWidth="1.5" />
                      <line x1="70" y1="31" x2="90" y2="31" stroke="#D1D5DB" strokeWidth="1.5" />
                      <line x1="70" y1="36" x2="85" y2="36" stroke="#D1D5DB" strokeWidth="1.5" />
                      <rect x="88" y="42" width="8" height="8" fill="#93C5FD" rx="1" />
                    </svg>
                  </div>

                  <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xl font-semibold text-gray-700 min-w-[3rem]">
                        {uploadProgress}%
                      </span>
                    </div>
                  </div>
                </>
              )}
              
              <p className="text-sm text-gray-500 mt-6">
                <span className="text-red-500">*</span>Files supported .png, .jpg, .jpeg & .webp
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={handleSave}
                disabled={!selectedFile || isUploading}
                className={`px-12 py-3 rounded-lg font-semibold transition-colors ${
                  selectedFile && !isUploading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className={`px-12 py-3 rounded-lg font-semibold border-2 transition-colors ${
                  isUploading
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <BackToTop />
    </div>
  );
}