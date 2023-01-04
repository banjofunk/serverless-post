import type { Component } from 'solid-js';
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { Amplify, Auth, Hub, API } from 'aws-amplify';
import { SignIn } from './components';
import { getUser } from './graphql/queries';
import { User } from './models';
import awsExports from './aws-exports';

const [localRedirectSignIn, productionRedirectSignIn] = awsExports.oauth.redirectSignIn.split(',');
const [localRedirectSignOut, productionRedirectSignOut] = awsExports.oauth.redirectSignOut.split(',');

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
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

interface CognitoToken {
  signInUserSession: {
    idToken: {
      payload: {
        userId: string;
      };
    };
  };
}

interface GetUserResponse {
  data: {
    getUser: User;
  };
}

interface HubAuthEvent {
  payload: {
    event: string;
    data: object;
  };
}

const App: Component = () => {
  const [user, setUser] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    let mounted = true;
    const parseToken = (data) => {
      if (!user()) setLoading(true);
      const { signInUserSession: { idToken: { payload: { userId } = {} } = {} } = {} }: CognitoToken = data;

      API.graphql({ query: getUser, variables: { id: userId } })
        .then(({ data: { getUser: resp } = {} }: GetUserResponse) => resp)
        .then((usr) => {
          if (mounted) {
            setUser(usr);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    };

    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }: HubAuthEvent) => {
      switch (event) {
        case 'signIn':
          parseToken(data);
          break;
        case 'signOut':
          setUser(false);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(parseToken)
      .catch(() => {
        setLoading(false);
        console.log('Not signed in');
      });

    onCleanup(() => {
      mounted = false;
      unsubscribe();
    });
  });

  createEffect(() => {
    const usr = user();

    if (usr) console.log('user', usr);
  });

  return (
    <div>
      <header className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-800">
        <SignIn user={user} loading={loading} setLoading={setLoading} />
      </header>
    </div>
  );
};

export default App;
