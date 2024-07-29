import { ServiceMixin, debug, isEmptyOrWhitespace } from '@spuxx/js-utils';
import { ConfigOptions } from './types';

/**
 * `Config` is a service that provides access to the application's configuration.
 * It supports providig a default configuration during setup as well as retrieving
 * configuration values from `VITE_` environment variables and configuration values
 * injected into the global `window` object. It can also check whether the configuration
 * contains all required key-value-pairs at the end of the setup process.
 *
 * @example
 * // Start by defining the configuration interface anywhere in your project.
 * interface MyConfig {
 *   apiUrl: string;
 *   logLevel: LogLevel;
 * }
 * // Call `Config.setup()` while bootstrapping your application to initialize the service.
 * Config.setup<MyConfig>();
 * // You can now access the configuration values anywhere in your project.
 * const { apiUrl } = Config.getConfig<MyConfig>();
 *
 * // You may provide a default configuration during setup.
 * Config.setup<MyConfig>({ defaultConfig: { apiUrl: 'http://localhost:3000', logLevel: 'debug' } });
 *
 * // You may also provide Vite's `import.meta.env` object to the setup process to enable the service to access Vite's environment variables.
 * Config.setup<MyConfig>({ importMetaEnv: import.meta.env });
 *
 * // You may also provide a list of required keys that will be checked at the end of the setup process.
 * // If a required key remains undefined or an empty value after the setup process has finished, an error will be thrown.
 * Config.setup<MyConfig>({ requiredKeys: ["apiUrl"] });
 *
 * // You may also provide a custom key for the injected config. By default, 'INJECTED_CONFIG' is used.
 * Config.setup<MyConfig>({ injectedConfigKey: "MY_INJECTED_CONFIG" });
 *
 * // If you want to use a injected config via e.g. NGINX, make sure to reference the script that
 * // injects the config object in your `index.html`.
 * <script type="text/javascript" src="/injected-config.js"></script>
 *
 * // In some cases, you might want to setup `Config` very early during your application's bootstrapping process,
 * // e.g. to make sure that is already available when you start importing other modules. In this case, you can
 * // create a separate file to setup `Config` and import that first:
 *
 * // setup-config.ts
 * Config.setup<MyConfig>({ requiredKeys: ["apiUrl"] });
 *
 * // main.tsx
 * import './setup-config';
 * // Now you can import other modules that rely on the configuration.
 */
export class Config extends ServiceMixin<Config>() {
  private _options!: object;
  private _config!: object;

  /**
   * Sets up `Config` with the given options. Needs to be called at application startup.
   * @param options (optional) The options to use.
   */
  static setup<TConfig>(options?: ConfigOptions<TConfig>) {
    Config.instance._options = { ...options };
    Config.instance._config = {
      ...options?.defaultConfig,
      ...Config.instance._getViteConfig(options?.importMetaEnv),
      ...Config.instance._getInjectedConfig(),
    };
    Config.instance._checkRequiredKeys(options?.requiredKeys ?? []);
  }

  static getOptions<TConfig>(): ConfigOptions<TConfig> {
    if (!Config.instance._options) {
      throw new Error('Config has not been initialized yet. Call Config.setup() first.');
    }
    return Config.instance._options as ConfigOptions<TConfig>;
  }

  static getConfig<TConfig>(): TConfig {
    if (!Config.instance._config) {
      throw new Error('Config has not been initialized yet. Call Config.setup() first.');
    }
    return this.instance._config as TConfig;
  }

  private _checkRequiredKeys<TConfig>(requiredKeys: (keyof TConfig)[]): boolean {
    for (const requiredKey of requiredKeys) {
      const value = Config.getConfig<TConfig>()[requiredKey];
      if (isEmptyOrWhitespace(value)) {
        throw new Error(
          `Required key '${String(
            requiredKey,
          )}' is not defined in the config. Make sure to define its value in either the default, Vite or injected config.`,
        );
      }
    }
    return true;
  }

  private _getViteConfig<TConfig>(importMetaEnv?: ImportMetaEnv): object | undefined {
    if (!importMetaEnv) return;
    const viteConfig = importMetaEnv;
    const filteredConfig: Partial<TConfig> = {};
    for (const key in viteConfig) {
      if (key.startsWith('VITE_')) {
        // Remove the 'VITE_' prefix from the key.
        const newKey: keyof TConfig = key.slice(5) as keyof TConfig;
        filteredConfig[newKey] = viteConfig[key];
      }
    }
    if (Object.keys(filteredConfig).length > 0) {
      debug(`Vite config found: ${JSON.stringify(filteredConfig)}`, 'Config');
      return filteredConfig;
    }
  }

  private _getInjectedConfig(): object | undefined {
    const injectedConfigKey = Config.getOptions().injectedConfigKey ?? 'INJECTED_CONFIG';
    // @ts-expect-error We're checking if the key exists in the window object.
    const injectedConfig = window[injectedConfigKey];
    if (injectedConfig) {
      debug(`Injected config found: ${JSON.stringify(injectedConfig)}`, 'Config');
      return injectedConfig;
    }
  }
}
