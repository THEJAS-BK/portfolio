import { ArrowUpRight } from 'lucide-react'
import { about, profile, projects, skills, type Project } from '../data'

const wrap = 'mx-auto max-w-6xl px-6'

export function About() {
  return (
    <section id="about" className="border-t border-line py-32 md:py-44">
      <div className={`${wrap} grid gap-16 md:grid-cols-12`}>
        <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:col-span-5 md:text-5xl">
          Practical software, and the systems underneath it.
        </h2>
        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-3">
          {about.intro.map((p) => (
            <p key={p} className="max-w-prose text-lg leading-relaxed text-mute first:text-bone">
              {p}
            </p>
          ))}
          <dl className="grid gap-10 pt-10 sm:grid-cols-2">
            <div>
              <dt className="mb-3 text-sm text-mute">Areas of interest</dt>
              <dd>
                <ul className="space-y-1.5">
                  {about.interests.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="mb-3 text-sm text-mute">Learning now</dt>
              <dd className="leading-relaxed">{about.learning}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ p }: { p: Project }) {
  return (
    <li className="group border-t border-line py-10 transition-colors hover:bg-graphite md:py-14">
      <div className={`${wrap} grid gap-8 md:grid-cols-12`}>
        <h3 className="font-display text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent md:col-span-5 md:text-6xl">
          {p.href ? (
            <a href={p.href} className="inline-flex items-start gap-2">
              {p.name}
              <ArrowUpRight className="mt-2 shrink-0" size={24} aria-hidden />
            </a>
          ) : (
            p.name
          )}
        </h3>
        <div className="space-y-5 md:col-span-6 md:col-start-7">
          <p className="max-w-prose text-lg leading-relaxed text-mute">{p.description}</p>
          <p className="border-l border-accent pl-4">{p.highlight}</p>
          <ul className="flex flex-wrap gap-2 pt-1" aria-label={`${p.name} technologies`}>
            {p.tech.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-mute">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className={`${wrap} mb-14`}>
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Selected projects</h2>
      </div>
      <ul className="border-b border-line">
        {projects.map((p) => <ProjectRow key={p.name} p={p} />)}
      </ul>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40">
      <div className={`${wrap} grid gap-16 md:grid-cols-12`}>
        <h2 className="font-display text-4xl font-semibold tracking-tight md:col-span-4 md:text-5xl">Skills</h2>
        <div className="grid gap-12 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="mb-4 border-b border-line pb-3 text-sm text-mute">{s.group}</h3>
              <ul className="space-y-2">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-32 md:py-44">
      <div className={wrap}>
        <h2 className="max-w-3xl font-display text-5xl font-semibold leading-[1] tracking-[-0.03em] md:text-7xl">
          Let’s build something worth using.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-12 inline-block border-b border-accent pb-1 text-xl transition-colors hover:text-accent md:text-3xl"
        >
          {profile.email}
        </a>
        <ul className="mt-10 flex gap-8 text-mute">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-bone">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-32 text-sm text-mute">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </section>
  )
}
