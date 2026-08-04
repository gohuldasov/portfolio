export interface EducationItemData {
    id: string;
    number: string;
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
    description: string;
    type: string;
    coursework: string[];
    technologies: string[];
    achievements: string[];
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
        type: "Degree",
        description: "Specialized in distributed web architectures, database optimization, algorithms, and full-stack software engineering principles. Graduated with First Class Distinction.",
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
        ]
    },
    {
        id: "fullstack-cloud",
        number: "02",
        degree: "Advanced Fullstack & Cloud Specialization",
        institution: "Luminar TechnoHub Academy",
        location: "Kochi, India",
        period: "2024",
        grade: "Certified Master (Top 1%)",
        type: "Specialization",
        description: "Intensive engineering program focused on production-grade React systems, microservices API architecture, containerization, and modern cloud deployment pipelines.",
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
        ]
    },
    {
        id: "higher-secondary",
        number: "03",
        degree: "Higher Secondary in Computer Science",
        institution: "Board of Higher Secondary Education",
        location: "Kerala, India",
        period: "2018 — 2020",
        grade: "Score: 94% (Distinction)",
        type: "Diploma",
        description: "Foundational studies in mathematics, physics, object-oriented programming in C++, and relational database management systems.",
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
        ]
    }
];
