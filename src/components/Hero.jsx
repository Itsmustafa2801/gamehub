import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch, FaGamepad, FaFire, FaStar } from 'react-icons/fa'

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      // Pass the query in the URL
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handlePopularClick = (game) => {
    setQuery(game)
    onSearch(game)
    // Pass the query in the URL
    navigate(`/search?q=${encodeURIComponent(game)}`)
  }

  const popularGames = [
    'Grand Theft Auto V',
    'The Witcher 3',
    'Cyberpunk 2077',
    'Red Dead Redemption 2',
    'Minecraft',
    'Fortnite'
  ]

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] flex items-center justify-center overflow-hidden mb-8">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600"
          alt="Gaming"
          className="w-full h-full object-cover scale-110 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-black/80 to-pink-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 sm:mb-6"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-2">
            <FaFire className="text-yellow-300" /> 500,000+ Games Available
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4"
        >
          Discover Your Next
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
            Favorite Game
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden sm:block text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto"
        >
          Search millions of games, get details, watch trailers, and save your wishlist
        </motion.p>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-xl md:max-w-2xl mx-auto mb-6 px-2"
        >
          <div className="relative flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaSearch /> Search
            </button>
          </div>
        </motion.form>

        {/* Popular Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 overflow-x-auto pb-2 px-4 hide-scrollbar"
        >
          <span className="text-gray-300 text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
            <FaStar className="text-yellow-400" /> Popular:
          </span>
          <div className="flex gap-1 sm:gap-2 flex-nowrap">
            {popularGames.map((game) => (
              <button
                key={game}
                onClick={() => handlePopularClick(game)}
                className="flex-shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all whitespace-nowrap"
              >
                {game}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero