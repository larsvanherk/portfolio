import withNuxt from './.nuxt/eslint.config.mjs';

const escalateInProd = (devLevel = 'warn') => process.env.NODE_ENV === 'production' ? 'error' : devLevel;

export default withNuxt(
  {
    rules: {
      'no-console': escalateInProd(),
      'no-debugger': escalateInProd(),
      'vue/no-console': escalateInProd(),
      'vue/comma-dangle': [escalateInProd(), 'never'],
      // Barely any documentation, we'll continue as-is
      'nuxt/nuxt-config-keys-order': 'off',
      '@stylistic/indent': [escalateInProd(), 2, { SwitchCase: 1 }],
      '@stylistic/comma-dangle': [escalateInProd(), 'never'],
      '@stylistic/brace-style': [escalateInProd(), '1tbs'],
      '@stylistic/keyword-spacing': [escalateInProd(), { before: true, after: true }],
      '@stylistic/quotes': [escalateInProd(), 'single'],
      '@stylistic/quote-props': [escalateInProd(), 'consistent-as-needed'],
      '@stylistic/semi': [escalateInProd(), 'always'],
      '@stylistic/space-before-function-paren': [escalateInProd(), {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      '@typescript-eslint/no-unused-vars': [escalateInProd()],
      '@typescript-eslint/no-explicit-any': [escalateInProd()],
      'vue/html-closing-bracket-newline': [escalateInProd(), {
        singleline: 'never',
        multiline: 'never'
      }]
    }
  }
);
