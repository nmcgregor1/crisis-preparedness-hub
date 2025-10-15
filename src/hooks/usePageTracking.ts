import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if gtag is available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-Z2HFMRTXC1', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};
