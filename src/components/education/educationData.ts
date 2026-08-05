export interface EducationStat {
    label: string;
    value: string;
}

export interface EducationItemData {
    id: string;
    number: string;
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
    gradeVal: number;
    gradePrefix?: string;
    gradeSuffix?: string;
    type: string;
    description: string;
    coursework: string[];
    technologies: string[];
    achievements: string[];
    stats: EducationStat[];
    accentGradient: string;
    glowColor: string;
}

export const educationData: EducationItemData[] = [
    {
        id: "btech-cs",
        number: "01",
        degree: "Bachelor of Technology in Computer Science",
        institution: "APJ Abdul Kalam Technological University",
        location: "Kerala, India",
        period: "2020 — 2024",
        grade: "CGPA: 8.9 / 10.0",
        gradeVal: 8.9,
        gradePrefix: "CGPA ",
        gradeSuffix: "/10",
        type: "Degree",
        description: "Specialized in distributed web architectures, database optimization, high-performance algorithms, and modern software engineering principles. Graduated with First Class Distinction.",
        coursework: [
            "Data Structures & Algorithms",
            "Distributed Systems",
            "Database Management",
            "Web Architecture",
            "Cloud Computing",
            "Software Engineering"
        ],
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Docker",
            "Python",
            "Git"
        ],
        achievements: [
            "First Class Distinction",
            "Best Capstone Project Award",
            "Department Tech Lead"
        ],
        stats: [
            { label: "CGPA", value: "8.9" },
            { label: "Projects", value: "14+" },
            { label: "Honors", value: "Top 5%" }
        ],
        accentGradient: "from-cyan-500/20 via-sky-500/10 to-blue-600/20",
        glowColor: "rgba(2, 132, 199, 0.35)"
    },
    {
        id: "fullstack-cloud",
        number: "02",
        degree: "Advanced Fullstack & Cloud Systems Master's",
        institution: "Luminar TechnoHub Academy & Stanford Online",
        location: "Kochi, India & Remote",
        period: "2024",
        grade: "Top 1% Certified Master",
        gradeVal: 99.4,
        gradePrefix: "Percentile ",
        gradeSuffix: "%",
        type: "Specialization",
        description: "Intensive engineering program focused on production-grade React 19 systems, microservices API design, container orchestration, and automated CI/CD cloud pipelines.",
        coursework: [
            "React 19 & Next.js Architecture",
            "TypeScript Design Patterns",
            "REST & GraphQL API Engineering",
            "Docker Containerization & CI/CD",
            "Web Performance & SEO"
        ],
        technologies: [
            "React 19",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "GSAP",
            "Docker",
            "AWS"
        ],
        achievements: [
            "Certified Master Engineer",
            "100% Assessment Score",
            "Open Source Contributor"
        ],
        stats: [
            { label: "Score", value: "100%" },
            { label: "Modules", value: "12/12" },
            { label: "Rank", value: "Top 1%" }
        ],
        accentGradient: "from-blue-500/20 via-indigo-500/10 to-purple-600/20",
        glowColor: "rgba(99, 102, 241, 0.35)"
    },
    {
        id: "aws-ai-cert",
        number: "03",
        degree: "AWS Cloud & AI Architecture Certification",
        institution: "Amazon Web Services & DeepLearning.AI",
        location: "Online / Global",
        period: "2024 — 2025",
        grade: "98% Distinction Score",
        gradeVal: 98.0,
        gradePrefix: "Score ",
        gradeSuffix: "%",
        type: "Certification",
        description: "Advanced certification covering cloud-native microservices, serverless architecture, AWS S3/EC2/Lambda deployment, and LLM application engineering with PyTorch.",
        coursework: [
            "Serverless Architecture",
            "AWS Cloud Infrastructure",
            "Generative AI & LLM Systems",
            "Kubernetes & Docker",
            "Security & Compliance"
        ],
        technologies: [
            "AWS Lambda",
            "Docker",
            "Kubernetes",
            "PyTorch",
            "Terraform",
            "GraphQL",
            "Redis"
        ],
        achievements: [
            "AWS Certified Developer",
            "Deep Learning Specialization",
            "Global Top Scorer"
        ],
        stats: [
            { label: "Certs", value: "3 Active" },
            { label: "Exam Score", value: "980/1000" },
            { label: "Uptime", value: "99.99%" }
        ],
        accentGradient: "from-teal-500/20 via-emerald-500/10 to-cyan-600/20",
        glowColor: "rgba(20, 184, 166, 0.35)"
    },
    {
        id: "higher-secondary",
        number: "04",
        degree: "Higher Secondary in Computer Science",
        institution: "Board of Higher Secondary Education",
        location: "Kerala, India",
        period: "2018 — 2020",
        grade: "Score: 94% (Distinction)",
        gradeVal: 94.0,
        gradePrefix: "Overall ",
        gradeSuffix: "%",
        type: "Diploma",
        description: "Foundational academic studies in mathematics, physics, object-oriented software engineering in C++, relational databases, and computational logic.",
        coursework: [
            "Object-Oriented Programming",
            "Applied Mathematics",
            "Computer Science Foundations",
            "Relational Database Basics"
        ],
        technologies: [
            "C++",
            "SQL",
            "HTML5",
            "CSS3"
        ],
        achievements: [
            "Distinction Scholar",
            "Science Exhibition Winner",
            "Top 5% Academic Merit"
        ],
        stats: [
            { label: "Score", value: "94%" },
            { label: "Math", value: "98/100" },
            { label: "State Rank", value: "Distinction" }
        ],
        accentGradient: "from-sky-500/20 via-blue-500/10 to-indigo-600/20",
        glowColor: "rgba(14, 165, 233, 0.35)"
    }
];
