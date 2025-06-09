"use client";

import React from 'react';

const SliderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative'>
      {/* Clean background */}
      <div className='absolute inset-0 bg-secondaryBg/60 backdrop-blur-sm rounded-2xl border border-white/10' />
      
      {/* Content */}
      <div className='relative p-6 lg:p-8 w-full overflow-hidden rounded-2xl'>
        {children}
      </div>
    </div>
  );
};

export default SliderWrapper;