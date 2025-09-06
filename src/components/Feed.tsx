import { Component } from "solid-js/types/server/rendering.js"

const POSTS = [
  {
    id: 1,
    content: "This is a test post",
    createdAt: new Date(),
    owner: {
      name: "John Doe",
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
        <div class="border-l-2 border-b-2 border-zinc-800 pl-4 py-2">
          <cite class="text-amber-600">@{post.owner.name}</cite>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
