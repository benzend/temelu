import { createSignal, onCleanup, onMount, createEffect } from "solid-js";
import { Component } from "solid-js/types/server/rendering.js"

const POSTS = [
  {
    id: 1,
    content: "Just deployed my first SolidJS app! The reactivity system is amazing 🚀",
    createdAt: new Date("2024-01-15T08:30:00Z"),
    owner: {
      name: "Alex Chen",
      username: "alexdev",
      avatarUrl: "https://picsum.photos/seed/alex/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Congrats! SolidJS is fantastic",
        createdAt: new Date("2024-01-15T09:15:00Z"),
      },
    ],
  },
  {
    id: 2,
    content: "Anyone else obsessed with mechanical keyboards? Just got my first 65% and I'm in love",
    createdAt: new Date("2024-01-15T10:45:00Z"),
    owner: {
      name: "Sarah Johnson",
      username: "keycap_queen",
      avatarUrl: "https://picsum.photos/seed/sarah/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Which switches did you go with?",
        createdAt: new Date("2024-01-15T11:00:00Z"),
      },
    ],
  },
  {
    id: 3,
    content: "Hot take: TypeScript is just JavaScript with trust issues\n\n(I still love it though)",
    createdAt: new Date("2024-01-15T12:20:00Z"),
    owner: {
      name: "Marcus Rivera",
      username: "codewithmarc",
      avatarUrl: "https://picsum.photos/seed/marcus/40/40",
    },
    replies: [
      {
        id: 1,
        content: "This is both accurate and hilarious 😂",
        createdAt: new Date("2024-01-15T12:35:00Z"),
      },
    ],
  },
  {
    id: 4,
    content: "Working on a side project that converts design tokens to CSS variables. Open source coming soon!",
    createdAt: new Date("2024-01-15T14:10:00Z"),
    owner: {
      name: "Emma Thompson",
      username: "design_to_code",
      avatarUrl: "https://picsum.photos/seed/emma/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Would love to beta test this!",
        createdAt: new Date("2024-01-15T14:25:00Z"),
      },
    ],
  },
  {
    id: 5,
    content: "Just finished reading 'Clean Code' and my mind is blown. Refactoring everything now...",
    createdAt: new Date("2024-01-15T15:30:00Z"),
    owner: {
      name: "David Park",
      username: "cleancode_dave",
      avatarUrl: "https://picsum.photos/seed/david/40/40",
    },
    replies: [
      {
        id: 1,
        content: "That book changed how I write code forever",
        createdAt: new Date("2024-01-15T15:45:00Z"),
      },
    ],
  },
  {
    id: 6,
    content: "CSS Grid is magic ✨ Just built an entire layout without a single media query",
    createdAt: new Date("2024-01-15T16:50:00Z"),
    owner: {
      name: "Lisa Wang",
      username: "css_wizard",
      avatarUrl: "https://picsum.photos/seed/lisa/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Grid + container queries = future of CSS",
        createdAt: new Date("2024-01-15T17:05:00Z"),
      },
    ],
  },
  {
    id: 7,
    content: "Docker containers everywhere! My laptop is basically a small cloud now 🐳",
    createdAt: new Date("2024-01-15T18:15:00Z"),
    owner: {
      name: "James Wilson",
      username: "containerking",
      avatarUrl: "https://picsum.photos/seed/james/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Wait until you discover k8s...",
        createdAt: new Date("2024-01-15T18:30:00Z"),
      },
    ],
  },
  {
    id: 8,
    content: "Finally understanding monads in functional programming. My brain hurts but in a good way",
    createdAt: new Date("2024-01-15T19:40:00Z"),
    owner: {
      name: "Rachel Green",
      username: "fp_enthusiast",
      avatarUrl: "https://picsum.photos/seed/rachel/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Haskell next?",
        createdAt: new Date("2024-01-15T19:55:00Z"),
      },
    ],
  },
  {
    id: 9,
    content: "Debugging is like being a detective in a crime movie where you are also the murderer",
    createdAt: new Date("2024-01-15T20:25:00Z"),
    owner: {
      name: "Tom Anderson",
      username: "debugger_tom",
      avatarUrl: "https://picsum.photos/seed/tom/40/40",
    },
    replies: [
      {
        id: 1,
        content: "This hits too close to home 😅",
        createdAt: new Date("2024-01-15T20:40:00Z"),
      },
    ],
  },
  {
    id: 10,
    content: "Spent 3 hours optimizing a function that saves 2ms. Worth it? Absolutely.",
    createdAt: new Date("2024-01-15T21:10:00Z"),
    owner: {
      name: "Nina Patel",
      username: "perf_ninja",
      avatarUrl: "https://picsum.photos/seed/nina/40/40",
    },
    replies: [
      {
        id: 1,
        content: "The micro-optimization life chose us",
        createdAt: new Date("2024-01-15T21:25:00Z"),
      },
    ],
  },
  {
    id: 11,
    content: "Git commit messages as haikus:\n\nFixed the broken build\nTests were failing everywhere\nNow they pass with green",
    createdAt: new Date("2024-01-16T08:00:00Z"),
    owner: {
      name: "Kevin Liu",
      username: "git_poet",
      avatarUrl: "https://picsum.photos/seed/kevin/40/40",
    },
    replies: [
      {
        id: 1,
        content: "I'm stealing this format",
        createdAt: new Date("2024-01-16T08:15:00Z"),
      },
    ],
  },
  {
    id: 12,
    content: "TIL: You can use CSS :has() selector now. Browser support is finally here!",
    createdAt: new Date("2024-01-16T09:30:00Z"),
    owner: {
      name: "Sophie Martin",
      username: "modern_css",
      avatarUrl: "https://picsum.photos/seed/sophie/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Parent selectors are game changers",
        createdAt: new Date("2024-01-16T09:45:00Z"),
      },
    ],
  },
  {
    id: 13,
    content: "Building a habit tracker app with local-first architecture. IndexedDB is surprisingly nice to work with",
    createdAt: new Date("2024-01-16T11:20:00Z"),
    owner: {
      name: "Chris Brown",
      username: "local_first_dev",
      avatarUrl: "https://picsum.photos/seed/chris/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Check out Dexie.js for IndexedDB",
        createdAt: new Date("2024-01-16T11:35:00Z"),
      },
    ],
  },
  {
    id: 14,
    content: "Rust's borrow checker and I are in a complicated relationship. It's tough love.",
    createdAt: new Date("2024-01-16T13:45:00Z"),
    owner: {
      name: "Maya Singh",
      username: "rustacean",
      avatarUrl: "https://picsum.photos/seed/maya/40/40",
    },
    replies: [
      {
        id: 1,
        content: "It gets easier after the first thousand compile errors",
        createdAt: new Date("2024-01-16T14:00:00Z"),
      },
    ],
  },
  {
    id: 15,
    content: "Why do I always find the best solutions in the shower? 🚿 Maybe I should code there",
    createdAt: new Date("2024-01-16T15:15:00Z"),
    owner: {
      name: "Ryan Cooper",
      username: "shower_coder",
      avatarUrl: "https://picsum.photos/seed/ryan/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Waterproof keyboards when?",
        createdAt: new Date("2024-01-16T15:30:00Z"),
      },
    ],
  },
  {
    id: 16,
    content: "Just discovered Vite's hot reload works with CSS-in-JS. Development experience is incredible now",
    createdAt: new Date("2024-01-16T16:40:00Z"),
    owner: {
      name: "Anna Rodriguez",
      username: "vite_lover",
      avatarUrl: "https://picsum.photos/seed/anna/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Vite changed everything for me",
        createdAt: new Date("2024-01-16T16:55:00Z"),
      },
    ],
  },
  {
    id: 17,
    content: "Pair programming session went from 'this won't work' to 'holy shit it works' in 10 minutes",
    createdAt: new Date("2024-01-16T18:20:00Z"),
    owner: {
      name: "Jake Miller",
      username: "pair_programmer",
      avatarUrl: "https://picsum.photos/seed/jake/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Two brains > one brain",
        createdAt: new Date("2024-01-16T18:35:00Z"),
      },
    ],
  },
  {
    id: 18,
    content: "Web accessibility isn't optional. Just added proper ARIA labels and keyboard navigation. Users deserve better.",
    createdAt: new Date("2024-01-16T19:50:00Z"),
    owner: {
      name: "Zoe Taylor",
      username: "a11y_advocate",
      avatarUrl: "https://picsum.photos/seed/zoe/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Thank you for caring about this!",
        createdAt: new Date("2024-01-16T20:05:00Z"),
      },
    ],
  },
  {
    id: 19,
    content: "Refactored 500 lines into 50. Sometimes the best code is the code you delete 🗑️",
    createdAt: new Date("2024-01-16T21:10:00Z"),
    owner: {
      name: "Michael Chang",
      username: "less_is_more",
      avatarUrl: "https://picsum.photos/seed/michael/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Deletion is an art form",
        createdAt: new Date("2024-01-16T21:25:00Z"),
      },
    ],
  },
  {
    id: 20,
    content: "Late night coding session complete ✅ Tomorrow me will either love or hate what I built tonight",
    createdAt: new Date("2024-01-16T23:30:00Z"),
    owner: {
      name: "Grace Kim",
      username: "night_owl_dev",
      avatarUrl: "https://picsum.photos/seed/grace/40/40",
    },
    replies: [
      {
        id: 1,
        content: "Plot twist: it's always both",
        createdAt: new Date("2024-01-16T23:45:00Z"),
      },
    ],
  },
];

export const Feed: Component = () => {
  const [currentPostId, setCurrentPostId] = createSignal(1);
  let feedContainerRef: HTMLDivElement;

  const scrollToPost = (postId: number) => {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (postElement && feedContainerRef) {
      const containerRect = feedContainerRef.getBoundingClientRect();
      const postRect = postElement.getBoundingClientRect();
      
      // Check if post is outside the visible area
      if (postRect.bottom > containerRect.bottom || postRect.top < containerRect.top) {
        postElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  };

  createEffect(() => {
    scrollToPost(currentPostId());
  });

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

    // Ignore if any modifier keys are pressed
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
      return;
    }

    switch (event.key) {
      case "j":
        const nextId = Math.min(currentPostId() + 1, POSTS.length);
        setCurrentPostId(nextId);
        break;
      case "k":
        const prevId = Math.max(currentPostId() - 1, 1);
        setCurrentPostId(prevId);
        break;
      case "Escape":
        history.back();
        break;
      case " ":
        event.preventDefault(); // Prevent page scroll
        window.location.href = `/posts/${currentPostId()}`;
        break;
      case "o":
        window.open(`/posts/${currentPostId()}`, "_blank");
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

  const isSelected = (id: number) => {
    return id === currentPostId();;
  }

  return (
    <div 
      ref={feedContainerRef}
      class="mx-auto lg:border-x-2 lg:border-zinc-800 max-h-screen overflow-y-auto"
    >
      {POSTS.map(post => (
        <FeedPost post={post} isSelected={isSelected} />
      ))}
    </div>
  )
}

const FeedPost: Component<{ post: typeof POSTS[0], isSelected: (id: number) => boolean }> = ({ post, isSelected }) => {
  return (
    <a href={`/posts/${post.id}`} class="cursor-pointer">
      <div
        data-post-id={post.id}
        class="border-b-2 border-zinc-800 pl-4 py-2 text-sm"
        classList={{
          '!border !border-zinc-300': isSelected(post.id),
        }}
      >
        <cite class="text-amber-600">{post.owner.name}</cite>
        <cite class="text-zinc-500 ml-2">@{post.owner.username}</cite>
        <p class="text-zinc-300">{post.content}</p>
      </div>
    </a>
  )
}
