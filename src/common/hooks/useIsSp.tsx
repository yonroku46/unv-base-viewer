'use client';

import { useState, useEffect } from 'react';

export function useIsSp(breakpoint: number = 768): boolean {
  const [isSp, setIsSp] = useState<boolean>(false);

  useEffect(() => {
    const checkIsSp = () => {
      setIsSp(window.innerWidth <= breakpoint);
    };

    checkIsSp();
    window.addEventListener('resize', checkIsSp);
    return () => window.removeEventListener('resize', checkIsSp);
  }, [breakpoint]);

  return isSp;
}
