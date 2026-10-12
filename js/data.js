"use strict";

/* Portfolio content (from Lydia's resume and GitHub). Rendered into the page by main.js. */

const GITHUB_USER = "LydiaKandula";

const projects = [
  {
    id: 1,
    title: "Loan Recommendation Agent",
    category: "AI / LLM",
    year: 2026,
    icon: "✦",
    description:
      "AI-powered loan advisor that takes income, credit score, loan amount and tenure, recommends suitable loan options and explains EMI and affordability.",
    highlights: [
      "Analyses a user's financial details and recommends suitable loan options",
      "Explains EMI and tenure so the advice is easy to understand",
      "Groq LLM integration with role-based prompt engineering for structured, content-aware answers",
      "End-to-end workflow built with FastAPI, React.js and PostgreSQL",
    ],
    tech: ["Groq LLM", "FastAPI", "React.js", "PostgreSQL"],
    repo: "https://github.com/LydiaKandula/Loan_Recommendation_Agent",
  },
  {
    id: 2,
    title: "Student Management System",
    category: "Full Stack",
    year: 2025,
    icon: "⚒",
    description:
      "Full-stack system with CRUD operations and attendance functionality for managing student records.",
    highlights: [
      "Create, read, update and delete student records",
      "Attendance tracking",
      "Node.js and Express.js back end with a MySQL database, Streamlit front end",
    ],
    tech: ["Node.js", "Express.js", "MySQL", "Streamlit"],
    repo: null,
  },
  {
    id: 3,
    title: "Movie Recommendation System",
    category: "AI / LLM",
    year: 2025,
    icon: "♫",
    description:
      "Content-based movie recommender that suggests films from user preferences using TF-IDF and cosine similarity.",
    highlights: [
      "Content-based filtering of movies",
      "TF-IDF vectors compared with cosine similarity to rank suggestions",
      "Built during the CodSoft AI internship",
    ],
    tech: ["Python", "TF-IDF", "Cosine Similarity"],
    repo: "https://github.com/LydiaKandula/CodSoft",
  },
  {
    id: 4,
    title: "Tic-Tac-Toe AI",
    category: "Python",
    year: 2025,
    icon: "✖",
    description:
      "Game agent that picks optimal moves using the Minimax algorithm, so it never loses.",
    highlights: [
      "Minimax algorithm for optimal move selection",
      "Built during the CodSoft AI internship",
    ],
    tech: ["Python", "Minimax"],
    repo: "https://github.com/LydiaKandula/CodSoft",
  },
  {
    id: 5,
    title: "Rule-Based Chatbot",
    category: "Python",
    year: 2025,
    icon: "✉",
    description:
      "Chatbot built on rule-based logic and keyword matching that produces predefined responses.",
    highlights: [
      "Keyword matching with rule-based logic",
      "Predefined responses for common inputs",
      "Built during the CodSoft AI internship",
    ],
    tech: ["Python", "Keyword matching"],
    repo: "https://github.com/LydiaKandula/CodSoft",
  },
];

const skills = [
  { category: "Languages", icon: "</>", items: ["C", "Java", "Python"] },
  { category: "AI / LLM", icon: "✨", items: ["Prompt Engineering", "Groq LLM API", "Content-Based Filtering", "Machine Learning Basics"] },
  { category: "Frameworks & Tools", icon: "⚙", items: ["React.js", "FastAPI", "Node.js", "Express.js", "Streamlit", "Java Swing"] },
  { category: "Databases", icon: "▤", items: ["PostgreSQL", "MySQL", "DBMS"] },
  { category: "Core CS", icon: "⌘", items: ["OOP", "Data Structures", "Operating Systems"] },
  { category: "Soft skills", icon: "♥", items: ["Problem-Solving", "Logical Thinking", "Debugging", "Documentation", "Teamwork"] },
];

const certifications = [
  { name: "Programming and Problem Solving with C", issuer: "Talentio" },
  { name: "Discrete Mathematics", issuer: "Mind Luster" },
  { name: "Introduction to Modern Database Systems", issuer: "Saylor Academy" },
  { name: "Operating Systems", issuer: "Saylor Academy" },
  { name: "Information Security", issuer: "Saylor Academy" },
  { name: "Basics of R Software for Data Science", issuer: "Udemy" },
  { name: "Python Programming: Beyond Basics to Applications", issuer: "Udemy" },
  { name: "Introduction to Data Science", issuer: "Simplilearn" },
  { name: "Introduction to Data Mining Course", issuer: "Simplilearn" },
  { name: "Python Course for Beginners", issuer: "Scaler" },
  { name: "A Quick Introduction to Machine Learning", issuer: "Cognitive Class" },
  { name: "Machine Learning with Python", issuer: "Cognitive Class" },
];

const roles = ["AI-powered apps", "full-stack web apps", "LLM-driven tools", "clean, tested code"];
