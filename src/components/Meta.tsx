import Head from 'next/head';

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta = ({
  title = 'Better Me - Cùng nhau học',
  description = 'Cộng đồng học tập và giải trí giới trẻ - Better Me',
}: MetaProps) => (
  <Head>
    <meta charSet='utf-8' />
    <link rel='icon' type='image/svg+xml' href='/vite.svg' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <title>{title}</title>
    <meta name='description' content={description} key='description' />
  </Head>
);

export default Meta;
