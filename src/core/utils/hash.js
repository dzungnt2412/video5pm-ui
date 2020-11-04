/**
 * Generate guid
 * @return {*}
 */
export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(6)
      .substring(1)
  }

  return s4() + s4()
}

/**
 * base64 encode
 * @param val
 */
export const base64Encode = (val) => btoa(encodeURI(val))

/**
 * base64 decode
 * @param val
 */
export const base64Decode = (val) => decodeURI(atob(val))
