// Global TypeScript declarations

declare namespace JSX {
  interface IntrinsicElements {
    'l-quantum': {
      size?: string;
      speed?: string;
      color?: string;
      children?: React.ReactNode;
    };
  }
}

// Extend the global Window interface if needed
declare global {
  interface Window {
    // Add any global window properties here if needed
  }
}

export {};