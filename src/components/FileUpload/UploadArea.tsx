
import React from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
  allowedExtension: string;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, allowedExtension }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    onFileSelect(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-[#1c1c1c] cursor-pointer"
    >
      <input
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="fileInput"
        accept={allowedExtension}
        multiple
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <span className="text-blue-500 hover:text-blue-400">Choose a file</span>
        <span className="text-gray-400 mx-2">Or</span>
        <span className="text-gray-400">Drag and drop</span>
        <p className="text-gray-500 text-sm mt-2">Only {allowedExtension} files, up to 50 MB.</p>
      </label>
    </div>
  );
};
