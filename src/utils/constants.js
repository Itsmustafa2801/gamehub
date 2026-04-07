// Platform IDs from RAWG API
export const PLATFORMS = [
  { id: 4, name: 'PC', icon: '💻' },
  { id: 187, name: 'PlayStation 5', icon: '🎮' },
  { id: 18, name: 'PlayStation 4', icon: '🎮' },
  { id: 186, name: 'Xbox Series X', icon: '🎮' },
  { id: 1, name: 'Xbox One', icon: '🎮' },
  { id: 7, name: 'Nintendo Switch', icon: '🎮' },
  { id: 3, name: 'iOS', icon: '📱' },
  { id: 21, name: 'Android', icon: '📱' }
]

// Genre IDs from RAWG API
export const GENRES = [
  { id: 4, name: 'Action', icon: '⚔️' },
  { id: 3, name: 'Adventure', icon: '🏔️' },
  { id: 5, name: 'RPG', icon: '📜' },
  { id: 10, name: 'Strategy', icon: '♟️' },
  { id: 2, name: 'Shooter', icon: '🔫' },
  { id: 7, name: 'Puzzle', icon: '🧩' },
  { id: 1, name: 'Racing', icon: '🏎️' },
  { id: 14, name: 'Sports', icon: '⚽' },
  { id: 6, name: 'Fighting', icon: '🥊' },
  { id: 13, name: 'Simulation', icon: '🎯' }
]

// Sorting options
export const SORT_OPTIONS = [
  { value: '-rating', label: 'Top Rated' },
  { value: '-released', label: 'Newest' },
  { value: '-added', label: 'Most Popular' },
  { value: 'name', label: 'Name A-Z' }
]

// Image base URL
export const IMAGE_BASE_URL = 'https://media.rawg.io/media'