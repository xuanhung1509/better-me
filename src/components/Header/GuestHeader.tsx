import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import Header from '@/components/Header/Header';
import MobileMenu from '@/components/Header/MobileMenu';

type BaseNavItem = {
  label: string;
  url: string;
};

type NavItem = BaseNavItem & {
  isHashLink?: boolean;
  children?: BaseNavItem[];
};

const navItems: NavItem[] = [
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
        label: 'Pomodoro',
        url: '/pomodoro',
      },
      {
        label: 'Planner',
        url: '/planner',
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

type LinkWrapperProps = BaseNavItem & {
  className?: string;
  isHashLink?: boolean;
  onClick?: () => void;
};

const LinkWrapper = ({
  label,
  url,
  className,
  isHashLink,
  onClick,
}: LinkWrapperProps) => {
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

LinkWrapper.defaultProps = {
  className: '',
  isHashLink: false,
  onClick: () => {},
};

type DropdownProps = {
  label: string;
  items: BaseNavItem[];
};

const Dropdown = ({ label, items }: DropdownProps) => (
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

type NavMenuProps = {
  items: NavItem[];
  onNavItemClick?: () => void;
};

const NavMenu = ({ items, onNavItemClick }: NavMenuProps) => (
  <ul className='absolute top-0 right-0 flex h-screen w-3/4 flex-col items-stretch gap-3 bg-white px-2 pb-8 pt-24 text-center md:static md:w-auto md:flex-row md:items-center md:bg-transparent md:py-0'>
    {items.map((item) => (
      <li key={item.label} className='group relative'>
        {item.children ? (
          <Dropdown label={item.label} items={item.children} />
        ) : (
          <LinkWrapper
            isHashLink={item.isHashLink}
            url={item.url}
            label={item.label}
            className='inline-block p-2 group-last:rounded group-last:bg-green-500 group-last:px-8 group-last:py-2 group-last:text-white'
            onClick={onNavItemClick}
          />
        )}
      </li>
    ))}
  </ul>
);

NavMenu.defaultProps = {
  onNavItemClick: () => {},
};

const GuestHeader = () => {
  const isMD = useMediaQuery('(min-width: 768px)');

  return (
    <Header>
      <div className='container relative'>
        <div className='flex items-center justify-between gap-4 py-4'>
          <a href='/' className='text-2xl font-bold'>
            BetterMe
          </a>
          {isMD ? (
            <NavMenu items={navItems} />
          ) : (
            <MobileMenu<NavItem> items={navItems} NavMenu={NavMenu} />
          )}
        </div>
      </div>
    </Header>
  );
};

export default GuestHeader;
