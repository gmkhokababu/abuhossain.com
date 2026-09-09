export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  summary: string;
}

export interface Skills {
  backend: string[];
  frontend: string[];
  database: string[];
  languages: string[];
  tools?: string[]; // optional হিসেবে যোগ করা হয়েছে
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skills;
  experience: Experience[];
  education: EducationItem[];
}