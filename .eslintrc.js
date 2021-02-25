module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'parserOptions': {
    'ecmaVersion': 12,
  },
  "extends": "eslint:recommended",
  'rules':{
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "arrow-body-style": ["error", "always"],
        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],
            "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
        }],
        "capitalized-comments": [
                "error",
                "always",
                {
                    "ignorePattern": "pragma|ignored",
                    "ignoreInlineComments": true
                }
            ],
        "comma-spacing": ["error", { "before": false, "after": true }],
        // disable rules from base configurations
         "for-direction": "off",
    },
};
