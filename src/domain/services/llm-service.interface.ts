import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { DomainChatMessage } from "../entities/chat-message.entity";

export interface ILLMService {
  generateRagAnswer(
    userQuery: string,
    retrievedContext: string,
    history: DomainChatMessage[]
  ): Promise<Result<string, AppError>>;
}

