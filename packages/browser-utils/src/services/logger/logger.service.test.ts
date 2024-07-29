/* eslint-disable no-console */
import { MockInstance, expect, test, vi } from 'vitest';
import { afterEach, beforeEach } from 'vitest';
import { Logger } from './logger.service';

let debugSpy: MockInstance;
let infoSpy: MockInstance;
let warnSpy: MockInstance;
let errorSpy: MockInstance;

beforeEach(() => {
  console.debug = vi.fn();
  debugSpy = vi.spyOn(console, 'debug');
  console.info = vi.fn();
  infoSpy = vi.spyOn(console, 'info');
  console.warn = vi.fn();
  warnSpy = vi.spyOn(console, 'warn');
  console.error = vi.fn();
  errorSpy = vi.spyOn(console, 'error');
});

afterEach(() => {
  vi.clearAllMocks();
  Logger.destroy();
});

test('should log a debug message to console', () => {
  Logger.setLevel('debug');
  Logger.debug('foo', 'test');
  expect(debugSpy).toHaveBeenCalledTimes(1);
  expect(infoSpy).not.toHaveBeenCalled();
  expect(warnSpy).not.toHaveBeenCalled();
  expect(errorSpy).not.toHaveBeenCalled();
  expect(Logger.messages[0].text).toBe('foo');
  expect(Logger.messages[0].level).toBe('debug');
  expect(Logger.messages[0].date).toBeInstanceOf(Date);
  expect(Logger.messages[0].context).toBe('test');
});

test('should log an info message to console', () => {
  Logger.setLevel('info');
  Logger.info('foo', 'test');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).toHaveBeenCalledTimes(1);
  expect(warnSpy).not.toHaveBeenCalled();
  expect(errorSpy).not.toHaveBeenCalled();
  expect(Logger.messages[0].text).toBe('foo');
  expect(Logger.messages[0].level).toBe('info');
  expect(Logger.messages[0].date).toBeInstanceOf(Date);
  expect(Logger.messages[0].context).toBe('test');
});

test('should log a warn message to console', () => {
  Logger.setLevel('warn');
  Logger.warn('foo', 'test');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).not.toHaveBeenCalled();
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy).not.toHaveBeenCalled();
  expect(Logger.messages[0].text).toBe('foo');
  expect(Logger.messages[0].level).toBe('warn');
  expect(Logger.messages[0].date).toBeInstanceOf(Date);
  expect(Logger.messages[0].context).toBe('test');
});

test('should log an error message to console', () => {
  Logger.setLevel('error');
  Logger.error('foo', 'test');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).not.toHaveBeenCalled();
  expect(warnSpy).not.toHaveBeenCalled();
  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(Logger.messages[0].text).toBe('foo');
  expect(Logger.messages[0].level).toBe('error');
  expect(Logger.messages[0].date).toBeInstanceOf(Date);
  expect(Logger.messages[0].context).toBe('test');
});

test("should respect log level 'debug'", () => {
  Logger.setLevel('debug');
  Logger.debug('foo');
  Logger.info('foo');
  Logger.warn('foo');
  Logger.error('foo');
  expect(debugSpy).toHaveBeenCalledTimes(1);
  expect(infoSpy).toHaveBeenCalledTimes(1);
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy).toHaveBeenCalledTimes(1);
});

test("should respect log level 'debug'", () => {
  Logger.setLevel('info');
  Logger.debug('foo');
  Logger.info('foo');
  Logger.warn('foo');
  Logger.error('foo');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).toHaveBeenCalledTimes(1);
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy).toHaveBeenCalledTimes(1);
});

test("should respect log level 'warn'", () => {
  Logger.setLevel('warn');
  Logger.debug('foo');
  Logger.info('foo');
  Logger.warn('foo');
  Logger.error('foo');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).not.toHaveBeenCalled();
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy).toHaveBeenCalledTimes(1);
});

test("should respect log level 'error'", () => {
  Logger.setLevel('error');
  Logger.debug('foo');
  Logger.info('foo');
  Logger.warn('foo');
  Logger.error('foo');
  expect(debugSpy).not.toHaveBeenCalled();
  expect(infoSpy).not.toHaveBeenCalled();
  expect(warnSpy).not.toHaveBeenCalled();
  expect(errorSpy).toHaveBeenCalledTimes(1);
});

test('should store all messages no matter the log level', () => {
  Logger.setLevel('error');
  Logger.debug('foo');
  Logger.info('foo');
  Logger.warn('foo');
  Logger.error('foo');
  const { messages } = Logger;
  expect(messages.length).toBe(4);
  expect(messages[0].level).toBe('debug');
  expect(messages[1].level).toBe('info');
  expect(messages[2].level).toBe('warn');
  expect(messages[3].level).toBe('error');
});
