import { Fragment, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

import { Layout } from '@/components';
import classnames from '@/utils/classnames';

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-11T13:00',
    endDatetime: '2022-05-11T14:30',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T09:00',
    endDatetime: '2022-05-20T11:30',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:00',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-09T13:00',
    endDatetime: '2022-06-09T14:30',
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-13T14:00',
    endDatetime: '2022-05-13T14:30',
  },
  {
    id: 6,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 7,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 8,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 9,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 10,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 11,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 12,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-12-20T17:30',
    endDatetime: '2022-05-20T18:30',
  },
];

type MeetingProps = {
  meeting: {
    id: number;
    name: string;
    imageUrl: string;
    startDatetime: string;
    endDatetime: string;
  };
};

const Meeting = ({ meeting }: MeetingProps) => {
  const startDateTime = parseISO(meeting.startDatetime);
  const endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className='group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100'>
      <img
        src={meeting.imageUrl}
        alt=''
        className='h-10 w-10 flex-none rounded-full'
      />
      <div className='flex-auto'>
        <p className='text-gray-900'>{meeting.name}</p>
        <p className='mt-0.5'>
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as='div'
        className='relative opacity-0 focus-within:opacity-100 group-hover:opacity-100'
      >
        <div>
          <Menu.Button className='-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600'>
            <span className='sr-only'>Open options</span>
            <EllipsisVerticalIcon className='h-6 w-6' aria-hidden='true' />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classnames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full px-4 py-2 text-left text-sm',
                    )}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classnames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full px-4 py-2 text-left text-sm',
                    )}
                  >
                    Cancel
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
};

const Planner = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currMonth, setCurrMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayOfCurrMonth = parse(currMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrMonth, {
      weekStartsOn: 1,
    }),
    end: endOfWeek(endOfMonth(firstDayOfCurrMonth), {
      weekStartsOn: 1,
    }),
  });

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay),
  );

  const viewPrevMonth = () => {
    const firstDayOfPrevMonth = addMonths(firstDayOfCurrMonth, -1);
    setCurrMonth(format(firstDayOfPrevMonth, 'MMM-yyyy'));
  };

  const viewNextMonth = () => {
    const firstDayOfNextMonth = addMonths(firstDayOfCurrMonth, 1);
    setCurrMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
  };

  return (
    <Layout>
      <div className='pt-16'>
        <div className='mx-auto max-w-md px-4 sm:px-7 lg:max-w-4xl lg:px-6'>
          <div className='lg:grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200'>
            <div className='lg:pr-14'>
              <div className='flex items-center'>
                <h2 className='flex-auto font-semibold text-gray-900'>
                  {format(firstDayOfCurrMonth, 'MMMM yyyy')}
                </h2>
                <button
                  type='button'
                  onClick={viewPrevMonth}
                  className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                >
                  <span>
                    <ChevronLeftIcon className='h-5 w-5' />
                  </span>
                </button>
                <button
                  type='button'
                  onClick={viewNextMonth}
                  className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                >
                  <span>
                    <ChevronRightIcon className='h-5 w-5' />
                  </span>
                </button>
              </div>
              <div className='mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500'>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className='mt-2 grid grid-cols-7 text-sm'>
                {days.map((day) => (
                  <div key={String(day)} className={classnames('py-1.5')}>
                    <button
                      type='button'
                      onClick={() => setSelectedDay(day)}
                      className={classnames(
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-red-500',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayOfCurrMonth) &&
                          'text-gray-900',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayOfCurrMonth) &&
                          'text-gray-400',
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'bg-red-500',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                      )}
                    >
                      <time dateTime={format(day, 'dd-MM-yyyy')}>
                        {format(day, 'd')}
                      </time>
                    </button>

                    <div className='mx-auto mt-1 h-1 w-1'>
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day),
                      ) && (
                        <div className='h-full w-full rounded-full bg-sky-500' />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className='mt-2 lg:mt-0 lg:pl-14'>
              <h2 className='font-semibold text-gray-900'>
                Schedule for{' '}
                <time dateTime={format(selectedDay, 'dd-MM-yyyy')}>
                  {format(selectedDay, 'MMM dd, yyyy')}
                </time>
              </h2>
              <ol className='mt-4 max-h-72 space-y-1 overflow-y-auto text-sm leading-6 text-gray-500'>
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting key={meeting.id} meeting={meeting} />
                  ))
                ) : (
                  <p>No meetings for today</p>
                )}
              </ol>
              <button
                type='button'
                className='mx-auto mt-4 flex items-center gap-4 rounded-xl bg-slate-500 px-4 py-2 text-white'
              >
                Create meeting
                <PlusIcon className='h-4 w-4' />
              </button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
