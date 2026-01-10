const config = {
  theme: {
    container: {
      screens: {
        'lg': '768px',
        'xl': '768px',
        '2xl': '768px',
      },
      center: true,
      padding: {
        DEFAULT: '4rem',
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;