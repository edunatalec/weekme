"use client";

import IconButton from "@/components/IconButton";
import { useTheme } from "@/contexts/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, toggle } = useTheme();

  return (
    <IconButton onClick={toggle}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </IconButton>
  );
};

export default ToggleTheme;
