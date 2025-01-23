// deno-lint-ignore-file no-explicit-any
import type { LogLevel } from "./index.ts";

export interface ColorConfig {
  browser: string;
  node: string;
}

export class ColorUtils {
  private static colors: Record<LogLevel | string, ColorConfig> = {
    info: {
      browser: "color: blue",
      node: "\x1b[34m",
    },
    success: {
      browser: "color: green",
      node: "\x1b[32m",
    },
    warn: {
      browser: "color: orange",
      node: "\x1b[33m",
    },
    error: {
      browser: "color: red",
      node: "\x1b[31m",
    },
    debug: {
      browser: "color: cyan",
      node: "\x1b[36m",
    },
    verbose: {
      browser: "color: gray",
      node: "\x1b[90m",
    },
    reset: {
      browser: "color: inherit",
      node: "\x1b[0m",
    },
  };

  static detectEnvironment(): "browser" | "node" {
    return typeof window !== "undefined" ? "browser" : "node";
  }

  static colorize(level: LogLevel | string, message: any): string {
    const env = this.detectEnvironment();
    const color = this.colors[level] || this.colors.info;
    const colorCode = env === "browser" ? color.browser : color.node;
    const resetCode = this.colors.reset[env];

    // Handle different message types
    const formattedMessage =
      typeof message === "object"
        ? JSON.stringify(message, null, 2)
        : String(message);

    return env === "browser"
      ? `%c${formattedMessage}`
      : `${colorCode}${formattedMessage}${resetCode}`;
  }

  static log(level: LogLevel | string, ...messages: any[]): void {
    const env = this.detectEnvironment();

    messages.forEach((message) => {
      if (env === "browser") {
        console.log(
          this.colorize(level, message),
          env === "browser" ? this.colors[level].browser : ""
        );
      } else {
        console.log(this.colorize(level, message));
      }
    });
  }
}
