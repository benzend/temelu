import { Component } from "solid-js/types/server/rendering.js";

export const Shortcuts: Component = () => {
  return (
    <ul>
      <li>j - Scroll down</li>
      <li>k - Scroll up</li>
      <li>h - Go back</li>
      <li>l - Open post</li>
      <li>o - Open post in new tab</li>
      <li>r - Reply to post</li>
      <li>c - Compose new post</li>
      <li>f - Search</li>
    </ul>
  );
}
