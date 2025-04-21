
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UploadArea } from './UploadArea';
import { ProgressItem } from './ProgressItem';

interface FileUploadModalProps {
  onClose: () => void;
  fileType: 'python' | 'java';
  allowedExtension: string;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ 
  onClose, 
  fileType, 
  allowedExtension 
}) => {
  const [files, setFiles] = useState<Array<{
    name: string;
    size: string;
    progress: number;
    status: 'completed' | 'uploading';
  }>>([]);

  const handleFileSelect = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(file => 
      file.name.toLowerCase().endsWith(allowedExtension)
    );

    if (validFiles.length !== fileList.length) {
      alert(`Only ${allowedExtension} files are allowed`);
    }

    const newFiles = validFiles.map(file => ({
      name: file.name,
      size: `${Math.round(file.size / 1024)}KB of ${Math.round(file.size / 1024)}KB`,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map((f, i) => 
          i === prev.length - newFiles.length + index
            ? { ...f, progress: 100, status: 'completed' as const }
            : f
        ));
      }, 2000 * (index + 1));
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#141414] rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-white text-lg font-medium">
              Upload {fileType.charAt(0).toUpperCase() + fileType.slice(1)} File
            </h2>
            <p className="text-gray-400 text-sm">
              Upload your {fileType} file ({allowedExtension} format).
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <UploadArea onFileSelect={handleFileSelect} allowedExtension={allowedExtension} />

        {files.length > 0 && (
          <div className="mt-6">
            {files.map((file, index) => (
              <ProgressItem
                key={index}
                fileName={file.name}
                progress={file.progress}
                size={file.size}
                status={file.status}
                onRemove={() => setFiles(prev => prev.filter((_, i) => i !== index))}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
};
