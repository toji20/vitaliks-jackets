'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface VitalikBannerProps {
  className?: string
}

export const VitalikBanner: React.FC<VitalikBannerProps> = ({ className }) => {
  const fashionWords = [
    "НОВИНКИ", "КУРТКИ", "СТИЛЬ", "ПРЕМИУМ", "КАЧЕСТВО", "КОМФОРТ",
    "УЛИЦА", "ГОРОД", "ЛЮКС", "ДИЗАЙН", "МОДА", "ТРЕНД", "КОЛЛЕКЦИЯ"
  ]

  return (
    <div className={cn(
      "w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 py-3 md:py-5 overflow-hidden relative",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-neutral-900/80"></div>
      
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22/%3E%3C/svg%3E')]"></div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-400/80 to-transparent blur-[0.5px]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-400/80 to-transparent blur-[0.5px]"></div>

      <div className="hidden md:block animate-marquee whitespace-nowrap flex items-center">
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className="inline-flex items-center mx-8 group">
            <span className="text-white text-[26px] font-light uppercase tracking-[0.2em]
                           transition-all duration-500 group-hover:font-normal
                           hover:text-neutral-200">
              {fashionWords[index % fashionWords.length]}
            </span>
            <span className="mx-6 text-neutral-600 text-lg transition-all duration-300 
                           group-hover:text-neutral-400 group-hover:scale-110">
              
            </span>
          </div>
        ))}
      </div>

      <div className="hidden md:block animate-marquee-reverse whitespace-nowrap flex items-center mt-6">
        {Array.from({ length: 22 }).map((_, index) => (
          <div key={index} className="inline-flex items-center mx-6 group">
            <span className="text-neutral-400 text-[16px] font-extralight uppercase tracking-[0.3em]
                           transition-all duration-400 group-hover:text-neutral-300">
              {fashionWords[(index + 2) % fashionWords.length]}
            </span>
            <span className="mx-4 text-neutral-700 text-sm transition-all duration-300 
                           group-hover:text-neutral-500">
              
            </span>
          </div>
        ))}
      </div>

      <div className="md:hidden animate-marquee-mobile whitespace-nowrap flex items-center">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="inline-flex items-center mx-4 group">
            <span className="text-white text-[18px] font-light uppercase tracking-[0.15em]
                           transition-all duration-500 group-hover:font-normal
                           hover:text-neutral-200">
              {fashionWords[index % fashionWords.length]}
            </span>
            <span className="mx-3 text-neutral-600 text-sm transition-all duration-300 
                           group-hover:text-neutral-400 group-hover:scale-110">
              
            </span>
          </div>
        ))}
      </div>

      <div className="md:hidden animate-marquee-reverse-mobile whitespace-nowrap flex items-center mt-4">

{Array.from({ length: 14 }).map((_, index) => (
          <div key={index} className="inline-flex items-center mx-3 group">
            <span className="text-neutral-400 text-[14px] font-extralight uppercase tracking-[0.2em]
                           transition-all duration-400 group-hover:text-neutral-300">
              {fashionWords[(index + 2) % fashionWords.length]}
            </span>
            <span className="mx-2 text-neutral-700 text-xs transition-all duration-300 
                           group-hover:text-neutral-500">
              
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-neutral-500/60 rounded-full blur-[0.5px]"></div>
      <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-neutral-500/60 rounded-full blur-[0.5px]"></div>
      
      <div className="absolute top-1/3 left-16 w-1 h-1 bg-neutral-600/40 rounded-full blur-[1px]"></div>
      <div className="absolute bottom-1/3 right-16 w-1 h-1 bg-neutral-600/40 rounded-full blur-[1px]"></div>

      <div className="md:hidden absolute top-2 left-4 w-1 h-1 bg-neutral-500/40 rounded-full blur-[0.5px]"></div>
      <div className="md:hidden absolute bottom-2 right-4 w-1 h-1 bg-neutral-500/40 rounded-full blur-[0.5px]"></div>
    </div>
  )
}