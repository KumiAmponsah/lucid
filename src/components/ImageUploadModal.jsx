import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";

const ImageUploadModal = ({
  open,
  onClose,
  dragActive,
  onDrag,
  onDrop,
  onFileChange,
  selectedFile,
  isUploading,
  uploadProgress,
  onSave,
  title = "Add an Image",
  accept = ".png,.jpg,.jpeg,.webp",
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        >
          <motion.div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <motion.button
               onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-gray-600" />
                        </motion.button>

            {/* Title */}
           
            <motion.h2 
                        className="text-2xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {title}
                      </motion.h2>

            {/* Drop zone */}
            <motion.div
                        onDragEnter={onDrag}
                        onDragLeave={onDrag}
                        onDragOver={onDrag}
                        onDrop={onDrop}
                        className={`border-4 border-dashed rounded-lg p-12 text-center transition-colors ${
                          dragActive ? 'border-blue-600 bg-blue-50' : 'border-blue-600'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                {!isUploading ? (
                              <>
                                <motion.div
                                  initial={{ y: -20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                                </motion.div>
                                
                                <label htmlFor="file-upload" className="cursor-pointer">
                                  <motion.div 
                                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Browse
                                  </motion.div>
                                  <input
  id="file-upload"
  type="file"
  className="hidden"
  accept={accept}
  onChange={onFileChange}
/>
                                </label>
                
                                <p className="text-gray-600 text-lg mb-2">Drop an image here</p>
                                
                                {selectedFile && !isUploading && (
                                  <motion.p 
                                    className="text-green-600 font-semibold mt-4"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                  >
                                    Selected: {selectedFile.name}
                                  </motion.p>
                                )}
                              </>
              ) : (
                <>
                {/* Folder Icon */}
                                <motion.div 
                                  className="relative mx-auto mb-6 w-32 h-32"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring" }}
                                >
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
                                </motion.div>

                  {/* Progress */}
                  <div className="w-full max-w-md mx-auto">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                          className="bg-blue-600 h-3 rounded-full"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${uploadProgress}%` }}
                                          transition={{ duration: 0.3 }}
                                        />
                                      </div>
                                      <span className="text-xl font-semibold text-gray-700 min-w-[3rem]">
                                        {uploadProgress}%
                                      </span>
                                    </div>
                                  </div>
                </>
              )}
              <p className="text-sm text-gray-500 mt-6">
  <span className="text-red-500">*</span> Files supported {accept}
</p>
                        </motion.div>
        

            {/* Actions */}
    <motion.div 
                className="flex items-center justify-center space-x-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={onSave}
                  disabled={!selectedFile || isUploading}
                  className={`px-12 py-3 rounded-lg font-semibold transition-colors ${
                    selectedFile && !isUploading
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={selectedFile && !isUploading ? { scale: 1.05 } : {}}
                  whileTap={selectedFile && !isUploading ? { scale: 0.95 } : {}}
                >
                  Save
                </motion.button>
                <motion.button
                  onClick={onClose}
                  disabled={isUploading}
                  className={`px-12 py-3 rounded-lg font-semibold border-2 transition-colors ${
                    isUploading
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                  whileHover={!isUploading ? { scale: 1.05 } : {}}
                  whileTap={!isUploading ? { scale: 0.95 } : {}}
                >
                  Cancel
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
};

export default memo(ImageUploadModal);
