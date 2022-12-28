import AWS from 'aws-sdk';
import ws from 'ws';
import AWSAppSyncClient from 'aws-appsync';

// POLYFILLS
global.WebSocket = ws;
global.window = global.window || {
  setTimeout,
  clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener() {},
  navigator: { onLine: true },
};
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key];
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
};

require('es6-promise').polyfill();
require('isomorphic-fetch');

const appsyncClient = new AWSAppSyncClient({
  url: process.env.graphqlEndpoint,
  region: 'us-east-1',
  auth: {
    type: 'AWS_IAM',
    credentials: AWS.config.credentials,
  },
  disableOffline: true,
});

const getClient = (url = process.env.graphqlEndpoint) =>
  new AWSAppSyncClient({
    url,
    region: 'us-east-1',
    auth: {
      type: 'AWS_IAM',
      credentials: AWS.config.credentials,
    },
    disableOffline: true,
  });

export { appsyncClient, getClient };
