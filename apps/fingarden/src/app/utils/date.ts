/**
 * Given a date, returns the first day of the month of that date
 * @param date The date to be used
 * @returns A new date representing the first day of the month
 */
export const getMonthFirstDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth())

/**
 * Converts a date into a string with the short month and year
 * @param date The date to be used
 * @returns A string with the short month and year
 */
export const getShortDate = (date: Date): string => date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
