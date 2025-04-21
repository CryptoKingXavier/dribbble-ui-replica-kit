
import React, { useState } from 'react';
import { Plus, FileJson, FileCode } from 'lucide-react';
import { FileUploadModal } from './FileUploadModal';

interface FileMenuItem {
  icon: React.ReactNode;
  fileType: 'python' | 'java';
  extension: string;
}

const menuItems: FileMenuItem[] = [
  {
    icon: <FileJson className="w-5 h-5" />,
    fileType: 'python',
    extension: '.py'
  },
  {
    icon: <FileCode className="w-5 h-5" />,
    fileType: 'java',
    extension: '.java'
  }
];

export const FileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'python' | 'java' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFileTypeSelect = (fileType: 'python' | 'java') => {
    setSelectedType(fileType);
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`bg-green-600 hover:bg-green-700 transition-colors rounded-full p-3 ${
          isOpen ? 'rotate-45' : ''
        } transform transition-transform duration-200`}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      <div
        className={`absolute bottom-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl py-3 shadow-lg transition-all duration-200 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFileTypeSelect(item.fileType)}
            className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 transition-colors"
          >
            {item.icon}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <FileUploadModal
          onClose={() => setIsModalOpen(false)}
          fileType={selectedType!}
          allowedExtension={menuItems.find(item => item.fileType === selectedType)?.extension || ''}
        />
      )}
    </div>
  );
};
