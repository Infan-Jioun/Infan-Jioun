type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: unknown;
}

class Logger {
  private format(level: LogLevel, message: string, context?: string, data?: unknown): LogPayload {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context ? { context } : {}),
      ...(data !== undefined ? { data } : {}),
    };
  }

  public info(message: string, context?: string, data?: unknown): void {
    const payload = this.format("info", message, context, data);
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  }

  public warn(message: string, context?: string, data?: unknown): void {
    const payload = this.format("warn", message, context, data);
    process.stderr.write(`${JSON.stringify(payload)}\n`);
  }

  public error(message: string, context?: string, data?: unknown): void {
    const payload = this.format("error", message, context, data);
    process.stderr.write(`${JSON.stringify(payload)}\n`);
  }

  public debug(message: string, context?: string, data?: unknown): void {
    if (process.env.NODE_ENV !== "production") {
      const payload = this.format("debug", message, context, data);
      process.stdout.write(`${JSON.stringify(payload)}\n`);
    }
  }
}

export const logger = new Logger();

