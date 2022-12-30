import { useLockedBody } from 'usehooks-ts';
import { Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';

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

  const transition = {
    type: 'spring',
    mass: 0.1,
    stiffness: 150,
  };

  return (
    <>
      <Popover.Button className='relative z-20 rounded-full p-2 transition-colors hover:bg-slate-100 active:bg-slate-200'>
        {open ? (
          <XMarkIcon className='h-6 w-6' />
        ) : (
          <Bars3Icon className='h-6 w-6' />
        )}
      </Popover.Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <Popover.Overlay static className='fixed inset-0 bg-black/30' />
            </motion.div>

            <Popover.Panel
              static
              className='absolute top-0 right-0 h-screen w-3/4 overflow-x-hidden'
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={transition}
              >
                <NavMenu items={items} onNavItemClick={close} />
              </motion.div>
            </Popover.Panel>
          </>
        )}
      </AnimatePresence>
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
