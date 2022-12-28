import { appsyncClient } from 'service-helpers/appsyncClient';
import getUserAuth from '../graphql/getUserAuth.graphql';
import createUser from '../graphql/createUser.graphql';
import updateUser from '../graphql/updateUser.graphql';

exports.handler = async event => {
  console.log(JSON.stringify(event));
  const { userAttributes: { email, identities } = {} } = event.request || {};
  const { userName } = event || {};
  const providers = identities ? JSON.parse(identities) : []
  const provider = providers.find(prov => {
    const key = (prov.userId || '').toLocaleLowerCase()
    return userName.includes(key)
  }) || {};
  const fullProviderName = provider.providerName || "Cognito";
  const { [fullProviderName]: providerName = fullProviderName } = {
    LoginWithAmazon: "Amazon"
  }
  const client = await appsyncClient.hydrated();

  // create a User if email is not already in use
  const skipOrCreateUser = usr => {
    if (usr) return usr;

    const input = { email }

    if (providerName === 'Amazon') input.amazonId = userName;
    if (providerName === 'Google') input.googleId = userName;
    if (providerName === 'Cognito') input.cognitoId = userName;

    return client.mutate({
      mutation: createUser,
      fetchPolicy: 'no-cache',
      variables: { input },
    }).then(({ data: { createUser: resp }}) => resp || false)
  }

  // update User if using a different auth provider
  const skipOrUpdateProviderId = usr => {
    const needsAmazon = providerName === 'Amazon' && !usr.amazonId;
    const needsGoogle = providerName === 'Google' && !usr.googleId;
    const needsCognito = providerName === 'Cognito' && !usr.cognitoId;
    const needsUpdate = needsAmazon || needsGoogle || needsCognito;

    if (!needsUpdate) return usr;

    const input = { id: usr.id }

    if (needsAmazon) input.amazonId = userName;
    if (needsGoogle) input.googleId = userName;
    if (needsCognito) input.cognitoId = userName;

    return client.mutate({
      mutation: updateUser,
      fetchPolicy: 'no-cache',
      variables: { input },
    }).then(({ data: { updateUser: resp }}) => resp || false)
  }

  // find or create user and update providerId if needed
  const user = await client
    .query({ query: getUserAuth, fetchPolicy: 'network-only', variables: { email } })
    .then(({ data: { listUserByEmail: { items: [resp] = [] } } = {} }) => resp || false)
    .then(skipOrCreateUser)
    .then(skipOrUpdateProviderId)

  console.log('user', user)

  const claimsToAddOrOverride = { providerName, userId: user.id }

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride
    },
  };

  return event;
};
