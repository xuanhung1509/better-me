import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '@/assets/images/google.svg';
import facebookIcon from '@/assets/images/facebook.svg';
import discordIcon from '@/assets/images/discord.svg';

const socialLinks = [
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

const inputs = [
  {
    label: 'Your name',
    type: 'text',
    id: 'name',
    placeholder: 'Enter your name',
  },
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
  {
    label: 'Confirm your password',
    type: 'password',
    id: 'password2',
    placeholder: 'Confirm your password',
  },
];

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    alert('Submitted!');
  };

  return (
    <section className='py-8'>
      <form
        className='mx-auto max-w-xl rounded bg-gray-800 px-16 py-8 text-white'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-3xl font-bold'>Create an Account</h1>
        <p className='mt-2 text-center text-gray-400'>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>

        <div className='mt-8'>
          <h2 className='text-center text-xl'>Sign up with Social Media</h2>
          <div className='mt-4 flex items-center justify-center gap-4'>
            {socialLinks.map(({ icon, alt }) => (
              <button
                key={alt}
                type='button'
                className='rounded-xl bg-white p-3'
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
                className='mt-2 w-full rounded-md px-4 py-3 text-black focus:outline-green-500'
              />
            </label>
          ))}
          <button
            type='submit'
            className='mt-6 w-full rounded bg-green-500 px-6 py-3 text-white'
          >
            Sign Up
          </button>
        </div>
        <small className='mt-6 block text-center text-sm'>
          Already have an account?
          <Link to='/sign-in' className='ml-1 inline-block text-green-500'>
            Sign In
          </Link>
        </small>
      </form>
    </section>
  );
};
export default SignUp;
