import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGames } from '../hooks/useGames'
import Hero from '../components/Hero'
import GameGrid from '../components/GameGrid'
import FilterSidebar from '../components/FilterSidebar'
import { FaFilter } from 'react-icons/fa'
import { PLATFORMS, GENRES } from '../utils/constants'

const HomePage = () => {
  const {
    games,
    loading,
    hasMore,
    totalResults,
    filters,
    searchGames,
    setPlatform,
    setGenre,
    setOrdering,
    loadMore
  } = useGames()

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Handle platform change
  const handlePlatformChange = (platformId) => {
    setPlatform(platformId)
    setIsFilterOpen(false) // Close on mobile after selection
  }

  // Handle genre change
  const handleGenreChange = (genreId) => {
    setGenre(genreId)
    setIsFilterOpen(false) // Close on mobile after selection
  }

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setOrdering(sortValue)
    setIsFilterOpen(false) // Close on mobile after selection
  }

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, loadMore])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Hero onSearch={searchGames} />

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            <FaFilter /> Filter Games
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onPlatformChange={handlePlatformChange}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
            totalResults={totalResults}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters Display */}
            {(filters?.platform || filters?.genre || filters?.search) && (
              <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {filters.search && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    Search: {filters.search}
                  </span>
                )}
                {filters.platform && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    Platform: {PLATFORMS.find(p => p.id.toString() === filters.platform)?.name}
                  </span>
                )}
                {filters.genre && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    Genre: {GENRES.find(g => g.id.toString() === filters.genre)?.name}
                  </span>
                )}
              </div>
            )}

            {/* Search Results Title */}
            {filters?.search && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  Search Results
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Found {totalResults} games matching "{filters.search}"
                </p>
              </div>
            )}

            <GameGrid
              games={games}
              loading={loading}
              hasMore={hasMore}
              loadMore={loadMore}
              searchQuery={filters?.search}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HomePage