import type { Component } from 'solid-js';
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { Amplify, Auth, Hub, API } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { getUser } from './graphql/queries';
import awsExports from './aws-exports';

import logo from './logo.svg';
import styles from './App.module.css';

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] = awsExports.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, productionRedirectSignOut] = awsExports.oauth.redirectSignOut.split(',');

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const updatedAwsExports = {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsExports);

const App: Component = () => {
  const [user, setUser] = createSignal(false);

  createEffect(() => {
    let mounted = true;
    const parseToken = (data) => {
      const { signInUserSession: { idToken: { payload: { userId } = {} } = {} } = {} } = data;

      API.graphql({ query: getUser, variables: { id: userId } })
        .then(({ data: { getUser: resp } = {} }) => resp)
        .then((usr) => mounted && setUser(usr));
    };

    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('signIn data', data);
          parseToken(data);
          break;
        case 'signOut':
          setUser(false);
          break;
        case 'customOAuthState':
          console.log('data', data);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(parseToken)
      .catch(() => console.log('Not signed in'));

    onCleanup(() => {
      mounted = false;
      unsubscribe();
    });
  });

  createEffect(() => {
    console.log('usr', user());
  });

  return (
    <div className={styles.App}>
      <header className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-800">
        <img src={logo} className="h-20 animate-spin-slow" alt="logo" />
        <div className="p-2">
          <button
            type="button"
            className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200"
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
          >
            Open Google
          </button>
          <button
            type="button"
            className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200"
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon })}
          >
            Open Amazon
          </button>
          <button
            type="button"
            className="rounded w-32 m-2 p-2 bg-blue-300 hover:bg-blue-200"
            onClick={() => Auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
