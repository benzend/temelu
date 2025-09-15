import { onCleanup, onMount } from "solid-js";
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
      owner: {
        name: "Mike Smith",
        username: "mikesmith",
        avatarUrl: "https://example.com/avatar.jpg",
      },
      content: "This is a reply",
      createdAt: new Date(),
    },
  ],
};

export const Post: Component = () => {
  const setupHotkeys = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    // Ignore if typing in an input or textarea
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    switch (event.key) {
      case "j":
        window.scrollBy({ top: 100, behavior: "smooth" });
        break;
      case "k":
        window.scrollBy({ top: -100, behavior: "smooth" });
        break;
      case "h":
        history.back();
        break;
      case "l":
        alert("Open post"); // Replace with your logic
        break;
      case "o":
        window.open("https://example.com/post", "_blank"); // Replace with dynamic post URL
        break;
      case "r":
        alert("Reply to post"); // Replace with your logic
        break;
      case "c":
        alert("Compose new post"); // Replace with your logic
        break;
      case "f":
        alert("Search"); // Replace with your logic
        break;
    }
  };

  onMount(() => {
    document.addEventListener("keydown", setupHotkeys);
  });

  onCleanup(() => {
    document.removeEventListener("keydown", setupHotkeys);
  });
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen">
      <div class="max-w-7xl mx-auto">
        <div class="border-b-2 border-zinc-800 pl-4 py-2">
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
          <p class="text-zinc-300 mt-2 text-sm">
            {post.replies.length} reply{post.replies.length === 1 ? '' : 's'}
          </p>
        </div>
        {post.replies.map(reply => (
          <a href={`/posts/${reply.id}`} class="cursor-pointer">
            <div class="border-b-2 border-zinc-800 pl-4 py-2 text-sm">
              <cite class="text-amber-600">{reply.owner.name}</cite>
              <cite class="text-zinc-500 ml-2">@{reply.owner.username}</cite>
              <p class="text-zinc-300">{reply.content}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
