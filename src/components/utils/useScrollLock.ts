import { useEffect, useRef } from "react";

/**
 * Custom hook to manage modal/overlay scroll locking.
 * Captures active overflow states immediately before locking,
 * and restores them on state transitions and unmounts.
 * Safe for Server-Side Rendering (SSR).
 */
export const useScrollLock = (
  isOpen: boolean,
  telemetryOpen: () => void,
  telemetryClose: () => void
) => {
  const originalStyles = useRef({
    overflow: "",
    overflowY: "",
    htmlOverflow: "",
    htmlOverflowY: ""
  });

  const isLocked = useRef(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const restoreScroll = () => {
      if (isLocked.current) {
        const { overflow, overflowY, htmlOverflow, htmlOverflowY } = originalStyles.current;
        document.body.style.overflow = overflow;
        document.body.style.overflowY = overflowY;
        document.documentElement.style.overflow = htmlOverflow;
        document.documentElement.style.overflowY = htmlOverflowY;
        isLocked.current = false;
        telemetryClose();
      }
    };

    if (isOpen) {
      if (!isLocked.current) {
        // Capture active scroll states immediately before applying the lock
        originalStyles.current = {
          overflow: document.body.style.overflow,
          overflowY: document.body.style.overflowY,
          htmlOverflow: document.documentElement.style.overflow,
          htmlOverflowY: document.documentElement.style.overflowY
        };

        // Lock both vertical and horizontal axes for maximum containment
        document.body.style.overflow = "hidden";
        isLocked.current = true;
        telemetryOpen();
      }
    } else {
      restoreScroll();
    }

    return () => {
      restoreScroll();
    };
  }, [isOpen, telemetryOpen, telemetryClose]);
};
