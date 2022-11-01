// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        "eslint:recommended",
    ],

    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        allowImportExportEverywhere: true
    },

    env: {
        browser: true,
        node: true,
        commonjs: true
    },

    rules: {
        strict: 1,
        semi: ["error", "always"],
        "prefer-const": "error",
        quotes: ["error", "double", {allowTemplateLiterals: true}],
        "object-curly-spacing": ["warn", "always"],
        "keyword-spacing": "warn"
    },
};
