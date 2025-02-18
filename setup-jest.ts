import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

expect.extend({
  toBeOneOf(received: any, items: Array<any>) {
    const pass = items.includes(received);
    const message = () =>
      `expected ${received} to be contained in array [${items}]`;
    if (pass) {
      return {
        message,
        pass: true
      };
    }
    return {
      message,
      pass: false
    };
  }
});

// Declare that jest contains toBeOneOf
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOneOf(items: Array<any>): CustomMatcherResult;
    }
  }
}
