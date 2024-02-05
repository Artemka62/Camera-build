
function formatNumberWithSpaces(number: number) {
  const digits = String(number).split('');

  digits.reverse();

  const formattedNumber = digits.reduce((accumulator, digit, index) => {
    const separator = index > 0 && index % 3 === 0 ? ' ' : '';

    return digit + separator + accumulator;
  }, '');

  return formattedNumber;
}

export {formatNumberWithSpaces};
