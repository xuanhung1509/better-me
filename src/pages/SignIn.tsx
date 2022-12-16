import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '@/assets/images/google.svg';
import facebookIcon from '@/assets/images/facebook.svg';
import discordIcon from '@/assets/images/discord.svg';

type SocialLink = {
  icon: string;
  alt: string;
};

const socialLinks: SocialLink[] = [
  {
    icon: googleIcon,
    alt: 'google logo',
  },
  {
    icon: facebookIcon,
    alt: 'facebook logo',
  },
  {
    icon: discordIcon,
    alt: 'discord logo',
  },
];

type Input = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
};

const inputs: Input[] = [
  {
    label: 'Your email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Your password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
  },
];

const SignIn: React.FC = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    alert('Submitted!');
  };

  return (
    <section className='py-8'>
      <form
        className='mx-auto max-w-lg rounded bg-gray-800 px-16 py-8 text-white shadow'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-3xl font-bold'>
          Sign in to your Account
        </h1>
        <p className='mt-2 text-center text-gray-400'>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>

        <div className='mt-8'>
          <h2 className='text-center text-xl'>Sign in with Social Media</h2>
          <div className='mt-4 flex items-center justify-center gap-4'>
            {socialLinks.map(({ icon, alt }) => (
              <button
                key={alt}
                type='button'
                className='rounded-xl bg-white p-3 transition-shadow duration-300 hover:shadow-lg'
              >
                <img src={icon} alt={alt} className='h-7 w-7' />
              </button>
            ))}
          </div>
        </div>

        <div className='mt-8'>
          {inputs.map(({ label, type, id, placeholder }) => (
            <label key={id} htmlFor={id} className='mt-6 block'>
              <span className='font-bold'>{label}</span>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className='outline-bm-green mt-2 w-full rounded-md px-4 py-3 text-black focus:outline-green-500'
              />
            </label>
          ))}
          <button
            type='submit'
            className='mt-6 w-full rounded bg-green-500 px-6 py-3 text-white'
          >
            Sign In
          </button>
        </div>
        <small className='mt-6 block text-center text-sm'>
          Don&apos;t have an account?
          <Link to='/sign-up' className='ml-1 inline-block text-green-500'>
            Sign Up
          </Link>
        </small>
      </form>
    </section>
  );
};
export default SignIn;
