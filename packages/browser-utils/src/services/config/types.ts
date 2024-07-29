export interface ConfigOptions<TConfig> {
  /**
   * (optional) You may provide a default config object. This will be merged with
   * Vite's `import.meta.env` as well as any config injected into the window object.
   * The hierarchy during the merge is as follows: defaultConfig < Vite config < injected config.
   */
  defaultConfig?: Partial<TConfig>;
  /**
   * (optional) You may provide a list of keys that are required to be defined at the end
   * of the setup procedure. If any of these keys are not defined, an error will be thrown.
   */
  requiredKeys?: (keyof TConfig)[];
  /**
   * (optional) The key under which the injected config is stored in the window object.
   * Defaults to 'INJECTED_CONFIG'.
   */
  injectedConfigKey?: string;
  /**
   * (optional) You may provide Vite's `import.meta.env` object. If you do, it will be used
   * to be merged with the default config and the injected config. This is useful for testing and
   * during development.
   */
  importMetaEnv?: ImportMetaEnv;
}
