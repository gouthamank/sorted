import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                sm: '370px',
                md: '580px',
                lg: '870px',
                xl: '1280px',
                '2xl': '1536px',
            },
            colors: {
                'steel-blue': {
                    '50': '#f1f8fd',
                    '100': '#e0eff9',
                    '200': '#c8e3f5',
                    '300': '#a3d1ed',
                    '400': '#77b8e3',
                    '500': '#579dda',
                    DEFAULT: '#4283cd',
                    '600': '#4283cd',
                    '700': '#396fbc',
                    '800': '#345c99',
                    '900': '#2e4e7a',
                    '950': '#20314b',
                },
            },
        },
    },
    plugins: [],
};
export default config;
