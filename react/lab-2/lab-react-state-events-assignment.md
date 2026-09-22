# Lab 2: State & Events — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: State vs Props (Concept)
List three differences between **props** and **state**.

### Exercise 2: What `useState` Returns (Concept)
Explain what this line gives you, and which part of it you are ever allowed to "write":

```jsx
const [count, setCount] = useState(0);
```

### Exercise 3: Predict the Output (Code Task)
Given this component:

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>+</button>
{count < 3 && <p>Keep going!</p>}
```

Write what the page shows:
- On the very first render
- After the 2nd click
- After the 3rd click

### Exercise 4: Write a Component (Code Task)
Build a `LikeButton` component from scratch:
- A boolean state value `liked` starting as `false`.
- A button whose label is `"Like"` when not liked and `"Unlike"` when liked (use a ternary).
- A sentence `You liked this note.` that appears only while `liked` is `true` (use `&&`).
Show how to render it inside `App`.

### Exercise 5: Three Ways to Conditionally Render (Concept)
Name the three conditional-rendering techniques from Section 6, and give the situation where each one fits best.

### Exercise 6: Why Not Direct Mutation (Concept)
You write this handler:

```jsx
onClick={() => { count = count + 1; }}
```

The value changes in memory, but the screen never updates. Explain exactly why, and give the fix.

### Exercise 7: Independent State (Concept)
`Counter` and `ToggleText` sit on the same page. You click `+` ten times — why does the ToggleText paragraph stay exactly where it is, and why doesn't Counter re-render ToggleText?

### Exercise 8: Initial Values (Applied)
A team member opens `Counter.jsx` and changes `useState(0)` to `useState(6)`, then reloads the page. The warning message ("More than 5 — keep it fun!") is visible immediately, before any click. Then they click `Reset`. Explain what state the user is in after each action, and why Reset still works normally.

## Answer Key

### Exercise 1 Answer
- **Ownership:** Props are *given to* a component by its parent and read-only inside it; state is *owned by* the component itself and mutable by it.
- **Who can change:** A component can never change its own props (its parent would have to re-render with new ones); state can only be changed by its own updater (`setCount`).
- **When it changes:** Props change when the parent re-renders with different values; state changes when the component itself calls its updater.
- **Origin:** Props come from outside (like `<Welcome name="Asha" />`); state is declared inside with `useState(initialValue)`.

(Any three correct — the ownership/read-only pair is the key idea.)

### Exercise 2 Answer
`useState(0)` returns a two-slot array that you destructure:
- **`count`** — the *current* value, starting at `0`. You may only **read** it.
- **`setCount`** — the *updater function*, the only way to change `count`. You call it with a new value (`setCount(count + 1)`), never assign `count` directly.

The name in the first slot can be anything (like `visible` / `setVisible`), but the two-slot shape is always the same.

### Exercise 3 Answer
- **First render:** `Count: 0` with the message visible — `0 < 3` is true, so `&&` renders `<p>Keep going!</p>`.
- **After 2nd click:** `Count: 2`, message still visible — `2 < 3` is true.
- **After 3rd click:** `Count: 3`, message **gone** — `3 < 3` is false, so `&&` renders nothing and no `<p>` appears in the DOM.

Note the boundary: the message stays for counts 0, 1, 2 and disappears exactly when the count reaches 3, because the condition is strictly `count < 3`.

### Exercise 4 Answer
```jsx
import { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <button onClick={() => setLiked(!liked)}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      {liked && <p>You liked this note.</p>}
    </div>
  );
}

export default LikeButton;
```

Rendered in `App` with `<LikeButton />`. Clicking once flips `liked` to `true` — the label becomes "Unlike" and the sentence appears; clicking again flips back. The ternary chooses the label, and `&&` shows or hides the sentence.

### Exercise 5 Answer
- **`&&` operator** — show-or-nothing, for a single optional element (`{count > 5 && <p>... </p>}`). Best when something is either present or absent, like the warning message or the toggle paragraph.
- **Ternary `? :`** — choose one of two alternatives, for things that are always present but switch form, like the "Hide"/"Show" button label.
- **`if` + early return** — when one branch means *entirely different* output (e.g. a loading screen vs. the real page). Returns early out of the component instead of picking within the JSX.

### Exercise 6 Answer
`count = count + 1` mutates the variable read from the previous render, but React never learns about it — React re-renders **only when you call the updater**. The variable changes in memory while the component's render output — and the real DOM — stay frozen at the old value.

**Fix:** call the updater instead: `setCount(count + 1)`. That dispatches the update through React's scheduler, which re-renders the component and patches the DOM. Direct assignment to a state variable is always a bug.

### Exercise 7 Answer
State lives **per component**. `Counter`'s `useState` call and `ToggleText`'s `useState` call each own a separate slice of memory, and clicking `+` only calls `Counter`'s `setCount`. React re-renders the component *whose state changed* (Counter) and leaves every other component's rendered output alone — ToggleText isn't re-run or touched. That separation is what "independent state" means.

### Exercise 8 Answer
- **After reload with `useState(6)`:** the page opens at `Count: 6`, so `6 > 5` is true immediately and the warning renders on the very first render — initial state drives the first paint.
- **After clicking Reset:** `setCount(0)` runs, the count snaps to `0`, `0 > 5` is false, and the warning vanishes. Reset works exactly as before because it unconditionally sets state to `0` regardless of the starting value.

Moral: the *initial* value only matters on first render; after that, every change goes through the updater.