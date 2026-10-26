import { useEffect, useState, type RefObject } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  // ids is usually an inline array; keying on its contents keeps the observer
  // from being torn down and rebuilt on every render.
  const key = ids.join('|')

  useEffect(() => {
    const list = key.split('|').filter(Boolean)
    if (!list.length) return

    let frame = 0
    const compute = () => {
      frame = 0
      // A section becomes current once its top passes 35% of the viewport.
      const line = window.innerHeight * 0.35
      let current = ''

      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }

      // Near the bottom of the page the last section is the one in view, even
      // if its top never reaches the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = list[list.length - 1]

      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])

  return active
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])

  return match
}

/**
 * Tracks whether an element is currently near the viewport. Used to stop the
 * WebGL render loop when the hero scrolls away.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = '200px',
) {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, rootMargin])

  return inView
}
