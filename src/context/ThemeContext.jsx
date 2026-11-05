import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext.js";

const THEME_STORAGE_KEY = "portfolio-theme";
const themeOptions = ["dark", "light", "system"];

function getStoredTheme() {
  const bootstrapPreference =
    document.documentElement.dataset.themePreference;

  if (themeOptions.includes(bootstrapPreference)) {
    return bootstrapPreference;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return themeOptions.includes(storedTheme) ? storedTheme : "system";
  } catch (error) {
    console.warn("Unable to read the saved theme preference.", error);
    return "system";
  }
}

function resolveTheme(preference, systemPrefersDark) {
  return preference === "system"
    ? systemPrefersDark
      ? "dark"
      : "light"
    : preference;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const resolvedTheme = resolveTheme(theme, systemPrefersDark);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", resolvedTheme === "dark" ? "#080D18" : "#F5F7FB");

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Unable to save the theme preference.", error);
    }
  }, [resolvedTheme, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event) => {
      setSystemPrefersDark(event.matches);
    };

    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
