module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len' : ["error", {code : 300}],
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
