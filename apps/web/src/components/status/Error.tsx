import React from 'react';

interface DisplayErrorProps {
  errorMessage: string;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ errorMessage }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Something Went Wrong</h1>
        <p className="mt-4 text-lg text-gray-700">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default DisplayError;
