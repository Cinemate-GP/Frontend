import React from 'react';
import { MPARatingUtils } from '@/lib/mpaUtils';

interface MPARatingBadgeProps {
  rating: string | undefined | null;
  showTooltip?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outline' | 'minimal';
  className?: string;
}

/**
 * A reusable component for displaying MPA ratings with consistent styling
 * Handles all the MPA rating normalization and styling automatically
 */
export const MPARatingBadge: React.FC<MPARatingBadgeProps> = ({
  rating,
  showTooltip = true,
  size = 'medium',
  variant = 'default',
  className = ''
}) => {
  const normalizedRating = MPARatingUtils.normalize(rating);
  const description = MPARatingUtils.getDescription(rating);
    // Size classes with modern spacing
  const sizeClasses = {
    small: 'px-2.5 py-1 text-xs min-w-[2.5rem]',
    medium: 'px-3 py-1.5 text-sm min-w-[3rem]',
    large: 'px-4 py-2 text-base min-w-[3.5rem]'
  };
  // Variant classes with modern colors and styling
  const getVariantClasses = (mpaCategory: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      "G": { 
        bg: 'bg-gradient-to-r from-emerald-500/90 to-green-500/90', 
        text: 'text-white', 
        border: 'border-emerald-400/30',
        glow: 'shadow-lg shadow-emerald-500/20'
      },
      "PG": { 
        bg: 'bg-gradient-to-r from-blue-500/90 to-cyan-500/90', 
        text: 'text-white', 
        border: 'border-blue-400/30',
        glow: 'shadow-lg shadow-blue-500/20'
      },
      "PG-13": { 
        bg: 'bg-gradient-to-r from-amber-500/90 to-orange-500/90', 
        text: 'text-white', 
        border: 'border-amber-400/30',
        glow: 'shadow-lg shadow-amber-500/20'
      },
      "R": { 
        bg: 'bg-gradient-to-r from-red-500/90 to-rose-500/90', 
        text: 'text-white', 
        border: 'border-red-400/30',
        glow: 'shadow-lg shadow-red-500/20'
      },
      "NC-17": { 
        bg: 'bg-gradient-to-r from-rose-600/90 to-red-600/90', 
        text: 'text-white', 
        border: 'border-rose-400/30',
        glow: 'shadow-lg shadow-rose-500/25'
      },
      "Unrated": { 
        bg: 'bg-gradient-to-r from-slate-500/90 to-gray-500/90', 
        text: 'text-white', 
        border: 'border-slate-400/30',
        glow: 'shadow-lg shadow-slate-500/20'
      }
    };
    
    const colors = colorMap[mpaCategory] || colorMap["Unrated"];
    
    switch (variant) {
      case 'outline':
        return `bg-black/20 backdrop-blur-sm ${colors.text} border-2 ${colors.border} ${colors.glow}`;
      case 'minimal':
        return `bg-transparent ${colors.text}`;
      default:
        return `${colors.bg} ${colors.text} border ${colors.border} ${colors.glow} backdrop-blur-sm`;
    }
  };
  
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-bold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl text-center';
  const variantClasses = getVariantClasses(normalizedRating);
  const sizeClass = sizeClasses[size];
  
  const finalClassName = `${baseClasses} ${variantClasses} ${sizeClass} ${className}`.trim();
  
  const badge = (
    <span className={finalClassName}>
      {normalizedRating}
    </span>
  );
  
  // Wrap with tooltip if enabled
  if (showTooltip) {
    return (
      <div className="relative group">
        {badge}        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-black/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 border border-white/10 shadow-xl">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90"></div>
        </div>
      </div>
    );
  }
  
  return badge;
};

export default MPARatingBadge;
