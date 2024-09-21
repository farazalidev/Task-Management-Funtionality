import React from "react";

const CircleLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-16 h-16 border-4 border-black border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default CircleLoader;
