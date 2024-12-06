import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {   
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#455CE9',
        background: 'rgb(41, 41, 41)',
        'text-muted': 'rgb(153, 153, 153)',
      },
      fontSize: {
        '4xl': '3.5rem', // 56px for nav items
        'xs': '0.75rem', // 12px for footer
      },
      spacing: {
        '100': '25rem', // for padding and margins
      },
      transitionDuration: {
        '400': '400ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
export default config