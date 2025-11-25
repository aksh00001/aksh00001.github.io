/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050205', // Almost Black (Subtle Purple Tint)
                surface: '#150B1F',    // Dark Charcoal Purple
                primary: '#FBE4D8',    // Champagne
                secondary: '#DFB6B2',  // Rose Gold
                accent: '#854F6C',     // Mauve
                'theme-dark': '#050205',
                'theme-purple': '#150B1F',
                'theme-royal': '#522B5B',
                'theme-mauve': '#854F6C',
                'theme-rose': '#DFB6B2',
                'theme-champagne': '#FBE4D8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
