/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const invokeLambda = /* GraphQL */ `
  mutation InvokeLambda($postId: ID) {
    invokeLambda(postId: $postId) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
