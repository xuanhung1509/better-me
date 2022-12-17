import React, { Fragment, useEffect } from 'react';
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
  name: string;
  email: string;
  password: string;
  password2: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    getValues,
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
      label: 'Your name',
      type: 'text',
      id: 'name',
      placeholder: 'Enter your name',
      registerInput: register('name', {
        required: true,
        validate: (value) => value.length < 30,
      }),
      inputErrors: [
        {
          type: 'required',
          message: 'This field is required.',
        },
      ],
    },
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
    {
      label: 'Confirm your password',
      type: 'password',
      id: 'password2',
      placeholder: 'Confirm your password',
      registerInput: register('password2', {
        required: true,
        validate: (value) => {
          const { password } = getValues();
          return password === value;
        },
      }),
      inputErrors: [
        {
          type: 'required',
          message: 'This field is required.',
        },
        {
          type: 'validate',
          message: 'Passwords not match.',
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
      <form
        className='mx-auto max-w-xl rounded bg-gray-800 px-16 py-8 text-white'
        onSubmit={handleSubmit(onSubmit)}
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
          {inputs.map(
            ({ label, type, id, placeholder, registerInput, inputErrors }) => (
              <Fragment key={id}>
                <label htmlFor={id} className='mt-6 block'>
                  <span className='font-bold'>{label}</span>
                  <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='mt-2 w-full rounded-md px-4 py-3 text-black focus:outline-green-500'
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...registerInput}
                  />
                </label>

                {inputErrors.map(
                  (err) =>
                    errors[id as keyof FormData]?.type === err.type && (
                      <small
                        key={`${id} ${err.type}`}
                        className='mt-2 block text-red-400'
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
