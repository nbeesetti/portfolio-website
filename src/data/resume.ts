/**
 * ============================================================
 * RESUME DATA — edit education, experience, and skills here.
 * Source of truth: Beesetti_Neeraja_Resume.pdf.
 * ============================================================
 */

export interface Education {
  school: string;
  degree: string;
  detail?: string;
  location: string;
  period: string;
  coursework?: string;
}

export interface Experience {
  company: string;
  team?: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const education: Education[] = [
  {
    school: "California Polytechnic State University, San Luis Obispo",
    degree: "M.S. Computer Science (AI/ML)",
    detail: "3.97 GPA",
    location: "San Luis Obispo, CA",
    period: "Sep 2024 – Aug 2026",
    coursework:
      "Distributed Systems, Agentic AI, Machine Learning, Cloud Computing, Database Systems, Computer Security",
  },
  {
    school: "University of California, Irvine",
    degree: "B.S. Computer Science, Minor in Informatics",
    detail: "3.9 GPA, Cum Laude",
    location: "Irvine, CA",
    period: "Sep 2020 – Jun 2024",
  },
];

export const experience: Experience[] = [
  {
    company: "California Polytechnic State University",
    team: "Academic Innovations & Programs",
    role: "Software Developer Intern",
    location: "San Luis Obispo, CA",
    period: "Jun 2025 – Jun 2026",
    highlights: [
      "Owned the frontend redesign of department websites, identifying user pain points and improving web accessibility (WCAG).",
      "Developed SEO-optimized websites using JavaScript, HTML, CSS, and Drupal CMS, implementing interactive UI components.",
      "Conducted iterative UI/UX design reviews with stakeholders to refine navigation and information architecture.",
    ],
  },
  {
    company: "OC United",
    role: "Software Developer Intern",
    location: "Fullerton, CA",
    period: "Mar 2024 – Jun 2024",
    highlights: [
      "Led a 4-person engineering team to develop and deploy a production website for Fullerton Housing Alliance.",
      "Built a Python data pipeline and PHP plugin to extract, process, and index YouTube video transcripts into MongoDB for search and retrieval, increasing platform engagement by 37% in production.",
      "Reduced transcript search latency by 6 seconds (32%) through JavaScript, backend PHP, and database schema optimization.",
    ],
  },
  {
    company: "Expedia Group",
    role: "Software Development Engineer Intern",
    location: "Austin, TX",
    period: "Jun 2023 – Sep 2023",
    highlights: [
      "Developed and deployed a backend gRPC microservice in Kotlin supporting Trip interactivity across all Expedia brands.",
      "Integrated into a distributed microservice architecture, collaborating cross-functionally to ensure production readiness.",
      "Monitored production health using Splunk telemetry, validating deployments through feature flags and progressive rollout.",
      "Introduced unit and integration tests to support launch readiness and improve reliability in production for a separate feature.",
      "Mentored an incoming intern by documenting system architecture and onboarding key engineering workflows.",
    ],
  },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "Java", "Go", "C++"] },
  { label: "Frameworks", items: ["Spring Boot", "React", "FastAPI"] },
  {
    label: "Cloud & Infra",
    items: [
      "AWS (EC2, Lambda, S3, Bedrock, Connect)",
      "Docker",
      "Spinnaker",
      "GitHub Actions",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "Neo4j", "MongoDB", "Cassandra"],
  },
  {
    label: "AI/ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "OpenAI API",
      "AutoGen",
      "NumPy",
      "Pandas",
    ],
  },
  { label: "Developer Tools", items: ["Git", "gRPC", "REST APIs", "Splunk"] },
];

/**
 * Resume download is currently disabled (null hides the button on /resume).
 * To enable later: drop a PDF into /public (e.g. /public/resume.pdf) and
 * set this to "/resume.pdf".
 */
export const resumePdfPath: string | null = null;
