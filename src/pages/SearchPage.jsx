import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGames } from '../hooks/useGames'
import GameGrid from '../components/GameGrid'
import SearchBar from '../components/SearchBar'

const SearchPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''
  
  const {
    games,
    loading,
    hasMore,
    totalResults,
    searchQuery,
    searchGames,
    loadMore
  } = useGames()

  // Trigger search when URL query changes
  useEffect(() => {
    if (query) {
      searchGames(query)
    }
  }, [query, searchGames])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {query ? `Search Results for "${query}"` : 'Search Games'}
      </h1>
      
      <SearchBar 
        onSearch={searchGames}
        initialValue={query}
        totalResults={totalResults}
      />

      {query && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Found <span className="font-bold text-purple-600">{totalResults}</span> games matching your search
          </p>
        </div>
      )}

      <GameGrid
        games={games}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
        searchQuery={query}
      />
    </div>
  )
}

export default SearchPage