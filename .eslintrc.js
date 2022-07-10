module.exports = {
  // ...
  extends: [
    // ...
    "plugin:vue/vue3-recommended",
    "plugin:astro/recommended",
  ],
  rules: {
    "indent": ["error", 2]
  },
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      files: ["*.vue"],

      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      },
      rules: {
        "vue/multi-word-component-names": "off",
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    }
    // ...
  ],
}