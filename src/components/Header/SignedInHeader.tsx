import {
  CalendarIcon,
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

import Header from '@/components/Header/Header';
import MobileMenu from '@/components/Header/MobileMenu';

type NavItem = {
  label: string;
  url: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  {
    label: 'Overview',
    url: '/dashboard',
    icon: <Squares2X2Icon className='h-6 w-6 flex-shrink-0' />,
  },
  {
    label: 'Pomodoro',
    url: '/pomodoro',
    icon: <ClockIcon className='h-6 w-6 flex-shrink-0' />,
  },
  {
    label: 'Planner',
    url: '/planner',
    icon: <CalendarIcon className='h-6 w-6 flex-shrink-0' />,
  },
  {
    label: 'Stats',
    url: '/stats',
    icon: <ChartPieIcon className='h-6 w-6 flex-shrink-0' />,
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: <Cog8ToothIcon className='h-6 w-6 flex-shrink-0' />,
  },
];

type NavMenuProps = {
  items: NavItem[];
};

const NavMenu = ({ items }: NavMenuProps) => (
  <ul className='absolute top-0 right-0 flex h-screen w-full flex-col items-stretch gap-3 bg-white px-2 pb-8 pt-24 text-center'>
    {items.map(({ label, url, icon }) => (
      <li key={label}>
        <a href={url} className='flex items-center justify-center gap-4 p-2'>
          {icon} {label}
        </a>
      </li>
    ))}
  </ul>
);

const SignedInHeader = () => (
  <Header>
    <div className='container'>
      <div className='flex items-center justify-between gap-4 py-4'>
        <a href='/dashboard' className='text-xl font-bold'>
          Dashboard
        </a>
        <MobileMenu<NavItem> items={navItems} NavMenu={NavMenu} />
      </div>
    </div>
  </Header>
);

export default SignedInHeader;
