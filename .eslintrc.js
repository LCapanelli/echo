module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        noWatch: true,
        ecmaFeatures: {
            "jsx": true
        }
        },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    env: {
        browser: true,
        node: true,
        mocha: true,
        es6: true
    },
    rules: {
        "no-console": 1,
        '@typescript-eslint/no-var-requires': 0,
        "noInlineConfig": 0
    }
};