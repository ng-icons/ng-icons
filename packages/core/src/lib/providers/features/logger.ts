import { InjectionToken, inject } from '@angular/core';
import {
  ExceptionLoggerFeature,
  NgIconFeatureKind,
  createFeature,
} from './features';

interface Logger {
  log(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export const LoggerToken = new InjectionToken<Logger>('Ng Icon Logger');

/**
 * The default logger implementation that logs to the console
 */
export class DefaultLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
  warn(message: string): void {
    console.warn(message);
  }
  error(message: string): void {
    console.error(message);
  }
}

/**
 * A logger implementation that throws an error on warnings and errors
 */
export class ExceptionLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    throw new Error(message);
  }

  error(message: string): void {
    throw new Error(message);
  }
}

export function injectLogger(): Logger {
  return inject(LoggerToken, { optional: true }) ?? new DefaultLogger();
}

/**
 * Throw exceptions on warnings and errors
 */
export function withExceptionLogger(): ExceptionLoggerFeature {
  return createFeature(NgIconFeatureKind.ExceptionLoggerFeature, [
    { provide: LoggerToken, useClass: ExceptionLogger },
  ]);
}
