import type { Logger } from "../../interfaces/logger.interface";

export function createConsoleLogger(): Logger {
  function formatLog(level: "DEBUG" | "INFO" | "ERROR", message: string): string {
    return `[${level}] - ${new Date().toISOString()} - ${message}`;
  }

  return Object.freeze({
    error(message: string): void {
      console.error(formatLog("ERROR", message));
    },
    info(message: string): void {
      console.info(formatLog("INFO", message));
    },
    debug(message: string): void {
      console.debug(formatLog("DEBUG", message));
    },
  });
}
