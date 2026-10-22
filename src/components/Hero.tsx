import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data'
import { useMediaQuery } from '../hooks'

const Scene = lazy(() => import('./Scene'))

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const reduce = useReducedMotion() ?? false
  const mobile = useMediaQuery('(max-width: 767px)')
  // One orchestrated entrance for the whole hero; nothing else on the page animates on load.
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease },
  })

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: mobile ? 0.55 : 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      >
        <Suspense fallback={null}>
          <Scene simple={mobile} still={reduce} />
        </Suspense>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent md:via-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
        <motion.p {...item(0)} className="mb-8 flex items-center gap-3 text-sm text-mute">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </motion.p>

        <motion.h1
          {...item(1)}
          className="max-w-4xl font-display text-[clamp(2.9rem,8.4vw,7.2rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
        >
          Building digital experiences that work beautifully.
        </motion.h1>

        <motion.p {...item(2)} className="mt-8 max-w-md text-lg leading-relaxed text-mute">
          I’m a computer science student and developer interested in full-stack engineering, interactive
          applications and system design.
        </motion.p>

        <motion.div {...item(3)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            Explore my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-bone"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.p {...item(4)} className="mt-14 text-sm text-mute">
          {profile.role}
        </motion.p>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-6 flex items-center gap-3 text-mute transition-colors hover:text-bone md:left-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        <ArrowDown size={16} className="animate-bounce motion-reduce:animate-none" />
        <span className="text-sm">Scroll</span>
      </a>
    </section>
  )
}
