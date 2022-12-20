import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

type MobileMenuProps<T> = {
  items: T[];
  NavMenu: React.FC<{
    items: T[];
    onNavItemClick?: () => void;
  }>;
};

const MobileMenu = <T,>({ items, NavMenu }: MobileMenuProps<T>) => (
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
            <NavMenu items={items} onNavItemClick={close} />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default MobileMenu;
