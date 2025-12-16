/**
 * Logger utility for consistent logging across the application
 * In production, only errors are logged. In development, all logs are shown.
 */

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (level === 'error') return true; // Always log errors
    return isDevelopment; // Only log non-errors in development
  }

  log(...args: unknown[]): void {
    if (this.shouldLog('log')) {
      console.log(...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(...args);
    }
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug(...args);
    }
  }
}

export const logger = new Logger();

