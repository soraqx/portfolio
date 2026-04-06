import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-accent');
      if (stored) return JSON.parse(stored);
    }
    return { h: 300, s: 100, l: 50 };
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const hex = hslToHex(accentColor.h, accentColor.s, accentColor.l);
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-glow', `${hex}4D`);
    localStorage.setItem('portfolio-accent', JSON.stringify(accentColor));
  }, [accentColor]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const updateAccent = (key, value) => {
    setAccentColor(prev => ({ ...prev, [key]: value }));
  };

  const resetAccent = () => setAccentColor({ h: 300, s: 100, l: 50 });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, updateAccent, resetAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
