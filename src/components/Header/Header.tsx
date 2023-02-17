import React, { useEffect, useRef } from 'react';

const useToggleOnScroll = (element: HTMLElement | null) => {
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      if (!element) return;

      const currScrollPos = window.pageYOffset;
      if (prevScrollPos > currScrollPos) {
        element.classList.remove('-translate-y-full');
      } else {
        element.classList.add('-translate-y-full');
      }
      prevScrollPos = currScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [element]);
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const headerRef = useRef<HTMLElement>(null);
  useToggleOnScroll(headerRef.current);

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-10 bg-white transition-transform ease-out'
    >
      {children}
    </header>
  );
};

export default Header;
