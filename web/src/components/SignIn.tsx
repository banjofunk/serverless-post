import type { Component } from 'solid-js';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
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

  const signOut = () => {
    setLoading(true);
    Auth.signOut();
  };

  return (
    <div>
      {!user() && !loading() && (
        <div className="p-2">
          <button
            type="button"
            className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200"
            onClick={() => signIn('Google')}
          >
            Open Google
          </button>
          <button
            type="button"
            className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200"
            onClick={() => signIn('Amazon')}
          >
            Open Amazon
          </button>
        </div>
      )}
      {user() && !loading() && (
        <div className="p-2 flex flex-col justify-center space-y-2">
          <button type="button" className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
      {loading() && (
        <div className="p-2 flex flex-col justify-center space-y-2">
          <img src={logo} className="h-20 animate-spin-slow" alt="logo" />
        </div>
      )}
    </div>
  );
};
