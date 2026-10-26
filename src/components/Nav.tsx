import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../data'
import { useActiveSection } from '../hooks'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(nav.map((n) => n.id))
  const progress = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      if (progress.current) {
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Close on Escape, lock background scrolling, and release both on unmount.
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggle.current?.focus()
    }
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = overflow
    }
  }, [open])

  // The menu is mobile-only; drop it if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="-m-2 p-2 font-display text-lg font-semibold tracking-tight"
          aria-label={`${profile.name}, back to top`}
        >
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'location' : undefined}
                className={`relative -my-2 py-2 text-sm transition-colors hover:text-bone ${
                  active === n.id ? 'text-bone' : 'text-mute'
                } after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-accent after:transition-transform ${
                  active === n.id ? 'after:scale-x-100' : 'after:scale-x-0'
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full border border-line px-4 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent md:inline-block"
          >
            Get in touch
          </a>
          <button
            ref={toggle}
            className="-mr-2 p-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div aria-hidden className={`absolute inset-x-0 bottom-0 h-px ${scrolled || open ? 'bg-line' : 'bg-transparent'}`}>
        <div ref={progress} className="h-full origin-left scale-x-0 bg-accent" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line bg-ink/95 px-6 pb-6 pt-2 backdrop-blur-md md:hidden"
          >
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? 'location' : undefined}
                  className={`block border-b border-line/60 py-4 font-display text-2xl ${
                    active === n.id ? 'text-accent' : 'text-bone'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
