import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner