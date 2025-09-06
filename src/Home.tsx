import { Component } from "solid-js/types/server/rendering.js";
import { Feed } from "./components/Feed";
import { Shortcuts } from "./components/Shortcuts";

export const Home: Component = () => {
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen">
      <div class="max-w-7xl mx-auto flex">
        <aside class="hidden lg:block w-60">
          <Shortcuts />
        </aside>
        <main class="w-full lg:w-180">
          <Feed />
        </main>
        <div>
        </div>
      </div>
    </div>
   )
}


