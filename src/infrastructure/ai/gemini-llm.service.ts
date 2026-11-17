import { GoogleGenerativeAI } from "@google/generative-ai";
import { ILLMService } from "@/domain/services/llm-service.interface";
import { DomainChatMessage } from "@/domain/entities/chat-message.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

export class GeminiLLMService implements ILLMService {
  private readonly client: GoogleGenerativeAI;
  // Primary high-speed low-latency model, with automatic fallback resilience
  private readonly primaryModel: string = "gemini-flash-lite-latest";
  private readonly fallbackModel: string = "gemini-flash-latest";

  constructor(apiKey?: string) {
    const key = apiKey ?? process.env.GEMINI_API_KEY;
    if (!key) {
      throw AppError.aiService("GEMINI_API_KEY environment variable is missing.");
    }
    this.client = new GoogleGenerativeAI(key);
  }

  public async generateRagAnswer(
    userQuery: string,
    retrievedContext: string,
    history: DomainChatMessage[]
  ): Promise<Result<string, AppError>> {
    const systemInstruction = `
You are the dedicated AI portfolio assistant for Infan Jioun Rahman (Full Stack Web Developer).
Your goal is to answer visitor questions accurately, concisely (2–4 lines max), confidently, and professionally.

CORE RULES:
1. Base your answer strictly on the RETRIEVED KNOWLEDGE CONTEXT below.
2. If the context contains links (live demo, GitHub, certificate, email, phone), ALWAYS include the exact URLs requested.
3. If the user asks something completely outside of Infan's portfolio, skills, projects, or background, politely decline and steer them back to exploring Infan's work.
4. Maintain a warm, modern developer tone.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RETRIEVED KNOWLEDGE CONTEXT:
${retrievedContext ? retrievedContext : "No specific document matched this query directly."}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    const formattedHistory = history
      .slice(0, -1)
      .filter((_, idx) => idx !== 0)
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    // Helper to attempt generation on a specific model
    const tryGenerate = async (modelName: string): Promise<string> => {
      const model = this.client.getGenerativeModel({
        model: modelName,
        systemInstruction,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 500,
        },
      });

      const chat = model.startChat({ history: formattedHistory });
      const response = await chat.sendMessage(userQuery);
      return response.response.text();
    };

    try {
      const text = await tryGenerate(this.primaryModel);
      return ok(text.trim());
    } catch (primaryErr) {
      logger.warn(
        `Primary model ${this.primaryModel} failed, trying fallback ${this.fallbackModel}`,
        "GeminiLLMService",
        primaryErr
      );
      try {
        const text = await tryGenerate(this.fallbackModel);
        return ok(text.trim());
      } catch (fallbackErr) {
        logger.error("All Gemini LLM generation attempts failed", "GeminiLLMService", fallbackErr);
        return err(AppError.aiService("Failed to generate response from Gemini model", fallbackErr));
      }
    }
  }
}
