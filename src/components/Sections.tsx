import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { about, copy, nav, profile, projects, skills, type Project } from '../data'

const wrap = 'mx-auto max-w-6xl px-6'
const ease = [0.22, 1, 0.36, 1] as const

// Shared entrance used by every section body. Skipped entirely for reduced motion.
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease },
})

function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 text-sm text-mute">
      <span className="font-display tabular-nums text-accent">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden />
      {children}
    </p>
  )
}

export function About() {
  const reduce = useReducedMotion() ?? false
  const anim = (delay = 0) => (reduce ? {} : fade(delay))

  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-28 md:py-40">
      <div className={`${wrap} grid gap-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <Eyebrow index="01">{copy.about.eyebrow}</Eyebrow>
          <motion.h2
            {...anim()}
            id="about-heading"
            className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            {copy.about.heading}
          </motion.h2>
        </div>

        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-14">
          {about.intro.map((p, i) => (
            <motion.p
              key={p}
              {...anim(0.06 * (i + 1))}
              className="max-w-prose text-pretty text-lg leading-relaxed text-mute first:text-bone"
            >
              {p}
            </motion.p>
          ))}

          <motion.dl {...anim(0.18)} className="grid gap-10 pt-10 sm:grid-cols-2">
            <div>
              <dt className="mb-3 text-sm text-mute">{copy.about.interestsLabel}</dt>
              <dd>
                <ul className="space-y-1.5">
                  {about.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="mb-3 text-sm text-mute">{copy.about.learningLabel}</dt>
              <dd className="leading-relaxed">{about.learning}</dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion() ?? false

  return (
    <motion.li
      {...(reduce ? {} : fade())}
      className="group border-t border-line transition-colors duration-300 hover:bg-graphite"
    >
      <div className={`${wrap} grid gap-6 py-12 md:grid-cols-12 md:gap-8 md:py-16`}>
        <div className="md:col-span-5">
          <span className="font-display text-sm tabular-nums text-mute">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-balance font-display text-4xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-6xl">
            {p.href ? (
              <a href={p.href} className="inline-flex items-start gap-2">
                {p.name}
                <ArrowUpRight
                  className="mt-2 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={24}
                  aria-hidden
                />
              </a>
            ) : (
              p.name
            )}
          </h3>
        </div>

        <div className="space-y-5 md:col-span-6 md:col-start-7">
          <p className="max-w-prose text-pretty text-lg leading-relaxed text-mute">{p.description}</p>
          <p className="border-l border-accent pl-4">{p.highlight}</p>
          <ul className="flex flex-wrap gap-2 pt-1" aria-label={`${p.name} technologies`}>
            {p.tech.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-mute">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  )
}

export function Projects() {
  const reduce = useReducedMotion() ?? false

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 md:py-32">
      <div className={`${wrap} mb-12 flex flex-wrap items-end justify-between gap-4`}>
        <div>
          <Eyebrow index="02">{copy.projects.eyebrow}</Eyebrow>
          <motion.h2
            {...(reduce ? {} : fade())}
            id="projects-heading"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            {copy.projects.heading}
          </motion.h2>
        </div>
        <p className="text-sm tabular-nums text-mute">
          {String(projects.length).padStart(2, '0')} projects
        </p>
      </div>

      <ul className="border-b border-line">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} p={p} index={i} />
        ))}
      </ul>
    </section>
  )
}

export function Skills() {
  const reduce = useReducedMotion() ?? false

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-line py-24 md:py-32">
      <div className={`${wrap} grid gap-14 md:grid-cols-12`}>
        <div className="md:col-span-4">
          <Eyebrow index="03">{copy.skills.eyebrow}</Eyebrow>
          <motion.h2
            {...(reduce ? {} : fade())}
            id="skills-heading"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            {copy.skills.heading}
          </motion.h2>
          <motion.p
            {...(reduce ? {} : fade(0.1))}
            className="mt-6 max-w-xs text-pretty leading-relaxed text-mute"
          >
            {copy.skills.intro}
          </motion.p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {skills.map((s, i) => (
            <motion.div key={s.group} {...(reduce ? {} : fade(0.06 * i))}>
              <h3 className="mb-4 flex items-baseline gap-3 border-b border-line pb-3 text-sm text-mute">
                <span className="font-display tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-sm text-mute transition-colors hover:border-accent/60 hover:text-bone"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const reduce = useReducedMotion() ?? false

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line pb-12 pt-28 md:pt-40">
      <div className={wrap}>
        <Eyebrow index="04">{copy.contact.eyebrow}</Eyebrow>
        <motion.h2
          {...(reduce ? {} : fade())}
          id="contact-heading"
          className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1] tracking-[-0.03em] md:text-7xl"
        >
          {copy.contact.heading}
        </motion.h2>

        <motion.div {...(reduce ? {} : fade(0.1))}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-12 inline-block border-b border-accent pb-1 text-xl transition-colors hover:text-accent md:text-3xl"
          >
            {profile.email}
          </a>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-mute">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group -my-2 inline-flex items-center gap-1.5 py-2 transition-colors hover:text-bone"
                >
                  {l.label}
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-24 flex flex-col gap-6 border-t border-line pt-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="-my-2 inline-block py-2 transition-colors hover:text-bone">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="inline-flex w-fit items-center gap-2 py-2 transition-colors hover:text-bone">
            {copy.contact.backToTop}
            <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
