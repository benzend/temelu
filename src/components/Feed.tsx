import { Component } from "solid-js/types/server/rendering.js"

const POSTS = [
  {
    id: 1,
    content: "This is a test post",
    createdAt: new Date(),
    owner: {
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://example.com/avatar.jpg",
    },
    replies: [
      {
        id: 1,
        content: "This is a reply",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 2,
    content: "This is a test post",
    createdAt: new Date(),
    owner: {
      name: "Ben Smith",
      username: "bensmith",
      avatarUrl: "https://example.com/avatar.jpg",
    },
    replies: [
      {
        id: 1,
        content: "This is a reply",
        createdAt: new Date(),
      },
    ],
  },
];

export const Feed: Component = () => {
  return (
    <div class="mx-auto">
      {POSTS.map(post => (
        <FeedPost post={post} />
      ))}
    </div>
  )
}

const FeedPost: Component<{ post: typeof POSTS[0] }> = ({ post }) => {
  return (
    <a href={`/posts/${post.id}`} class="cursor-pointer">
      <div class="border-l-2 border-b-2 border-zinc-800 pl-4 py-2 text-sm">
        <cite class="text-amber-600">{post.owner.name}</cite>
        <cite class="text-zinc-500 ml-2">@{post.owner.username}</cite>
        <p class="text-zinc-300">{post.content}</p>
      </div>
    </a>
  )
}
