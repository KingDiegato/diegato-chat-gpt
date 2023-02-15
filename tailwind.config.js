/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        typing: 'blink 2s steps(5, start) infinite'
      },
      keyframe: {
        blink: {
          to: { visibility: 'hidden' }
        }
      },
      colors: {
        gptlogo: '#10a37f',
        gptdarkgray: '#202123',
        gptgray: '#343541',
        gptlightgray: '#444654'
      }
    }
  },
  plugins: []
}
