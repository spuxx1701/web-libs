import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { Intl, intl } from '.';
import { Logger } from '../logger';

const intlOptions = {
  dictionaries: [
    {
      locale: 'de',
      values: {
        'hello-world': 'Hallo Welt!',
        nested: {
          'hello-world': 'Hallo Welt!',
        },
        'hello-foo-and-bar': 'Hallo {foo} und {bar}!',
      },
    },
    {
      locale: 'en',
      values: {
        'hello-world': 'Hello World!',
        nested: {
          'hello-world': 'Hello World!',
        },
        'hello-foo-and-bar': 'Hello {foo} and {bar}!',
      },
    },
  ],
  fallbackLocale: 'de',
};

beforeEach(() => {
  vi.stubGlobal('navigator', { language: 'en-US' });
  Intl.setup(intlOptions);
});

afterEach(() => {
  Intl.destroy();
  Logger.destroy();
});

test('should properly translate the key', () => {
  Intl.setLocale('de');
  expect(intl('hello-world')).toBe('Hallo Welt!');
  Intl.setLocale('en');
  expect(intl('hello-world')).toBe('Hello World!');
});

test('should use the browser locale by default', () => {
  expect(intl('hello-world')).toBe('Hello World!');
});

test("should fall bck to the fallback locale if the browser locale isn't supported", () => {
  const warnSpy = vi.spyOn(Logger, 'warn');
  vi.stubGlobal('navigator', { language: 'fr' });
  Intl.destroy();
  Intl.setup(intlOptions);
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(warnSpy).toHaveBeenCalledWith("Locale 'fr' is not supported. Falling back to 'de'.", 'Intl');
  expect(intl('hello-world')).toBe('Hallo Welt!');
});

test('should translate a nested key', () => {
  expect(intl('nested.hello-world')).toBe('Hello World!');
});

test('should translate with variables', () => {
  expect(intl('hello-foo-and-bar', { foo: 'Foo', bar: 'Bar' })).toBe('Hello Foo and Bar!');
});

test("should return the prefixed key if the value doesn't exist and warn", () => {
  const warnSpy = vi.spyOn(Logger, 'warn');
  expect(intl('non.existant-key')).toBe('miss-loc::non.existant-key');
  expect(warnSpy).toHaveBeenCalledTimes(1);
  expect(warnSpy).toHaveBeenCalledWith("Cannot translate 'non.existant-key' for locale 'en'.", 'Intl');
});

test('should throw an error if the fallback locale is not part of the supported locales', () => {
  Intl.destroy();
  expect(() => {
    Intl.setup({ ...intlOptions, fallbackLocale: 'fr' });
  }).toThrow();
});

test("should throw an exception if the service hasn't been initialized yet", () => {
  Intl.destroy();
  expect(() => {
    Intl.currentDictionary;
  }).toThrow();
  expect(() => {
    Intl.currentLocale;
  }).toThrow();
  expect(() => {
    Intl.dictionaries;
  }).toThrow();
  expect(() => {
    Intl.fallbackLocale;
  }).toThrow();
  expect(() => {
    intl('hello-world');
  }).toThrow();
});
