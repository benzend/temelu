import { createSignal, Show, type Component } from 'solid-js';

export const Landing: Component = () => {
  const [loader, setLoader] = createSignal(false);
  const handleChallengeComplete = () => {
    document.location.href = '/home' // TODO: change to auth page
  }
  const loaderThen = (action: () => void, timeout: number = 700) => {
    setLoader(true);
    setTimeout(() => {
      action();
      setLoader(false);
    }, timeout);
  }

  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen flex flex-col justify-center items-center">
      <h1 class="text-8xl text-amber-600">Temelu</h1>
      <div>Type
        <TypeChallenge
          challenge="okay"
          action={() => loaderThen(handleChallengeComplete)} />
          to get started
      </div>
      <hr class="border-zinc-800 my-4 w-80" />
      <ul>
        <li class="flex items-center mb-2">
          <TypeChallenge challenge="learn" 
            action={() => loaderThen(() => window.open('/learn', '_blank'))} /> more about Temelu
        </li>
        <li class="flex items-center mb-2">
          <TypeChallenge challenge="register"
            action={() => loaderThen(() => window.open('/auth/register', '_blank'))} />for a new account
        </li>
        <li class="flex items-center mb-2">
          <TypeChallenge challenge="login"
            action={() => loaderThen(() => window.open('/auth/login', '_blank'))} /> to your account
        </li>
        <li class="flex items-center mb-2">
          <TypeChallenge challenge="see"
            action={() => loaderThen(() => window.open('/see', '_blank'))} /> something cool
        </li>
        <li class="flex items-center mb-2">
          <TypeChallenge challenge="star"
            action={() => loaderThen(() => window.open('https://github.com/benzend/temelu', '_blank'))} /> Temelu on GitHub
        </li>
      </ul>

      <Show when={loader()}>
        <div class="fixed top-0 left-0 m-4 w-full h-full flex items-center justify-center">
          <div class="min-w-120 bg-[#1E1E1E33] h-100 w-100 text-white rounded-lg p-4 shadow-lg flex items-center justify-center">
            <svg class="size-20 animate-spin text-amber-600"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
          <div class="absolute -z-1 top-0 right-0 m-4 w-full h-full bg-zinc-900 opacity-50 flex items-center justify-center">
          </div>
        </div>
      </Show>
    </div>
  );
};

interface ITypeChallengeProps {
  challenge: string;
  action: (opts?: { ref: HTMLDivElement }) => void;
}

const TypeChallenge: Component = ({ challenge, action }: ITypeChallengeProps) => {
  let ref;

  const targetSequence = challenge.split('');
  const [currentSequence, setCurrentSequence] = createSignal([]);
  const [isSuccess, setIsSuccess] = createSignal(false);
  let resetTimeout;

  const SEQUENCE_TIMEOUT = 1000;

  document.addEventListener("keydown", function(event) {
    clearTimeout(resetTimeout);

    setCurrentSequence(curr => [...curr, event.key]);

    const isMatch = targetSequence.every(
      (key, index) => currentSequence()[index] === key
    );

    if (isMatch) {
      console.debug("Sequence detected: Ctrl → 6 → A!");
      setIsSuccess(true);
      setCurrentSequence([]);
      action({ ref });
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      return
    }

    resetTimeout = setTimeout(() => {
      setCurrentSequence([]);
    }, SEQUENCE_TIMEOUT);
  });

  const isTyped = (char: string, index: number) => {
    return currentSequence()[index] === char;
  }

  return (
    <code class="px-2 py-1 rounded mx-3 bg-zinc-950 text-zinc-500 transition relative" 
      ref={ref}
      classList={{
        '!text-amber-600': isSuccess(),
      }}>
      {targetSequence.map((char, i) => {
        return (
          <span
            class="transition"
            classList={{
              'text-amber-600': isTyped(char, i),
              'animate-pulse': !isTyped(char, i)
            }}>{char}</span>
        )
      })}
    </code>
  )
}
