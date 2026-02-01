import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Modal } from '../ui';

export const ImageUploadModal = ({ isOpen, onClose, onUpload, title = "Upload Image" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
            onUpload(selectedFile);
            handleCancel();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title} size="md">
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
    </Modal>
  );
};