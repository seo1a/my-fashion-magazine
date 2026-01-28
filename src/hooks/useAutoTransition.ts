import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

export function useAutoTransition(nextPath: string) {
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (isBottom) {
        ReactGA.event("auto_page_transition", {
          next_page: nextPath,
        });
        navigate(nextPath);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [navigate, nextPath]);
}
