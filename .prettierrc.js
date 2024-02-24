module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 150,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@web-apps/(.*)$', '^@/hooks(.*)$', '^@/domain', '^@/services', '^@/components(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
