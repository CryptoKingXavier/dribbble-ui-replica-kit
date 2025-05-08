
import React, { useState } from 'react';
import { CloudDownload, FileArchive, Download as DownloadIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setProgress(0);
    setShowModal(false);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setProgress(0);
            setShowModal(true);
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  const handleFileDownload = () => {
    // This would normally trigger a real file download
    console.log("File download triggered");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8eaed]">
      {/* Download Progress Circle */}
      <div className="relative w-48 h-48 mb-8">
        {/* Circular track */}
        <div className="absolute inset-0 rounded-full border-[8px] border-[#d1d3d8] shadow-lg"></div>
        
        {/* Progress indicator with gradient */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f9c74f" />
            </linearGradient>
          </defs>
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            strokeWidth="8"
            stroke="url(#progressGradient)"
            strokeDasharray={`${progress * 5.52} 552`}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        
        {/* Button circle */}
        <button 
          onClick={handleDownload}
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md flex items-center justify-center",
            "transition-all duration-200 hover:shadow-xl focus:outline-none active:scale-95 text-white"
          )}
          disabled={isDownloading}
        >
          <CloudDownload 
            size={40} 
            className={cn(
              "text-white",
              isDownloading ? "animate-pulse" : ""
            )}
          />
        </button>
      </div>
      
      {isDownloading && (
        <p className="text-xl text-gray-500 font-light">
          {Math.round(progress)}% Downloading...
        </p>
      )}

      {/* File Download Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="p-0 border-0 overflow-hidden max-w-md">
          <div className="bg-white rounded-lg shadow-lg flex items-center p-6">
            <div className="flex-1 flex items-start">
              <div className="mr-4">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded">
                  <FileArchive size={32} />
                  <div className="absolute bottom-0 text-[10px] text-white font-bold">zip</div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-blue-600 font-medium">this_file_has_a_long_dummy_name.zip</h3>
                <div className="text-xs text-gray-500">
                  <p>by username</p>
                  <p>29 Feb 2016  14:45:20</p>
                </div>
              </div>
            </div>
            
            <div>
              <button 
                onClick={handleFileDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
              >
                <DownloadIcon size={24} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Download;
