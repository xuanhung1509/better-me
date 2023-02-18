import Link from 'next/link';
import classnames from '@/utils/classnames';
import type { NavItem } from '@/components/Header/SignedInHeader';

const Sidebar = ({ items }: { items: NavItem[] }) => (
  <nav className='fixed top-0 left-0 h-screen w-72 bg-slate-300 p-8 '>
    <Link href='/dashboard'>
      <h1 className='text-2xl font-bold'>BetterMe</h1>
    </Link>
    <ul className='mt-8 flex flex-col gap-1'>
      {items.map(({ label, url, icon }) => (
        <li key={label}>
          <Link
            href={url}
            className={classnames(
              'flex items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-400 hover:text-white',
              url === '/dashboard' && 'bg-slate-800 text-white',
            )}
          >
            {icon} {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
