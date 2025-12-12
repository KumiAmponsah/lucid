import React, { useState } from 'react';
import profileImage from '../assets/male-profile-picture-symbol-vector.png';
import { useNavigate } from "react-router-dom";
import BackToTop from '../components/back_the_top_btn.jsx';
import { CirclePlus, CheckCircle, Users, Clock, X, Upload, SquarePlus, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const EditProfile = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    otherName: '',
    occupation: '',
    pricingType: 'set',
    amount: 0,
    description: '',
    tags: [],
    workExperience: 0,
    paymentMethod: 'mobile',
    employees: 1,
    selectedDays: {
      weekdays: false,
      weekend: false,
      custom: false
    },
    showCustomDays: false,
    weekdaysTime: { start: '09:00', end: '17:00' },
    weekendTime: { start: '10:00', end: '16:00' },
    customDays: {
      sunday: { selected: false, start: '09:00', end: '17:00' },
      monday: { selected: false, start: '09:00', end: '17:00' },
      tuesday: { selected: false, start: '09:00', end: '17:00' },
      wednesday: { selected: false, start: '09:00', end: '17:00' },
      thursday: { selected: false, start: '09:00', end: '17:00' },
      friday: { selected: false, start: '09:00', end: '17:00' },
      saturday: { selected: false, start: '09:00', end: '17:00' }
    }
  });

  const [newTag, setNewTag] = useState('');

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

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

const [tagInputs, setTagInputs] = useState([{ id: 1, value: '' }]);

const addTagInput = () => {
  const newId = Math.max(...tagInputs.map(t => t.id), 0) + 1;
  setTagInputs([...tagInputs, { id: newId, value: '' }]);
};

const removeTagInput = (id) => {
  if (tagInputs.length > 1) {
    setTagInputs(tagInputs.filter(input => input.id !== id));
  }
};

const updateTagInput = (id, value) => {
  setTagInputs(tagInputs.map(input => 
    input.id === id ? { ...input, value } : input
  ));
};

  const toggleCustomDays = () => {
    setProfile(prev => ({ ...prev, showCustomDays: !prev.showCustomDays }));
  };

  const handleDaySelection = (dayType) => {
    setProfile(prev => {
      const newSelectedDays = { ...prev.selectedDays };
      
      
      if (dayType === 'custom') {
        if (!prev.selectedDays.custom) {
          newSelectedDays.weekdays = false;
          newSelectedDays.weekend = false;
          newSelectedDays.custom = true;
        } else {
          newSelectedDays.custom = false;
        }
      } 
      
      else {
        if (!prev.selectedDays[dayType]) {
          newSelectedDays.custom = false;
          newSelectedDays[dayType] = true;
        } else {
          newSelectedDays[dayType] = false;
        }
      }
      
      return {
        ...prev,
        selectedDays: newSelectedDays
      };
    });
  };

  const handleCustomDayChange = (day, field, value) => {
    setProfile(prev => ({
      ...prev,
      customDays: {
        ...prev.customDays,
        [day]: {
          ...prev.customDays[day],
          [field]: value
        }
      }
    }));
  };

  const handleTimeChange = (type, field, value) => {
    setProfile(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayLabels = {
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  };

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 2000);
  };

 const handleCancelClick = () => {
  showNotification('Cancelling...');
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate('/userEdit');
  }
};
  const handleSaveClick = () => {
    showNotification('Profile saved successfully!');
    if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate('/userEdit');
  }
  };

  return (
    <div className="px-5 py-5 bg-white min-h-screen pb-32">
      {/* Notification Toast - Fixed to bottom */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="flex justify-center items-center w-full mb-10 pt-5">
        <div className="flex flex-col items-center text-center w-full">
          <h3 className="text-gray-900 mb-4 text-base font-semibold">Profile Picture</h3>
          <div className="w-36 h-36 border-4 border-blue-600 rounded-full overflow-hidden mb-4">
            <img 
              src={profileImage}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => openImageUpload('profile')} 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm transition-colors hover:bg-blue-700 w-full max-w-[150px]"
          >
            Change picture
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full">
        <div className="flex flex-col gap-6">
          {/* Name Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-300 text-gray-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-300 text-gray-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Name Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Other Name</label>
              <input
                type="text"
                value={profile.otherName}
                onChange={(e) => handleInputChange('otherName', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-300 text-gray-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                value={profile.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-300 text-gray-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Main Grid: Left and Right Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
            {/* LEFT SECTION */}
            <div className="space-y-8">
              <div>
                <h3 className="text-gray-900 mb-4 text-lg font-bold text-left">Pricing</h3>
                <div className="flex flex-col gap-3 mb-5">
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="radio"
                      checked={profile.pricingType === 'set'}
                      onChange={() => handleInputChange('pricingType', 'set')}
                      className="w-4 h-4 "
                    />
                    <span className="text-black">Set pricing rate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="radio"
                      checked={profile.pricingType === 'contact'}
                      onChange={() => handleInputChange('pricingType', 'contact')}
                      className="w-4 h-4 fill-blue-600"
                    />
                    <span className="text-black">Contact for price</span>
                  </label>
                </div>

                {profile.pricingType === 'set' && (
                  <>
                    <label className="block mb-2 font-medium text-gray-900">Amount (GHC)</label>
                    <div className="flex items-center mb-5 max-w-[150px]">
                      <button 
                        type="button"
                        onClick={() => handleInputChange('amount', Math.max(0, profile.amount - 1))}
                        className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-l-md text-gray-900"
                      >
                        <Minus size={24} color="#2563eb" />
                      </button>
                      <input
                        type="number"
                        value={profile.amount}
                        onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                        className="w-15 px-2 py-2 border-t border-b border-gray-300 text-center bg-gray-300 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                      />
                      <button 
                        type="button"
                        onClick={() => handleInputChange('amount', profile.amount + 1)}
                        className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-r-md text-gray-900"
                      >
                       <Plus size={24} color="#2563eb" />
                      </button>
                    </div>

                    
                  </>
                )}
              </div>

              <div className="flex flex-col">
                      <label className="mb-2 text-lg font-bold text-left text-gray-900">Description</label>
                      <textarea
                        placeholder='Write a brief description about yourself...'
                        value={profile.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="px-3 py-3 border border-gray-300 rounded-md text-sm resize-y min-h-[100px] w-full bg-gray-300 text-gray-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        rows="4"
                      />
                    </div>

              {/* Overview Section */}
              <div>
                <h3 className="text-gray-900 mb-4 text-lg font-bold text-left">Overview</h3>
                
                <div className="mb-5 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-2 font-medium text-gray-900">
                    <span>Verification Status</span>
                    <CheckCircle size={20} className=" text-blue-600"/>
                  </div>
                  <span className="text-gray-600 text-sm">Verified</span>
                </div>

                <div className="mb-5 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-2 font-medium text-gray-900">
                    <span>Number of Employees</span>
                    <Users size={20} className=" text-blue-600"/>
                  </div>
                  <div className="flex items-center max-w-[120px]">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('employees', Math.max(1, profile.employees - 1))}
                      className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-l-md text-gray-900"
                    >
                      <Minus size={24} color="#2563eb" />
                    </button>
                    <input
                      type="number"
                      value={profile.employees}
                      onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 1)}
                      className="w-15 px-2 py-2 border-t border-b border-gray-300 text-center bg-gray-300 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      min="1"
                    />
                    <button 
                      type="button"
                      onClick={() => handleInputChange('employees', profile.employees + 1)}
                      className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-r-md text-gray-900"
                    >
                      <Plus size={24} color="#2563eb" />
                    </button>
                  </div>
                </div>

                <div className="mb-5 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-2 font-medium text-gray-900">
                    <span>Work Experience (years)</span>
                    <Clock size={20} className=" text-blue-600"/>
                  </div>
                  <div className="flex items-center max-w-[120px]">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('workExperience', Math.max(0, profile.workExperience - 1))}
                      className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-l-md text-gray-900"
                    >
                      <Minus size={24} color="#2563eb" />
                    </button>
                    <input
                      type="number"
                      value={profile.workExperience}
                      onChange={(e) => handleInputChange('workExperience', parseInt(e.target.value) || 0)}
                      className="w-15 px-2 py-2 border-t border-b border-gray-300 text-center bg-gray-300 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      min="0"
                    />
                    <button 
                      type="button"
                      onClick={() => handleInputChange('workExperience', profile.workExperience + 1)}
                      className="px-3 py-2 border border-gray-300 bg-gray-50 font-semibold text-base transition-colors hover:bg-gray-200 rounded-r-md text-gray-900"
                    >
                      <Plus size={24} color="#2563eb" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="md:col-span-2">
                <h3 className="text-gray-900 mb-6 text-lg font-bold text-center">Working Hours</h3>
                <div className="max-w-5xl mx-auto">
                  {/* Days Selection */}
                  <div className="mb-6">
                    <h4 className="text-base font-semibold mb-4 text-gray-800">Select Working Days</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Weekdays Card */}
                      <div
                        onClick={() => handleDaySelection('weekdays')}
                        className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 ${
                          profile.selectedDays.weekdays
                            ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">Weekdays</span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            profile.selectedDays.weekdays
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {profile.selectedDays.weekdays && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Mon - Fri</p>
                      </div>

                      {/* Weekend Card */}
                      <div
                        onClick={() => handleDaySelection('weekend')}
                        className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 ${
                          profile.selectedDays.weekend
                            ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">Weekend</span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            profile.selectedDays.weekend
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {profile.selectedDays.weekend && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Sat - Sun</p>
                      </div>

                      {/* Custom Days Card */}
                      <div
                        onClick={() => handleDaySelection('custom')}
                        className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 ${
                          profile.selectedDays.custom
                            ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">Custom Days</span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            profile.selectedDays.custom
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {profile.selectedDays.custom && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Pick specific days</p>
                      </div>
                    </div>
                  </div>

                  {/* Custom Days Expansion */}
                  {profile.selectedDays.custom && (
                    <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 animate-fadeIn">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-semibold text-gray-800">Select Custom Days</h4>
                        <button
                          onClick={toggleCustomDays}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          {profile.showCustomDays ? 'Hide' : 'Show'} Days
                          <span className="text-xs">{profile.showCustomDays ? <ChevronUp size={10} color='#2563eb'/> : <ChevronDown size={10} color='#2563eb'/>}</span>
                        </button>
                      </div>
                      {profile.showCustomDays && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {daysOfWeek.map(day => (
                            <div
                              key={day}
                              onClick={() => handleCustomDayChange(day, 'selected', !profile.customDays[day].selected)}
                              className={`cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 ${
                                profile.customDays[day].selected
                                  ? 'border-blue-600 bg-blue-100 shadow-md'
                                  : 'border-gray-300 bg-white hover:border-blue-400'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  profile.customDays[day].selected
                                    ? 'border-blue-600 bg-blue-600'
                                    : 'border-gray-300'
                                }`}>
                                  {profile.customDays[day].selected && (
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <path d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm font-medium text-gray-900">{dayLabels[day]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Time Selection */}
                  <div>
                    <h4 className="text-base font-semibold mb-4 text-gray-800">Set Working Hours</h4>
                    <div className="space-y-4">
                      {/* Weekdays Time */}
                      {profile.selectedDays.weekdays && (
                        <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm animate-fadeIn">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              <h5 className="font-semibold text-gray-900">Weekdays Hours</h5>
                            </div>
                            <span className="text-sm text-gray-600">Mon - Fri</span>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                              <input
                                type="time"
                                value={profile.weekdaysTime.start}
                                onChange={(e) => handleTimeChange('weekdaysTime', 'start', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                              <input
                                type="time"
                                value={profile.weekdaysTime.end}
                                onChange={(e) => handleTimeChange('weekdaysTime', 'end', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Weekend Time */}
                      {profile.selectedDays.weekend && (
                        <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm animate-fadeIn">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              <h5 className="font-semibold text-gray-900">Weekend Hours</h5>
                            </div>
                            <span className="text-sm text-gray-600">Sat - Sun</span>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                              <input
                                type="time"
                                value={profile.weekendTime.start}
                                onChange={(e) => handleTimeChange('weekendTime', 'start', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                              <input
                                type="time"
                                value={profile.weekendTime.end}
                                onChange={(e) => handleTimeChange('weekendTime', 'end', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Custom Days Time */}
                      {profile.selectedDays.custom && Object.values(profile.customDays).some(day => day.selected) && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 animate-fadeIn">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                            Custom Days Hours
                          </h5>
                          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {daysOfWeek.map(day => (
                              profile.customDays[day].selected && (
                                <div key={day} className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                                  <div className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    {dayLabels[day]}
                                  </div>
                                  <div className="flex gap-3">
                                    <div className="flex-1">
                                      <label className="block text-xs font-medium text-gray-600 mb-1">Start</label>
                                      <input
                                        type="time"
                                        value={profile.customDays[day].start}
                                        onChange={(e) => handleCustomDayChange(day, 'start', e.target.value)}
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <label className="block text-xs font-medium text-gray-600 mb-1">End</label>
                                      <input
                                        type="time"
                                        value={profile.customDays[day].end}
                                        onChange={(e) => handleCustomDayChange(day, 'end', e.target.value)}
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Selection Message */}
                      {!profile.selectedDays.weekdays && !profile.selectedDays.weekend && !profile.selectedDays.custom && (
                        <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
                          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3"/>
                          <p className="text-gray-600 font-medium">Please select working days above to set hours</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="pt-5 border-t border-gray-200">
                <h3 className="text-gray-900 mb-2 text-base font-semibold text-center">Projects</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">Upload or delete pictures of previous work done</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 hover:border-blue-600 transition-colors flex justify-center">
                  <button onClick={() => openImageUpload('profile')}  className=" bg-white rounded-lg flex items-center justify-center">
                    <SquarePlus size={38} className="text-gray-400 hover:text-blue-600 transition-colors" />                  
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-8">
              {/* Tags */}
<div>
  <h3 className="text-gray-900 mb-4 text-base font-semibold">Worker Tags</h3>
  <div className="space-y-3">
    {tagInputs.map((tagInput) => (
      <div key={tagInput.id} className="flex gap-2">
        <input
          type="text"
          value={tagInput.value}
          onChange={(e) => updateTagInput(tagInput.id, e.target.value)}
          placeholder="Add a tag"
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-300 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        {tagInputs.length > 1 && (
          <button 
            type="button"
            onClick={() => removeTagInput(tagInput.id)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={24} color='#dc2626'/>
          </button>
        )}
      </div>
    ))}
    <button 
      type="button"
      onClick={addTagInput}
      className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
    >
      <CirclePlus size={24}/>
      <span className="font-medium">Add Another Tag</span>
    </button>
  </div>
</div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-gray-900 mb-4 text-base font-semibold">Payment Methods</h3>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="radio"
                      checked={profile.paymentMethod === 'mobile'}
                      onChange={() => handleInputChange('paymentMethod', 'mobile')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900">Mobile Transfer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="radio"
                      checked={profile.paymentMethod === 'bank'}
                      onChange={() => handleInputChange('paymentMethod', 'bank')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900">Bank Transfer</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8 pt-8 border-t border-gray-200">
            <button 
              onClick={handleCancelClick}
              className="bg-white text-blue-600 border-2 border-blue-600 px-15 py-3 rounded-md text-base font-semibold transition-all hover:bg-blue-50 min-w-[150px]"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveClick}
              className="bg-blue-600 text-white px-15 py-3 rounded-md text-base font-semibold transition-colors hover:bg-blue-700 min-w-[150px]"
            >
              Save
            </button>
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
};

export default EditProfile;