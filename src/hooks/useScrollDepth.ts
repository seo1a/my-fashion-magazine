import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";

export function useScrollDepth(threshold = 75) {
  const fired = useRef(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= threshold && !fired.current) {
        ReactGA.event("scroll_75");
        fired.current = true;
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
}
