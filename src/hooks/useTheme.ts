import { setThemeServerFn } from "@/features/theme";
import { useLoaderData } from "@tanstack/react-router";
import { useEffect } from "react";

export default function useThemeListener() {
  const theme = useLoaderData({ from: "__root__" });
  useEffect(() => {
    if (typeof theme === "undefined") {
      const isDeviceDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", isDeviceDark);
      setThemeServerFn({ data: isDeviceDark ? "dark" : "light" });
    }
  }, []);
  return theme;
}
