/**
 * ============================================================
 * PROJECT ARCHIVE — this is the file you'll edit most often.
 *
 * To add a project: copy the template at the bottom of this
 * file, fill it in, and add it to the `projects` array. Order
 * within the array controls order within each year group on
 * /projects (newest year group renders first).
 *
 * Everything except `slug`, `title`, `year`, `summary`,
 * `categories`, `status`, and `tech` is optional — sections
 * with no content are hidden automatically on the case-study
 * page, so sparse entries still look intentional.
 * ============================================================
 */

/* ----------------------------- Types ----------------------------- */

export const CATEGORIES = [
  "Full-stack",
  "ML/AI",
  "Systems",
  "Tools",
  "Research",
  "Product",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["completed", "in-progress", "paused", "archived"] as const;
export type Status = (typeof STATUSES)[number];

/** Every link is optional. `private` renders as an unlinked note. */
export type LinkKind =
  | "github"
  | "demo"
  | "paper"
  | "writeup"
  | "video"
  | "screenshots"
  | "private";

export interface ProjectLink {
  kind: LinkKind;
  /** Omit for kind: "private" — it renders as "Private / internal". */
  href?: string;
  /** Optional custom label, e.g. "Backend repo". */
  label?: string;
}

/**
 * Long-form case-study content. Every field is optional and every
 * section hides itself when empty. Use `string[]` for bullet lists
 * and `string` for prose paragraphs (separate paragraphs with \n\n).
 */
export interface CaseStudy {
  problem?: string;
  role?: string;
  architecture?: string;
  implementation?: string | string[];
  keyFeatures?: string[];
  /** ML/modeling details — only for ML projects. */
  mlDetails?: string | string[];
  tradeoffs?: string | string[];
  results?: string | string[];
  lessons?: string | string[];
  futureWork?: string | string[];
}

/**
 * Optional product-thinking fields. Fill in as many or as few as you
 * like per project; the "Product thinking" section only renders if at
 * least one field is present.
 */
export interface ProductThinking {
  userProblem?: string;
  targetUser?: string;
  productDecision?: string;
  tradeoff?: string;
  successMetric?: string;
  roadmapIdea?: string;
}

export interface Project {
  /** URL slug: /projects/[slug]. Keep it kebab-case and stable. */
  slug: string;
  title: string;
  /** Short kicker shown under the title, e.g. an award or context line. */
  distinction?: string;
  /** Year used for grouping in the archive (most recent activity). */
  year: number;
  /** One–two sentence summary for cards and list rows. */
  summary: string;
  categories: Category[];
  status: Status;
  /** Primary technologies. First ~4 show in list rows; all show on the case study. */
  tech: string[];
  /** Free-form tags: role, domain, project type — used by archive search. */
  tags?: string[];
  /** Show on the homepage. Keep this to your 3–4 strongest projects. */
  featured?: boolean;
  /** Long-form overview paragraph(s) at the top of the case study. */
  overview?: string;
  caseStudy?: CaseStudy;
  product?: ProductThinking;
  links?: ProjectLink[];
}

/* --------------------------- Projects ---------------------------- */
/* Source of truth: resume. Sections not covered by the resume are
   marked TODO — replace them with your own writing. */

export const projects: Project[] = [
  {
    slug: "amazon-connect-supervisor-insights",
    title: "Amazon Connect Supervisor Insights",
    distinction: "1st place — UCI ICS Project Expo 2024",
    year: 2024,
    summary:
      "Real-time AI analytics platform that helps call-center supervisors support agents, monitor performance, and improve service metrics at scale.",
    categories: ["ML/AI", "Full-stack"],
    status: "completed",
    tech: [
      "Java",
      "Spring Boot",
      "AWS Connect",
      "AWS Lambda",
      "AWS Bedrock",
      "S3",
      "EC2",
      "Flask",
      "Llama 3",
    ],
    tags: ["Backend lead", "LLM integration", "ETL", "Team project", "Capstone"],
    featured: true,
    overview:
      "A real-time AI analytics platform for call-center supervisors, built on Amazon Connect. It ingests live and historical contact-center data and uses LLM-driven reasoning to surface context-aware insights, so supervisors can support agents and improve service metrics at scale. Won 1st place at the UCI ICS Project Expo 2024.",
    caseStudy: {
      // TODO: expand this section with the original problem framing —
      // what supervisors struggled with before the platform existed.
      problem:
        "Call-center supervisors need to monitor agent performance and service metrics in real time, but raw contact-center data is high-volume and hard to act on in the moment.",
      role:
        "Led backend development: API and microservice design, AWS data ingestion, and the LLM integration through Bedrock.",
      architecture:
        "Scalable REST APIs and microservices in Java (Spring Boot) ingest real-time and historical data from AWS Connect. Automated ETL pipelines built on AWS Lambda and S3 handle scalable, low-latency data processing, and a Flask service fronts the model layer.",
      implementation: [
        "Designed scalable REST APIs and Java microservices to ingest real-time and historical data from AWS Connect.",
        "Integrated Llama 3 through AWS Bedrock to generate context-aware insights, combining rule-based logic with LLM-driven reasoning.",
        "Built automated ETL pipelines with AWS Lambda and S3 for scalable, low-latency data processing.",
      ],
      mlDetails:
        "Insights are generated by Llama 3 served through AWS Bedrock, layered over rule-based reasoning so deterministic checks handle the clear-cut cases and the LLM handles context-heavy ones.",
      results:
        "Won 1st place at the UCI ICS Project Expo 2024.",
      // TODO: add tradeoffs, lessons learned, and future work in your
      // own words — these weren't on the resume.
    },
    product: {
      targetUser:
        "Call-center supervisors responsible for agent performance and service quality.",
      userProblem:
        "Supervisors can't realistically watch every live call, so coaching and interventions happen after the fact instead of in the moment.",
      // TODO: add productDecision / tradeoff / successMetric / roadmapIdea
      // if you want this project to carry more product-sense weight.
    },
    links: [
      // TODO: add a GitHub / demo / video link if one exists, e.g.:
      // { kind: "github", href: "https://github.com/nbeesetti/<repo>" },
    ],
  },

  {
    slug: "gradgpt",
    title: "GradGPT",
    distinction: "Agentic AI academic advisor",
    year: 2025,
    summary:
      "Multi-agent LLM academic advisor with orchestration, parallelized query routing, and a RAG pipeline over structured academic data.",
    categories: ["ML/AI", "Product"],
    status: "completed",
    tech: ["Python", "OpenAI API", "RAG", "Supabase", "FastAPI", "Gradio"],
    tags: ["Multi-agent", "RAG", "Evaluation", "LLM-as-a-judge"],
    featured: true,
    overview:
      "GradGPT is an agentic AI academic advisor: a multi-agent LLM system that routes student questions to specialized agents, retrieves grounded context through a RAG pipeline over structured data, and merges results into context-aware answers.",
    caseStudy: {
      // TODO: expand with the motivation — what advising gap GradGPT fills.
      problem:
        "Students need fast, accurate answers to academic-planning questions, but that information is scattered across structured sources and generic chatbots hallucinate on it.",
      role: "Designed and built the system end to end.",
      architecture:
        "A multi-agent LLM system with an orchestration layer that routes queries to specialized agents in parallel and merges their outputs. Retrieval runs over structured data in Supabase, served through FastAPI with a Gradio front end.",
      implementation: [
        "Built multi-agent orchestration with parallelized query routing and merging, reducing latency by 56%.",
        "Implemented a RAG pipeline over structured data with retrieval and ranking to generate context-aware responses.",
        "Evaluated model quality through human review and LLM-as-a-judge.",
      ],
      mlDetails:
        "Quality was measured with a dual evaluation loop — human review plus LLM-as-a-judge — reaching ≥4.0/5 relevancy and >90% routing accuracy.",
      results: [
        "56% latency reduction from parallelized query routing and merging.",
        "≥4.0/5 relevancy score and >90% routing accuracy in evaluation.",
      ],
      // TODO: add tradeoffs, lessons learned, and future work.
    },
    product: {
      targetUser: "University students planning courses and degree requirements.",
      successMetric:
        "Answer relevancy (≥4.0/5 in evaluation) and routing accuracy (>90%).",
      // TODO: add userProblem / productDecision / tradeoff / roadmapIdea.
    },
    links: [
      // TODO: add GitHub / demo links if available.
    ],
  },

  {
    slug: "fault-tolerant-distributed-ml",
    title: "Fault-Tolerant Distributed ML Workloads",
    year: 2025,
    summary:
      "Distributed systems infrastructure for ML training: gossip-based failure detection, Paxos/Raft consensus, and a fault-tolerant MapReduce engine.",
    categories: ["Systems", "ML/AI"],
    status: "completed",
    tech: ["Go", "Python", "Paxos", "Raft", "MapReduce"],
    tags: ["Distributed systems", "Consensus", "Infrastructure"],
    featured: true,
    overview:
      "Infrastructure for running ML training workloads across unreliable clusters: nodes detect failures via gossip, coordinate through consensus, and reschedule work automatically so training survives worker crashes.",
    caseStudy: {
      problem:
        "Distributed ML training has to tolerate worker failures — a single crashed node shouldn't lose progress or stall the whole job.",
      role: "Implemented the system in Go with Python ML workloads.",
      architecture:
        "A gossip-based heartbeat protocol handles scalable node-failure detection and cluster recovery. Paxos and Raft coordinate leader election, log replication, and fault-tolerant task scheduling across distributed workers, and a MapReduce engine with persistent logging parallelizes the training work itself.",
      implementation: [
        "Implemented a gossip-based heartbeat protocol for scalable node failure detection and cluster recovery.",
        "Integrated Paxos and Raft consensus for leader election, log replication, and fault-tolerant task scheduling.",
        "Built a scalable MapReduce engine with persistent logging and task rescheduling to parallelize ML training workloads.",
      ],
      results:
        "Reduced training time by 71% through parallelization while maintaining fault tolerance across worker failures.",
      // TODO: add tradeoffs (e.g. Paxos vs Raft design decisions),
      // lessons learned, and future work.
    },
    links: [
      // TODO: add GitHub link if the repo is public.
    ],
  },

  {
    slug: "fullerton-housing-alliance",
    title: "Fullerton Housing Alliance Platform",
    distinction: "Shipped to production at OC United",
    year: 2024,
    summary:
      "Production website with a transcript search system — a Python pipeline indexing YouTube video transcripts into MongoDB for fast search and retrieval.",
    categories: ["Full-stack", "Product"],
    status: "completed",
    tech: ["Python", "PHP", "JavaScript", "MongoDB"],
    tags: ["Team lead", "Search", "Data pipeline", "Nonprofit"],
    featured: true,
    overview:
      "A production website built for the Fullerton Housing Alliance during my internship at OC United, where I led a 4-person engineering team. The centerpiece is a search system over YouTube video transcripts: a Python pipeline extracts, processes, and indexes transcripts into MongoDB so visitors can actually find content inside hours of video.",
    caseStudy: {
      problem:
        "The organization's content lived inside long YouTube videos, which made it effectively unsearchable for visitors.",
      role:
        "Led a 4-person engineering team through development and production deployment; built the data pipeline and search backend.",
      architecture:
        "A Python data pipeline plus a PHP plugin extract, process, and index YouTube video transcripts into MongoDB for search and retrieval, integrated into the production site.",
      implementation: [
        "Built the Python extraction/processing pipeline and the PHP plugin that indexes transcripts into MongoDB.",
        "Optimized the JavaScript front end, PHP backend, and database schema for search performance.",
      ],
      results: [
        "Increased platform engagement by 37% in production through scalable search improvements.",
        "Reduced transcript search latency by 6 seconds (32%) via backend and schema optimization.",
      ],
      // TODO: add lessons learned from leading the team, and future work.
    },
    product: {
      targetUser:
        "Community members and partners looking for housing-related content published by the alliance.",
      userProblem:
        "Valuable information was locked inside long videos with no way to search it.",
      successMetric: "Platform engagement, up 37% in production after launch.",
    },
    links: [
      // TODO: add the live site URL if it's still up, or mark it private:
      // { kind: "private", label: "Built for OC United / Fullerton Housing Alliance" },
    ],
  },
];

/* ------------------------ Copy-paste template ---------------------
  {
    slug: "my-new-project",
    title: "My New Project",
    distinction: "Optional kicker line (award, context, one-liner)",
    year: 2026,
    summary: "One or two sentences for the archive list and cards.",
    categories: ["Full-stack"],          // from CATEGORIES above
    status: "in-progress",               // completed | in-progress | paused | archived
    tech: ["TypeScript", "Next.js"],
    tags: ["Solo project", "Side project"],
    featured: false,                     // true = shows on homepage
    overview: "Longer intro paragraph(s) for the case-study page.",
    caseStudy: {
      problem: "…",
      role: "…",
      architecture: "…",
      implementation: ["…", "…"],
      keyFeatures: ["…"],
      mlDetails: "…",                    // omit for non-ML projects
      tradeoffs: "…",
      results: "…",
      lessons: "…",
      futureWork: "…",
    },
    product: {                           // omit entirely if not relevant
      userProblem: "…",
      targetUser: "…",
      productDecision: "…",
      tradeoff: "…",
      successMetric: "…",
      roadmapIdea: "…",
    },
    links: [
      { kind: "github", href: "https://github.com/nbeesetti/repo" },
      { kind: "demo", href: "https://…" },
      { kind: "private", label: "Internal to <company>" },
    ],
  },
------------------------------------------------------------------- */

/* --------------------------- Helpers ----------------------------- */

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 4);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Newest year first; insertion order preserved within a year. */
export function getProjectsByYear(): Array<[number, Project[]]> {
  const groups = new Map<number, Project[]>();
  for (const p of [...projects].sort((a, b) => b.year - a.year)) {
    const group = groups.get(p.year) ?? [];
    group.push(p);
    groups.set(p.year, group);
  }
  return [...groups.entries()];
}

export const STATUS_LABELS: Record<Status, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  paused: "Paused",
  archived: "Archived",
};
