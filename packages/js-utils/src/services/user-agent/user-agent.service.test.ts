import { test, expect, vi, beforeEach } from 'vitest';
import { UserAgent } from '.';

beforeEach(() => {
  // UserAgent uses the bigger value of either document.documentElement.clientWidth and window.innerWidth.
  // We stick to stubbing window.innerWidth during tests to reduce the amount of test code.
  vi.stubGlobal('document', {
    documentElement: {
      clientWidth: 0,
    },
  });
});

test('properly recognizes a desktop viewport', () => {
  vi.stubGlobal('window', {
    innerWidth: 1600,
  });
  expect(UserAgent.isDesktop).toBe(true);
});

test('properly recognizes a mobile viewport', () => {
  vi.stubGlobal('window', {
    innerWidth: 400,
  });
  expect(UserAgent.isDesktop).toBe(false);
});

test('acknowledges a custom threshold', () => {
  vi.stubGlobal('window', {
    innerWidth: 1600,
  });
  UserAgent.setOptions({ desktopBreakpoint: 2000 });
  expect(UserAgent.isDesktop).toBe(false);
});
