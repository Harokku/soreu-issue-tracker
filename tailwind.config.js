/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                greenandgrey: {
                    "primary": "#d10e6f",
                    "secondary": "#43d37f",
                    "accent": "#0c577f",
                    "neutral": "#311E34",
                    "base-100": "#3D373E",
                    "info": "#9CB0E7",
                    "success": "#157064",
                    "warning": "#BE9B0E",
                    "error": "#E33D1C",
                },
            },
            {
                greymodded: {
                    "primary": "#d10e6f",
                    "secondary": "#43d37f",
                    "accent": "#0369a1",
                    "neutral": "#311E34",
                    "base-100": "#dad5d5",
                    "info": "#9CB0E7",
                    "success": "#157064",
                    "warning": "#fde047",
                    "error": "#ea580c",
                },
            },
            {
                lightgrey: {
                    "primary": "#4652ba",
                    "secondary": "#f77225",
                    "accent": "#ef97e8",
                    "neutral": "#181920",
                    "base-100": "#EAE1EA",
                    "info": "#78D2ED",
                    "success": "#198F46",
                    "warning": "#FCB83B",
                    "error": "#F04328",
                },
            },
            "cmyk"
        ],
    },
    plugins: [
        require("@tailwindcss/typography"),
        require('daisyui'),
    ],
}
