import { checkLuhn, getCardSystem } from '../js/validators';

test('valid visa card', () => {
  const valid = '4242424242424242';
  expect(checkLuhn(valid)).toBe(true);
});

test('invalid card number', () => {
  const invalid = '4242424242424241';
  expect(checkLuhn(invalid)).toBe(false);
});

test('system is Visa', () => {
  expect(getCardSystem('42424242')).toBe('visa');
});

test('system is Mastercard (series 5)', () => {
  expect(getCardSystem('52000000')).toBe('master');
});

test('system is Mastercard (series 2)', () => {
  expect(getCardSystem('22210000')).toBe('master');
  expect(getCardSystem('27200000')).toBe('master');
});

test('system is Mir', () => {
  expect(getCardSystem('22000000')).toBe('mir');
  expect(getCardSystem('22040000')).toBe('mir');
});

test('system is JCB', () => {
  expect(getCardSystem('35000000')).toBe('jcb');
});

test('unknown system', () => {
  expect(getCardSystem('12345678')).toBe(null);
});