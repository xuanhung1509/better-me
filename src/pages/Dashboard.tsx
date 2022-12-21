import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import {
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

import SignedInHeader from '@/components/Header/SignedInHeader';

type SidebarProps = {
  items: Array<{
    label: string;
    url: string;
    icon: JSX.Element;
  }>;
};

const Sidebar = ({ items }: SidebarProps) => (
  <nav className='fixed top-0 left-0 h-screen w-72 bg-slate-300 p-8 '>
    <Link to='/dashboard'>
      <h1 className='text-2xl font-bold'>BetterMe</h1>
    </Link>
    <ul className='mt-8 flex flex-col gap-1'>
      {items.map(({ label, url, icon }) => (
        <li key={label}>
          <Link
            to={url}
            className={`flex items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-400 hover:text-white ${
              url === '/dashboard' && 'bg-slate-800 text-white'
            }`}
          >
            {icon} {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const Dashboard = () => {
  const navItems: Array<{
    label: string;
    url: string;
    icon: JSX.Element;
  }> = [
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
      label: 'Todo List',
      url: '/todolist',
      icon: <PencilSquareIcon className='h-6 w-6 flex-shrink-0' />,
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

  const isMD = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {!isMD && <SignedInHeader />}
      {isMD && <Sidebar items={navItems} />}

      <div className='py-8 md:ml-72'>
        <div className='container md:px-8'>
          <h2 className='text-3xl font-bold'>Hello, John</h2>
          <h3 className='mt-2 text-gray-400'>Can I tell you a secret?</h3>
          <div className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {[...Array(8).keys()].map((n) => (
              <div
                key={n}
                className='h-56 cursor-pointer rounded-md bg-slate-300 transition-colors hover:bg-slate-500 active:bg-slate-900'
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
