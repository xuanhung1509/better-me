import type { AppProps } from 'next/app';
import { Merriweather } from '@next/font/google';
import '@/styles.css';

const merriweather = Merriweather({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
});

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`${merriweather.variable}`}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </div>
);

export default App;
