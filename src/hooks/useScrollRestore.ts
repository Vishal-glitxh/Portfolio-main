import { useEffect } from "react";

export const useScrollRestore = (trigger: unknown) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trigger]);
};
