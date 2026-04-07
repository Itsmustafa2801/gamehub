import React from 'react'
import { Link } from 'react-router-dom'
import { FaGamepad, FaGithub, FaTwitter, FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FaGamepad className="text-2xl text-purple-600" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GameHub
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Discover millions of games, get detailed information, watch trailers, 
              and save your wishlist. Your ultimate game database.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Home</Link></li>
              <li><Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Wishlist</Link></li>
            </ul>
          </div>

          {/* API Credit */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Data Source</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Powered by{' '}
              <a
                href="https://rawg.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                RAWG API
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {currentYear} GameHub. Made with <FaHeart className="inline text-red-500" /> in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer