import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useDarkMode } from './hooks/useDarkMode'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GameDetailPage from './pages/GameDetailPage'
import WishlistPage from './pages/WishlistPage'
import SearchPage from './pages/SearchPage'

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode()

  return (
    <BrowserRouter>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
          <Navbar darkMode={isDarkMode} toggleTheme={toggleTheme} />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App