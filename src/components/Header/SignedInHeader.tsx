import Header from '@/components/Header/Header';
import MobileMenu from '@/components/Header/MobileMenu';
import {
  ChartPieIcon,
  ClockIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

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

type NavListProps = {
  items: NavItem[];
  onNavItemClick?: () => void;
};

const NavList: React.FC<NavListProps> = ({ items }) => (
  <ul className='absolute top-full left-0 flex w-full flex-col items-stretch gap-3 bg-white px-2 py-8 text-center'>
    {items.map(({ label, url, icon }) => (
      <li key={label} className='group relative'>
        <a href={url} className='flex items-center justify-center gap-4 p-2'>
          {icon} {label}
        </a>
      </li>
    ))}
  </ul>
);

const SignedInHeader = () => (
  <Header>
    <div className='container relative'>
      <div className='flex items-center justify-between gap-4 py-6'>
        <a href='/dashboard' className='text-2xl font-bold'>
          Dashboard
        </a>
        <MobileMenu<NavItem> items={navItems} NavMenu={NavList} />
      </div>
    </div>
  </Header>
);

export default SignedInHeader;
