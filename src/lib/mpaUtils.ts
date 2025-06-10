// MPA Rating utilities and standardization functions
import { getSimplifiedMPA, getMPAColor, getMPABadgeClasses } from "@/constants";

/**
 * Comprehensive MPA rating normalization utility
 * Handles all edge cases and ensures consistent rating display across the application
 */
export class MPARatingUtils {
  /**
   * Normalizes any MPA rating string to a standardized format
   * @param rating - Raw MPA rating string from any source
   * @returns Standardized MPA category (G, PG, PG-13, R, NC-17, Unrated)
   */
  static normalize(rating: string | undefined | null): string {
    if (!rating || rating.trim() === "") {
      return "Unrated";
    }

    // Clean and standardize the input
    const cleaned = rating.trim();
    
    // Handle empty or null-like values
    if (cleaned === "" || cleaned.toLowerCase() === "null" || cleaned === "undefined") {
      return "Unrated";
    }

    // Use the existing mapping system
    return getSimplifiedMPA(cleaned);
  }

  /**
   * Gets the appropriate color for a given MPA rating
   * @param rating - MPA rating (can be original or simplified)
   * @returns Hex color code for the rating
   */
  static getColor(rating: string | undefined | null): string {
    const normalized = this.normalize(rating);
    return getMPAColor(normalized);
  }

  /**
   * Gets the CSS classes for displaying an MPA rating badge
   * @param rating - MPA rating (can be original or simplified)
   * @returns CSS class string for styling the rating badge
   */
  static getBadgeClasses(rating: string | undefined | null): string {
    const normalized = this.normalize(rating);
    return getMPABadgeClasses(normalized);
  }

  /**
   * Checks if a movie with given MPA rating is appropriate for a specific age
   * @param rating - MPA rating (can be original or simplified)
   * @param age - User's age in years
   * @returns True if appropriate, false otherwise
   */
  static isAppropriateForAge(rating: string | undefined | null, age: number): boolean {
    const normalized = this.normalize(rating);
    const ageRequirements: Record<string, number> = {
      "G": 0,
      "PG": 8,
      "PG-13": 13,
      "R": 17,
      "NC-17": 18,
      "Unrated": 18,
    };
    return age >= (ageRequirements[normalized] || 18);
  }

  /**
   * Gets a human-readable description for an MPA rating
   * @param rating - MPA rating (can be original or simplified)
   * @returns Description string explaining the rating
   */
  static getDescription(rating: string | undefined | null): string {
    const normalized = this.normalize(rating);
    const descriptions: Record<string, string> = {
      "G": "General Audiences - All ages admitted",
      "PG": "Parental Guidance - Some material may not be suitable for children",
      "PG-13": "Parents Strongly Cautioned - Ages 13+ recommended",
      "R": "Restricted - Under 17 requires accompanying parent or adult guardian",
      "NC-17": "Adults Only - No one 17 and under admitted",
      "Unrated": "Not rated or rating unavailable"
    };
    return descriptions[normalized] || "Rating information unavailable";
  }

  /**
   * Gets the severity level for sorting purposes
   * @param rating - MPA rating (can be original or simplified)
   * @returns Numeric severity level (lower = less restrictive)
   */
  static getSeverityLevel(rating: string | undefined | null): number {
    const normalized = this.normalize(rating);
    const severityLevels: Record<string, number> = {
      "G": 1,
      "PG": 2,
      "PG-13": 3,
      "R": 4,
      "NC-17": 5,
      "Unrated": 6
    };
    return severityLevels[normalized] || 6;
  }

  /**
   * Batch normalizes an array of MPA ratings
   * Useful for processing movie lists or API responses
   * @param ratings - Array of MPA rating strings
   * @returns Array of normalized MPA categories
   */
  static batchNormalize(ratings: (string | undefined | null)[]): string[] {
    return ratings.map(rating => this.normalize(rating));
  }

  /**
   * Gets statistics about MPA ratings in a collection
   * @param ratings - Array of MPA rating strings
   * @returns Object with count of each rating category
   */
  static getStatistics(ratings: (string | undefined | null)[]): Record<string, number> {
    const normalized = this.batchNormalize(ratings);
    const stats: Record<string, number> = {
      "G": 0,
      "PG": 0,
      "PG-13": 0,
      "R": 0,
      "NC-17": 0,
      "Unrated": 0
    };

    normalized.forEach(rating => {
      stats[rating] = (stats[rating] || 0) + 1;
    });

    return stats;
  }

  /**
   * Filters movies by appropriate age rating
   * @param movies - Array of movies with MPA ratings
   * @param userAge - User's age
   * @param ratingField - Field name containing the MPA rating (default: 'mpa')
   * @returns Filtered array of age-appropriate movies
   */
  static filterByAge<T extends Record<string, string | null | undefined>>(
    movies: T[], 
    userAge: number, 
    ratingField: string = 'mpa'
  ): T[] {
    return movies.filter(movie => 
      this.isAppropriateForAge(movie[ratingField], userAge)
    );
  }
}

// Legacy functions for backward compatibility
export const displayMPARating = (rating: string | undefined | null): string => {
  return MPARatingUtils.normalize(rating);
};

export const getMPADescription = (rating: string | undefined | null): string => {
  return MPARatingUtils.getDescription(rating);
};

export const normalizeAndDisplayMPA = (rating: string | undefined | null): string => {
  return MPARatingUtils.normalize(rating);
};
