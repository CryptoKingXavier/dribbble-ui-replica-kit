
import React, { useState } from 'react';
import { CloudDownload } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setProgress(0);
          }, 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8eaed]">
      <div className="relative w-48 h-48 mb-8">
        {/* Circular track */}
        <div className="absolute inset-0 rounded-full border-[8px] border-[#d1d3d8] shadow-lg"></div>
        
        {/* Progress indicator */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            strokeWidth="8"
            stroke="#f9c74f"
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
            "w-36 h-36 rounded-full bg-white shadow-md flex items-center justify-center",
            "transition-all duration-200 hover:shadow-lg focus:outline-none active:scale-95"
          )}
          disabled={isDownloading}
        >
          <CloudDownload 
            size={32} 
            className={cn(
              "text-gray-400",
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
    </div>
  );
};

export default Download;
