import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad, FaHeart, FaMoon, FaSun, FaBars, FaTimes, FaSearch } from 'react-icons/fa'

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/wishlist', label: 'Wishlist', icon: FaHeart },
  ]

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaGamepad className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Game<span className="hidden xs:inline">Hub</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 text-sm lg:text-base ${
                  location.pathname === link.path
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.icon && <link.icon className="text-sm" />}
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <FaSun className="text-sm lg:text-base" /> : <FaMoon className="text-sm lg:text-base" />}
            </motion.button>
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/search"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSearch className="text-gray-700 dark:text-gray-300" />
            </Link>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/'
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${
                    location.pathname === '/wishlist'
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaHeart /> Wishlist
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar