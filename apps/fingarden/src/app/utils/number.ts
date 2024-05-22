/**
 * Round a number to a given precision. No decimals if no precision is given.
 * @param value The number to round
 * @param precision The number of decimal places to round to
 * @returns The rounded number
 */
export const round = (value: number, precision?: number) => {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}
