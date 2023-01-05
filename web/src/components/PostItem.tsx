import type { Component } from 'solid-js';
import format from 'date-fns/format';
import { Post } from '../models';

interface PostItemProps {
  post: Post;
  removePost: Function;
  invokeLambdaForPost: Function;
}

export const PostItem: Component = ({ post, removePost, invokeLambdaForPost }: PostItemProps) => {
  const date = () => format(new Date(post.createdAt), 'Pp');
  const lambdaDate = () =>
    post.lambdaInvokedAt ? `lambda invoked: ${format(new Date(post.lambdaInvokedAt), 'Pp')}` : 'click to invoke lambda';

  return (
    <div className="flex flex-col rounded bg-white p-2">
      <div className="flex justify-end w-full">
        <span className="text-sm text-gray-500">{date()}</span>
      </div>
      <pre className="text-lg font-sans whitespace-pre-wrap">{post.body}</pre>
      <div className="flex justify-between items-end w-full space-x-1">
        <span className="text-sm text-gray-500">{lambdaDate()}</span>
        <div className="flex space-x-1">
          <button
            type="button"
            className="h-8 px-2 rounded bg-sky-600 hover:bg-sky-500 text-white"
            onClick={() => invokeLambdaForPost(post?.id)}
          >
            Invoke Lambda
          </button>
          <button
            type="button"
            className="h-8 px-2 rounded bg-red-500 hover:bg-red-400 text-white"
            onClick={() => removePost(post?.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
