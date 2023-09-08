module.exports = {
  extends: ['react-app', 'plugin:cypress/recommended'],
  plugins: ["unused-imports"],
  ignorePatterns: ['src/gen/graphql.ts'],
  rules: {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    'import/order': [
      'warn', // 出過ぎて直すのしんどいのでwarningにしておく
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
}
