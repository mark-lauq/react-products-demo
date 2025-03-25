/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  "**/*.{mts,tsx}": ["eslint --fix", "prettier --write"],
  "**/*.md": "prettier --write",
};

export default lintStagedConfig;
