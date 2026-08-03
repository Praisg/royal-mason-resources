import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

interface FadingVideoProps {
  src: string | string[]
  className?: string
  style?: CSSProperties
  /** Static fallback image for mobile / reduced motion */
  poster?: string
  preferStaticOnMobile?: boolean
}

function animateOpacity(
  el: HTMLElement,
  from: number,
  to: number,
  duration: number,
  onDone?: () => void,
) {
  const start = performance.now()

  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      onDone?.()
    }
  }

  requestAnimationFrame(tick)
}

function usePreferStatic(preferStaticOnMobile: boolean) {
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    const update = () => {
      setStaticMode(mqReduce.matches || (preferStaticOnMobile && mqMobile.matches))
    }
    update()
    mqReduce.addEventListener('change', update)
    mqMobile.addEventListener('change', update)
    return () => {
      mqReduce.removeEventListener('change', update)
      mqMobile.removeEventListener('change', update)
    }
  }, [preferStaticOnMobile])

  return staticMode
}

export default function FadingVideo({
  src,
  className,
  style,
  poster,
  preferStaticOnMobile = true,
}: FadingVideoProps) {
  const sources = Array.isArray(src) ? src : [src]
  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOut = useRef(false)
  const staticMode = usePreferStatic(preferStaticOnMobile)

  const fadeIn = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    fadingOut.current = false
    animateOpacity(el, 0, 1, 500)
  }, [])

  const fadeOut = useCallback((onDone?: () => void) => {
    const el = videoRef.current
    if (!el || fadingOut.current) return
    fadingOut.current = true
    animateOpacity(el, 1, 0, 550, onDone)
  }, [])

  useEffect(() => {
    fadingOut.current = false
    const el = videoRef.current
    if (el) {
      el.style.opacity = '0'
    }
  }, [index])

  if (staticMode && poster) {
    return (
      <img
        src={poster}
        alt=""
        className={className}
        style={style}
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <video
      key={sources[index]}
      ref={videoRef}
      src={sources[index]}
      poster={poster}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={() => fadeIn()}
      onTimeUpdate={() => {
        const el = videoRef.current
        if (!el || !el.duration || fadingOut.current) return
        const remaining = el.duration - el.currentTime
        if (remaining <= 0.55) {
          fadeOut()
        }
      }}
      onEnded={() => {
        const el = videoRef.current
        if (!el) return
        if (sources.length === 1) {
          el.currentTime = 0
          void el.play()
          fadeIn()
        } else {
          setIndex((i) => (i + 1) % sources.length)
        }
      }}
    />
  )
}
