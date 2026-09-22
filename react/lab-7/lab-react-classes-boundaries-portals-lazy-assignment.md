# Lab 7 Assignment — Classes, Boundaries, Portals & Code Splitting

*Knowledge-check exercises for `lab-react-classes-boundaries-portals-lazy.md`
(Lab 7, Advanced). Completing all eight exercises means you can read and convert
legacy class components, defend the class-only boundary API, and reason about
where portals and lazy chunks actually land.*

---

### 1. Lifecycle translation
The lab's `toggle lifecycle` button logs `Greeting (class) unmounting` and
`Greeting (hooks) unmounting`. In the class version this fires from
`componentWillUnmount`. In the Hook version, which function produces that same
log — and why is it part of a *single* `useEffect`, not a second one?

### 2. Two asymmetries
`componentDidUpdate(prevProps)` and `useEffect(fn, [dep])` both fire on
re-renders. Give the two ways they differ (one is about the very first render,
one is about what *counts* as a re-render).

### 3. The crash is (partly) invisible
`Boom` throws while rendering. What do `getDerivedStateFromError` and
`componentDidCatch` each do, and why does a red error report still appear in
dev even though the boundary caught it?

### 4. Recovery requires a remount
After the boundary shows `Something went wrong`, clicking the same button again
restores the healthy child. The demo does that with a `key`. Why can't the
boundary simply "un-crash" itself once `broken` becomes `false` again?

### 5. What a boundary does NOT catch
List three kinds of errors a class-based `ErrorBoundary` wrapper will *not*
intercept.

### 6. Portal semantics
The modal is rendered via `createPortal(jsx, getElementById('modal-root'))`.
Its physical DOM parent is `#modal-root`, but its React parent is `App`. Give
one consequence of each identity for (a) CSS/styling and (b) event handling.

### 7. Loading states
`React.lazy(() => import('./Modal.jsx'))` renders `Modal` only when `Open
Modal` is clicked. Explain what `<Suspense fallback={<p>Loading...</p>}>` shows
and when it shows it — and why `Loading...` will not appear on an already-cached
chunk.

### 8. Split, then fail
After `npm run build`, `dist/assets/` contains both `index-*.js` (~144 kB) and
a separate `Modal-*.js` (~0.5 kB). (a) Why does the modal get its own file at
all? (b) If that chunk 404s on a slow network, why does the page still show
`Something went wrong` rather than a blank screen?

---

<details>
<summary><b>Answer Key</b></summary>

### Answer 1
The **cleanup function** that the `[]` effect returns —

```js
useEffect(() => {
  console.log('Greeting (hooks) mounted');
  return () => console.log('Greeting (hooks) unmounting');
}, []);
```

React treats the returned function as "cancellation" and runs it when the
component unmounts (and, in dev StrictMode, between the double mounts). One
`useEffect` owns both the mount side-effect and its inverse cleanup — the Hook
packaging of what the class split across two separate lifecycle methods.

### Answer 2
1. **First render:** `componentDidUpdate` never fires on the initial mount;
   `useEffect([dep])` *always* runs on mount too (then again whenever `dep`
   changes). Porting old code faithfully needs a "skipped first run" guard.
2. **Trigger scope:** `componentDidUpdate` fires on *every* re-render of the
   component, even with identical props (seen in the lab: the crash-test click
   logged `Greeting (class) updated: React -> React`). `useEffect([dep])` only
   fires when a listed dependency actually changed between renders.

### Answer 3
`static getDerivedStateFromError()` flips `hasError` to `true` so `render()` can
swap the subtree for the fallback. `componentDidCatch(error)` runs after that
for side effects — here it logs `ErrorBoundary caught: Boom! — intentional
crash`. The red dev report still appears because React deliberately re-propagates
caught errors in development so tooling and overlays can see them; the boundary
is what prevents the *blank page*, not the console noise. Production does not
emit the dev overlay.

### Answer 4
Once `getDerivedStateFromError` returns, the boundary component's own state is
`hasError: true` and that persists across renders — setting `broken` to `false`
later only changes the boundary's *children*, which no longer render because the
boundary is in fallback mode. No child render happens, so nothing can throw
again to flip the state back. A new `key` makes React discard that boundary
instance and mount a fresh one (`hasError: false`), which is the standard reset,
and re-rendering it with a healthy child simply works.

### Answer 5
1. Errors thrown in **event handlers** (the boundary's render-time checks never
   run during a click handler).
2. Errors in **async code** (promises, `setTimeout`, `fetch` callbacks) —
   nothing to do with a render pass.
3. Errors thrown by the **boundary itself**, or by anything *above* it in the
   tree (an ancestor's render error is out of its view). Also: errors in the
   boundary's own lifecycle methods, and — in this app — unrelated to the page
   shell, errors outside its subtree.

### Answer 6
(a) CSS: the portal's DOM parent is `#modal-root`, a sibling of `#root` at the
`body` level — so `position: fixed` overlays are free of `#root`'s stacking
contexts, transforms, and `overflow` clipping, which is exactly why the modal
overlay covers the whole viewport in this lab. (b) Events: even though the DOM
parent is `#modal-root`, handlers bubble through the **React** tree, so an
`onClick` on an ancestor in JSX (like `App`) still sees clicks from inside the
modal — DOM location has no effect on the React event path.

### Answer 7
`Suspense` shows its `fallback` from the moment a lazy component *starts*
resolving until its promise settles — i.e. while the `import()` fetch is in
flight. In this lab's `Loading...` check the module was artificially delayed
1.2 s to make the fallback visible; on a warm/cached chunk the fetch resolves in
milliseconds, so `Loading...` may never appear on screen — Suspense is a
*suspension point*, not a guaranteed spinner.

### Answer 8
(a) `Modal.jsx` is only referenced via a dynamic `import()` inside
`lazy(...)`. Vite sees the dynamic import at build time and emits it as a
separate chunk, keeping it out of the main bundle that is parsed on every app
load — the modal's code is downloaded only when first needed (code splitting).
(b) The lab wraps `<ErrorBoundary><Suspense ...><LazyModal/></...>`: when the
chunk request fails, the promise rejects, and the failure surfaces as a render
error inside the lazily-mounted tree — which the embracing boundary catches
exactly like `Boom` did, rendering `Something went wrong` while the rest of the
page stays alive.

</details>