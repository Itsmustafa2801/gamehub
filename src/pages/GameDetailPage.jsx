import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaStar, FaHeart, FaRegHeart, FaArrowLeft, FaCalendar, 
  FaTrophy, FaGamepad, FaWindows, FaApple, FaLinux
} from 'react-icons/fa'
import { useGames } from '../hooks/useGames'
import { useWishlist } from '../context/WishlistContext'
import LoadingSpinner from '../components/LoadingSpinner'

const GameDetailPage = () => {
  const { id } = useParams()
  const { getGameDetails } = useGames()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAllScreenshots, setShowAllScreenshots] = useState(false)

  const inWishlist = game ? isInWishlist(game.id) : false

  useEffect(() => {
    let isMounted = true

    const fetchGameDetails = async () => {
      try {
        setLoading(true)
        const data = await getGameDetails(id)
        if (isMounted) setGame(data)
      } catch (err) {
        if (isMounted) setError('Failed to load game details')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchGameDetails()
    return () => { isMounted = false }
  }, [id, getGameDetails])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-purple-600 hover:underline">Go back home</Link>
      </div>
    </div>
  )

  if (!game) return null

  const platforms = game.platforms?.map(p => p.platform.name).join(', ')
  const genres = game.genres?.map(g => g.name).join(', ')
  const developers = game.developers?.map(d => d.name).join(', ')
  const publishers = game.publishers?.map(p => p.name).join(', ')

  // Platform icons for display
  const getPlatformIcons = () => {
    if (!game.platforms) return null
    return game.platforms.slice(0, 5).map((p, i) => {
      const name = p.platform.name.toLowerCase()
      if (name.includes('pc') || name.includes('windows')) 
        return <FaWindows key={i} className="text-blue-500 inline mx-1" title="PC" />
      if (name.includes('mac')) 
        return <FaApple key={i} className="text-gray-500 inline mx-1" title="Mac" />
      if (name.includes('linux')) 
        return <FaLinux key={i} className="text-orange-500 inline mx-1" title="Linux" />
      if (name.includes('playstation')) 
        return <span key={i} className="inline mx-1" title="PlayStation">🎮</span>
      if (name.includes('xbox')) 
        return <span key={i} className="inline mx-1" title="Xbox">🎯</span>
      if (name.includes('nintendo')) 
        return <span key={i} className="inline mx-1" title="Nintendo">🕹️</span>
      return <FaGamepad key={i} className="text-purple-500 inline mx-1" title="Other" />
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-12"
    >
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
          <FaArrowLeft /> Back to Games
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={game.background_image || 'https://via.placeholder.com/1280x720'}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Game Info */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6">
          {/* Title and actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {game.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {game.rating?.toFixed(1)} ({game.ratings_count?.toLocaleString()} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaCalendar className="text-gray-400" />
                  {game.released?.split('-')[0] || 'TBA'}
                </span>
                {game.metacritic && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaTrophy className="text-yellow-600" />
                      Metacritic: {game.metacritic}
                    </span>
                  </>
                )}
              </div>
              {/* Platform Icons */}
              <div className="mt-2 text-lg">
                {getPlatformIcons()}
              </div>
            </div>

            <button
              onClick={() => inWishlist ? removeFromWishlist(game.id) : addToWishlist(game)}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${
                inWishlist
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
              }`}
            >
              {inWishlist ? <FaHeart /> : <FaRegHeart />}
              {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Screenshots Gallery */}
          {game.screenshots?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {(showAllScreenshots ? game.screenshots : game.screenshots.slice(0, 4)).map((shot, index) => (
                  <motion.img
                    key={shot.id}
                    src={shot.image}
                    alt={`Screenshot ${index + 1}`}
                    className="rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg w-full h-24 sm:h-32 object-cover"
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
              {game.screenshots.length > 4 && !showAllScreenshots && (
                <button
                  onClick={() => setShowAllScreenshots(true)}
                  className="mt-4 text-purple-600 hover:underline text-sm"
                >
                  View all {game.screenshots.length} screenshots
                </button>
              )}
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">About</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {game.description_raw || 'No description available.'}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Platforms</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">{platforms || 'N/A'}</p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Genres</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{genres || 'N/A'}</p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Developer</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{developers || 'N/A'}</p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Publisher</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{publishers || 'N/A'}</p>
            </div>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {game.website && (
              <a
                href={game.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline text-sm flex items-center gap-1"
              >
                Official Website →
              </a>
            )}
            {game.reddit_url && (
              <a
                href={game.reddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline text-sm flex items-center gap-1"
              >
                Reddit Community →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameDetailPage