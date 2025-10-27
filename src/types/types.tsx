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

export type ExtraSection =
  | { id: number; type: "text"; title: string; value: string; isLeft: boolean }
  | { id: number; type: "range"; title: string; languages: Language[]; isLeft: boolean };

export interface Experience {
  id: string;
  company: string;
  role: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
}

export interface Language {
  name: string;
  level: number; 
}

export interface ResumeData {
  contact: Contact;
  summary?: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills?: string[];

  // Only use languagesList
  languagesList?: Language[];

  contactText?: string;
  skillsText?: string;
  languagesText?: string;
  experienceText?: string;
  educationText?: string;
  projectsText?: string;

  headerBgColor?: string;
  headerTextColor?: string;
  leftColumnBgColor: string;
  leftColumnTextColor: string;
  rightColumnBgColor: string;
  rightColumnTextColor: string;
}
