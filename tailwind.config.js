/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            lg: '1150px',
        },
        extend: {
            colors: {
                primary: 'rgba(254, 44, 85, 1)',
                primaryHover: '#e4274c',
                white_1: 'rgba(255, 255, 255, 1)',
                text: '#161823',
                gray006: 'rgba(22, 24, 35, 0.06)',
                gray03: 'rgba(22, 24, 35, 0.3)',
                gray06: 'rgba(22, 24, 35, 0.6)',
                gray034: 'rgba(22, 24, 35, 0.34)',
                gray003: 'rgba(22, 24, 35, 0.03)',
                gray075: 'rgba(22, 24, 35, 0.75)',
                gray012: 'rgba(22, 24, 35, 0.12)',
                gray01: 'rgba(22, 24, 35, 0.1)',
                gray05: 'rgba(22, 24, 35, 0.5)',
                gray241_241_242_1: 'rgba(241, 241, 242, 1)',
                gray248_248_248: 'rgb(248, 248, 248)',
                pinkHover: ' rgba(254, 44, 85, 0.06)',
            },
            fontFamily: {
                roboto: ['Roboto', ' sans-serif'],
            },
            keyframes: {
                wave: {
                    '0%': {
                        transform: 'translateX(0)',
                    },
                    '50%': {
                        transform: 'translateX(-50%)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
            },
            animation: {
                wave: 'wave 12s linear infinite',
            },
        },
    },
    plugins: [],
};
