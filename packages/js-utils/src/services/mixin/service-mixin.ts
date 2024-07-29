export interface IService {
  get instance(): IService;
}

/**
 * Extending `ServiceMixin` will turn the inheriting class into a singleton object.
 *
 * @example
 * class MyService extends ServiceMixin<MyService>() {
 *   // ...
 * }
 */
export function ServiceMixin<TService>() {
  return class Service {
    /**
     * ⛔️ Do not set this and treat it as if it were `protected`! ⛔️ Unfortunately, TypeScript does not allow
     * private or protected members in declaration files yet. See: https://github.com/microsoft/TypeScript/issues/35822
     */
    static _instance: TService | null;
    /**
     * The constructor needs to be protected to prevent direct construction calls.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
    /**
     * Returns the instance of the service.
     */
    public static get instance(): TService {
      if (!this._instance) {
        this._instance = new this() as TService;
      }
      return this._instance;
    }

    public static destroy() {
      this._instance = null;
    }
  };
}
