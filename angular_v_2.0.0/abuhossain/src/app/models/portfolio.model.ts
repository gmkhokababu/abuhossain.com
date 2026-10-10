export interface PortfolioData {
  profile: Profile;
  about: About;
  skills: Skills;
  projects: Project[];
  contact: Contact;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar?: string;
}

export interface About {
  summary: string;
  education: Education[];
  experience: Experience[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  details?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  phone?: string;
}