export type ChatRole = "user" | "assistant";

export interface DomainChatMessage {
  role: ChatRole;
  content: string;
}

export interface RagCitation {
  title: string;
  category: string;
  similarity: number;
}

export interface RagChatResult {
  message: string;
  citations: RagCitation[];
}

