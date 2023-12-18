module.exports = {
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    useTabs: true,
    plugins: [
        require.resolve('prettier-plugin-svelte'),
        require('prettier-plugin-astro'),
    ],
    overrides: [
        {
            files: ["**/*.svelte", "**/*.astro"],
            options: {
                parser: ['svelte', 'astro'],
            }
        }
    ]
}