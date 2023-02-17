import { useMediaQuery } from 'usehooks-ts';
import {
  CalendarIcon,
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import SignedInHeader from '@/components/Header/SignedInHeader';
import Sidebar from '@/components/Sidebar';
import type { NavItem } from '@/components/Header/SignedInHeader';

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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMD = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {!isMD && <SignedInHeader />}
      {isMD && <Sidebar items={navItems} />}

      <div className='py-8 md:ml-72'>
        <div className='container md:px-8'>{children}</div>
      </div>
    </>
  );
};

export default Layout;
