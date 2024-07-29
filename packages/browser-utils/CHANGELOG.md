# Changelog

### ⚠ BREAKING CHANGES

- Moved all of the package's non-browser-specific functionalities to the new `@spuxx/js-utils` package. This includes:
  - `ServiceMixin`
  - `IntlService`
  - `LoggerService`
  - `sleep`, `isEmptyOrWhitespace` and `deepMerge`

## 0.3.0 (2024-05-23)

### Features

- Added [`deepMerge`](/lib/utils/misc.utils.ts) utility function.

## 0.2.0 (2024-05-07)

### Features

- `DeviceManager` service is now called `UserAgent`.
- Added more information to `package.json`.

### Bug Fixes

- `react.svg` is no longer part of the build output.
- Fixed test app.

## 0.1.0 (2024-05-06)

🌟 Initial release.
