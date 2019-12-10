import { get } from 'axios'

export async function fetchPostcodes(postcode) {
  if(postcode.length > 0) {
    const { data } = await get(`http://api.postcodes.io/postcodes?q=${postcode}`)
    return data.result || []
  }
  return []
}