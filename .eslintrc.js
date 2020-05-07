module.exports = {
    "env": {
		"browser": true,
		"node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "rules": {
		"strict": [2, "global"],
		"consistent-return": 2,
		"curly": [2, "multi-line"],
		"default-case": 2,
		"eqeqeq": 2,
		"quotes": [2, "single", "avoid-escape"],
		"semi": 1,
		"dot-notation": [2, {"allowKeywords": true}],
		"indent": [2, 2],
		"brace-style": [2, "1tbs", {"allowSingleLine": true}],
    }
};
