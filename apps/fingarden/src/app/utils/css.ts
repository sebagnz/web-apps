export const cssVar = (name: string) => {
  if (typeof document === 'undefined') return
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}
