import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ onSearch, initialValue = '', totalResults }) => {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query)
        // Update URL with search query
        if (query) {
          navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true })
        }
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, onSearch, initialValue, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    navigate('/search', { replace: true })
  }

  return (
    <div className="mb-6 w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for games..."
            className="w-full pl-12 pr-24 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 dark:text-white text-base shadow-lg"
          />
          
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Clear search"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
            
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
              <FaSearch className="text-sm" /> 
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
      
      {/* Search Stats */}
      {query && totalResults !== undefined && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Found <span className="font-bold text-purple-600">{totalResults}</span> games matching "{query}"
        </div>
      )}
    </div>
  )
}

export default SearchBar