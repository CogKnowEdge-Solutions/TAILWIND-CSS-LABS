# Lab 4: useEffect & Fetching Data from an API — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: The Dependency Array (Concept)
When does each `useEffect` form run, and how does the array control the effect's timing?

1. `useEffect(fn, [])`
2. `useEffect(fn, [count])`
3. `useEffect(fn)` (no second argument)

### Exercise 2: The Clock Cleanup (Concept)
What happens if you *remove* the `return () => clearInterval(id);` line from Clock.jsx, then mount the Clock, unmount it, and mount it again? Why is the leak worse with `setInterval` than with `setTimeout`?

### Exercise 3: Write a Fetch Effect (Code Task)
Write a `useEffect` that fetches `https://jsonplaceholder.typicode.com/posts`, stores the response array in a `posts` state, and runs only once. Include the `res.ok` check and comment the meaning of `[]`.

### Exercise 4: Success vs. No-Content (Concept)
In the lab, a 404 response still "completed" the download and continued into `.then()`. Explain what the `res.ok` check does to turn that into an error, and what `.catch` handles that `res.ok` cannot.

### Exercise 5: Why `.finally`? (Concept)
In the effect, `setLoading(false)` was called in `.finally()` rather than duplicated in `.then` and `.catch`. What does that guarantee, and what would go wrong if it were only in `.catch`?

### Exercise 6: The Three-Way Render (Concept)
The JSX uses three lines — `{loading && ...}`, `{error && ...}`, and `{!loading && !error && <ul>...</ul>}`. For each of the three outcomes (request pending, request failed, request succeeded), which line(s) render, and why do the other two lines produce nothing visible?

### Exercise 7: Bug Hunt (Applied)
Explain the bug in each snippet and fix it.

```jsx
// A
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => setUsers(data));
}, []);

// B
useEffect(() => {
  setInterval(() => setNow(new Date()), 1000);
}, []);
```

### Exercise 8: StrictMode Double Fetch (Concept)
In development, the Network panel shows the `/users` request firing twice. Is this a bug in the lab code? What causes it, and would a production build do the same?
## Answer Key

### Exercise 1 Answer
1. `[]` — runs **once, after the first render** (mount). React lists zero things to watch, so it never re-runs. This is why `UserList` fetches a single time in production.
2. `[count]` — runs after the first render, then **again every time `count` changes** between renders. This is exactly why the Optional Exercise's Retry button works: bumping `tries` restarts the effect.
3. no array — runs after **every single render** (nothing to compare, so the effect never "skips"). Almost always a mistake: any state update would re-trigger it, often in a loop.

### Exercise 2 Answer
Each mount starts a *new* interval, and without cleanup the old one keeps running — every unmount/remount adds one more forever-ticking timer, each calling `setNow` on a long-gone component. The leak is worse for `setInterval` because it fires *repeatedly* until cleared, while `setTimeout` fires once, so a forgotten timeout eventually stops by itself
— the leaked interval never stops. In React 18 you'd also get "Can't perform a React state update on an unmounted component" warnings in the console.

### Exercise 3 Answer
```jsx
import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // [] — run once when the component mounts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
The `[]` tells React "run this effect once, on mount". The `res.ok` guard turns any 4xx/5xx response into a thrown error that jumps to `.catch`.

### Exercise 4 Answer
`fetch` resolves its promise for *any* completed HTTP response — a 404 is a valid, finished transfer, not a rejected promise. `res.ok` is `true` only for status 200–299; the check `if (!res.ok) throw ...` manually throws when the status is a failure, routing the HTTP error into `.catch` so the app can show a friendly message. What `res.ok` *cannot* catch is a request that never completed at all — DNS failure, refused connection, offline — because there is no `res` to check. Those surface as promise rejections (`TypeError: Failed to fetch`) straight into `.catch`. So the pair "`res.ok` + `.catch`" covers both worlds: bad answers and no-answer.

### Exercise 5 Answer
`.finally()` always runs regardless of resolve or reject, so `setLoading(false)` is guaranteed on both paths — the UI can never stay stuck on `Loading...`. If it were only in `.catch`, a successful load would keep `loading` true forever and the `<ul>` would never render (its guard requires `!loading`), even though the data was fetched. Duplicating it in both branches works but invites forgetting one; `.finally()` exists exactly to avoid the duplication.

### Exercise 6 Answer
- **Pending** — `loading` is `true`, so line 1 renders `Loading...`; `error` is still `null` (falsy) and line 3's `!loading` is false, so both skip.
- **Failed** — `.finally` set `loading` false, so line 1 skips; `error` is now a string (truthy), so line 2 renders the friendly message; `!error` is false, so the list still skips.
- **Succeeded** — `loading` false and `error` null, so lines 1–2 skip and line 3 renders the `<ul>`.

Each `&&` is a guard: the right-hand side renders only when the left-hand side is truthy, so exactly one branch is ever visible at a time.

### Exercise 7 Answer
- **Bug A — no `res.ok` check:** with a 404 (or 500) the fetch still succeeds and `res.json()` is called on an error body. Depending on the payload, `.json()` throws (unhandled, since there is no `.catch`) or returns garbage that `setUsers` stores — no friendly message, possibly a crash. Fix: add the guard and a `.catch`, exactly as in Exercise 3.
- **Bug B — interval with no cleanup:** `setInterval` is started but never cleared; the component's timer leaks (see Exercise 2). Fix: capture the id and return a cleanup — `const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id);`.

### Exercise 8 Answer
It is not a bug — it's React **StrictMode** in development. StrictMode intentionally mounts each component twice (mount, unmount, remount) on first render so effects run twice and the framework can surface bugs in cleanup and leaks. Because our effect runs on each mount, the fetch fires twice on mount. In production, StrictMode double-invocation is disabled, so the effect (and the request) runs exactly once — the lab code is correct. Just remember the double fetch is a dev-only signal, which is why verification saw two route hits (both failing) before a successful Retry.
