import { Component } from "solid-js/types/server/rendering.js";
import { Feed } from "./components/Feed";
import { Shortcuts } from "./components/Shortcuts";

export const Home: Component = () => {
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen">
      <div class="max-w-7xl mx-auto lg:grid lg:grid-cols-3">
        <aside class="hidden lg:block">
          <Shortcuts />
        </aside>
        <main>
          <Feed />
        </main>
      </div>
    </div>
   )
}


