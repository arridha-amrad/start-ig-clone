import { useEffect } from "react";

function useEscapePress(callback: () => void, trigger: boolean) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    if (trigger) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [trigger, callback]);
}

export default useEscapePress;
