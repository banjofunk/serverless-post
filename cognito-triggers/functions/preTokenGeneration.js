import { appsyncClient } from 'service-helpers/appsyncClient';
import listUserByEmail from '../graphql/listUserByEmail.graphql';
import createUser from '../graphql/createUser.graphql';

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const { userAttributes: { email, identities } = {} } = event.request || {};
  const { userName } = event || {};
  const providers = identities ? JSON.parse(identities) : [];
  const provider =
    providers.find((prov) => {
      const key = (prov.userId || '').toLocaleLowerCase();

      return userName.includes(key);
    }) || {};
  const fullProviderName = provider.providerName || 'Cognito';
  const { [fullProviderName]: providerName = fullProviderName } = {
    LoginWithAmazon: 'Amazon',
  };
  const client = await appsyncClient.hydrated();

  // create a User if email is not already in use
  const skipOrCreateUser = (usr) => {
    if (usr) return usr;

    return client
      .mutate({
        mutation: createUser,
        fetchPolicy: 'no-cache',
        variables: { input: { email } },
      })
      .then(({ data: { createUser: resp } }) => resp || false);
  };

  // find or create user and update providerId if needed
  const user = await client
    .query({ query: listUserByEmail, fetchPolicy: 'network-only', variables: { email } })
    .then(({ data: { listUserByEmail: { items: [resp] = [] } } = {} }) => resp || false)
    .then(skipOrCreateUser);

  console.log('user', user);

  const claimsToAddOrOverride = { providerName, userId: user.id };
  const userAuthGroup = `${user.id}:user`;
  const groupsToOverride = [userAuthGroup];

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride,
      groupOverrideDetails: {
        groupsToOverride,
      },
    },
  };

  return event;
};
