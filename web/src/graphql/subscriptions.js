/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      userPostsId
      authGroups
      createdAt
      updatedAt
      lambdaInvokedAt
      title
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      userPostsId
      authGroups
      createdAt
      updatedAt
      lambdaInvokedAt
      title
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      userPostsId
      authGroups
      createdAt
      updatedAt
      lambdaInvokedAt
      title
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
