import {
  CalendarIcon,
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

import Header from '@/components/Header/Header';
import MobileMenu from '@/components/Header/MobileMenu';

interface NavItem {
  label: string;
  url: string;
  icon: JSX.Element;
}

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

const NavMenu = ({ items }: { items: NavItem[] }) => (
  <ul className='absolute top-0 right-0 flex h-screen w-full flex-col gap-1 bg-white px-2 pb-8 pt-24'>
    {items.map(({ label, url, icon }) => (
      <li key={label} className='rounded-lg active:bg-red-200'>
        <a href={url} className='mx-auto flex w-40 items-center gap-4 p-3'>
          {icon} {label}
        </a>
      </li>
    ))}
  </ul>
);

const SignedInHeader = () => (
  <Header>
    <div className='container'>
      <div className='flex items-center justify-between gap-4 py-3'>
        <a href='/dashboard' className='text-xl font-bold'>
          Dashboard
        </a>
        <MobileMenu<NavItem> items={navItems} NavMenu={NavMenu} />
      </div>
    </div>
  </Header>
);

export type { NavItem };
export default SignedInHeader;
