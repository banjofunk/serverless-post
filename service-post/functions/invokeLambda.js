import { appsyncClient } from 'service-helpers/appsyncClient';

export const invokeLambda = async (event) => {
  console.log(JSON.stringify(event));
  const client = await appsyncClient.hydrated();

  console.log('client', client);

  return event;
};
