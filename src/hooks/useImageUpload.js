import { useState } from "react";

export const useImageUpload = () => {
  const [open, setOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

const onDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setDragCounter(0);
  setDragActive(false);

  const file = e.dataTransfer.files[0];
  if (!file || !ACCEPTED_TYPES.includes(file.type)) return;

  setSelectedFile(file);
};


const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file || !ACCEPTED_TYPES.includes(file.type)) return;
  setSelectedFile(file);
};


  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setSelectedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

 const [dragCounter, setDragCounter] = useState(0);

const onDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type === "dragenter") {
    setDragCounter((c) => c + 1);
    setDragActive(true);
  }

  if (e.type === "dragleave") {
    setDragCounter((c) => {
      if (c - 1 <= 0) {
        setDragActive(false);
        return 0;
      }
      return c - 1;
    });
  }
};



  const onSave = () => {
    if (!selectedFile) return;
    setIsUploading(true);

    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(closeModal, 400);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  return {
    open,
    dragActive,
    selectedFile,
    isUploading,
    uploadProgress,
    openModal,
    closeModal,
    onDrag,
    onDrop,
    onFileChange,
    onSave,
  };
};
