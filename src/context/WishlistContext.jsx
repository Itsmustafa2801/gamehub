import React, { createContext, useState, useContext, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (game) => {
    setWishlist(prev => {
      if (prev.some(g => g.id === game.id)) return prev
      return [...prev, game]
    })
  }

  const removeFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId))
  }

  const isInWishlist = (gameId) => {
    return wishlist.some(g => g.id === gameId)
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}