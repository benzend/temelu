import { Component } from "solid-js/types/server/rendering.js"

export const Learn: Component = () => {
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen">
      <main class="max-w-4xl px-2 py-2 prose text-zinc-300 mx-auto">
        <a href="javascript:history.back()" class="cursor-pointer flex items-center text-zinc-300 -ml-1 mb-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </a>

        <a href="/"><h1 class="text-amber-600">Temelu</h1></a>

        <h2 class="text-amber-600">What is Temelu?</h2>
        <p>Temelu is a minimal OSS social media platform for programmers.</p>
        <p>It's built with SolidJS, TypeScript, Solid Router, and soon OCaml.</p>
        <p>It's open source and available on <a href="https://github.com/benzend/temelu" class="text-amber-600">GitHub</a>.</p>

        <h2 class="text-amber-600">Why Temelu?</h2>
        <p>Social media platforms are run by crazy, politically and monetarily motivated people that don't really care about the users.</p>
        <p>That's why Temelu is built with a focus on simplicity and ease of use.</p>
        <p>It's also built with a focus on community and collaboration, performance and privacy (where it matters, your posts are public, your messages shouldn't be).</p>

        <h2 class="text-amber-600">How Temelu works?</h2>
        <p>Temelu is a single-page application (SPA) built with SolidJS and Solid Router.</p>
        <p>It uses TailwindCSS for styling and Vite for bundling.</p>
        <p>OCaml is used for the backend. Low memory usage (eco+) is a priority.</p>
      </main>
    </div>
  )
}
