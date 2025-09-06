import { Component } from "solid-js/types/server/rendering.js";

const post = {
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
};

export const Post: Component = () => {
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen">
      <div class="max-w-7xl mx-auto">
        <div class="border-l-2 border-b-2 border-zinc-800 pl-4 py-2">
          <a href="javascript:history.back()" class="cursor-pointer flex items-center text-zinc-300 -ml-1 mb-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>

          <cite class="text-amber-600">{post.owner.name}</cite>
          <cite class="text-zinc-500 ml-2">@{post.owner.username}</cite>
          <p class="text-zinc-300">{post.content}</p>
          <time class="text-zinc-500 text-sm">{post.createdAt.toLocaleString()}</time>
        </div>
      </div>
    </div>
   )
}
