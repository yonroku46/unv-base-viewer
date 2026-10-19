'use client';

import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useIsSp } from './useIsSp';

interface HeaderVisibilityContextType {
  isHeaderVisible: boolean;
  isTop: boolean;
}

const HeaderVisibilityContext = createContext<HeaderVisibilityContextType>({
  isHeaderVisible: true,
  isTop: true,
});

export function HeaderVisibilityProvider({ children }: { children: React.ReactNode }) {
  const isSp = useIsSp();
  const pathname = usePathname();

  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isTop, setIsTop] = useState<boolean>(true);
  const lastScrollYRef = useRef<number>(0);
  const headerHeightRef = useRef<number>(64);
  const thresholdRef = useRef<number>(5);

  useEffect(() => {
    setIsTop(window.scrollY < thresholdRef.current);
  }, [pathname]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextIsTop = currentScrollY < thresholdRef.current;
          setIsTop((prev) => (prev !== nextIsTop ? nextIsTop : prev));

          if (isSp) {
            if (currentScrollY > headerHeightRef.current) {
              if (currentScrollY > lastScrollYRef.current) {
                setIsHeaderVisible(false);
              } else {
                setIsHeaderVisible(true);
              }
            } else {
              setIsHeaderVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
          } else {
            setIsHeaderVisible(true);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSp]);

  const value = useMemo(() => ({
    isHeaderVisible,
    isTop,
  }), [isHeaderVisible, isTop]);

  return (
    <HeaderVisibilityContext.Provider value={value}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
}

export function useHeaderVisibility() {
  return useContext(HeaderVisibilityContext);
}
