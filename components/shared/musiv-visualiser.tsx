'use client'

import { useState, useRef, useEffect } from 'react'

interface MusicVisualizerIconProps {
  className?: string
  bg?: string;
}

export const MusicVisualizerIcon: React.FC<MusicVisualizerIconProps> = ({ className,bg }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const unlockAttemptRef = useRef(0)
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioRef.current || isAudioUnlocked || unlockAttemptRef.current > 5) return

      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        const audioContext = new AudioContext()
        
        if (audioContext.state === 'suspended') {
          await audioContext.resume()
        }

        await audioRef.current.play()
        setIsAudioUnlocked(true)
        setIsPlaying(true)
        localStorage.setItem('musicPlaying', 'true')
        console.log('Audio successfully unlocked!')
        
        await audioContext.close()
        
      } catch (error) {
        unlockAttemptRef.current++
        console.log(`Unlock attempt ${unlockAttemptRef.current} failed`)
        
        if (unlockAttemptRef.current <= 5) {
          setTimeout(unlockAudio, 1000)
        }
      }
    }

    const events = [
      'click', 'touchstart', 'mousedown', 'mouseup', 'mousemove',
      'keydown', 'keyup', 'scroll', 'wheel', 'touchmove'
    ]

    const handleUserInteraction = () => {
      unlockAudio()
    }

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { 
        once: true,
        passive: true 
      })
    })

    const savedState = localStorage.getItem('musicPlaying')
    if (savedState === 'true') {
      setTimeout(unlockAudio, 500)
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [isAudioUnlocked])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        localStorage.setItem('musicPlaying', 'false')
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        localStorage.setItem('musicPlaying', 'true')
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/bg-music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={togglePlay}
        className={`
          relative w-8 h-8 flex items-center justify-center
          bg-transparent rounded transition-all duration-200
          hover:scale-110 active:scale-95
          ${className}`
        }
        aria-label={isPlaying ? "Остановить музыку" : "Включить музыку"}
      >
        <div className="flex items-end justify-center gap-0.5 h-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`
                w-0.5 ${bg} transition-all duration-300
                ${isPlaying 
                  ? 'h-3 animate-music-bar' 
                  : 'h-1 opacity-40'
                }`
              }
              style={{
                animationDelay:` ${index * 0.1}s`,
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
            />
          ))}
        </div>

        {!isAudioUnlocked && (
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-70 animate-pulse" />
        )}

        <div className={`
          absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full
          transition-all duration-300
          ${isPlaying 
            ? 'bg-green-400 opacity-100 scale-100' 
            : isAudioUnlocked ? 'bg-gray-400 opacity-70 scale-100' : 'bg-gray-400 opacity-0 scale-50'
          }`
        } />
      </button>
    </>
  )
}