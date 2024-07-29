import { ServiceMixin } from '../mixin';
import { Logger } from '../logger';

export interface Dictionary {
  locale: string;
  values: Record<string, unknown>;
}

interface SetupOptions {
  dictionaries: Dictionary[];
  fallbackLocale: string;
}
/**
 * `Intl` is a sigleton that provides i18n-related functionalities.
 * Instead of using it directly, you may also simply use the `intl()` function.
 */
export class Intl extends ServiceMixin<Intl>() {
  private _fallbackLocale?: string;
  private _currentLocale?: string;
  private _dictionaries?: Dictionary[];
  private _currentDictionary?: Dictionary;
  /**
   * Sets up `Intl` with the given options. Needs to be called at application startup.
   * @param {SetupOptions} options The options to use.
   * @example
   * // Using '@modyfi/vite-plugin-yaml' to import yaml files like modules
   * // See: https://github.com/Modyfi/vite-plugin-yaml
   * import { Intl } from '@spuxx/js-utils';
   * import de from './translations/de.yml';
   *
   * Intl.setup({
   *   dictionaries: [{ locale: 'de', values: de }],
   *   fallbackLocale: 'de'
   * });
   */
  static setup(options: SetupOptions) {
    const { dictionaries, fallbackLocale } = options;
    this.instance._dictionaries = dictionaries;
    this.instance._fallbackLocale = fallbackLocale;
    const supportedLocales = dictionaries.map((dictionary) => dictionary.locale);
    if (!supportedLocales.includes(fallbackLocale)) {
      throw new Error(
        'You must provide a fallback locale and the fallback locale must be supported by the given list of dictionaries.',
      );
    }
    const browserLocale = navigator.language.split('-')[0];
    this.setLocale(browserLocale);
  }

  static setLocale(locale: string) {
    const supportedLocales = this.dictionaries.map((dictionary) => dictionary.locale);
    if (!supportedLocales.includes(locale)) {
      Logger.warn(`Locale '${locale}' is not supported. Falling back to '${this.fallbackLocale}'.`, 'Intl');
      locale = this.fallbackLocale;
    }
    this.instance._currentLocale = locale;
    this.instance._currentDictionary = this.dictionaries.find((dictionary) => dictionary.locale === locale);
  }

  static get fallbackLocale() {
    if (!this.instance._fallbackLocale) {
      throw new Error('Intl has not been initialized yet.');
    }
    return this.instance._fallbackLocale;
  }

  static get currentLocale() {
    if (!this.instance._currentLocale) {
      throw new Error('Intl has not been initialized yet.');
    }
    return this.instance._currentLocale;
  }

  static get dictionaries() {
    if (!this.instance._dictionaries) {
      throw new Error('Intl has not been initialized yet.');
    }
    return this.instance._dictionaries;
  }

  static get currentDictionary() {
    if (!this.instance._currentDictionary) {
      throw new Error('Intl has not been initialized yet.');
    }
    return this.instance._currentDictionary;
  }

  /**
   * Translates the given key.
   * @param {string} key The key to translate.
   * @returns {string} The translated value.
   * @example
   * // Using the service directly:
   * Intl.translate('foo');
   * // Or using the shorthand:
   * intl('foo');
   *
   * // Using variables:
   * Intl.translate('foo', { bar: 'baz' });
   * // foo: 'Hello {bar}' -> 'Hello baz'
   */
  static translate(key: string, vars?: Record<string, string>) {
    let translation = this.instance.getDictionaryValue(key, this.currentLocale, this.currentDictionary);
    if (vars) {
      for (const key in vars) {
        translation = translation.replace(`{${key}}`, vars[key]);
      }
    }
    return translation;
  }

  /**
   * Keys that cannot be translated due to missing localization will be returned and
   * prefixed with this string.
   */
  static get missingLocalizationPrefix() {
    return 'miss-loc::';
  }

  private getDictionaryValue(key: string, locale: string, dictionary: Dictionary) {
    const partialKeys = key.split('.');
    let value: Record<string, unknown> = dictionary.values as Record<string, unknown>;
    for (let i = 0; i < partialKeys.length; i++) {
      const partialKey = partialKeys[i];
      value = value[partialKey] as never;
      if (typeof value === 'object') {
        continue;
      } else if (typeof value === 'string') {
        return value;
      } else {
        break;
      }
    }
    Logger.warn(`Cannot translate '${key}' for locale '${locale}'.`, 'Intl');
    return `${(this.constructor as typeof Intl).missingLocalizationPrefix}${key}`;
  }
}

export const intl = Intl.translate.bind(Intl);
