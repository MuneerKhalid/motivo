import { useContext } from "react";
import Moon from "../images/icon-moon.svg";
import Sun from "../images/icon-sun.svg";
import { ThemeContext } from "./ThemeContext";

function ThemeButton() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, setTheme } = context;

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handleThemeToggle}>
      <img src={theme === "light" ? Moon : Sun} alt="toggle-mode" />
    </button>
  );
}

export default ThemeButton;
