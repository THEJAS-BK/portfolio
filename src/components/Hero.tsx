import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { profile, copy } from '../data'
import { useInView, useMediaQuery } from '../hooks'
import ErrorBoundary from './ErrorBoundary'

const Scene = lazy(() => import('./Scene'))

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const reduce = useReducedMotion() ?? false
  const mobile = useMediaQuery('(max-width: 767px)')
  const section = useRef<HTMLElement>(null)
  const sceneNear = useInView(section)

  // One orchestrated entrance for the whole hero; nothing else on the page animates on load.
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease },
  })

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: mobile ? 0.55 : 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      >
        <ErrorBoundary>
          <Suspense fallback={<div className="scene-fallback h-full w-full" />}>
            <Scene simple={mobile} still={reduce} active={sceneNear} />
          </Suspense>
        </ErrorBoundary>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent md:via-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
        <motion.p
          {...item(0)}
          className="mb-8 flex w-fit items-center gap-3 rounded-full border border-line py-1.5 pl-3 pr-4 text-sm text-mute"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {copy.hero.availability}
        </motion.p>

        <motion.h1
          {...item(1)}
          className="max-w-4xl text-balance font-display text-[clamp(2.9rem,8.4vw,7.2rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
        >
          {copy.hero.headline}
        </motion.h1>

        <motion.p
          {...item(2)}
          className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-mute"
        >
          {copy.hero.intro}
        </motion.p>

        <motion.div {...item(3)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={copy.hero.primaryCta.href}
            className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            {copy.hero.primaryCta.label}
          </a>
          <a
            href={copy.hero.secondaryCta.href}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-bone"
          >
            {copy.hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.p {...item(4)} className="mt-14 text-sm text-mute">
          {profile.role}
        </motion.p>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-6 -m-2 flex items-center gap-3 p-2 text-mute transition-colors hover:text-bone md:left-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        <ArrowDown size={16} className="animate-bounce motion-reduce:animate-none" aria-hidden />
        <span className="text-sm">{copy.hero.scroll}</span>
      </a>
    </section>
  )
}
