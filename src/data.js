// ============================================================
// PORTFOLIO DATA — Deepthi Sharma
// ============================================================

export const personal = {
  name: "Deepthi Sharma",
  title: "Data Science Undergraduate",
  tagline: "Building and learning with data-driven solutions",
  email: "deepthimadugula.cd23@bmsce.ac.in",
  phone: "+91 8884901585",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/deepthi-sm",
  linkedin: "https://www.linkedin.com/in/deepthi-sharma123",
  resume: "/resume.pdf",
  bio: `Data Science undergraduate with hands-on experience in machine learning, data preprocessing, and visualization. Skilled in Python, SQL, and analytical tools, with a strong interest in solving practical and scalable problems.`,
};

export const education = [
  {
    degree: "B.E. Computer Science (Data Science)",
    institution: "BMS College Of Engineering",
    location: "Bengaluru",
    year: "2023 – 2027",
    grade: "CGPA: 7.44",
    highlights: ["Machine Learning", "Data Science", "DBMS"],
  },
  {
    degree: "Class XII (PCMC)",
    institution: "Narayana College",
    year: "2022",
    grade: "94.5%",
    highlights: [],
  },
  {
    degree: "Class X",
    institution: "Narayana School",
    year: "2020",
    grade: "92.6%",
    highlights: [],
  },
];

export const experience = []; // keep empty (you said no experience)

export const projects = [
  {
    title: "LifeSpark - Blood Donation System",
    short: "Full-stack MERN web app",
    description: `Developed a full-stack web application using the MERN stack to manage donor information, blood inventory, and urgent blood requests.

- Implemented JWT-based authentication
- Designed MongoDB schemas
- Built secure REST APIs`,
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Heart Disease Prediction",
    short: "Machine Learning project",
    description: `Built a machine learning system to predict heart disease using clinical data.

- Performed EDA
- Trained 6 models
- Visualized results using Matplotlib & Seaborn`,
    tags: ["Python", "Scikit-learn", "Pandas"],
  },
  {
    title: "Smart Building Automation",
    short: "Cisco Packet Tracer project",
    description: `Designed a smart building system with automated lighting, HVAC, and security.

- Configured routers, VLANs
- Ensured secure and efficient networking`,
    tags: ["Networking", "IoT"],
  },
  {
    title: "Health & Lifestyle Dashboard",
    short: "Power BI project",
    description: `Analyzed lifestyle datasets and built dashboards.

- Data cleaning & transformation
- Interactive Power BI visuals`,
    tags: ["Power BI", "Data Analysis"],
  },
  {
    title: "QuBot - Text to SQL",
    short: "AI-powered SQL generator",
    description: `Android app converting natural language queries into SQL.

- Flask backend
- LLaMA 3.1 via Ollama
- Chat interface`,
    tags: ["Android", "Flask", "LLM"],
  },
  {
    title: "Restaurant Ordering System",
    short: "Java OOP project",
    description: `Java-based ordering system demonstrating OOP principles.

- Dynamic menu system
- Exception handling`,
    tags: ["Java", "OOP"],
  },
];

export const skills = {
  languages: [
    { name: "Python", level: 90 },
    { name: "C", level: 75 },
    { name: "C++", level: 80 },
    { name: "Java", level: 75 },
    { name: "SQL", level: 85 },
    { name: "R", level: 75 },
    { name: "HTML", level: 85 },
  ],
  coursework: [
    { name: "Machine Learning", level: 85 },
    { name: "Deep Learning", level: 80 },
    { name: "Operating Systems", level: 75 },
    { name: "Web Development", level: 80 },
    { name: "DBMS", level: 85 },
    { name: "Data Structures", level: 88 },
  ],
  tools: ["VS Code", "R Studio", "Android Studio", "Langflow"],
  certs: [
    { name: "Getting Started with Artificial Intelligence", issuer: "IBM", year: "2026" },
    { name: "Machine Learning Methods and Tools", issuer: "IBM", year: "2026" },
  ],
};

export const achievements = [
  "Junior Fellow, Melton Foundation (2025) — represented BMSCE in Germany",
  "Honourable Mention — NASA Space Settlement Contest (2020)",
  "Spell Bee International — Level 4",
];

export const activities = [
  "BMSCE Dsync Club — Design Team & Marketing",
  "BMSCE NSS — Volunteering",
  "BMSCE Rotaract Club — Volunteering",
];

export const stats = [
  { label: "Projects Built", value: 6, suffix: "+" },
  { label: "Technologies Used", value: 10, suffix: "+" },
  { label: "Certifications", value: 2, suffix: "" },
  { label: "Academic Score", value: 7.44, suffix: " CGPA" },
];