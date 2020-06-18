export const currencyFilter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
})

/**
 * Conver fraction to percentage
 *
 * @param number
 */
export const toPercentage = (number: any): string => {
  return (number / 100).toLocaleString('en', { style: 'percent' })
}
