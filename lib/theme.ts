// Heal Theme Configuration
// Based on the signin/signup pages color palette

export const healTheme = {
  colors: {
    // Primary colors from auth pages
    cream: '#FAEFD9',
    sage: '#677E83', 
    darkTeal: '#0B3C49',
    mediumTeal: '#044750',
    lightTeal: '#006C67',
    beige: '#C2BCAE',
    lightBlue: '#C8E1E7',
    accentBlue: '#2AB1F4',
    lightGray: '#B0BEC0',
    offWhite: '#FEF0D3',
    warmWhite: '#FBF9F4',
  },
  
  // CSS custom properties for dynamic theming
  cssVars: {
    '--heal-cream': '#FAEFD9',
    '--heal-sage': '#677E83',
    '--heal-dark-teal': '#0B3C49',
    '--heal-medium-teal': '#044750',
    '--heal-light-teal': '#006C67',
    '--heal-beige': '#C2BCAE',
    '--heal-light-blue': '#C8E1E7',
    '--heal-accent-blue': '#2AB1F4',
    '--heal-light-gray': '#B0BEC0',
    '--heal-off-white': '#FEF0D3',
    '--heal-warm-white': '#FBF9F4',
  },
  
  // Semantic color mappings
  semantic: {
    primary: '#0B3C49',
    secondary: '#677E83',
    accent: '#2AB1F4',
    background: '#FAEFD9',
    surface: '#FFFFFF',
    text: {
      primary: '#0B3C49',
      secondary: '#677E83',
      accent: '#2AB1F4',
      light: '#FEF0D3',
    },
    status: {
      success: '#006C67',
      warning: '#F59E0B',
      error: '#DC2626',
      info: '#2AB1F4',
    }
  },
  
  // Component-specific styles
  components: {
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: 'rgba(194, 188, 174, 0.5)',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    button: {
      primary: {
        background: '#0B3C49',
        color: '#FAEFD9',
        hover: '#044750',
      },
      secondary: {
        background: 'transparent',
        color: '#044750',
        border: '#FEF0D3',
        hover: {
          background: '#0B3C49',
          color: '#FEF0D3',
        }
      }
    },
    input: {
      background: 'transparent',
      border: '#FEF0D3',
      color: '#FEF0D3',
      placeholder: '#FEF0D3',
      focus: '#FEF0D3',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
      accent: 'Inter, sans-serif', // Using Inter for consistency
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    }
  },
  
  // Spacing and layout
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    full: '9999px',
  }
} as const;

// Helper functions for theme usage
export const getThemeColor = (colorPath: string) => {
  const keys = colorPath.split('.');
  let value: any = healTheme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  
  return value;
};

// CSS-in-JS helper for inline styles
export const themeStyle = (styles: Record<string, string>) => {
  const processedStyles: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(styles)) {
    if (value.startsWith('var(--heal-')) {
      processedStyles[key] = value;
    } else if (value.startsWith('heal.')) {
      const themeValue = getThemeColor(value.replace('heal.', ''));
      processedStyles[key] = themeValue || value;
    } else {
      processedStyles[key] = value;
    }
  }
  
  return processedStyles;
};

export default healTheme;