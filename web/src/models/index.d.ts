import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly authGroups?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly profileImageUrl?: string | null;
  readonly email: string;
  readonly posts?: (Post | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly authGroups?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly profileImageUrl?: string | null;
  readonly email: string;
  readonly posts: AsyncCollection<Post>;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly authGroups?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly lambdaInvokedAt?: string | null;
  readonly title: string;
  readonly body?: string | null;
  readonly user?: User | null;
  readonly updatedAt?: string | null;
  readonly userPostsId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly authGroups?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly lambdaInvokedAt?: string | null;
  readonly title: string;
  readonly body?: string | null;
  readonly user: AsyncItem<User | undefined>;
  readonly updatedAt?: string | null;
  readonly userPostsId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}