import { checkCard } from '../js/ckeckCard';

describe('checkCard', () => {
  const startCards = {
    visa: [4],
    master: [5],
    amex: [34, 37],
    discover: [65, 6011, 644, 645, 646, 647, 648, 649],
    jcb: [35],
    diners: [300, 3001, 302, 303, 304, 305, 36, 38, 39],
    mir: [2]
  };
  test('return card for a valid', () => {
    const valid = '4111111111111111';
    expect(checkCard(startCards, valid)).toBe('visa');
  });
  test('func returns false', () => {
    const valid = '1234567890123456';
    expect(checkCard(startCards, valid)).toBeNull();
  });
});
