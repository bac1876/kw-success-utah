/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "kw-red": "#B40101",
        "kw-red-bright": "#D11919",
        "kw-red-deep": "#8F0000",
        "kw-ink": "#1F2326",
        ink: "#1F2326",
        "ink-deep": "#14171A",
        "slate-card": "#252A30",
        "slate-border": "#323941",
        charcoal: "#4D4D4D",
        "kw-gray": "#828282",
        snow: "#F7F8FA",
        mist: "#E8EEF3",
        "mist-deep": "#DCE4EC",
        // Legacy aliases mapped strictly to KW Success palette (zero Monogram copper)
        copper: "#B40101",
        "copper-bright": "#D11919",
        ivory: "#F7F8FA",
        "ivory-deep": "#E8EEF3",
        stone: "#6E7681",
        "stone-dark": "#9BA3AE",
        "luxe-gold": "#B40101",
        sage: "#4D4D4D",
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
        sans: ["'Inter'", "'Jost'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "'Jost'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Plus Jakarta Sans'", "'Jost'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1360px",
      },
      boxShadow: {
        lift: "0 20px 50px rgba(20, 23, 26, 0.16)",
        "lift-dark": "0 24px 64px rgba(0, 0, 0, 0.45)",
        card: "0 12px 32px rgba(20, 23, 26, 0.08)",
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
};
