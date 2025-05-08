
import React from 'react';
import { FileMenu } from '../components/FileUpload/FileMenu';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
      <FileMenu />
      <div className="mt-8">
        <Link to="/download">
          <Button className="bg-green-600 hover:bg-green-700">
            Go to Download Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
