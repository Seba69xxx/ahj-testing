export function checkLuhn(cardNumber) {
  let sum = 0;
  const parity = cardNumber.length % 2;
  for (let i = 0; i < cardNumber.length; i++) {
    let digit = parseInt(cardNumber[i], 10);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function getCardSystem(cardNumber) {
  if (/^4/.test(cardNumber)) {
    return 'visa';
  }
  if (/^5[1-5]/.test(cardNumber)) {
    return 'master';
  }
  if (/^3[47]/.test(cardNumber)) {
    return 'amex';
  }
  if (/^6(?:011|5)/.test(cardNumber)) {
    return 'discover';
  }
  if (/^22/.test(cardNumber)) {
    return 'mir';
  }
  return null;
}