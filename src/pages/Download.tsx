
import React, { useState, useEffect } from 'react';
import { CloudDownload, Download as DownloadIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setProgress(0);
    setShowModal(false);
  };

  useEffect(() => {
    let interval: number | null = null;
    
    if (isDownloading) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          
          if (newProgress >= 100) {
            if (interval) clearInterval(interval);
            setTimeout(() => {
              setIsDownloading(false);
              setProgress(0);
              setShowModal(true);
            }, 500);
            return 100;
          }
          
          return newProgress;
        });
      }, 50); // Update every 50ms for smooth animation
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDownloading]);

  const handleFileDownload = () => {
    // This would normally trigger a real file download
    console.log("File download triggered");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8eaed]">
      {/* Download Progress Circle */}
      <div className="relative w-48 h-48 mb-8">
        {/* Outer ring with shadow */}
        <div className="absolute inset-0 rounded-full bg-[#d1d3d8] shadow-lg"></div>
        
        {/* Progress indicator with gradient */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8c870" />
              <stop offset="100%" stopColor="#f9c74f" />
            </linearGradient>
          </defs>
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            strokeWidth="16"
            stroke="url(#progressGradient)"
            strokeDasharray={`${progress * 5.52} 552`}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        
        {/* Inner button circle with 3D effect */}
        <div className="absolute inset-[8px] rounded-full bg-[#e8eaed] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]"></div>
        
        {/* Button with depth effect */}
        <button 
          onClick={handleDownload}
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-32 h-32 rounded-full bg-white shadow-[0_6px_10px_rgba(0,0,0,0.03),0_1px_18px_rgba(0,0,0,0.02),0_3px_5px_rgba(0,0,0,0.04)]",
            "flex items-center justify-center",
            "transition-all duration-200 focus:outline-none active:scale-95 active:shadow-[0_2px_5px_rgba(0,0,0,0.05)]"
          )}
          disabled={isDownloading}
        >
          <CloudDownload 
            size={28} 
            className={cn(
              "text-[#8E9196]",
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
          <DialogTitle className="sr-only">Download File</DialogTitle>
          <DialogDescription className="sr-only">Download your zip file</DialogDescription>
          <div className="bg-white rounded-lg shadow-lg flex items-center p-6">
            <div className="flex-1 flex items-start">
              <div className="mr-4">
                <div className="w-14 h-14 relative">
                  <img 
                    src="/lovable-uploads/481582ba-a592-49de-a422-fd5bdaffea36.png" 
                    alt="ZIP file" 
                    className="w-full h-full object-contain"
                  />
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
