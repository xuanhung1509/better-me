import { useMediaQuery } from 'usehooks-ts';
import { UserGroupIcon } from '@heroicons/react/24/solid';

import { GuestHeader } from '@/components';
import coffee from '@/assets/images/illustrations/coffee.svg';
import sprinting from '@/assets/images/illustrations/sprinting.gif';

const features = [
  {
    title: 'Học cùng nhau 24/7',
    description:
      'Với hơn 10.000 thành viên tới từ mọi miền đất nước, bạn sẽ không bao giờ phải học một mình.',
  },
  {
    title: 'Gần gũi, lành mạnh',
    description:
      'Được tạo nên bởi những con người thân thiện, BetterMe phù hợp với mọi lứa tuổi, màu da, văn hóa - nơi bạn được tự tin là chính mình.',
  },
  {
    title: 'Sát cánh',
    description:
      'BetterMe là nơi những người bạn đồng hành chia sẻ, giúp đỡ lẫn nhau trong học tập và muôn vàn những chủ đề khác trong cuộc sống.',
  },
];

const Landing = () => {
  const isMD = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <GuestHeader />
      <main>
        <section id='hero' className='py-8'>
          <div className='container'>
            <div className='grid grid-cols-1 items-center gap-4 md:gap-8'>
              <figure className='mx-auto max-w-sm px-6 md:max-w-md'>
                <img src={coffee} alt='' />
              </figure>
              <div className='mx-auto flex max-w-2xl flex-col items-center gap-6 text-center md:items-center md:text-center'>
                <h1 className='font-[Merriweather] text-3xl font-black leading-snug md:text-4xl md:leading-normal'>
                  {isMD ? (
                    'BetterMe bởi Tạ Minh Khôi'
                  ) : (
                    <>
                      BetterMe bởi
                      <div>Tạ Minh Khôi</div>
                    </>
                  )}
                </h1>
                <p className='text-lg text-gray-700'>
                  BetterMe là một cộng đồng nơi những người trẻ gọi nhau dậy,
                  học cùng nhau, chia sẻ (lan tỏa) nhiệt huyết và năng lượng,
                  cùng nhau giải trí sau những giờ học căng thẳng, tâm sự với
                  nhau về muôn vàn chủ đề trong cuộc sống.
                </p>
                <button
                  type='button'
                  className='rounded-2xl bg-red-500 px-8 py-3 text-lg font-bold text-white hover:bg-red-300 active:bg-red-100'
                >
                  Tạo tài khoản
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id='features' className='mt-8 py-8'>
          <div className='container'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className='rounded-3xl bg-red-100 px-10 pt-8 pb-10'
                >
                  <div className='inline-block rounded-2xl bg-red-200 p-2 text-red-500'>
                    <UserGroupIcon className='h-6 w-6' />
                  </div>
                  <h2 className='mt-2 text-xl font-bold text-red-700 md:text-2xl'>
                    {feature.title}
                  </h2>
                  <p className='mt-4 text-lg text-gray-900'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id='about' className='mt-8 py-8'>
          <div className='container'>
            <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
              <figure className='mx-auto max-w-md p-8 md:max-w-lg'>
                <img src={sprinting} alt='' />
              </figure>
              <div className=''>
                <h2 className='text-center font-[Merriweather] text-2xl font-black md:text-left md:text-3xl'>
                  Về Better Me
                </h2>
                <p className='mt-4 text-center text-lg text-gray-700 md:mt-8 md:text-left'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maiores asperiores at esse quasi, itaque ratione consequatur
                  recusandae consectetur iste quae voluptas voluptatibus nihil
                  optio veniam perferendis tempora repudiandae nisi neque.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='relative mt-8 overflow-hidden bg-red-500 py-16'>
          <span className='absolute top-20 left-24 scale-125 opacity-20'>
            <svg
              width='476'
              height='510'
              viewBox='0 0 476 510'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='307.232'
                y='-61'
                width='300.114'
                height='572.867'
                rx='150.057'
                transform='rotate(40 307.232 -61)'
                fill='#FECACA'
              />
            </svg>
          </span>
          <span className='absolute bottom-12 -right-56 opacity-20'>
            <svg
              width='476'
              height='510'
              viewBox='0 0 476 510'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='307.232'
                y='-61'
                width='300.114'
                height='572.867'
                rx='150.057'
                transform='rotate(40 307.232 -61)'
                fill='#FECACA'
              />
            </svg>
          </span>
          <div className='container relative'>
            <div className='flex flex-col items-center justify-between gap-8 px-8 md:flex-row'>
              <h2 className='text-center text-2xl font-bold text-white md:text-left md:text-3xl'>
                Start learning with your community today.
              </h2>
              <button
                type='button'
                className='rounded-2xl bg-white px-8 py-3 text-lg text-red-700 active:bg-red-200'
              >
                Get started
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className='bg-gray-900 py-6 text-center text-sm text-white md:text-base'>
        <div className='container'>
          BetterMe &copy; 2022. Thanks for scrolling.
        </div>
      </footer>
    </>
  );
};

export default Landing;
