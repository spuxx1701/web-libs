/* eslint-disable @typescript-eslint/naming-convention */
import { Config } from '.';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  // Provide a 'window' object so that the Config service can access it.
  vi.stubGlobal('window', {});
});

afterEach(() => {
  Config.destroy();
});

test('should properly initialize with a default config', () => {
  const defaultConfig = { FOO: 'bar' };
  Config.setup({ defaultConfig });
  expect(Config.getConfig()).toEqual({ FOO: 'bar' });
});

test("should properly initialize with a default config and Vite's config", () => {
  const defaultConfig = { FOO: 'bar' };
  const importMetaEnv = { VITE_FOO: 'baz' } as unknown as ImportMetaEnv;
  Config.setup({ defaultConfig, importMetaEnv });
  expect(Config.getConfig()).toEqual({ FOO: 'baz' });
});

test("should properly initialize with a default config,  Vite's config and an injected config", () => {
  const defaultConfig = { FOO: 'bar' };
  const importMetaEnv = { VITE_FOO: 'baz' } as unknown as ImportMetaEnv;
  // @ts-expect-error We're stubbing the 'INJECTED_CONFIG' key in the 'window' object.
  window.INJECTED_CONFIG = { FOO: 'foz' };
  Config.setup({ defaultConfig, importMetaEnv });
  expect(Config.getConfig()).toEqual({ FOO: 'foz' });
});

test('should throw an error in case a required key is not defined after setup', () => {
  interface MyConfig {
    FOO: string;
    BAR?: string;
  }
  expect(() => {
    Config.setup<MyConfig>({ defaultConfig: { FOO: 'foz' }, requiredKeys: ['BAR'] });
  }).toThrow(
    "Required key 'BAR' is not defined in the config. Make sure to define its value in either the default, Vite or injected config.",
  );
});

test("should throw an error when accessing the config before calling 'setup'", () => {
  expect(() => {
    Config.getOptions();
  }).toThrow('Config has not been initialized yet. Call Config.setup() first.');
  expect(() => {
    Config.getConfig();
  }).toThrow('Config has not been initialized yet. Call Config.setup() first.');
});
