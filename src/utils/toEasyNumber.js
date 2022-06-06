import approx from 'approximate-number';

export default function toEasyNumber(longNumber) {
    return approx(longNumber, {decimal: true}).toUpperCase();
}