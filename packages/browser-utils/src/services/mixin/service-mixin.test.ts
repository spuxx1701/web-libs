import { expect, test } from 'vitest';
import { ServiceMixin } from './service-mixin';

test('should properly inherit, create and destroy', () => {
  class MyService extends ServiceMixin<MyService>() {
    foo = 'bar';
  }
  // Instantiate the singleton service and check whether the instance looks as we'd expect
  const myService = MyService.instance;
  expect(myService.foo).toBe('bar');
  expect(myService instanceof MyService).toBe(true);
  // We should now be able to access the same instance again and again
  expect(MyService.instance).toBe(myService);
  // After destroying the service our stored reference should no longer match the singleton instance
  MyService.destroy();
  expect(myService).not.toBe(MyService.instance);
});
