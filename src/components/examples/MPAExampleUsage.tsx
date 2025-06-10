/**
 * Example usage component demonstrating the comprehensive MPA rating system
 * This showcases all the features we've implemented for normalizing and displaying MPA ratings
 */

import React from 'react';
import { MPARatingBadge } from '@/components/ui/MPARatingBadge';
import { MPARatingUtils } from '@/lib/mpaUtils';

const MPAExampleUsage: React.FC = () => {
  // Sample data with various MPA rating formats (as they might come from different sources)
  const sampleMovies = [
    { title: "The Lion King", mpa: "G", age: 5 },
    { title: "Spider-Man", mpa: "PG-13", age: 13 },
    { title: "The Dark Knight", mpa: "PG-13", age: 16 },
    { title: "John Wick", mpa: "R", age: 18 },
    { title: "Old Movie", mpa: "Approved", age: 25 },
    { title: "International Film", mpa: "16", age: 20 },
    { title: "TV Show", mpa: "TV-MA", age: 19 },
    { title: "Unknown Rating", mpa: "Not Rated", age: 22 },
    { title: "No Rating", mpa: null, age: 30 },
    { title: "Empty Rating", mpa: "", age: 15 }
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">MPA Rating System Demo</h1>
        
        {/* Badge Variations */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rating Badge Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Default badges */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Default Style</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="G" size="small" />
                  <span className="text-sm">General Audiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="PG-13" size="medium" />
                  <span className="text-sm">Parents Cautioned</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="R" size="large" />
                  <span className="text-sm">Restricted</span>
                </div>
              </div>
            </div>

            {/* Outline badges */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Outline Style</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="G" variant="outline" size="small" />
                  <span className="text-sm">General Audiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="PG-13" variant="outline" size="medium" />
                  <span className="text-sm">Parents Cautioned</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="R" variant="outline" size="large" />
                  <span className="text-sm">Restricted</span>
                </div>
              </div>
            </div>

            {/* Minimal badges */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Minimal Style</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="G" variant="minimal" size="small" />
                  <span className="text-sm">General Audiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="PG-13" variant="minimal" size="medium" />
                  <span className="text-sm">Parents Cautioned</span>
                </div>
                <div className="flex items-center gap-2">
                  <MPARatingBadge rating="R" variant="minimal" size="large" />
                  <span className="text-sm">Restricted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating Normalization Demo */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rating Normalization</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">              <div>
                <h3 className="text-sm font-medium mb-3">Original Ratings</h3>
                <div className="space-y-2 text-sm">
                  <div>&quot;TV-MA&quot; → <MPARatingBadge rating="TV-MA" size="small" /></div>
                  <div>&quot;Approved&quot; → <MPARatingBadge rating="Approved" size="small" /></div>
                  <div>&quot;16+&quot; → <MPARatingBadge rating="16+" size="small" /></div>
                  <div>&quot;Not Rated&quot; → <MPARatingBadge rating="Not Rated" size="small" /></div>
                  <div>&quot;X&quot; → <MPARatingBadge rating="X" size="small" /></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-3">Utility Functions</h3>
                <div className="space-y-1 text-xs font-mono bg-gray-700 p-3 rounded">
                  <div>MPARatingUtils.normalize(&quot;TV-MA&quot;): {MPARatingUtils.normalize("TV-MA")}</div>
                  <div>MPARatingUtils.normalize(&quot;Approved&quot;): {MPARatingUtils.normalize("Approved")}</div>
                  <div>MPARatingUtils.normalize(&quot;16+&quot;): {MPARatingUtils.normalize("16+")}</div>
                  <div>MPARatingUtils.normalize(&quot;Not Rated&quot;): {MPARatingUtils.normalize("Not Rated")}</div>
                  <div>MPARatingUtils.normalize(null): {MPARatingUtils.normalize(null)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Age Appropriateness */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Age Appropriateness Check</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleMovies.map((movie, index) => {
                const isAppropriate = MPARatingUtils.isAppropriateForAge(movie.mpa, movie.age);
                return (
                  <div 
                    key={index} 
                    className={`p-3 rounded border-2 ${
                      isAppropriate ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                      <MPARatingBadge rating={movie.mpa} size="small" showTooltip={false} />
                    </div>
                    <div className="text-xs text-gray-300">
                      <div>Age: {movie.age}</div>
                      <div className={isAppropriate ? 'text-green-400' : 'text-red-400'}>
                        {isAppropriate ? '✓ Appropriate' : '✗ Not Appropriate'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Statistics Demo */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rating Statistics</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            {(() => {
              const ratings = sampleMovies.map(m => m.mpa);
              const stats = MPARatingUtils.getStatistics(ratings);
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(stats).map(([rating, count]) => (
                    <div key={rating} className="text-center">
                      <MPARatingBadge rating={rating} size="medium" showTooltip={false} />
                      <div className="text-lg font-bold mt-2">{count}</div>
                      <div className="text-xs text-gray-400">movies</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* Implementation Guide */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Usage</h3>
                <pre className="text-xs bg-gray-700 p-3 rounded overflow-x-auto">
{`// Simple badge
<MPARatingBadge rating="PG-13" />

// With custom styling
<MPARatingBadge 
  rating="R" 
  size="large" 
  variant="outline" 
  showTooltip={true} 
/>

// In movie cards
<MPARatingBadge 
  rating={movie.mpa} 
  size="small" 
  showTooltip={false}
  className="absolute top-2 right-2"
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Utility Functions</h3>
                <pre className="text-xs bg-gray-700 p-3 rounded overflow-x-auto">
{`// Normalize ratings
const normalizedRating = MPARatingUtils.normalize("TV-MA"); // Returns "R"

// Check age appropriateness
const isOkForChild = MPARatingUtils.isAppropriateForAge("PG-13", 12); // Returns false

// Get color for styling
const color = MPARatingUtils.getColor("R"); // Returns "#ef4444"

// Get description
const desc = MPARatingUtils.getDescription("PG"); // Returns full description

// Batch process ratings
const normalized = MPARatingUtils.batchNormalize(["TV-MA", "G", "Not Rated"]);`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MPAExampleUsage;
