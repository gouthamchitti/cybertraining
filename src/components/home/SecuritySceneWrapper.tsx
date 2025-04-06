"use client";

import dynamic from "next/dynamic";

// Import 3D components dynamically to avoid SSR issues
const SecurityScene = dynamic(() => import("@/components/3d/SecurityScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-indigo-50 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  ),
});

const SecuritySceneWrapper = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-indigo-50 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <SecurityScene />
      </div>
    </div>
  );
};

export default SecuritySceneWrapper;
