import { isValidInn } from '../js/validators';

describe('isValidInn', () => {
  test('func returns true', () => {
    const validInn = '371449635398431';
    expect(isValidInn(validInn)).toBe(true);
  });
  test('func returns false', () => {
    const validInn = '12325634212';
    expect(isValidInn(validInn)).toBe(false);
  });
});
