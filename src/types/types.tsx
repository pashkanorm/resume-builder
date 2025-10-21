export interface Contact {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  summary: string; 
  startDate?: string;
  endDate?: string;
}

export interface EducationItem {
  id: string;
  school: string;     
  degree: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  contact: Contact;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  languages: string[];
}
