import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFilter, FaTimes } from 'react-icons/fa'
import { PLATFORMS, GENRES, SORT_OPTIONS } from '../utils/constants'

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onPlatformChange, 
  onGenreChange, 
  onSortChange,
  totalResults 
}) => {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 z-50 shadow-2xl overflow-y-auto lg:static lg:translate-x-0 lg:w-64 lg:shadow-none lg:z-auto lg:block"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FaFilter /> Filters
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Results count */}
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Games</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalResults || 0}</p>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Sort By</h3>
            <select
              value={filters?.ordering || '-rating'}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Platforms */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Platforms</h3>
            <div className="space-y-2">
              {PLATFORMS.map(platform => (
                <label key={platform.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="platform"
                    checked={filters?.platform === platform.id.toString()}
                    onChange={() => onPlatformChange(platform.id.toString())}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-600 rounded-full"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {platform.icon} {platform.name}
                  </span>
                </label>
              ))}
              {filters?.platform && (
                <button
                  onClick={() => onPlatformChange('')}
                  className="text-xs text-purple-600 hover:underline mt-2 block"
                >
                  Clear platform filter
                </button>
              )}
            </div>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Genres</h3>
            <div className="space-y-2">
              {GENRES.map(genre => (
                <label key={genre.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="genre"
                    checked={filters?.genre === genre.id.toString()}
                    onChange={() => onGenreChange(genre.id.toString())}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-600 rounded-full"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {genre.icon} {genre.name}
                  </span>
                </label>
              ))}
              {filters?.genre && (
                <button
                  onClick={() => onGenreChange('')}
                  className="text-xs text-purple-600 hover:underline mt-2 block"
                >
                  Clear genre filter
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar