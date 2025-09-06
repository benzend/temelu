import { createSignal, type Component } from 'solid-js';

export const Home: Component = () => {
  return (
    <div class="bg-zinc-900 text-white min-h-screen min-w-screen flex flex-col justify-center items-center">
      <h1 class="text-8xl">Temelu</h1>
      <div>Type <TypeChallenge challenge="okay" /> to get started</div>
    </div>
  );
};

interface ITypeChallengeProps {
  challenge: string;
}

const TypeChallenge: Component = ({ challenge }: ITypeChallengeProps) => {
  const targetSequence = challenge.split('');
  let [currentSequence, setCurrentSequence] = createSignal([]);
  let resetTimeout;

  const SEQUENCE_TIMEOUT = 3000;

  document.addEventListener("keydown", function(event) {
    console.debug('keydown', event.key, currentSequence());
    clearTimeout(resetTimeout);

    setCurrentSequence(curr => [...curr, event.key]);

    const isMatch = targetSequence.every(
      (key, index) => currentSequence()[index] === key
    );

    if (isMatch) {
      console.debug("Sequence detected: Ctrl → 6 → A!");
      setCurrentSequence([]);
      document.location.href = '/auth'
    }

    resetTimeout = setTimeout(() => {
      setCurrentSequence([]);
    }, SEQUENCE_TIMEOUT);
  });

  const isTyped = (char: string, index: number) => {
    return currentSequence()[index] === char;
  }

  return (
    <code class="px-2 py-1 rounded mx-3 bg-zinc-950 text-zinc-500">
      {targetSequence.map((char, i) => {
        return (
          <span classList={{'text-amber-600': isTyped(char, i)}}>{char}</span>
        )
      })}
    </code>
  )
}
