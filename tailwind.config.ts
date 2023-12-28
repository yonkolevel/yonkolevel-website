import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#084176',
        blue2: '#0C5DA8',
        blue3: '#558EC2',
        blue4: '#9EBEDC',
        blue5: '#E7EFF6',
        orange: '#FE6A5A',
        yellow: '#FDE895',
        originalYellow: '#FCC552',
        white: '#F8FAFC',
        black: '#000015',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': [
          '32px',
          {
            // fontSize: ['40px', '40px', '56px'],
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '0.03em',
          },
        ],
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '72px',
        '6xl': '90px',
      },
      spacing: {
        '0': '0px',
        '4': '4px',
        '8': '8px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '36': '36px',
      },
      fontFamily: {
        ...defaultTheme.fontFamily,
        body: ['var(--font-body)'],
        pixel: ['var(--font-pixel)'],
      },
      fontWeight: {
        body: '400',
        heading: '700',
        bold: '700',
      },
      screens: {
        sm: '480px',
        md: '720px',
        lg: '1025px',
        xl: '1440px',
      },
      transitionDuration: {
        '350': '350ms',
      },
      borderRadius: {
        input: '3px',
      },
      borderWidth: {
        input: '2px',
      },
      height: {
        input: '40px',
      },
      placeholderColor: {
        input: '#000015',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    // themes: [
    //   {
    //     myTheme: {
    //       ...require('daisyui/src/theming/themes')['light'],
    //       primary: '#FE6A5A',
    //       'primary-focus': '#FDE895',
    //       'primary-content': '#F8FAFC',
    //       secondary: '#0C5DA8',
    //       'secondary-focus': '#084176',
    //       'secondary-content': '#F8FAFC',
    //       accent: '#FCC552',
    //       'accent-focus': '#FDE895',
    //       'accent-content': '#000015',
    //       neutral: '#F8FAFC',
    //       'neutral-focus': '#E7EFF6',
    //       'neutral-content': '#000015',
    //       'base-100': '#F8FAFC',
    //       'base-200': '#E7EFF6',
    //       'base-300': '#9EBEDC',
    //       'base-content': '#000015',
    //       info: '#558EC2',
    //       success: '#558EC2',
    //       warning: '#FCC552',
    //       error: '#FE6A5A',
    //       fontFamily: {
    //         base: 'var(--font-body)',
    //       },
    //     },
    //   },
    // ],
  },
};
export default config;
