'use client'

import React, { createContext, useContext } from 'react'
import { Color, Jacket, JacketItem, Size } from "@prisma/client";

export type IJacket = Jacket & { 
    items: JacketItem[]; 
    sizes: Size[];
    colors: Color[];
  }

interface CatalogContextType {
  items: IJacket[]
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined)

export const CatalogProvider: React.FC<{ items: IJacket[]; children: React.ReactNode }> = ({ 
  items, 
  children 
}) => {
  return (
    <CatalogContext.Provider value={{ items }}>
      {children}
    </CatalogContext.Provider>
  )
}

export const useCatalog = () => {
  const context = useContext(CatalogContext)
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider')
  }
  return context
}