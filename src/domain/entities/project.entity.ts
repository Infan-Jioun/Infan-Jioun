export interface TechStackItem {
  name: string;
  icon: string;
}

export interface ProjectEntity {
  id: string;
  category: string;
  title: string;
  description: string;
  detailedDescription: string;
  liveLink: string;
  frontendRepo: string | null;
  backendRepo: string | null;
  imageUrl: string;
  additionalImages: string[];
  techStack: TechStackItem[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectInput {
  category: string;
  title: string;
  description: string;
  detailedDescription: string;
  liveLink: string;
  frontendRepo?: string | null;
  backendRepo?: string | null;
  imageUrl: string;
  additionalImages?: string[];
  techStack: TechStackItem[];
  features: string[];
}
