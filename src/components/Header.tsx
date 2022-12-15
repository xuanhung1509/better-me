import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

type BaseNavItemType = {
  label: string;
  url: string;
};

type NavItemType = BaseNavItemType & {
  isHashLink?: boolean;
  children?: BaseNavItemType[];
};

type LinkWrapperType = BaseNavItemType & {
  isHashLink?: boolean;
  className: string;
  onClick?: () => void;
};

type DropdownType = {
  label: string;
  items: BaseNavItemType[];
};

type NavListType = {
  onClick?: () => void;
};

const navItems: NavItemType[] = [
  {
    label: 'Tính năng',
    url: '#features',
    isHashLink: true,
  },
  {
    label: 'Công cụ',
    url: '/tools',
    children: [
      {
        label: 'Solo Study',
        url: '/solo-study',
      },
      {
        label: 'Calendar Todo List',
        url: '/calendar-todo-list',
      },
    ],
  },
  {
    label: 'Về BetterMe',
    url: '#about',
    isHashLink: true,
  },
  {
    label: 'Đăng nhập',
    url: '/sign-in',
  },
  {
    label: 'Đăng ký',
    url: '/sign-up',
  },
];

const LinkWrapper: React.FC<LinkWrapperType> = ({
  isHashLink,
  url,
  label,
  className,
  onClick,
}) => {
  if (isHashLink) {
    return (
      <a href={url} {...{ className, onClick }}>
        {label}
      </a>
    );
  }

  return (
    <Link to={url} {...{ className, onClick }}>
      {label}
    </Link>
  );
};

const Dropdown: React.FC<DropdownType> = ({ label, items }) => (
  <Menu>
    <Menu.Button className='mx-auto flex items-center justify-between gap-2 p-2'>
      {label}
      <ChevronDownIcon className='h-4 w-4 ui-open:rotate-180 ui-not-open:rotate-0' />
    </Menu.Button>
    <Transition
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
    >
      <Menu.Items
        as='ul'
        className='rounded-md bg-gray-700 py-2 text-white md:absolute md:right-1/2 md:mt-2 md:w-40 md:translate-x-1/2'
      >
        {items.map((item) => (
          <Menu.Item key={item.label} as='li'>
            {({ active }) => (
              <a
                href={item.url}
                className={`block px-4 py-2 text-center ${
                  active ? 'bg-green-500 text-white' : ''
                }`}
              >
                {item.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
);

const NavList: React.FC<NavListType> = ({ onClick }) => (
  <ul className='absolute top-full left-0 flex w-full flex-col items-stretch gap-3 bg-white px-2 py-8 text-center md:static md:w-auto md:flex-row md:items-center md:bg-transparent md:py-0'>
    {navItems.map((item) => (
      <li key={item.label} className='group relative'>
        {item.children ? (
          <Dropdown label={item.label} items={item.children} />
        ) : (
          <LinkWrapper
            isHashLink={item.isHashLink}
            url={item.url}
            label={item.label}
            className='inline-block p-2 group-last:rounded group-last:bg-green-500 group-last:px-8 group-last:py-2 group-last:text-white'
            onClick={onClick}
          />
        )}
      </li>
    ))}
  </ul>
);

const MobileMenu: React.FC = () => (
  <Popover>
    {({ open, close }) => (
      <>
        <Popover.Button>
          {open ? (
            <XMarkIcon className='h-8 w-8' />
          ) : (
            <Bars3Icon className='h-8 w-8' />
          )}
        </Popover.Button>

        <Transition
          enter='transition-opacity duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-75'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel>
            <NavList onClick={close} />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const isMD = useMediaQuery('(min-width: 768px)');

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
      <div className='container relative'>
        <div className='flex items-center justify-between gap-4 py-6'>
          <a href='/' className='text-2xl font-bold'>
            BetterMe
          </a>
          {isMD ? <NavList /> : <MobileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
