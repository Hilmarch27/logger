# @hilmarch/logger

## Using the Logger Module

The Logger module provides a flexible and configurable logging system for both browser and Node.js environments. This guide will demonstrate how to use the module to log messages with different log levels and styling.

## Installation

To use the Logger module, first ensure you have the necessary files in your project:

- `deno add jsr:@hilmarch/logger` for the package Logger functionality.

## Usage

### Importing the Logger

To get started, import the `logger` instance from `jsr`:

```typescript
import { logger } from "jsr:@hilmarch/logger";
```

### Configuring the Logger

You can configure the logger by specifying log levels, transports, and default metadata:

```typescript
import { logger } from "jsr:@hilmarch/logger";

logger.configure({
  level: "debug",
  transports: {
    console: { level: "info" },
  },
  defaultMeta: { service: "user-service" },
});
```

### Logging Messages

The Logger provides several methods for logging messages at different levels:

- `logger.info(...args: any[])`: Logs informational messages.
- `logger.success(...args: any[])`: Logs success messages.
- `logger.warn(...args: any[])`: Logs warning messages.
- `logger.error(...args: any[])`: Logs error messages.
- `logger.debug(...args: any[])`: Logs debug messages.
- `logger.verbose(...args: any[])`: Logs verbose messages.

Example:

```typescript
logger.info("This is an info message");
logger.error("This is an error message", { errorCode: 123 });
```

### Environment Detection

The `detectEnvironment()` method determines if the code is running in a browser or Node.js environment, which influences how messages are styled.

## Usage in vite

if you using this pavkage for logging in client side just create logger provider for global configuration

Example:

```typescript
import { logger } from "@hilmarch/logger";
import React, { createContext } from "react";

// configuration for logger
logger.configure({
  level: import.meta.env.VITE_API_ENV === "prod" ? "warn" : "verbose",
  transports: {
    console: {
      level: import.meta.env.VITE_API_ENV === "prod" ? "warn" : "verbose",
    },
  },
});

// create context logger
const LoggerContext = createContext(logger);

// create provider logger component
export const LoggerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
};

// use in your root app
<LoggerProvider>
  {children}
</LoggerProvider>;
```

## Conclusion

The Logger module offers a powerful and flexible way to manage logging across different environments, with support for colorized output and different log levels. Customize the configuration and color settings as needed to fit your application's requirements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## Contact

For questions or support, please contact [Hilman](mailto:hilmarch03@gmail.com).

## Author

Crafted with Bissmillah 🤍 by [@hilmarch03](https://github.com/hilmarch03)