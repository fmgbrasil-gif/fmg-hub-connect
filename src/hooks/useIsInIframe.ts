import { useState, useEffect } from "react";

export function useIsInIframe() {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      // Se erro de segurança (cross-origin), está em iframe
      setIsInIframe(true);
    }
  }, []);

  return isInIframe;
}
