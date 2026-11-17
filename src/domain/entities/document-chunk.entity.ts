export interface DocumentChunk {
  id: string;
  title: string;
  category: string;
  content: string;
  metadata: Record<string, unknown> | null;
  similarity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentChunkInput {
  title: string;
  category: string;
  content: string;
  metadata?: Record<string, unknown>;
}

