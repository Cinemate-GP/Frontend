# MPA Rating System Implementation

This document outlines the comprehensive MPA (Motion Picture Association) rating system implementation for the movie application.

## Overview

The system standardizes movie ratings from various sources into consistent, user-friendly categories while maintaining all original functionality. It handles 40+ different rating formats and normalizes them into 6 main categories:

- **G** - General Audiences (All ages)
- **PG** - Parental Guidance (Some material may not be suitable for children)
- **PG-13** - Parents Strongly Cautioned (Ages 13+)
- **R** - Restricted (Ages 17+ or with adult supervision)
- **NC-17** - Adults Only (Ages 18+)
- **Unrated** - Not rated or rating unavailable

## Files Modified/Created

### Core Constants & Utilities
- **`src/constants/index.ts`** - Updated with MPA mappings and helper functions
- **`src/lib/mpaUtils.ts`** - Comprehensive utility class for MPA rating operations
- **`src/lib/utils.ts`** - Updated to use centralized MPA utilities

### Components
- **`src/components/ui/MPARatingBadge.tsx`** - Reusable badge component for displaying ratings
- **`src/components/movies/MovieInfo.tsx`** - Updated to use new badge component
- **`src/components/MovieCard.tsx`** - Enhanced to support MPA rating display
- **`src/components/movies/MoviesGrid.tsx`** - Updated to pass MPA ratings
- **`src/components/SliderCards.tsx`** - Enhanced to include MPA ratings

### Hooks & Examples
- **`src/hooks/useMPARating.ts`** - React hooks for MPA rating functionality
- **`src/components/examples/MPAExampleUsage.tsx`** - Comprehensive usage examples

### Type Definitions
- Updated interfaces in relevant components to include `mpa?: string` field

## Features Implemented

### 1. Rating Normalization
```typescript
// Handles all these variations and more:
"TV-MA" → "R"
"Approved" → "G" 
"16+" → "R"
"Not Rated" → "Unrated"
"X" → "NC-17"
null/undefined → "Unrated"
```

### 2. Visual Badge Component
```tsx
// Basic usage
<MPARatingBadge rating="PG-13" />

// With customization
<MPARatingBadge 
  rating="R" 
  size="large" 
  variant="outline" 
  showTooltip={true} 
/>
```

### 3. Age Appropriateness Checking
```typescript
MPARatingUtils.isAppropriateForAge("PG-13", 12); // false
MPARatingUtils.isAppropriateForAge("G", 5);      // true
```

### 4. Utility Functions
```typescript
// Normalize ratings
MPARatingUtils.normalize("TV-MA"); // Returns "R"

// Get styling information  
MPARatingUtils.getColor("R");      // Returns hex color
MPARatingUtils.getBadgeClasses("PG"); // Returns CSS classes

// Batch operations
MPARatingUtils.batchNormalize(ratings);
MPARatingUtils.getStatistics(ratings);
MPARatingUtils.filterByAge(movies, userAge);
```

### 5. React Hooks
```typescript
// Single rating hook
const { normalized, isRestricted, getMinimumAge } = useMPARating("TV-MA");

// Collection filtering hook
const { appropriateForAge, statistics, sortBySeverity } = useMPAFiltering(movies, userAge);

// User preferences hook
const { isRatingAllowed, filterByPreferences } = useMPAPreferences();
```

## Original Rating Mappings

The system handles these original ratings and maps them to standardized categories:

### General Audiences (G)
- G, TV-G, TV-Y, TV-Y7, TV-Y7-FV, U, E, Approved, Passed, Open

### Parental Guidance (PG)  
- PG, TV-PG, GP, M/PG, C, K-8, Atp, Btl, EM, F, PD

### Parents Strongly Cautioned (PG-13)
- PG-13, TV-13, TV-14, 13+, 12, K-13, K-14, M

### Restricted (R)
- R, TV-MA, 16, 16+, K-16, MA-17

### Adults Only (NC-17)
- NC-17, 18, 18+, AO, X, Banned

### Unrated
- Unrated, Not Rated, N/A, o.Al., null, undefined, empty string

## Usage Examples

### In Movie Cards
```tsx
<MovieCard
  tmdbid={movie.tmdbId}
  title={movie.title}
  image={movie.posterPath}
  imdbRating={movie.imdbRating}
  mpaRating={movie.mpa}  // ← Now supported
/>
```

### In Movie Details
```tsx
<div className="movie-meta">
  <span>{movie.releaseDate}</span>
  <MPARatingBadge rating={movie.mpa} size="medium" />
  <span>{movie.imdbRating}</span>
</div>
```

### For Age-Based Filtering
```typescript
// Filter movies appropriate for a 13-year-old
const ageAppropriate = MPARatingUtils.filterByAge(movies, 13, 'mpa');

// Check if specific content is appropriate
const canWatch = MPARatingUtils.isAppropriateForAge(movie.mpa, userAge);
```

### For Parental Controls
```typescript
// Set maximum allowed rating
const { filterByPreferences } = useMPAPreferences();
const familyFriendly = filterByPreferences(movies, 'PG-13');
```

## Styling & Theming

The badge component supports multiple variants and sizes:

- **Sizes**: `small`, `medium`, `large`
- **Variants**: `default`, `outline`, `minimal`  
- **Colors**: Automatically determined by rating category
- **Tooltips**: Optional descriptions on hover

## Benefits

1. **Consistency** - All ratings display uniformly regardless of source
2. **Flexibility** - Easy to extend for new rating systems or sources
3. **User-Friendly** - Clear, standardized categories users understand
4. **Accessible** - Proper color coding and descriptions
5. **Type-Safe** - Full TypeScript support with proper interfaces
6. **Performance** - Efficient memoization and batch operations
7. **Reusable** - Modular components and utilities
8. **Extensible** - Easy to add new features like parental controls

## Future Enhancements

- International rating system support (BBFC, FSK, etc.)
- User preference persistence
- Advanced filtering UI components
- Rating-based content recommendations
- Parental control dashboard
- Content advisory warnings
- Rating history and trends

## API Integration

The system works with any API that provides MPA ratings in the `mpa` field. It automatically normalizes all variations, so no changes are needed to existing API calls.

```typescript
// Works with any of these API response formats:
{ mpa: "R" }           // ✓ Direct rating
{ mpa: "TV-MA" }       // ✓ TV rating  
{ mpa: "Not Rated" }   // ✓ Unrated content
{ mpa: null }          // ✓ Missing rating
{ mpa: "16+" }         // ✓ International rating
```

This implementation provides a robust, scalable foundation for handling movie ratings throughout the application while maintaining backward compatibility and enabling future enhancements.
