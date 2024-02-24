module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 150,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@my-finance/(.*)$', '^@/app/components(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
