/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'PurpleBlue-10': '#FFA500',
        tableHeaderGrey: '#F6F6F6',
        DownloadButtonPurple: 'rgba(255, 165, 0, 0.10)',
        lightGrey: '#c2cbd6',
      },
    },
  },
  plugins: [],
}

