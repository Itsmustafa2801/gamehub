import React from 'react'
import GameCard from './GameCard'
import LoadingSpinner from './LoadingSpinner'

const GameGrid = ({ games, loading, hasMore, loadMore, searchQuery = '' }) => {
  return (
    <div className="px-2 sm:px-0">
      {games.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {loading && (
            <div className="py-8">
              <LoadingSpinner />
            </div>
          )}

          {!loading && hasMore && games.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Load More Games
              </button>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {searchQuery ? 'No games found' : 'No games available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? `We couldn't find any games matching "${searchQuery}"`
                : 'Check back later for new releases'}
            </p>
          </div>
        )
      )}

      {loading && games.length === 0 && (
        <div className="py-16">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default GameGrid