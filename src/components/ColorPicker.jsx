import { useTheme } from '../context/ThemeContext';

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

export default function ColorPicker({ onClose }) {
  const { accentColor, updateAccent, resetAccent } = useTheme();

  const hexPreview = hslToHex(accentColor.h, accentColor.s, accentColor.l);

  return (
    <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4 w-64 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-text-primary">Accent Color</h3>
        <button onClick={onClose} className="text-text-secondary hover:text-accent">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-secondary block mb-1">Hue: {accentColor.h}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={accentColor.h}
            onChange={e => updateAccent('h', Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))`
            }}
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1">Saturation: {accentColor.s}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={accentColor.s}
            onChange={e => updateAccent('s', Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(${accentColor.h},0%,50%), hsl(${accentColor.h},100%,50%))`
            }}
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1">Lightness: {accentColor.l}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={accentColor.l}
            onChange={e => updateAccent('l', Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(${accentColor.h},${accentColor.s}%,0%), hsl(${accentColor.h},${accentColor.s}%,50%), hsl(${accentColor.h},${accentColor.s}%,100%))`
            }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-bg-tertiary">
          <div
            className="w-8 h-8 rounded-lg border border-bg-tertiary"
            style={{ backgroundColor: hexPreview }}
          />
          <button
            onClick={resetAccent}
            className="text-xs text-text-secondary hover:text-accent transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
