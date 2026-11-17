import { IVectorRepository } from "@/domain/repositories/vector-repository.interface";
import { IEmbeddingService } from "@/domain/services/embedding-service.interface";
import { DocumentChunkInput } from "@/domain/entities/document-chunk.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/logging/logger";

export const PORTFOLIO_KNOWLEDGE_BASE: DocumentChunkInput[] = [
  {
    title: "About Infan Jioun Rahman",
    category: "profile",
    content: `
Name: Infan Jioun Rahman
Role: Full Stack Web Developer
Location: Chattogram, Bangladesh
Email: infanjiounrahman20606@gmail.com
Phone: +880 1610240096
Availability: Open to freelance projects, contracts, and full-time software engineering roles.
Bio: Passionate full stack developer specializing in high-performance web applications, scalable APIs, modern frontends, and database architectures.
`,
    metadata: {
      email: "infanjiounrahman20606@gmail.com",
      phone: "+880 1610240096",
      location: "Chattogram, Bangladesh",
    },
  },
  {
    title: "Education & Certifications",
    category: "education",
    content: `
1. Premier University Chittagong
   Degree: Bachelor of Arts (BA) in Fashion Design And Technology
   Duration: 2024 - Present
2. Programming Hero (Professional Web Development Course)
   Field: Full Stack Web Development
   Duration: July 2023 - December 2023
   Certificate URL: https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view?usp=sharing
`,
    metadata: {
      certificateUrl: "https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view?usp=sharing",
      institution: "Premier University Chittagong & Programming Hero",
    },
  },
  {
    title: "Technical Skills & Competencies",
    category: "skills",
    content: `
Frontend: HTML5, CSS3, JavaScript (80%), TypeScript (60%), React JS (80%), Next.js (SSR/SSG, 60%), Tailwind CSS, Shadcn/ui, Redux Toolkit (80%), Framer Motion, GSAP.
Backend & Database: Node.js (90%), Express.js (70%), Prisma ORM (75%), PostgreSQL (pgvector, 65%), Next.js Server Components & Route Handlers, REST APIs.
DevOps & Tools: Git, GitHub, Postman, Vercel, Firebase, VS Code, Notion.
`,
    metadata: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      backend: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    },
  },
  {
    title: "Project: Helps Near - Emergency Assistance Platform",
    category: "project",
    content: `
Project Name: HELPS NEAR
Description: Real-time emergency assistance platform connecting people in need with verified nearby volunteers.
Key Highlights: Real-time location-based assistance, OTP authentication, role-based admin dashboard, emergency incident coordination.
Tech Stack: TypeScript, Next.js, Tailwind CSS, Node.js, Express.js, PostgreSQL, Prisma ORM, Better Auth.
Live Demo: https://helps-near-frontend.vercel.app/
Frontend GitHub: https://github.com/Infan-Jioun/helps-near-frontend
Backend GitHub: https://github.com/Infan-Jioun/Helps-Near
`,
    metadata: {
      liveUrl: "https://helps-near-frontend.vercel.app/",
      frontendRepo: "https://github.com/Infan-Jioun/helps-near-frontend",
      backendRepo: "https://github.com/Infan-Jioun/Helps-Near",
    },
  },
  {
    title: "Project: Nestify - Real Estate Marketplace",
    category: "project",
    content: `
Project Name: NESTIFY
Description: Modern real estate web platform with property listings, verified agent profiles, advanced search filtering, and OTP authentication.
Key Highlights: Property search by locality/price, agent management, OTP-based secure authentication, interactive responsive design.
Tech Stack: TypeScript, Next.js, Tailwind CSS, Shadcn UI, Redux Toolkit, PostgreSQL / Prisma.
Live Demo: https://nestify-projects.vercel.app/
Frontend GitHub: https://github.com/Infan-Jioun/Nestify-Projects
Backend GitHub: https://github.com/Infan-Jioun/Nestify-Projects
`,
    metadata: {
      liveUrl: "https://nestify-projects.vercel.app/",
      frontendRepo: "https://github.com/Infan-Jioun/Nestify-Projects",
    },
  },
  {
    title: "Project: FoodHub - Multi-Role Food Ordering Platform",
    category: "project",
    content: `
Project Name: FOODHUB
Description: Dynamic food ordering and restaurant management platform with multi-tier role-based access (Admin, Moderator, Restaurant Owner).
Key Highlights: Restaurant management, menu customization, live order tracking, payment processing, interactive cart.
Tech Stack: JavaScript, React, Tailwind CSS, DaisyUI, Node.js, Express.js, PostgreSQL.
Live Demo: https://foodhub-d3e1e.web.app/
Frontend GitHub: https://github.com/Infan-Jioun/FoodHub-Frontend-Projects
Backend GitHub: https://github.com/Infan-Jioun/FoodHub-Backend-Projects
`,
    metadata: {
      liveUrl: "https://foodhub-d3e1e.web.app/",
      frontendRepo: "https://github.com/Infan-Jioun/FoodHub-Frontend-Projects",
      backendRepo: "https://github.com/Infan-Jioun/FoodHub-Backend-Projects",
    },
  },
  {
    title: "Project: Fastbit Communication - ISP Management System",
    category: "project",
    content: `
Project Name: FASTBIT COMMUNICATION
Description: Professional ISP customer and billing management platform featuring automated invoice generation, dynamic broadband package administration, and role-based permissions.
Key Highlights: Subscriber lifecycle management, automated billing cycles, real-time connectivity status monitoring.
Tech Stack: TypeScript, Next.js, Tailwind CSS, Shadcn UI, PostgreSQL, Prisma ORM.
Live Demo: https://fastbit-communication.vercel.app/
Frontend GitHub: https://github.com/Infan-Jioun/Fastbit-Communication
Backend GitHub: https://github.com/Infan-Jioun/Fastbit-Communication
`,
    metadata: {
      liveUrl: "https://fastbit-communication.vercel.app/",
      frontendRepo: "https://github.com/Infan-Jioun/Fastbit-Communication",
    },
  },
  {
    title: "Project: ShoppingGO - Advanced E-Commerce Platform",
    category: "project",
    content: `
Project Name: ShoppingGO
Description: Advanced e-commerce marketplace featuring vendor product listings, seller sales analytics, dynamic filtering, and secure payment gateway integration.
Key Highlights: Seller dashboard, order lifecycle tracking, customer reviews, payment checkout.
Tech Stack: JavaScript, React, Tailwind CSS, Redux, Node.js, Express.js, PostgreSQL.
Live Demo: https://shoppinggo-930e2.web.app/
Frontend GitHub: https://github.com/Infan-Jioun/ShoppingGO-Projects-Frontend
Backend GitHub: https://github.com/Infan-Jioun/ShoppingGO-Projects-Backend
`,
    metadata: {
      liveUrl: "https://shoppinggo-930e2.web.app/",
      frontendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Frontend",
      backendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Backend",
    },
  },
  {
    title: "Project: Infan Web Ecommerce",
    category: "project",
    content: `
Project Name: Infan Web Ecommerce
Description: Clean modern e-commerce storefront with product discovery, cart and checkout flows, and user profile management.
Tech Stack: JavaScript, React, Tailwind CSS, Node.js, Express.js.
Live Demo: https://infan-web.web.app/
Frontend GitHub: https://github.com/Infan-Jioun/infan-ecommerce-frontend
Backend GitHub: https://github.com/Infan-Jioun/infan-ecommerce-backend
`,
    metadata: {
      liveUrl: "https://infan-web.web.app/",
      frontendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-frontend",
      backendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-backend",
    },
  },
  {
    title: "Project: Pet Adopt Web",
    category: "project",
    content: `
Project Name: Pet Adopt Web
Description: Pet adoption platform connecting animal shelters and rescue pets with prospective pet parents.
Key Highlights: Pet listings with health statuses, adoption application submissions, shelter admin panel.
Tech Stack: JavaScript, React, Tailwind CSS, Node.js, Express.js.
Live Demo: https://petadoptweb.web.app/
Frontend GitHub: https://github.com/Infan-Jioun/Pet-adoption-frontend
Backend GitHub: https://github.com/Infan-Jioun/Pet-adoption-backend
`,
    metadata: {
      liveUrl: "https://petadoptweb.web.app/",
      frontendRepo: "https://github.com/Infan-Jioun/Pet-adoption-frontend",
      backendRepo: "https://github.com/Infan-Jioun/Pet-adoption-backend",
    },
  },
  {
    title: "Project: EduBooker - College Admissions Platform",
    category: "project",
    content: `
Project Name: EduBooker
Description: Modern educational admissions portal facilitating course exploration, college applications, document uploads, and candidate tracking.
Tech Stack: JavaScript, React, Tailwind CSS, Node.js, Express.js.
Live Demo: https://edubooker-2f225.web.app/
Frontend GitHub: https://github.com/Infan-Jioun/EduBooker-project-frontend
Backend GitHub: https://github.com/Infan-Jioun/EduBooker-project-backend
`,
    metadata: {
      liveUrl: "https://edubooker-2f225.web.app/",
      frontendRepo: "https://github.com/Infan-Jioun/EduBooker-project-frontend",
      backendRepo: "https://github.com/Infan-Jioun/EduBooker-project-backend",
    },
  },
  {
    title: "Contact, Social Links & Hiring Details",
    category: "contact",
    content: `
Direct Contact:
- Email: infanjiounrahman20606@gmail.com
- Phone: +880 1610240096
- Location: Chattogram, Bangladesh
- GitHub Profile: https://github.com/Infan-Jioun
- LinkedIn / Portfolio: Open to direct messages and hiring inquiries for Full Stack Developer roles.
`,
    metadata: {
      email: "infanjiounrahman20606@gmail.com",
      phone: "+880 1610240096",
      github: "https://github.com/Infan-Jioun",
    },
  },
];

export class SeedKnowledgeUseCase {
  constructor(
    private readonly vectorRepository: IVectorRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  public async execute(force: boolean = false): Promise<Result<{ seeded: number; total: number }, AppError>> {
    try {
      // 1. Ensure HNSW index is created for fast vector lookup
      await this.vectorRepository.ensureHnswIndex();

      // 2. Check existing count
      const countResult = await this.vectorRepository.countChunks();
      if (!countResult.success) {
        return err(countResult.error);
      }

      const existingCount = countResult.data;
      if (existingCount > 0 && !force) {
        logger.info("Knowledge base already seeded in PostgreSQL vector database.", "SeedKnowledgeUseCase", {
          count: existingCount,
        });
        return ok({ seeded: 0, total: existingCount });
      }

      if (force && existingCount > 0) {
        logger.info("Clearing existing chunks for re-indexing...", "SeedKnowledgeUseCase");
        await this.vectorRepository.deleteAllChunks();
      }

      logger.info("Generating embeddings for knowledge base...", "SeedKnowledgeUseCase", {
        chunks: PORTFOLIO_KNOWLEDGE_BASE.length,
      });

      // 3. Batch generate embeddings for each document chunk
      const textsToEmbed = PORTFOLIO_KNOWLEDGE_BASE.map(
        (chunk) => `${chunk.title}\nCategory: ${chunk.category}\n${chunk.content}`
      );

      const embeddingsResult = await this.embeddingService.generateBatchEmbeddings(textsToEmbed);
      if (!embeddingsResult.success) {
        return err(embeddingsResult.error);
      }

      const embeddings = embeddingsResult.data;

      // 4. Save chunks with embeddings in PostgreSQL
      const batchItems = PORTFOLIO_KNOWLEDGE_BASE.map((chunk, index) => ({
        chunk,
        embedding: embeddings[index] ?? [],
      }));

      const saveResult = await this.vectorRepository.saveBatchChunks(batchItems);
      if (!saveResult.success) {
        return err(saveResult.error);
      }

      logger.info("Knowledge base successfully indexed in PostgreSQL vector database.", "SeedKnowledgeUseCase", {
        inserted: saveResult.data,
      });

      return ok({ seeded: saveResult.data, total: saveResult.data });
    } catch (error) {
      logger.error("Knowledge seeding failed", "SeedKnowledgeUseCase", error);
      return err(AppError.internal("Failed to seed knowledge base", error));
    }
  }
}

