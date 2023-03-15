/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        titlebar: "var(--titlebar)",
        primaryfont: "var(--primaryfont)",
        buttonbg: "var(--buttonbg)",
        buttonbghover: "var(--buttonbghover)",
        border_color: "var(--border_color)",
      }
    },
  },
  plugins: [],
}
