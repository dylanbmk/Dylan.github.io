export const site = {
  url: 'https://dylanbmk.github.io',

  meta: {
    title: 'Dylan | E-Portafolio - Bases de Datos 2',
    description:
      'E-portafolio académico de Dylan, estudiante de Ingeniería de Sistemas en la Universidad El Bosque.',
  },

  hero: {
    name: 'Dylan',
    role: 'Estudiante de Ingeniería de Sistemas',
    tagline:
      'Bienvenido a mi e-portafolio académico. En este espacio compartiré mi proceso de aprendizaje durante Bases de Datos 2.',
    contact:
      'Universidad El Bosque · Bases de Datos 2',
    avatarSrc: '/foto-dylan.jpg',
    avatarAlt: 'Foto de Dylan',
  },

  about: {
    paragraphs: [
      'Hola, soy Dylan, estudiante de Ingeniería de Sistemas en la Universidad El Bosque.',
      'Me interesa la tecnología, el desarrollo de software y seguir aprendiendo nuevas herramientas que puedan ayudarme en mi formación profesional.',
      {
        heading: 'Sobre mí',
        bullets: [
          'Estudiante de Ingeniería de Sistemas',
          'Interesado en tecnología y desarrollo de software',
          'En constante aprendizaje de nuevas herramientas y tecnologías',
        ],
      },
      {
        heading: 'Bases de Datos 2',
        bullets: [
          'Aprender a trabajar de manera más avanzada con bases de datos',
          'Fortalecer mis conocimientos en SQL y otras tecnologías',
          'Aplicar lo aprendido en proyectos de Ingeniería de Sistemas',
        ],
      },
    ],
  },

  experiences: [],

  featuredProjects: [],

  projectArchivePage: {
    title: 'Evidencias',
    description:
      'Evidencias y actividades desarrolladas durante la asignatura Bases de Datos 2.',
    intro:
      'En esta sección se irán agregando las evidencias del semestre.',
  },

  projectArchive: [
    {
      date: 'Semestre 2026-2',
      project: 'SQL',
      role: 'Evidencias',
      techStack: 'SQL',
    },
    {
      date: 'Semestre 2026-2',
      project: 'PL/SQL Scripts',
      role: 'Evidencias',
      techStack: 'PL/SQL',
    },
    {
      date: 'Semestre 2026-2',
      project: 'NoSQL',
      role: 'Evidencias',
      techStack: 'NoSQL',
    },
    {
      date: 'Semestre 2026-2',
      project: 'Proyecto',
      role: 'Evidencias',
      techStack: 'Bases de Datos',
    },
  ],

  contact: {
    email: '',
    github: 'https://github.com/dylanbmk/Dylan.github.io',
    linkedin: '',
  },
} as const;

export type ProjectArchiveRow = (typeof site.projectArchive)[number];
export type FeaturedProject = (typeof site.featuredProjects)[number];
