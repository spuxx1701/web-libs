/* eslint-disable no-console */
import { ServiceMixin } from '../mixin/service-mixin';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogMessage {
  text: string;
  level: LogLevel;
  date: Date;
  context?: string;
}

/**
 * Represents a logger service that provides logging functionality. Message will be logged
 * to console and also persisted for the duration of the service's lifetime.
 *
 * @example
 * // Set the log level while bootstrapping your application
 * Logger.level = 'debug';
 *
 * // Inside a component
 * Logger.debug("Hello World!", "MyComponent");
 *
 * // Inside a class
 * Logger.info("Hello World!", this.constructor.name);
 *
 * // Without context
 * Logger.warn("Hello World!");
 *
 * // Directly importing the log functions
 * import { error } from '@spuxx/browser-utils/services/logger';
 *
 * error("Hello World!");
 *
 * // Access the stored messages
 * Logger.messages.forEach(message => console.log(JSON.stringify(message)));
 */
export class Logger extends ServiceMixin<Logger>() {
  private _level: LogLevel = 'warn';
  private _messages: LogMessage[] = [];

  /**
   * Returns the `Logger`s log level.
   */
  static get level() {
    return this.instance._level;
  }

  /**
   * Sets the `Logger`s log level.
   * @param level - The log level to set.
   */
  static setLevel(level: LogLevel) {
    this.instance._level = level;
  }

  /**
   * Returns all log messages.
   * @returns An array of log messages.
   */
  static get messages() {
    return [...this.instance._messages];
  }

  /**
   * Logs a `debug` message.
   * @param message - The message to log.
   * @param context - The context of the message (e.g. the caller).
   */
  static debug(message: string, context?: string): void {
    const msg = this.instance.createAndPushMessage(message, 'debug', context);
    if (this.level !== 'debug') return;
    console.debug(this.instance.createMessageString(msg));
  }

  /**
   * Logs an `info` message.
   * @param message - The message to log.
   * @param context - The context of the message (e.g. the caller).
   */
  static info(message: string, context?: string): void {
    const msg = this.instance.createAndPushMessage(message, 'info', context);
    if (this.level === 'warn' || this.level === 'error') return;
    console.info(this.instance.createMessageString(msg));
  }

  /**
   * Logs a `warn` message.
   * @param message - The message to log.
   * @param context - The context of the message (e.g. the caller).
   */
  static warn(message: string, context?: string): void {
    const msg = this.instance.createAndPushMessage(message, 'warn', context);
    if (this.level === 'error') return;
    console.warn(this.instance.createMessageString(msg));
  }

  /**
   * Logs an `error` message.
   * @param message - The message to log.
   * @param context - The context of the message (e.g. the caller).
   */
  static error(message: string, context?: string): void {
    const msg = this.instance.createAndPushMessage(message, 'error', context);
    console.error(this.instance.createMessageString(msg));
  }

  private createMessageString(message: LogMessage): string {
    return `${message.context ? `[${message.context}]  ` : ''}[${message.date.toISOString()}]  [${message.level}]  ${
      message.text
    }`;
  }

  private createAndPushMessage(text: string, level: LogLevel, context?: string): LogMessage {
    const fullMessage: LogMessage = {
      text,
      level,
      date: new Date(),
      context,
    };
    this._messages.push(fullMessage);
    return fullMessage;
  }
}

const debug = Logger.debug.bind(Logger);
const info = Logger.info.bind(Logger);
const warn = Logger.warn.bind(Logger);
const error = Logger.error.bind(Logger);
export { debug, info, warn, error };
