// Everything on the page is edited here.
export const profile = {
  name: 'Thejas',
  initials: 'TJ',
  role: 'Computer science student, full-stack developer',
  email: 'you@example.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/your-handle' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
  ],
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  intro: [
    'I’m a computer science and engineering student who likes building software people actually use, and understanding how the pieces underneath it fit together.',
    'I work across the stack, from interface details to APIs and databases, and I care most about the moments where a system has to stay fast, clear and reliable under real use.',
  ],
  interests: ['Full-stack engineering', 'Interactive applications', 'System design', 'Real-time communication'],
  learning: 'Currently deepening my system design fundamentals and learning how to build reliable applications on top of language models.',
}

export type Project = {
  name: string
  description: string
  highlight: string
  tech: string[]
  href?: string
}

export const projects: Project[] = [
  {
    name: 'Sahayak',
    description:
      'A community assistance platform connecting senior citizens with trusted people who can help with everyday needs.',
    highlight: 'Voice-first assistance and real-time communication',
    tech: ['Flutter', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Issue Tracker',
    description:
      'A collaborative issue management application for tracking tasks, responsibilities and project progress.',
    highlight: 'REST APIs',
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
  },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Flutter'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB'] },
  { group: 'Working style', items: ['System design', 'Git', 'Accessible interfaces'] },
]
