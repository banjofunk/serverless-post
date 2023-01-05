import { appsyncClient } from 'service-helpers/appsyncClient';
import updatePost from '../graphql/updatePost.graphql';

export const invokeLambda = async (event) => {
  console.log(JSON.stringify(event));
  const { postId } = event.arguments;
  const client = await appsyncClient.hydrated();
  const input = { id: postId, lambdaInvokedAt: new Date().toISOString() };

  console.log('input', input);

  return client
    .mutate({ mutation: updatePost, fetchPolicy: 'no-cache', variables: { input } })
    .then(({ data: { updatePost: resp } }) => resp);
};
