import { useEffect, useState } from 'react';

const useViewportWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? document.documentElement.clientWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default useViewportWidth;
