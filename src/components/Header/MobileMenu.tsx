import { useLockedBody } from 'usehooks-ts';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

type PopoverContentProps<T> = MobileMenuProps<T> & {
  open: boolean;
  close: (
    focusableElement?:
      | HTMLElement
      | React.MutableRefObject<HTMLElement | null>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | undefined,
  ) => void;
};

const PopoverContent = <T,>({
  open,
  close,
  items,
  NavMenu,
}: PopoverContentProps<T>) => {
  useLockedBody(open, 'root');

  return (
    <>
      <Popover.Button className='relative z-20 rounded-full p-2 transition-colors hover:bg-slate-100'>
        {open ? (
          <XMarkIcon className='h-6 w-6' />
        ) : (
          <Bars3Icon className='h-6 w-6' />
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
        <Popover.Overlay className='fixed inset-0 bg-black/30' />
        <Popover.Panel>
          <NavMenu items={items} onNavItemClick={close} />
        </Popover.Panel>
      </Transition>
    </>
  );
};

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
      <PopoverContent<T> {...{ open, close, items, NavMenu }} />
    )}
  </Popover>
);

export default MobileMenu;
