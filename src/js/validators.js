export function checkLuhn(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function getCardSystem(cardNumber) {
  if (/^220[0-4]/.test(cardNumber)) {
    return 'mir';
  }
  if (/^(5[1-5]|2[2-7])/.test(cardNumber)) {
    return 'master';
  }
  if (/^4/.test(cardNumber)) {
    return 'visa';
  }
  if (/^3[47]/.test(cardNumber)) {
    return 'amex';
  }
  if (/^6(?:011|5)/.test(cardNumber)) {
    return 'discover';
  }
  if (/^3(?:0[0-5]|[68][0-9])/.test(cardNumber)) {
    return 'diners';
  }
  if (/^35/.test(cardNumber)) {
    return 'jcb';
  }
  return null;
}