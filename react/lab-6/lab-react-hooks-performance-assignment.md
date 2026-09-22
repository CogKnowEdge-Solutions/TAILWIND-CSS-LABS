# Lab 6 Assignment — More Hooks & Performance

*Knowledge-check exercises for `lab-react-hooks-performance.md` (Lab 6, Advanced).
Completing all eight exercises means you can lift-hook a counter, reason about
identities, and defend when *not* to optimize.*

---

### 1. Hover the refs
`SearchBox` focuses itself on mount via `useRef`. Name one thing `useRef` gives
you that `useState` deliberately does not, and one reason a plain
`document.querySelector` is a worse fit for this job.

### 2. A missing action
The counter's reducer has `increment` and `reset` cases and a `default` arm.
What does the counter do if a button dispatches `{ type: 'decrement' }`? What
does the `default` arm do — and why is returning `state` (not a new object or
`undefined`) important?

### 3. Two copies
`TodoApp` and `TodoStats` both call `useTodos()`. You add three todos in
`copy #1`. What does `copy #2`'s total line show before and after, and why?

### 4. The Rules
Why does React need its hooks called in the same order on every render? What
concrete bug would a hook inside an `if` condition cause?

### 5. What memo sees
You wrap a component in `memo()`. Name one thing that still makes it re-render
despite the wrapper, and the one escaping change you must also make so a
function prop does not silently defeat the memo.

### 6. Two buttons on the Parent
In the two-button experiment, clicking **re-render parent** logs nothing new.
Name each of the three tools and, in one phrase each, what it is contributing
to that silence.

### 7. StrictMode noise
On mount, the console shows `slowSquare runs` twice and the child log twice,
but after clicking **re-render parent** nothing appears. Explain the `x2` on
the mount logs and why the *update* clicks do not produce the same doubling.

### 8. When NOT to optimize
A small menu lists 5 items and re-renders a few times a minute. Someone wraps
the whole list in `memo` *and* `useMemo`s a `count` literal `{count}`. Give two
concrete reasons the optimization is probably a net loss here.

---

<details>
<summary><b>Answer Key</b></summary>

### Answer 1
`useRef` is mutable — changing `inputRef.current` does not trigger a re-render,
whereas any `useState` write schedules one. `useRef(null)` also returns the same
object instance for the component's whole life. `querySelector` needs a global
string lookup against the whole document, is not scoped to the component, and
would have to be repeated after each remount — the ref is scoped, stable, and
auto-populated when React attaches the real DOM node.

### Answer 2
The `decrement` action hits the `default` arm, so the reducer returns the
current state unchanged — `count` stays put. Returning `state` (identical
reference) matters because React then sees no meaningful change, avoids an
unnecessary re-render, and keeps the reducer total (no partial updates on
typos — an unsupported action silently no-ops instead of corrupting state).

### Answer 3
`copy #2` shows `1 done · 2 total` both before and after. Each `useTodos()` call
runs its own `useState`, so the consumers own independent state; adding three
todos in `copy #1` only updates copy #1's list. "Reuse the logic" ≠ "share the
data" — sharing would require lifting the state to props or moving it into
Context (Lab 5).

### Answer 4
React matches the hooks of the current render to the hooks of the previous
render **by order**. If a hook is skipped conditionally, all subsequent hooks
shift one slot and React pairs state with the wrong calls — a value set from one
`useState` would appear to come from another. The rule "top level, no
conditions/loops/nested fns" is what keeps the order stable.

### Answer 5
`memo` only guards props. The child still re-renders if its **own state**
changes or if a Context it reads changes. For the escaping function prop: wrap
it in `useCallback` (e.g. `useCallback(() => setCount(c => c + 1), [])`) so it
has a stable identity across renders — otherwise a fresh arrow each render makes
`memo`'s shallow prop comparison fail and the skip never happens.

### Answer 6
`React.memo` — skips the child's re-render because its props are unchanged.
`useCallback` — keeps `onAction` the same function object, so the memo
comparison stays equal. `useMemo` — `number` did not change, so the heavy
`slowSquare` computation is served from the cache. Together: no recompute, no
child re-render, no log.

### Answer 7
Develop-mode StrictMode double-invokes render-scope work when components first
mount to surface impure code — both the `useMemo` factory (`slowSquare runs`)
and the effect's render (`ExpensiveChild rendered`) run twice that first time.
Update clicks are single-commit; the memoized `useMemo` re-runs only when
`number` changes (and even then StrictMode may double-*invoke the factory*), so
with equal `number` there is no double at all. Production builds have no
StrictMode doubling.

### Answer 8
(1) The list's render cost is microscopically small — a `memo` shallow-compare
covers all props and runs on *every* parent render, so the comparison overhead
can exceed the render it saves when renders are cheap and rare. (2) `{count}` is
already a cheap primitive — `useMemo`'s dependency comparison and memo
housekeeping add more work than merely formatting the number avoids, and a
literal never needed caching. The trio pays only for measurable work re-rendering
often with stable props.

</details>