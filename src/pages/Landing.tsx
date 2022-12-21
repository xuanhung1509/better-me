import { UserGroupIcon } from '@heroicons/react/24/solid';

import { GuestHeader } from '@/components';
import build from '@/assets/images/illustrations/build.png';
import productLaunch from '@/assets/images/illustrations/product-launch.png';

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
      'Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau. BetterMe là nơi những người bạn đồng hành chia sẻ, giúp đỡ lẫn nhau trong học tập và muôn vàn những chủ đề khác trong cuộc sống',
  },
];

const Landing = () => (
  <>
    <GuestHeader />
    <main>
      <section id='hero' className='mt-8 py-8'>
        <div className='container'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
            <div className='flex flex-col items-center gap-6 text-center md:items-start md:text-left'>
              <h1 className='text-4xl font-bold'>BetterMe bởi Tạ Minh Khôi</h1>
              <p>
                BetterMe là một cộng đồng nơi những người trẻ gọi nhau dậy, học
                cùng nhau, chia sẻ (lan tỏa) nhiệt huyết và năng lượng, cùng
                nhau giải trí sau những giờ học căng thẳng, tâm sự với nhau về
                muôn vàn chủ đề trong cuộc sống.
              </p>
              <button
                type='button'
                className='rounded bg-gray-700 px-4 py-2 text-white'
              >
                Tạo tài khoản
              </button>
            </div>
            <figure className='mx-auto max-w-md p-12 md:max-w-lg'>
              <img src={productLaunch} alt='' />
            </figure>
          </div>
        </div>
      </section>
      <section id='features' className='mt-8 py-8'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-lg bg-white px-10 py-8 shadow'
              >
                <div className='inline-block rounded-full bg-green-200 p-2 text-green-500'>
                  <UserGroupIcon className='h-6 w-6' />
                </div>
                <h2 className='mt-2 text-2xl font-bold'>{feature.title}</h2>
                <p className='mt-4'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id='about' className='mt-8 py-8'>
        <div className='container'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
            <figure className='mx-auto max-w-md p-8 md:max-w-lg'>
              <img src={build} alt='' />
            </figure>
            <div className=''>
              <h2 className='text-2xl font-bold'>Về Better Me</h2>
              <p className='mt-8'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Maiores asperiores at esse quasi, itaque ratione consequatur
                recusandae consectetur iste quae voluptas voluptatibus nihil
                optio veniam perferendis tempora repudiandae nisi neque.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-8 bg-green-500 py-16'>
        <div className='container'>
          <div className='flex flex-col items-center justify-between gap-8 px-8 md:flex-row'>
            <h2 className='text-center text-3xl font-bold text-white'>
              Start learning with your community today.
            </h2>
            <button
              type='button'
              className='rounded-lg bg-white px-8 py-3 text-lg'
            >
              Get started
            </button>
          </div>
        </div>
      </section>
    </main>
    <footer className='bg-gray-700 py-8 text-white'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:gap-4 md:text-left'>
          <div className='flex flex-col'>
            <a href='/' className='text-2xl font-bold'>
              Better Me
            </a>
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-bold'>Thông tin</h3>
            <span>Về Better Me</span>
            <span>Cộng đồng</span>
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-bold'>Điều khoản</h3>
            <span>Điều khoản sử dụng</span>
            <span>Chính sách bảo mật</span>
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-bold'>Liên hệ</h3>
            <span>Hỗ trợ</span>
            <span>Góp ý</span>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Landing;
