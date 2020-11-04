/**
 * Format number
 * @param val
 * @returns {*}
 */
export function formatNumber(val) {
  if (!val) {
    return 0
  }

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Two digital
 * @param val
 * @return {*}
 */
export const formatTwoDigits = (val) => {
  if (val < 10) {
    return `0${val}`
  }

  return val
}

export const formatUnitString = (unit, quantity, extra = 's') => {
  if (quantity && quantity > 1) return unit + extra
  return unit
}

export const formatTobe = (tobe, quantity, result = 'are') => {
  if (quantity && quantity > 1) return result
  return tobe
}

/**
 * Format price
 * @param value
 * @return {string}
 */
export const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace('.', ',')
  return `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
