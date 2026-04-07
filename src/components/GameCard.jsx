import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart, FaStar, FaGamepad } from 'react-icons/fa'
import { useWishlist } from '../context/WishlistContext'

const GameCard = ({ game }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(game.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(game.id)
    } else {
      addToWishlist(game)
    }
  }

  const getPlatformIcons = () => {
    const platforms = game.platforms?.slice(0, 3).map(p => p.platform)
    return platforms?.map(p => {
      if (p.id === 4) return '💻'
      if (p.id === 187 || p.id === 18) return '🎮'
      if (p.id === 7) return '🕹️'
      return '🎯'
    }).join(' ')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
    >
      <Link to={`/game/${game.id}`}>
        <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={game.background_image || 'https://via.placeholder.com/500x280?text=No+Image'}
            alt={game.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            {inWishlist ? (
              <FaHeart className="text-red-500 text-sm sm:text-base" />
            ) : (
              <FaRegHeart className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" />
            )}
          </button>

          {/* Rating */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {game.rating?.toFixed(1) || 'N/A'}
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base truncate">
            {game.name}
          </h3>
          
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {game.released?.split('-')[0] || 'TBA'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getPlatformIcons()}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default GameCard