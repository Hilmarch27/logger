// deno-lint-ignore-file no-explicit-any
import { ColorUtils } from "./colors.ts";

export type LogLevel =
  | "info"
  | "success"
  | "warn"
  | "error"
  | "debug"
  | "verbose";

export interface TransportConfig {
  level?: LogLevel;
  silent?: boolean;
  format?: (message: any) => any;
}

export interface LoggerConfig {
  level?: LogLevel;
  silent?: boolean;
  transports?: {
    console?: TransportConfig;
    file?: TransportConfig & { path?: string };
  };
  defaultMeta?: Record<string, any>;
}

export class Logger {
  private static instance: Logger;
  private config: LoggerConfig = {
    level: "info",
    silent: false,
    transports: {
      console: { level: "info" },
    },
  };

  private constructor() {}

  public static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  configure(config: LoggerConfig): Logger {
    this.config = {
      ...this.config,
      ...config,
      transports: {
        ...this.config.transports,
        ...config.transports,
      },
    };
    return this;
  }

  private shouldLog(level: LogLevel): boolean {
    const consoleConfig = this.config.transports?.console;

    if (this.config.silent || consoleConfig?.silent) return false;

    const logLevels: LogLevel[] = [
      "verbose",
      "debug",
      "info",
      "success",
      "warn",
      "error",
    ];
    const configLevel = consoleConfig?.level || this.config.level || "info";

    return logLevels.indexOf(level) >= logLevels.indexOf(configLevel);
  }

  private log(level: LogLevel, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    // Apply default metadata if configured
    const messageParts = this.config.defaultMeta
      ? [this.config.defaultMeta, ...args]
      : args;

    // Optional transport-specific formatting
    const formattedArgs = this.config.transports?.console?.format
      ? messageParts.map(this.config.transports.console.format)
      : messageParts;

    ColorUtils.log(level, ...formattedArgs);
  }

  info(...args: any[]): void {
    this.log("info", ...args);
  }

  success(...args: any[]): void {
    this.log("success", ...args);
  }

  warn(...args: any[]): void {
    this.log("warn", ...args);
  }

  error(...args: any[]): void {
    this.log("error", ...args);
  }

  debug(...args: any[]): void {
    this.log("debug", ...args);
  }

  verbose(...args: any[]): void {
    this.log("verbose", ...args);
  }
}

export const logger: Logger = Logger.getInstance();
