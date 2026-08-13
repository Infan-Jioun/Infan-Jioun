

export interface TechStack {
    name: string;
    icon: string;
}

export interface Project {
    category: import("react").JSX.Element;
    _id?: string;
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo: string | null;
    backendRepo: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: TechStack[];
    features: string[];
    createdAt?: string;
    updatedAt?: string;
}


           