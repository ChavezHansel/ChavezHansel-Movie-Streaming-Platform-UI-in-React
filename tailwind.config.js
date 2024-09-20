/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        backgroundImage: {
            "auth-bg":
                "url('https://images.unsplash.com/photo-1552319704-41c50c38c26e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        },
        extend: {
            screens: {
                xs: "360px",
            },
            colors: {
                "red-full": "#FF0000",
                "red-full-800": "#AA0000",
            },
        },
    },
    plugins: [],
};
