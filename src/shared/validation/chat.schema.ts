import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1, "Message content cannot be empty").max(2000, "Message content is too long"),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1, "At least one message is required"),
});

export type ChatMessageDto = z.infer<typeof ChatMessageSchema>;
export type ChatRequestDto = z.infer<typeof ChatRequestSchema>;

export interface ChatResponseDto {
  message: string;
  sources?: Array<{
    title: string;
    category: string;
    similarity: number;
  }>;
}

