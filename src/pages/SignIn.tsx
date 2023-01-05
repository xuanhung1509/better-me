import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import googleIcon from '@/assets/images/google.svg';
import facebookIcon from '@/assets/images/facebook.svg';
import discordIcon from '@/assets/images/discord.svg';

const socialLinks: Array<{
  icon: string;
  alt: string;
}> = [
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

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const inputs: Array<{
    label: string;
    type: string;
    id: string;
    placeholder: string;
    registerInput: UseFormRegisterReturn;
    inputErrors: Array<{
      type: 'required' | 'validate' | string;
      message: string;
    }>;
  }> = [
    {
      label: 'Your email',
      type: 'email',
      id: 'email',
      placeholder: 'Enter your email',
      registerInput: register('email', {
        required: true,
        validate: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          ),
      }),
      inputErrors: [
        {
          type: 'required',
          message: 'This field is required.',
        },
        {
          type: 'validate',
          message: 'Invalid email.',
        },
      ],
    },
    {
      label: 'Your password',
      type: 'password',
      id: 'password',
      placeholder: 'Enter your password',
      registerInput: register('password', {
        required: true,
        validate: (value) => value.length >= 8,
      }),
      inputErrors: [
        {
          type: 'required',
          message: 'This field is required.',
        },
        {
          type: 'validate',
          message: 'Password must be at least 8 characters.',
        },
      ],
    },
  ];

  const onSubmit = (data: FormData) => console.log(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className='py-8'>
      <div className='container'>
        <form
          className='mx-auto mt-4 max-w-md px-4 md:mt-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-center font-[Merriweather] text-2xl font-black leading-snug md:text-3xl'>
            Sign in to your Account
          </h1>
          <p className='mt-2 text-center text-gray-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>

          <div className='mt-8'>
            <h2 className='text-center text-lg md:text-xl'>
              Sign in with Social Media
            </h2>
            <div className='mt-4 flex items-center justify-center gap-4'>
              {socialLinks.map(({ icon, alt }) => (
                <button
                  key={alt}
                  type='button'
                  className='rounded-2xl border p-3 outline-none transition-shadow hover:border-yellow-500 hover:shadow-lg focus:outline-yellow-500'
                >
                  <img src={icon} alt={alt} className='h-7 w-7' />
                </button>
              ))}
            </div>
          </div>

          <div className='mt-8'>
            {inputs.map(
              ({
                label,
                type,
                id,
                placeholder,
                registerInput,
                inputErrors,
              }) => (
                <Fragment key={id}>
                  <label htmlFor={id} className='mt-6 block'>
                    <span className='font-bold'>{label}</span>
                    <input
                      type={type}
                      id={id}
                      placeholder={placeholder}
                      className='mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-none focus:outline-yellow-500'
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...registerInput}
                    />
                  </label>

                  {inputErrors.map(
                    (err) =>
                      errors[id as keyof FormData]?.type === err.type && (
                        <small
                          key={`${id} ${err.type}`}
                          className='mt-2 block text-red-600'
                        >
                          {err.message}
                        </small>
                      ),
                  )}
                </Fragment>
              ),
            )}

            <button
              type='submit'
              className='mt-6 w-full rounded-2xl bg-red-500 px-6 py-3 font-bold text-white outline-none hover:bg-red-300 focus:outline-yellow-500 active:bg-red-100'
            >
              Sign In
            </button>
          </div>
          <small className='mt-6 block text-center text-sm'>
            Don&apos;t have an account?
            <Link
              to='/sign-up'
              className='ml-1 inline-block text-red-500 outline-none focus:outline-yellow-500'
            >
              Sign Up
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
