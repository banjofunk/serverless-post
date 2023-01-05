import type { Component } from 'solid-js';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { AmazonIcon, GoogleIcon } from './icons';
import logo from '../logo.svg';

interface SignInProps {
  user: Function;
  loading: Function;
  setLoading: Function;
}

export const SignIn: Component = ({ user, loading, setLoading }: SignInProps) => {
  const signIn = (providerKey) => {
    setLoading(true);
    const provider = CognitoHostedUIIdentityProvider[providerKey];

    Auth.federatedSignIn({ provider });
  };

  return (
    <div>
      {!user() && !loading() && (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col w-72 p-2 space-y-2 rounded bg-white shadow text-center">
            <span className="text-lg text-gray-800 font-semibold">Serverless Post Example</span>
            <span className="text-base text-gray-800 pb-2">cognito with social sign in</span>
            <button
              type="button"
              className="flex justify-between items-center rounded w-full py-1 px-2 bg-sky-800 hover:bg-gray-400 text-blue-50 hover:text-gray-800"
              onClick={() => signIn('Google')}
            >
              <GoogleIcon className="w-8 h-8" />
              <span>Login with Google</span>
            </button>
            <button
              type="button"
              className="flex justify-between items-center rounded w-full py-1 px-2 bg-sky-800 hover:bg-gray-400 text-blue-50 hover:text-gray-800"
              onClick={() => signIn('Amazon')}
            >
              <AmazonIcon className="w-8 h-8" />
              <span>Login with Amazon</span>
            </button>
          </div>
        </div>
      )}
      {loading() && (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <div className="p-2 flex flex-col justify-center space-y-2">
            <img src={logo} className="h-20 animate-spin-slow" alt="logo" />
          </div>
        </div>
      )}
    </div>
  );
};
