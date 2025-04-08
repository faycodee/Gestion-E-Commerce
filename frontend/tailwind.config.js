/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Light mode vibrant blue
        paragraph: "#E0E0E0", // Light paragraph text
        subtle: "#B0B0B0", // Light subtle text
        background: "#F5F5F5", // Light background
        backgroundCard: "#f5f5f5af", // Light background card
        accentBright: "#5AA9F4", // Bright blue accent

        // Dark Mode adjusted blue tones
        darkPrimary: "#4285C6", // Slightly muted for readability
        darkParagraph: "#CFCFCF", // Soft text for dark backgrounds
        darkSubtle: "#A6A6A6", // Subtle contrast
        darkBackground: "#1A1A1A", // Dark background
        darkBackgroundCard: "#1A1A1A", // Dark background card
        darkAccentBright: "#66B2FF", // Bright blue accent in dark mode
      },
      rotate: {
        '-3': '-3deg',
      }
    },
  },
  plugins: [],
};
