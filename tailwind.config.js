/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'wallpaper01': "url('/images/gallery/wallpaper01.png')",
      },
      fontFamily: {
        titillium: ['Titillium Web', "display"],
        roboto: ['Roboto', "sans-serif"],
        noto: ['Noto Sans', "sans-serif"],
        quicksand: ['Quicksand', "sans-serif"],
        exo: ['Exo', "sans-serif"]
    },
  },
  plugins: [],
}
}