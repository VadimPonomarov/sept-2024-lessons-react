import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant={"destructive"}
      onClick={toggleTheme}
      className={"theme-switch"}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export default ThemeToggle;
