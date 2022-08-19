module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len' : ["error", {code : 2000}],
    'vuejs-accessibility/label-has-for' : 'off',
    'vuejs-accessibility/anchor-has-content' : 'off',
    'vuejs-accessibility/form-control-has-label' : 'off',
    // "vuejs-accessibility/label-has-for": [
    //   "error",
    //   {
    //     "components": ["VLabel"],
    //     "controlComponents": ["VInput"],
    //     "required": {
    //       "every": ["nesting", "id"]
    //     },
    //     "allowChildren": false
    //   }
    // ]
  },
};
