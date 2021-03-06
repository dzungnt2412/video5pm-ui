module.exports = {
  '*.js': ['yarn lint:eslint', 'yarn lint:prettier', 'git add'],
  '{!(package)*.json,*.code-snippets,.*rc}': [
    'yarn lint:prettier --parser json',
    'git add',
  ],
  'package.json': ['yarn lint:prettier', 'git add'],
  '*.vue': ['yarn lint:eslint', 'yarn lint:prettier', 'git add'],
  // '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
