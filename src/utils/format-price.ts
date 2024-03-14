import { COUNT_SEARCH, DEFAULT_NULL } from '../src-const';

function formatNumberWithSpaces(number: number) {
  const digits = String(number).split('');

  digits.reverse();

  const formattedNumber = digits.reduce((accumulator, digit, index) => {
    const separator = index > DEFAULT_NULL && index % COUNT_SEARCH === DEFAULT_NULL ? ' ' : '';

    return digit + separator + accumulator;
  }, '');

  return formattedNumber;
}

export {formatNumberWithSpaces};
