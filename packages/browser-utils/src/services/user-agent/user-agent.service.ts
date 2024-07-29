import { ServiceMixin } from '@spuxx/js-utils';
import { UserAgentOptions } from './types';

/**
 * `UserAgent` provides functionality related to the user-agent.
 *
 * @example
 * // Check whether the viewport is considered a desktop
 * const { isDesktop } = UserAgent;
 *
 * // You may also customize UserAgent's behavior
 * UserAgent.setOptions({ desktopBreakpoint: 1200 });
 */
export class UserAgent extends ServiceMixin<UserAgent>() {
  private _options: UserAgentOptions = {
    desktopBreakpoint: 960,
  };

  /**
   * Sets the `UserAgent`s options.
   * @param options (optional) The options to use.
   */
  static setOptions(options: Partial<UserAgentOptions>) {
    this.instance._options = { ...this.options, ...options };
  }

  static get options(): UserAgentOptions {
    return UserAgent.instance._options;
  }

  /**
   * Whether the current viewport is considered a desktop.
   */
  static get isDesktop() {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    const { desktopBreakpoint } = UserAgent.options;
    return viewportWidth >= desktopBreakpoint;
  }
}
