import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
			"roobert-mono": ["var(--font-roobert-mono)", "monospace"],
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
			},
			landing: {
				black: "#080808",
				ink: "#201f1b",
				"selected-text": "#24221d",
				"black-hover": "#272727",
				"ink-soft": "#292823",
				"selected-icon": "#39372e",
				"ink-hover": "#434137",
				"text-option": "#4c4944",
				"gold-orbit": "#4d45162e",
				success: "#587144",
				"text-subtle": "#5c5953",
				"text-body": "#625f58",
				"text-code": "#676053",
				"success-icon": "#6e8051",
				"gold-caption": "#70663e",
				"text-muted": "#706d65",
				"status-dot": "#718c56",
				"gold-border-soft": "#74661617",
				"text-card": "#747065",
				"status-label": "#77736a",
				"text-file": "#797369",
				focus: "#7d5ad5",
				"text-tab": "#817d73",
				"text-footer": "#827a6a",
				"text-count": "#837e73",
				"text-caret": "#858177",
				"terminal-path": "#899078",
				"terminal-cursor": "#89967b",
				"selected-border": "#8c7a36",
				"terminal-prompt": "#8e977d",
				"text-chevron": "#918b80",
				error: "#a0443c",
				"icon-muted": "#a39a87",
				"icon-file": "#aaa396",
				"text-zip": "#b9b5ab",
				"border-input-hover": "#bdb8ad",
				"yellow-hover": "#d7ed27",
				scrollbar: "#d8d4ca",
				"border-builder": "#d9d2a8",
				"border-terminal": "#dadfce",
				"border-tree": "#ddd9cf",
				"border-input": "#e1ded7",
				"border-integrations": "#e2ded4",
				"border-framework": "#e4e1da",
				"border-icon": "#e6e3dc",
				border: "#e7e3da",
				"success-bg": "#e7ecd9",
				yellow: "#e7ff32",
				"surface-sage": "#e9ecdf",
				"surface-tabs": "#ebe8e1",
				"border-nav": "#ededed",
				"yellow-deep": "#efdb33",
				"surface-beige": "#f0ede6",
				"border-field": "#f0eee9",
				"yellow-soft": "#f2df6f",
				"surface-icon": "#f8f7f2",
				"surface-option-hover": "#f8f7f3",
				"surface-preview": "#f8f7f4",
				"surface-terminal": "#f9faf5",
				"surface-selected": "#fff9d7",
				"text-inverse-warm": "#fffefa",
				"surface-pill": "#fffefb"
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
		},
		boxShadow: {
			"landing-builder": "inset 0 0 0 1px #74661617",
			"landing-preview": "0 28px 55px -34px #5d501d8c, 0 2px 4px #7261160a",
			"landing-card-hover": "0 2px 5px #00000009",
			"landing-selected": "0 0 0 1px #8c7a36, 0 8px 22px -18px #5c4c12",
			"landing-focus": "0 0 0 3px #7d5ad51c",
			"landing-tab": "0 1px 3px #302b2014",
			"landing-pill": "0 2px 0 #0000000d"
		},
		keyframes: {
			marquee: {
				from: { transform: "translateX(0)" },
				to: { transform: "translateX(-50%)" },
			},
			"preview-in": {
				from: { opacity: "0.25", transform: "translateY(4px)" },
			},
		},
		animation: {
			marquee: "marquee 28s linear infinite",
			"preview-in": "preview-in 180ms cubic-bezier(0.23,1,0.32,1) both",
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
