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
    id: "python-web-certification",
    number: "01",
    degree: "Python Web Development",
    institution: "Luminar TechnoLab",
    location: "Kochi,Kerala",
    period: "2025",
    grade: "Certified",
    gradeVal: 100,
    gradePrefix: "",
    gradeSuffix: "",
    type: "Professional Certification",
    description:
      "Completed a professional certification in Python Web Development covering backend development with Django, REST APIs, database management, and modern web application development.",
    coursework: [
      "Python Programming",
      "Django Framework",
      "REST API Development",
      "Database Management",
      "Authentication & Authorization"
    ],
    technologies: [
      "Python",
      "Django",
      "MySQL",
      "React",
      "DRF",
      "REST APIs",
      "Git",
      "Github"
    ],
    achievements: [
      "NCTT Certified",
      "Built Full-Stack Web Applications",
      "Hands-on Django Development"
    ],
    stats: [
      { label: "Status", value: "Certified" },
      { label: "Modules", value: "5+" },
      { label: "Projects", value: "Multiple" }
    ],
    accentGradient: "from-blue-500/20 via-indigo-500/10 to-purple-600/20",
    glowColor: "rgba(99, 102, 241, 0.35)"
  },
  {
    id: "msc-cs",
    number: "02",
    degree: "Master of Science in Computer Science",
    institution: "SES College, Sreekandapuram",
    location: "Kannur, Kerala, India",
    period: "2022 — 2024",
    grade: "Completed",
    gradeVal: 65.1,
    gradePrefix: "",
    gradeSuffix: "",
    type: "Master's Degree",
    description:
      "Completed a Master's in Computer Science with a focus on software engineering, database management, web application development, and modern programming practices.",
    coursework: [
      "Software Engineering",
      "Operating Systems",
      "Linux",
      "Database Management Systems",
      "Python Programming",
      "Web Technologies",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Data mining"
      
    ],
    technologies: [
      "Python",
      "Linux",
      "C",
      "C++",
      "SQL",
      "Networking",
      "java"
    ],
    achievements: [
      "Completed Master's Degree",
      "Developed Multiple Full-Stack Projects",
      "Academic Project: K-SMART"
    ],
    stats: [
      { label: "Degree", value: "M.Sc." },
      { label: "Duration", value: "2 Years" },
      { label: "Projects", value: "3+" }
    ],
    accentGradient: "from-cyan-500/20 via-sky-500/10 to-blue-600/20",
    glowColor: "rgba(2, 132, 199, 0.35)"
  },
  


  {
    id: "bca",
    number: "03",
    degree: "Bachelor of Computer Applications",
    institution: "AMSTECK Arts and Science College, Kalliassery",
    location: "Kannur, Kerala, India",
    period: "2019 — 2022",
    grade: "Completed",
    gradeVal: 72.22,
    gradePrefix: "",
    gradeSuffix: "",
    type: "Bachelor's Degree",
    description:
      "Built a strong foundation in programming, databases, computer networks, operating systems, and software development fundamentals.",
    coursework: [
      "Programming in C & Java",
      "Database Management",
      "Operating Systems",
      "Computer Networks",
      "Software Development",
      "Web Programming",
    ],
    technologies: [
      "Java",
      "C",
      "c++",
      "HTML",
      "CSS",
      "Linux",
      "c#",
      "MySQL"
    ],
    achievements: [
      "Completed Bachelor's Degree",
      "Computer Science Foundation",
      "Academic Projects"
    ],
    stats: [
      { label: "Degree", value: "BCA" },
      { label: "Duration", value: "3 Years" },
      { label: "Foundation", value: "Computer Science" }
    ],
    accentGradient: "from-teal-500/20 via-emerald-500/10 to-cyan-600/20",
    glowColor: "rgba(20, 184, 166, 0.35)"
  }
];