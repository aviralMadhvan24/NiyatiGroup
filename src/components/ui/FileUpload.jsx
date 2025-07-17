import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Documents Securely</h3>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-accent bg-green-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
          </div>
        </div>
        
        <p className="text-gray-600 mb-2">
          {isDragging ? 'Drop files here' : 'Drag & drop files here or click to browse'}
        </p>
        <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
        
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          multiple 
          onChange={handleFileSelect}
        />
        <motion.label 
          htmlFor="file-upload"
          className="inline-block px-4 py-2 bg-primary text-white rounded-full cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Files
        </motion.label>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-3">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center bg-gray-50 p-3 rounded"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-8">
        <h4 className="font-medium text-gray-700 mb-3">Documents to Upload:</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {['PAN Card', 'Aadhaar Card', 'Bank Statements', 'Form 16/16A', 'Investment Proofs'].map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
        
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-accent text-white rounded-lg font-medium"
            disabled={files.length === 0}
          >
            Upload & Submit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUpload;