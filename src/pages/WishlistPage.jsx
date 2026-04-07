import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useWishlist } from '../context/WishlistContext'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start adding games you want to play
        </p>
        <Link
          to="/"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Browse Games
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Your Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {wishlist.map(game => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group relative"
          >
            <Link to={`/game/${game.id}`}>
              <div className="aspect-video">
                <img
                  src={game.background_image || 'https://via.placeholder.com/500x280'}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                  {game.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {game.released?.split('-')[0] || 'TBA'}
                </p>
              </div>
            </Link>

            <button
              onClick={() => removeFromWishlist(game.id)}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <FaHeart className="text-red-500" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WishlistPage