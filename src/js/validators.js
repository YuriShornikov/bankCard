export function isValidInn(cardNum) {
  let cardNumber = cardNum.toString();
  const controlSum = parseInt(cardNumber.charAt(cardNumber.length - 1), 10);
  let sum = 0;

  for (let i = cardNumber.length - 2; i >= 0; i--) {
    let number = parseInt(cardNumber.charAt(i), 10);
    if (i % 2 == cardNumber.length % 2) {
      number *= 2;
      if (number > 9) {
        number -= 9;
      }
    }
    sum += number;
  }

  // Вычисляем контрольную сумму после цикла
  const checksum = sum % 10 !== 0 ? 10 - sum % 10 : 0;
  return checksum == controlSum;
}