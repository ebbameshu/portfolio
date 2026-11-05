import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

const themeIcons = {
  dark: Moon,
  light: Sun,
  system: Monitor,
};
const nextTheme = {
  dark: "light",
  light: "system",
  system: "dark",
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const Icon = themeIcons[theme];
  const next = nextTheme[theme];

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Theme: ${theme}. Activate to use ${next} mode.`}
      title={`Theme: ${theme}`}
      onClick={() => setTheme(next)}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
      <span className="theme-toggle-label">{theme}</span>
    </button>
  );
};

export default ThemeToggle;
