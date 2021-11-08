module.exports = {
    'env': {
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'plugins': ['@typescript-eslint'],
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': 'off',
        '@typescript-eslint/semi': ['error'],
        'no-unused-vars': 0,
        'no-console': ['warn', {allow: ['warn', 'error']}],
    }
};