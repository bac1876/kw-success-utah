/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        copper: "#B87333",
        "copper-bright": "#D09454",
        ink: "#1F2326",
        "ink-deep": "#16191C",
        ivory: "#FAFAF8",
        "ivory-deep": "#EEF2F5",
        stone: "#828282",
        "stone-dark": "#A9A49A",
        "luxe-gold": "#C9A24B",
        sage: "#7A8B6F",
        "kw-red": "#B40101",
        "kw-red-bright": "#D11919",
        charcoal: "#4D4D4D",
        "kw-gray": "#828282",
        "kw-ink": "#1F2326",
        snow: "#FAFAF8",
        mist: "#EEF2F5",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      fontFamily: {
        sans: ["Jost", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Jost", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        lift: "0 20px 50px rgba(31,35,38,.08)",
        "lift-lg": "0 24px 60px rgba(31,35,38,.14)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "ken-burns": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.06)" },
        },
        "gold-pan": {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "100% 50%" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateY(48px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
        "ken-burns": "ken-burns 12s ease-in-out infinite alternate",
        "gold-pan": "gold-pan 20s linear infinite alternate",
        "scroll-dot": "scroll-dot 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
