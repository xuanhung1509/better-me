import { useMediaQuery } from 'usehooks-ts';
import {
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

import { Sidebar, SignedInHeader } from '@/components';

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
