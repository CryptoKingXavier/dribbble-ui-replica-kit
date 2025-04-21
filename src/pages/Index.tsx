
import React, { useState } from 'react';
import { FileUploadModal } from '../components/FileUpload/FileUploadModal';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Open Upload Modal
      </button>
      {isModalOpen && <FileUploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Index;
