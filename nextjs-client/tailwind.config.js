module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['Playfair Display', 'Serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      body: ['Rubik', 'Sans-Serif'],
    },
    extend: {
      colors: {
        'primary-color': 'var(--color)',
        'primary-color-light': 'var(--color-light)',
        'primary-color-dark': 'var(--color-dark)',

        'text-color': 'var(--text)',
        'text-color-light': 'var(--text-light)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
