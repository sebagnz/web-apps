/**
 * Returns a new array with the elements that pass the test implemented by the provided function.
 * @param array The array to be filtered
 * @param keyFn The function to be used to extract the key from the elements
 * @returns A new Map with the entries grouped by the key
 */
export const groupArrayBy = <K, T>(array: Array<T>, keyFn: (item: T) => K): Map<K, Array<T>> => {
  return array.reduce<Map<K, Array<T>>>((map, item) => {
    const key = keyFn(item)
    const group = map.get(key) || []

    group.push(item)

    map.set(key, group)

    return map
  }, new Map())
}
