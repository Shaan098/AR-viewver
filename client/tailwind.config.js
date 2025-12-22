/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#9333EA', // Deep Purple
                    light: '#A855F7',   // Light Purple
                    dark: '#7E22CE',    // Dark Purple
                },
                secondary: '#E8B4B8', // Rose Gold
                accent: '#F472B6',    // Pink Rose
                highlight: '#D4AF37', // Golden
                success: '#34D399',   // Emerald
                dark: '#0D0A1A',      // Deep Purple Black
                'dark-lighter': '#2D2640', // Lighter Purple Dark
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-purple-rose': 'linear-gradient(135deg, #9333EA 0%, #E8B4B8 100%)',
            },
            boxShadow: {
                'glow-purple': '0 0 20px rgba(147, 51, 234, 0.5)',
                'glow-rose': '0 0 20px rgba(232, 180, 184, 0.5)',
            }
        },
    },
    plugins: [],
}
