"use client";

import React from 'react';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex gap-4 items-center mb-6'>
      {/* Clean accent bar */}
      <span className='w-1 h-8 bg-primary rounded-full' />
      
      {/* Clean title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-textMuted">
        {title}
      </h1>
      
      {/* Simple decorative line */}
      <div className="ml-auto hidden sm:flex items-center">
        <div className="w-16 h-[2px] bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default SectionTitle;
