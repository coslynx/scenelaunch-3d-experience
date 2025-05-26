import { useState, useEffect, useRef, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollAnimationOptions {
  element: React.RefObject<HTMLElement | null>
  start?: string
  end?: string
  horizontal?: boolean
  disabled?: boolean
  animationConfig?: gsap.TweenVars
}

interface UseScrollAnimationResult {
  scrollY: number
  scrollX: number
  enable: () => void
  disable: () => void
}

/**
 * Custom hook for creating scroll-based animations using GSAP and ScrollTrigger.
 *
 * This hook provides functionality for synchronizing animations with the scroll position
 * of a specified HTML element.
 *
 * @param element - A React ref to the HTML element to track.
 * @param options - Configuration options for the scroll animation.
 * @returns An object containing scroll progress and functions to control the animation.
 */
const useScrollAnimation = (
  element: React.RefObject<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
): UseScrollAnimationResult => {
  const { start = 'top bottom', end = 'bottom top', horizontal = false, disabled = false, animationConfig = {} } = options
  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const triggerRef = useRef<ScrollTrigger>()

  useEffect(() => {
    if (disabled) return
    gsap.registerPlugin(ScrollTrigger)

    const updateScrollPosition = () => {
      if (!element.current) return
      const rect = element.current.getBoundingClientRect()
      setScrollY(rect.top / window.innerHeight)
      setScrollX(rect.left / window.innerWidth)
    }

    const setupScrollTrigger = () => {
      if (!element.current) return
      triggerRef.current = ScrollTrigger.create({
        trigger: element.current,
        scroller: window,
        start: start,
        end: end,
        horizontal: horizontal,
        scrub: true,
        onUpdate: (self) => {
          updateScrollPosition()
          animationConfig.onUpdate?.()
        },
        onToggle: (self) => {
          if (self.isActive) {
            animationConfig.onStart?.()
          }
        },
      })
    }

    updateScrollPosition()
    setupScrollTrigger()

    return () => {
      triggerRef.current?.kill()
    }
  }, [element, start, end, horizontal, disabled, animationConfig])

  const enable = useCallback(() => {
    triggerRef.current?.enable()
  }, [])

  const disable = useCallback(() => {
    triggerRef.current?.disable()
  }, [])

  return { scrollY, scrollX, enable, disable }
}

export { useScrollAnimation }