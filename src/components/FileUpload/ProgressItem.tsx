
import React from 'react';
import { FileText, Check, X } from 'lucide-react';

interface ProgressItemProps {
  fileName: string;
  progress: number;
  size: string;
  status: 'completed' | 'uploading';
  onRemove?: () => void;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({
  fileName,
  progress,
  size,
  status,
  onRemove
}) => {
  return (
    <div className="bg-[#1c1c1c] rounded-lg p-3 mb-2 flex items-center">
      <FileText className="w-8 h-8 text-gray-400 mr-3" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-200 text-sm">{fileName}</span>
          {status === 'completed' ? (
            <Check className="w-4 h-4 text-blue-500" />
          ) : (
            <button onClick={onRemove} className="text-gray-400 hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>{size}</span>
          <span className="mx-1">•</span>
          <span>{status === 'completed' ? 'Completed' : 'Uploading...'}</span>
        </div>
        <div className="mt-2 bg-gray-700 rounded-full h-1">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
