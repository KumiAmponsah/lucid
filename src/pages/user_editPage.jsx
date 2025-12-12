import React, { useState } from 'react';
import slide1 from "../assets/leftbottom.jpg"
import BackToTop from '../components/back_the_top_btn.jsx';
import { Link } from 'react-router-dom';

import { Star, Camera, Trophy, CheckCircle, Users, User, Clock, Pencil, Phone, BriefcaseBusiness, Upload, X } from 'lucide-react';

export default function User_EditPage() {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadType, setUploadType] = useState(''); // 'banner' or 'profile'
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const openImageUpload = (type) => {
    setUploadType(type);
    setShowImageUpload(true);
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
    
    // Simulate upload progress
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
    <div className="min-h-screen bg-gray-50">
  {/* Hero Section with Edit Overlay */}
      <div className="relative max-h-64 lg:min-h-72 bg-gradient-to-br from-blue-600 to-blue-400 h-60 overflow-hidden group">
        <img
          src={slide1}
          alt="banner cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay on hover */}
        <div onClick={() => openImageUpload('banner')} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50">
            <Camera className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

        {/* Profile Card */}
        <div className="relative max-w-7xl mx-auto px-4 -mt-14 z-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative">
              <div className="absolute top-2 right-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100">
                  <Phone className="inline-block mr-1 w-4 h-4" />
                  Contact for price
                </button>
              </div>
            </div>
            
             
          <div className="relative -top-14 left-1/2 transform -translate-x-1/2 group">
            <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-600 bg-gray-200 flex items-center justify-center overflow-hidden relative">
              <User size={48} className="text-gray-400" />
              <div onClick={() => openImageUpload('banner')} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-full">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

           
          <div className="flex items-start justify-start space-x-3 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Gabriel A. Gordon-Mensah</h1>
            <Link to="/editprofile">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <Pencil className="w-5 h-5 text-blue-600" />
            </button>
            </Link>
          </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="font-semibold text-blue-600">4.0</span>
                <span className="text-gray-500 text-sm">(30 reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BriefcaseBusiness className="w-4 h-4 text-blue-600" />
                <span>Web Developer</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              I'm a Frontend developer with 3-5 years of experience building responsive web applications using React, Vue, and JavaScript/TypeScript. I create accessible, high-performance interfaces with clean code and ... more
            </p>
            <div className="flex space-x-3">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">UI/UX Design</span>
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React</span>
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">TypeScript</span>
            </div>
          </div>
        </div>
  

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow p-6 relative group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-black font-bold">Overview</h2>
              <Link to="/editprofile">
              <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <Pencil className="w-5 h-5 text-blue-600" />
              </button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Hired 50 Times</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">User has been verified</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">14 employees</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">2 years experience</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6 relative group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-black font-bold">Payment Methods</h2>
              <Link to="/editprofile">
              <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <Pencil className="w-5 h-5 text-blue-600" />
              </button>
              </Link>
            </div>
            <p className="text-gray-700">This user accepts Cash, Mobile Money, Bank transfer</p>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg shadow p-6 relative group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-black font-bold">Working Hour</h2>
              <Link to="/editprofile">
              <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <Pencil className="w-5 h-5 text-blue-600" />
              </button>
              </Link>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>Weekdays: 9am - 5pm</p>
              <p>Weekends: N/A</p>
            </div>
          </div>
        </div>


       {/* Image Upload */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
            {/* Close Button */}
            <button 
              onClick={handleCancel}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add an Image</h2>

            {/* Upload Area */}
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
                  {/* Folder Icon */}
                  <div className="relative mx-auto mb-6 w-32 h-32">
                    <svg viewBox="0 0 120 100" className="w-full h-full">
                      {/* Folder body */}
                      <path
                        d="M10 30 L10 90 L110 90 L110 30 Z"
                        fill="#6B7280"
                        stroke="#4B5563"
                        strokeWidth="2"
                      />
                      {/* Folder tab */}
                      <path
                        d="M10 30 L10 20 L50 20 L55 30 Z"
                        fill="#9CA3AF"
                        stroke="#4B5563"
                        strokeWidth="2"
                      />
                      {/* Document */}
                      <rect
                        x="65"
                        y="10"
                        width="30"
                        height="40"
                        fill="white"
                        stroke="#D1D5DB"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      {/* Document header */}
                      <rect x="68" y="13" width="24" height="8" fill="#A78BFA" rx="1" />
                      {/* Document lines */}
                      <line x1="70" y1="26" x2="90" y2="26" stroke="#D1D5DB" strokeWidth="1.5" />
                      <line x1="70" y1="31" x2="90" y2="31" stroke="#D1D5DB" strokeWidth="1.5" />
                      <line x1="70" y1="36" x2="85" y2="36" stroke="#D1D5DB" strokeWidth="1.5" />
                      {/* Document accent */}
                      <rect x="88" y="42" width="8" height="8" fill="#93C5FD" rx="1" />
                    </svg>
                  </div>

                  {/* Progress Bar */}
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

            {/* Action Buttons */}
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
       

      </div>
      <BackToTop />
      </div>      
  );
}