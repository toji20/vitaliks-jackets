'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface PageLoadContextType {
  isPageLoaded: boolean
  setPageLoaded: (loaded: boolean) => void
}

const PageLoadContext = createContext<PageLoadContextType | undefined>(undefined)

export function PageLoadProvider({ children }: { children: React.ReactNode }) {
  const [isPageLoaded, setPageLoaded] = useState(false)

  return (
    <PageLoadContext.Provider value={{ isPageLoaded, setPageLoaded }}>
      {children}
    </PageLoadContext.Provider>
  )
}

export function usePageLoadContext() {
  const context = useContext(PageLoadContext)
  if (context === undefined) {
    throw new Error('usePageLoadContext must be used within a PageLoadProvider')
  }
  return context
}