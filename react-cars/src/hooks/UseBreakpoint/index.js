import { useEffect, useState, useCallback } from 'react';

export const useBreakpoint = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, handleResize]);


  if (windowSize.width < 960) {
    return 'sm';
  }
  if (960 < windowSize.width && windowSize.width < 1280) {
    return 'md';
  }
  if (windowSize.width >= 1280) {
    return 'lg';
  }
};


