export const yearLabels = ['freshman', 'sophomore', 'junior', 'senior'];

export const emphases = [
  {
    id: 'general',
    label: 'General CS (No Emphasis)',
    description:
      'Balanced path focused on core CS foundations and flexible upper-level electives.'
  },
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    description:
      'Emphasizes software design, systems, collaboration, testing, and practical development.'
  },
  {
    id: 'data-science',
    label: 'Data Science',
    description:
      'Emphasizes data analysis, statistics, modeling, and data-focused applications.'
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    description:
      'Emphasizes ML foundations, modeling, and advanced computational methods.'
  },
  {
    id: 'hci',
    label: 'Human Computer Interaction',
    description:
      'Emphasizes user-centered design, usability, and interactive system design.'
  },
  {
    id: 'animation',
    label: 'Animation',
    description:
      'Emphasizes graphics/interactive media pathways and supporting technical foundations.'
  }
];

/**
 * Course object shape (keep this consistent):
 * {
 *   id: 'CS-111',
 *   code: 'CS 111',
 *   title: 'Introduction to Computer Science',
 *   credits: 3,
 *   shortDescription: '...',
 *   longDescription: '...',
 *   prereqs: ['MATH 112'],
 *   tags: ['core', 'programming'],
 *   defaultPlacement: { year: 'freshman', bucket: 'core' },
 *   emphasisPlacements: {
 *      'software-engineering': { year: 'freshman', bucket: 'core', priority: 1 },
 *      'data-science': { year: 'freshman', bucket: 'core', priority: 1 }
 *   },
 *   links: [{ label: 'BYU Class Search', url: '...' }]
 * }
 *
 * NOTE: These are sample/placeholder course placements for prototype structure.
 * Verify real prereqs/credits/sequence from official BYU sources before final use.
 */
export const courses = [
  {
    id: 'CS-111',
    code: 'CS 111',
    title: 'Introduction to Computer Science',
    credits: 3,
    shortDescription:
      'Intro programming and problem-solving fundamentals for new CS students.',
    longDescription:
      'Introduces basic programming concepts, problem solving, and computational thinking. Good starting point for students exploring the CS major.',
    prereqs: [],
    tags: ['core', 'intro', 'programming'],
    defaultPlacement: { year: 'freshman', bucket: 'core', priority: 1 },
    emphasisPlacements: {},
    links: []
  },
  {
    id: 'CS-142',
    code: 'CS 142',
    title: 'Introduction to Computer Programming',
    credits: 3,
    shortDescription:
      'Programming fundamentals and software problem-solving in a structured language.',
    longDescription:
      'Foundational programming course focused on syntax, control flow, functions, and basic software development practices.',
    prereqs: [],
    tags: ['core', 'programming'],
    defaultPlacement: { year: 'freshman', bucket: 'core', priority: 2 },
    emphasisPlacements: {},
    links: []
  },
  {
    id: 'CS-224',
    code: 'CS 224',
    title: 'Computer Systems',
    credits: 3,
    shortDescription:
      'Covers lower-level systems concepts, memory, and machine-level thinking.',
    longDescription:
      'Introduces core systems topics including memory, binary data representation, and how software interacts with hardware/system layers.',
    prereqs: ['CS 142'],
    tags: ['core', 'systems'],
    defaultPlacement: { year: 'sophomore', bucket: 'core', priority: 1 },
    emphasisPlacements: {
      'software-engineering': { year: 'sophomore', bucket: 'core', priority: 1 },
      'machine-learning': { year: 'sophomore', bucket: 'core', priority: 1 }
    },
    links: []
  },
  {
    id: 'CS-235',
    code: 'CS 235',
    title: 'Data Structures and Algorithms',
    credits: 3,
    shortDescription:
      'Core CS class covering data structures, algorithmic thinking, and performance.',
    longDescription:
      'Covers abstract data types, complexity, recursion, trees, hashing, and algorithmic problem solving. A foundational course for later upper-division classes.',
    prereqs: ['CS 142'],
    tags: ['core', 'algorithms'],
    defaultPlacement: { year: 'sophomore', bucket: 'core', priority: 2 },
    emphasisPlacements: {},
    links: []
  },
  {
    id: 'CS-236',
    code: 'CS 236',
    title: 'Discrete Structures',
    credits: 3,
    shortDescription:
      'Discrete math foundations used throughout CS (logic, proofs, relations).',
    longDescription:
      'Provides mathematical foundations for computer science including logic, proofs, sets, relations, and combinatorial reasoning.',
    prereqs: ['CS 142'],
    tags: ['core', 'math'],
    defaultPlacement: { year: 'sophomore', bucket: 'core', priority: 3 },
    emphasisPlacements: {
      'data-science': { year: 'sophomore', bucket: 'core', priority: 3 },
      'machine-learning': { year: 'sophomore', bucket: 'core', priority: 2 }
    },
    links: []
  },
  {
    id: 'CS-240',
    code: 'CS 240',
    title: 'Advanced Programming Concepts',
    credits: 3,
    shortDescription:
      'Intermediate/advanced software construction concepts and engineering practices.',
    longDescription:
      'Builds on prior programming experience and introduces larger-scale software design and implementation practices.',
    prereqs: ['CS 235'],
    tags: ['core', 'software'],
    defaultPlacement: { year: 'sophomore', bucket: 'core', priority: 4 },
    emphasisPlacements: {
      'software-engineering': { year: 'sophomore', bucket: 'core', priority: 2 }
    },
    links: []
  },
  {
    id: 'CS-252',
    code: 'CS 252',
    title: 'Computability and Complexity',
    credits: 3,
    shortDescription:
      'Theory-focused course on computational models and complexity limits.',
    longDescription:
      'Explores formal models of computation, decidability, and computational complexity. Important for a deeper understanding of CS theory.',
    prereqs: ['CS 236', 'CS 235'],
    tags: ['core', 'theory'],
    defaultPlacement: { year: 'junior', bucket: 'core', priority: 1 },
    emphasisPlacements: {
      'machine-learning': { year: 'junior', bucket: 'core', priority: 1 }
    },
    links: []
  },
  {
    id: 'CS-260',
    code: 'CS 260',
    title: 'Web Programming',
    credits: 3,
    shortDescription:
      'Builds web applications and introduces client/server web concepts.',
    longDescription:
      'Covers modern web development concepts including front-end interfaces, HTTP, APIs, and web application architecture.',
    prereqs: ['CS 240'],
    tags: ['elective', 'software', 'web'],
    defaultPlacement: { year: 'junior', bucket: 'elective', priority: 4 },
    emphasisPlacements: {
      'software-engineering': { year: 'junior', bucket: 'elective', priority: 1 },
      hci: { year: 'junior', bucket: 'elective', priority: 2 }
    },
    links: []
  },
  {
    id: 'CS-312',
    code: 'CS 312',
    title: 'Algorithm Design and Analysis',
    credits: 3,
    shortDescription:
      'Advanced algorithms and complexity analysis techniques.',
    longDescription:
      'Covers advanced algorithm paradigms, proofs of correctness, and runtime analysis for efficient problem solving.',
    prereqs: ['CS 235', 'CS 236'],
    tags: ['core', 'algorithms'],
    defaultPlacement: { year: 'junior', bucket: 'core', priority: 2 },
    emphasisPlacements: {
      'data-science': { year: 'junior', bucket: 'core', priority: 1 },
      'machine-learning': { year: 'junior', bucket: 'core', priority: 2 }
    },
    links: []
  },
  {
    id: 'CS-324',
    code: 'CS 324',
    title: 'Systems Programming',
    credits: 3,
    shortDescription:
      'Hands-on systems programming and lower-level software development.',
    longDescription:
      'Focuses on systems-level software concepts, performance, and interactions with operating system services.',
    prereqs: ['CS 224', 'CS 240'],
    tags: ['elective', 'systems'],
    defaultPlacement: { year: 'junior', bucket: 'elective', priority: 5 },
    emphasisPlacements: {
      'software-engineering': { year: 'junior', bucket: 'elective', priority: 3 }
    },
    links: []
  },
  {
    id: 'CS-340',
    code: 'CS 340',
    title: 'Software Engineering',
    credits: 3,
    shortDescription:
      'Team-based software engineering practices, architecture, and process.',
    longDescription:
      'Emphasizes software lifecycle, teamwork, requirements, design, testing, and maintainable software systems.',
    prereqs: ['CS 240'],
    tags: ['elective', 'software', 'team'],
    defaultPlacement: { year: 'junior', bucket: 'elective', priority: 2 },
    emphasisPlacements: {
      'software-engineering': { year: 'junior', bucket: 'core', priority: 1 },
      hci: { year: 'junior', bucket: 'elective', priority: 3 }
    },
    links: []
  },
  {
    id: 'CS-355',
    code: 'CS 355',
    title: 'Interactive Graphics',
    credits: 3,
    shortDescription:
      'Graphics/visual computing concepts useful for animation and interactive media.',
    longDescription:
      'Introduces graphics pipelines, rendering concepts, and interactive visualization techniques.',
    prereqs: ['CS 235'],
    tags: ['elective', 'graphics'],
    defaultPlacement: { year: 'senior', bucket: 'elective', priority: 4 },
    emphasisPlacements: {
      animation: { year: 'junior', bucket: 'core', priority: 1 }
    },
    links: []
  },
  {
    id: 'CS-360',
    code: 'CS 360',
    title: 'User Experience Design',
    credits: 3,
    shortDescription:
      'User-centered design, prototyping, and usability evaluation concepts.',
    longDescription:
      'Focuses on user-centered design methods, interface prototyping, and evaluating usability for interactive systems.',
    prereqs: ['CS 240'],
    tags: ['elective', 'hci', 'design'],
    defaultPlacement: { year: 'senior', bucket: 'elective', priority: 3 },
    emphasisPlacements: {
      hci: { year: 'junior', bucket: 'core', priority: 1 },
      'software-engineering': { year: 'senior', bucket: 'elective', priority: 2 }
    },
    links: []
  },
  {
    id: 'CS-450',
    code: 'CS 450',
    title: 'Database Systems',
    credits: 3,
    shortDescription:
      'Database design, querying, modeling, and storage fundamentals.',
    longDescription:
      'Covers data modeling, relational design, SQL, and database implementation concepts for applications and systems.',
    prereqs: ['CS 240'],
    tags: ['elective', 'data'],
    defaultPlacement: { year: 'senior', bucket: 'elective', priority: 1 },
    emphasisPlacements: {
      'data-science': { year: 'junior', bucket: 'core', priority: 2 },
      'software-engineering': { year: 'senior', bucket: 'elective', priority: 1 }
    },
    links: []
  },
  {
    id: 'CS-472',
    code: 'CS 472',
    title: 'Machine Learning',
    credits: 3,
    shortDescription:
      'Introduction to machine learning models and evaluation methods.',
    longDescription:
      'Covers supervised/unsupervised learning fundamentals, model training, and evaluating predictive performance.',
    prereqs: ['CS 312', 'MATH/STAT prerequisites'],
    tags: ['elective', 'ml', 'data'],
    defaultPlacement: { year: 'senior', bucket: 'elective', priority: 2 },
    emphasisPlacements: {
      'machine-learning': { year: 'senior', bucket: 'core', priority: 1 },
      'data-science': { year: 'senior', bucket: 'core', priority: 1 }
    },
    links: []
  },
  {
    id: 'CS-480',
    code: 'CS 480',
    title: 'Artificial Intelligence',
    credits: 3,
    shortDescription:
      'AI foundations including search, reasoning, and intelligent agents.',
    longDescription:
      'Introduces key AI concepts such as search, knowledge representation, reasoning, and intelligent behavior in software systems.',
    prereqs: ['CS 312'],
    tags: ['elective', 'ai'],
    defaultPlacement: { year: 'senior', bucket: 'elective', priority: 5 },
    emphasisPlacements: {
      'machine-learning': { year: 'senior', bucket: 'elective', priority: 2 }
    },
    links: []
  },
  {
    id: 'STAT-121',
    code: 'STAT 121',
    title: 'Principles of Statistics',
    credits: 3,
    shortDescription:
      'Statistics foundations useful for data science and machine learning tracks.',
    longDescription:
      'Covers probability and statistics fundamentals used for inference, modeling, and data analysis.',
    prereqs: [],
    tags: ['supporting', 'math', 'data'],
    defaultPlacement: { year: 'freshman', bucket: 'elective', priority: 3 },
    emphasisPlacements: {
      'data-science': { year: 'freshman', bucket: 'core', priority: 3 },
      'machine-learning': { year: 'freshman', bucket: 'core', priority: 3 }
    },
    links: []
  }
];