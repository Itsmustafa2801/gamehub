import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

//  REPLACE WITH YOUR API KEY
const API_KEY = ''
const BASE_URL = 'https://api.rawg.io/api'

export const useGames = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState({
    search: '',
    platform: '',
    genre: '',
    ordering: '-rating',
    dates: ''
  })

  const initialFetchDone = useRef(false)

  const fetchGames = useCallback(async (reset = false) => {
    if (loading) return
    if (!reset && !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const currentPage = reset ? 1 : page
      
      const params = new URLSearchParams({
        key: API_KEY,
        page: currentPage,
        page_size: 20,
        ...(filters.search && { search: filters.search }),
        ...(filters.platform && { platforms: filters.platform }),
        ...(filters.genre && { genres: filters.genre }),
        ...(filters.ordering && { ordering: filters.ordering }),
        ...(filters.dates && { dates: filters.dates })
      })

      const response = await axios.get(`${BASE_URL}/games?${params}`)
      
      setTotalResults(response.data.count)

      if (reset) {
        setGames(response.data.results)
        setPage(2)
      } else {
        setGames(prev => [...prev, ...response.data.results])
        setPage(prev => prev + 1)
      }

      setHasMore(response.data.next !== null)
    } catch (err) {
      setError('Failed to fetch games. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, hasMore, loading, filters])

  // Initial fetch
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true
      fetchGames(true)
    }
  }, [fetchGames])

  // Fetch when filters change
  useEffect(() => {
    if (initialFetchDone.current) {
      fetchGames(true)
    }
  }, [filters.search, filters.platform, filters.genre, filters.ordering, filters.dates])

  const searchGames = useCallback((query) => {
    setFilters(prev => ({ ...prev, search: query }))
  }, [])

  const setPlatform = useCallback((platformId) => {
    setFilters(prev => ({ ...prev, platform: platformId }))
  }, [])

  const setGenre = useCallback((genreId) => {
    setFilters(prev => ({ ...prev, genre: genreId }))
  }, [])

  const setOrdering = useCallback((order) => {
    setFilters(prev => ({ ...prev, ordering: order }))
  }, [])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchGames()
    }
  }, [loading, hasMore, fetchGames])

  const getGameDetails = useCallback(async (gameId) => {
    try {
      // Fetch main game details
      const details = await axios.get(`${BASE_URL}/games/${gameId}?key=${API_KEY}`)
      
      // Fetch screenshots
      const screenshots = await axios.get(`${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`)
      
      // Fetch trailers
      const trailers = await axios.get(`${BASE_URL}/games/${gameId}/movies?key=${API_KEY}`)
      
      // Fetch system requirements from a different endpoint
      // Note: RAWG doesn't always have requirements, so we'll create a fallback
      const gameData = details.data
      
      // Check if the game has requirements in the platforms data
      const hasRequirements = gameData.platforms?.some(p => p.requirements?.minimum || p.requirements?.recommended)
      
      return {
        ...gameData,
        screenshots: screenshots.data.results,
        trailers: trailers.data.results,
        hasSystemRequirements: hasRequirements
      }
    } catch (err) {
      console.error('Error fetching game details:', err)
      throw err
    }
  }, [])

  return {
    games,
    loading,
    error,
    hasMore,
    totalResults,
    filters,
    searchGames,
    setPlatform,
    setGenre,
    setOrdering,
    loadMore,
    getGameDetails
  }
}