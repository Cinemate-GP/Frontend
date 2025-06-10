import { useMemo } from 'react';
import { MPARatingUtils } from '@/lib/mpaUtils';

/**
 * Hook for handling MPA ratings with normalization and utility functions
 * Provides a consistent interface for working with movie ratings throughout the app
 */
export const useMPARating = (rating: string | undefined | null) => {
  const mpaData = useMemo(() => {
    const normalized = MPARatingUtils.normalize(rating);
    
    return {
      // Core rating info
      original: rating,
      normalized,
      description: MPARatingUtils.getDescription(rating),
      
      // Styling helpers
      color: MPARatingUtils.getColor(rating),
      badgeClasses: MPARatingUtils.getBadgeClasses(rating),
      
      // Age checking functions
      isAppropriateForAge: (age: number) => MPARatingUtils.isAppropriateForAge(rating, age),
      
      // Category checks
      isGeneralAudience: normalized === 'G',
      isParentalGuidance: normalized === 'PG',
      isParentalCaution: normalized === 'PG-13',
      isRestricted: normalized === 'R',
      isAdultsOnly: normalized === 'NC-17',
      isUnrated: normalized === 'Unrated',
      
      // Helper methods
      getMinimumAge: () => {
        const ageRequirements: Record<string, number> = {
          'G': 0,
          'PG': 8,
          'PG-13': 13,
          'R': 17,
          'NC-17': 18,
          'Unrated': 18,
        };
        return ageRequirements[normalized] || 18;
      },
      
      // Display helpers
      getShortDescription: () => {
        const shortDescriptions: Record<string, string> = {
          'G': 'All ages',
          'PG': 'Parental guidance',
          'PG-13': 'Ages 13+',
          'R': 'Ages 17+',
          'NC-17': 'Adults only',
          'Unrated': 'Not rated',
        };
        return shortDescriptions[normalized] || 'Unknown';
      },
      
      // Severity level (useful for filtering/sorting)
      getSeverityLevel: () => {
        const severityLevels: Record<string, number> = {
          'G': 1,
          'PG': 2,
          'PG-13': 3,
          'R': 4,
          'NC-17': 5,
          'Unrated': 0, // Unknown, so lowest priority
        };
        return severityLevels[normalized] || 0;
      }
    };
  }, [rating]);

  return mpaData;
};

/**
 * Hook for filtering and working with collections of movies based on MPA ratings
 */
export const useMPAFiltering = <T extends { mpa?: string | null }>(
  items: T[], 
  userAge?: number
) => {
  const filteredData = useMemo(() => {
    const statistics = MPARatingUtils.getStatistics(items.map(item => item.mpa));
    
    return {
      // All items
      all: items,
      
      // Age-appropriate filtering
      appropriateForAge: userAge 
        ? MPARatingUtils.filterByAge(items, userAge, 'mpa')
        : items,
      
      // Category filtering
      generalAudience: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'G'),
      parentalGuidance: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'PG'),
      parentalCaution: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'PG-13'),
      restricted: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'R'),
      adultsOnly: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'NC-17'),
      unrated: items.filter(item => MPARatingUtils.normalize(item.mpa) === 'Unrated'),
      
      // Statistics
      statistics,
      
      // Helper functions
      getByRating: (targetRating: string) => 
        items.filter(item => MPARatingUtils.normalize(item.mpa) === targetRating),
        // Sorting helpers
      sortBySeverity: (ascending = true) => {
        return [...items].sort((a, b) => {
          const aSeverity = MPARatingUtils.getSeverityLevel(a.mpa);
          const bSeverity = MPARatingUtils.getSeverityLevel(b.mpa);
          return ascending ? aSeverity - bSeverity : bSeverity - aSeverity;
        });
      },
      
      // Get available ratings in the collection
      availableRatings: Object.entries(statistics)
        .filter(([, count]) => count > 0)
        .map(([rating, count]) => ({ rating, count })),
    };
  }, [items, userAge]);

  return filteredData;
};

/**
 * Hook for managing user preferences related to MPA ratings
 */
export const useMPAPreferences = () => {
  // This could be extended to work with a user preferences context/store
  
  const preferences = useMemo(() => ({
    // Default preferences - could be loaded from user settings
    maxAllowedRating: 'R' as const,
    showUnratedContent: true,
    preferDetailedRatings: false, // Show original vs simplified ratings
    
    // Helper functions
    isRatingAllowed: (rating: string | undefined | null, maxRating: string = 'R') => {
      const normalized = MPARatingUtils.normalize(rating);
      const maxNormalized = MPARatingUtils.normalize(maxRating);
      
      const severityLevels: Record<string, number> = {
        'G': 1,
        'PG': 2,
        'PG-13': 3,
        'R': 4,
        'NC-17': 5,
        'Unrated': 0,
      };
      
      const ratingSeverity = severityLevels[normalized] || 0;
      const maxSeverity = severityLevels[maxNormalized] || 4;
      
      return ratingSeverity <= maxSeverity;
    },
    
    // Filter content based on preferences
    filterByPreferences: <T extends { mpa?: string | null }>(
      items: T[], 
      customMaxRating?: string
    ) => {
      const maxRating = customMaxRating || 'R';
      return items.filter(item => 
        preferences.isRatingAllowed(item.mpa, maxRating)
      );
    }
  }), []);

  return preferences;
};
