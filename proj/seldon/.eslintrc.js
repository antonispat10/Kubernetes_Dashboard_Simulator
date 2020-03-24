module.exports = {
  extends: [
    'react-app', // for editor
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['babel', "react-hooks"],
  rules: {
    quotes: ['error', 'single'],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'babel/no-unused-expressions': 'error',
    'no-unused-expressions': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        jsxBracketSameLine: true,
      },
    ],
  },
}