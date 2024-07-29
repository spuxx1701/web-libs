# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2024-07-29)


### Bug Fixes

* Fixed broken import ([8bf7286](https://github.com/spuxx1701/jslibs/commit/8bf72860b4fd9bb73c97dece6bc12eef855f7137))

## [UNRELEASED]

### Changed

- 💥 BREAKING: Moved all of the package's non-browser-specific functionalities to the new `@spuxx/js-utils` package. This includes:
  - `ServiceMixin`
  - `IntlService`
  - `LoggerService`
  - `sleep`, `isEmptyOrWhitespace` and `deepMerge`

### Chores

- Package source code has been movted into the [jslibs](https://github.com/spuxx1701/jslibs) monorepo.

## [0.3.0] - 2024-05-23

### Added

- Added [`deepMerge`](/lib/utils/misc.utils.ts) utility function.

## [0.2.0] - 2024-05-07

### Added

- Added more information to `package.json`.

### Changed

- `DeviceManager` service is now called `UserAgent`.

### Fixed

- `react.svg` is no longer part of the build output.
- Fixed test app.

## [0.1.0] 2024-05-06

🌟 Initial release.
