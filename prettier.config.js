/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  arrowParens: 'always',
  trailingComma: 'none',
  bracketSpacing: true,
  singleQuote: true,
  endOfLine: 'lf',
  useTabs: false,
  tabWidth: 2,
  semi: true
};
