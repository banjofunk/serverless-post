import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { Auth, API } from 'aws-amplify';
import { createPost, deletePost, invokeLambda } from '../graphql/mutations';
import { Post } from '../models';
import { PostItem } from './PostItem';

interface MainProps {
  user: Function;
  loading: Function;
  setLoading: Function;
}

export const Main: Component = ({ user, loading, setLoading }: MainProps) => {
  const [body, setBody] = createSignal('');
  const [posts, setPosts] = createSignal([]);

  createEffect(() => {
    const userPosts = user()?.posts?.items || [];

    setPosts(userPosts);
  });

  const signOut = () => {
    setLoading(true);
    Auth.signOut();
  };

  const submitPost = () => {
    const post = new Post({ body: body(), userPostsId: user().id });

    API.graphql({ query: createPost, variables: { input: post } }).then(({ data: { createPost: resp } }) => {
      setPosts([...posts(), resp]);
      setBody('');
    });
  };

  const removePost = (id) => {
    API.graphql({ query: deletePost, variables: { input: { id } } }).then(({ data: { createPost: resp } }) => {
      setPosts(posts().filter((p) => p.id !== id));
    });
  };

  const invokeLambdaForPost = (id) => {
    API.graphql({ query: invokeLambda, variables: { postId: id } }).then(({ data: { invokeLambda: resp } }) => {
      setPosts(
        posts().map((p) => {
          if (p.id === resp?.id) return resp;

          return p;
        })
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {user() && !loading() && (
        <div className="p-2 flex flex-col w-full max-w-xl space-y-4 py-8">
          <h1 className="text-white text-xl text-center">Serverless Post Example</h1>
          <div className="flex justify-between items-center w-full">
            <span className="text-white">{user().email}</span>

            <button type="button" className="rounded w-32 px-2 py-1 bg-blue-300 hover:bg-blue-200" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <div className="border-t border border-white" />
          <div className="flex w-full space-x-2 items-center">
            <textarea
              autoFocus
              type="text"
              className="p-2 resize rounded flex-1"
              onChange={({ target: { value } }) => setBody(value)}
              value={body()}
            />
            <button type="button" className="w-32 h-16 py-1 rounded bg-blue-300 hover:bg-blue-200" onClick={submitPost}>
              Post
            </button>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <span className="text-white">My Posts</span>
            <div className="border-t border border-white" />
            {posts()
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((p) => (
                <PostItem post={p} removePost={removePost} invokeLambdaForPost={invokeLambdaForPost} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
