import { useEffect, useRef } from 'react';

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const headerEl = headerRef.current;
      if (!headerEl) return;

      const currScrollPos = window.pageYOffset;

      if (prevScrollPos > currScrollPos) {
        headerEl.classList.remove('-translate-y-full');
      } else {
        headerEl.classList.add('-translate-y-full');
      }

      prevScrollPos = currScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className='sticky top-0 border-b bg-white transition-transform ease-out'
    >
      {children}
    </header>
  );
};

export default Header;
