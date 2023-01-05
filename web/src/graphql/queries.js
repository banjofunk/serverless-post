/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      authGroups
      createdAt
      updatedAt
      firstName
      lastName
      profileImageUrl
      email
      posts {
        items {
          id
          userPostsId
          authGroups
          createdAt
          updatedAt
          lambdaInvokedAt
          body
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authGroups
        createdAt
        updatedAt
        firstName
        lastName
        profileImageUrl
        email
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listUserByEmail = /* GraphQL */ `
  query ListUserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        authGroups
        createdAt
        updatedAt
        firstName
        lastName
        profileImageUrl
        email
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      userPostsId
      authGroups
      createdAt
      updatedAt
      lambdaInvokedAt
      body
      user {
        id
        authGroups
        createdAt
        updatedAt
        firstName
        lastName
        profileImageUrl
        email
        posts {
          nextToken
        }
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userPostsId
        authGroups
        createdAt
        updatedAt
        lambdaInvokedAt
        body
        user {
          id
          authGroups
          createdAt
          updatedAt
          firstName
          lastName
          profileImageUrl
          email
        }
      }
      nextToken
    }
  }
`;
