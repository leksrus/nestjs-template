module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'on',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'on',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
            },

            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },

            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },

            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
    },
};