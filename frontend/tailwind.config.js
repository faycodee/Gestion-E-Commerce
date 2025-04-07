/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4500", // Light mode vibrant orange-red
        paragraph: "#E0E0E0", // Light paragraph text
        subtle: "#B0B0B0", // Light subtle text
        background: "#F5F5F5", // Light background
        backgroundCard: "#f5f5f5af", // Light background
        accentBright: "#FF6347", // Bright accent
        // Dark Mode with same hues but adjusted contrast
        darkPrimary: "#FF5733", // Slightly less vibrant for readability
        darkParagraph: "#CFCFCF", // Softer light text for dark backgrounds
        darkSubtle: "#A6A6A6", // Matching subtle contrast in dark mode
        darkBackground: "#1A1A1A", // Classic dark background
        darkBackgroundCard: "#1A1A1A", // Classic dark background
        darkAccentBright: "#FF7155", // Gentle bright accent for dark mode

      },
      rotate: {
        '-3': '-3deg',
      }
    },
  },
  plugins: [],
};
