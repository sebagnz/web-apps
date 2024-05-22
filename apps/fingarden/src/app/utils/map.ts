/**
 * Filter a Map by a predicate
 * @param map The map to be filtered
 * @param filter The predicate to be used
 * @returns A new Map with the entries that satisfy the predicate
 */
export const filterMap = <K, V>(map: Map<K, V>, filter: (key: K, value: V) => boolean) => {
  return Array.from(map).reduce<Map<K, V>>((acc, [key, value]) => {
    if (filter(key, value)) acc.set(key, value)
    return acc
  }, new Map())
}
