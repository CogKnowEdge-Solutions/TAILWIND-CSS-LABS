# Lab 8 Assignment — Final Project

*Knowledge-check exercises for `lab-react-final-bookclub.md` (Lab 8, Advanced —
the capstone). Completing all nine exercises means you can defend the
state-management ladder, reason about route guards, and walk a verifying build.*

---

### 1. Validation, twice
`TodoForm` shows `Please write a book title first.` and submits nothing when the
field is empty. Where in `handleSubmit` is that decision made, and what two side
effects are skipped because of it? Why does the app *clear* the message on every
`onChange`?

### 2. Reading the URL
Book links are `/books/${b.key.split('/').pop()}`. Why does the code strip the
key before routing, and how does `BookDetailPage` turn the URL back into a book?

### 3. Guard mechanics
`ProtectedRoute` renders `<Navigate to="/" replace />` when `user` is null. Why
`replace` and not a normal push? If you removed `replace`, what would a user
notice when pressing Back after a bounce?

### 4. Where does the store live?
List the state-management ladder, and place each of these four pieces on it:
todo-field `text`, `wishlist`, the logged-in `user`, and (hypothetically) a
websocket chat feed that has to re-render exactly one unread-count badge.

### 5. Why not Redux here?
Section 6 argues this 433-line app should *not* adopt Redux. Give two concrete
things Context already gives it, and one thing Redux would add that this app
does not yet need.

### 6. The build receipt
`npm run build` produced `index-D_mwa65g.js` (187.72 kB) *and* a separate
`Modal-5GhqBApR.js` (0.85 kB). Why are there two JS files, and which source
construct caused the split?

### 7. Env semantics
Name the prefix rule for Vite's `.env`, how a component reads the value, and
what you must do after editing `.env` — and why. What kind of value must never
be placed in `.env`?

### 8. The memo evidence
`BookList` logs `BookList rendered` and is wrapped in `React.memo`. In the
verified run, toggling a wishlist item produced **0** new logs. Name the two
reasons hooked to that result (one is a prop, one is a mechanism).

### 9. Error handle with lazy
The login modal is `lazy(() => import('./Modal.jsx'))` mounted under
`<Suspense>` *inside* `<ErrorBoundary>`. Explain the role of each wrapper if
the Modal chunk (a) loads slowly and (b) fails to load on the network.

---

<details>
<summary><b>Answer Key</b></summary>

### Answer 1
The guard is the **first statement** in `handleSubmit`:

```js
if (!text.trim()) { setError('Please write a book title first.'); return; }
```

A `return` before any further statement means the invalid path skips both
`addWish(...)` (no store write) and `navigate('/thank-you')` (no navigation).
Clearing on `onChange` makes the feedback live: the moment the user starts
typing, the error condition becomes visibly false, which is friendlier than a
persistent stale message.

### Answer 2
Open Library keys include slashes (`/works/OL30420448W`), and a URL segment
cannot contain `/` without breaking the route match. The link therefore keeps
only the final segment (`b.key.split('/').pop()` → `OL30420448W`), a clean
single-segment id. `BookDetailPage` receives it via `useParams()` and reverses
the mapping with `results.find((r) => r.key.endsWith(id))` — the suffix match is
the inverse of the split. The lookup is cached in `useMemo` keyed on `[id,
results]`.

### Answer 3
`replace` swaps the current history entry instead of pushing: the bounced route
never enters the history stack, so **Back never returns the user to a protected
page**. Without `replace`, an anonymous visitor bounced to `/` would find
Back button forwarding them straight into `/thank-you` again — a guard
treated as invisible, not a page they reached. (And with `replace`, after
login the same navigation chain is clean.)

### Answer 4
1. **Local state** via `useState` in the component: the todo-field `text`.
2. **Lifting + props** when a parent owns data several children read: a fact
   the lab's memoized `BookList`/`Wishlist` rely on.
3. **Context** for cross-route/global reads: the `wishlist` (three consumers:
   home panel, stats, thanks flow) and the logged-in `user` (nav + every
   `ProtectedRoute`).
4. **External store (reducer + granular subscription)** for hot-path slices of
   a large app: the hypothetical unread-count badge — where Context's
   all-consumers-re-render model would re-render the whole chat panel for one
   number that Redux's subscribers isolate.

### Answer 5
Two things context already provides: (1) single-provider composition of the two
hooks (`BooksProvider` + `AuthProvider`) with zero boilerplate, and (2) route-
and branch-spanning reads for the wishlist and auth without prop-drilling.
What Redux would add but this scale doesn't need: a global store + middleware
plumbing, and the granular `useSelector` subscriptions — meaningful once
re-render isolation or devtools time-travel become requirements, dead weight at
433 lines with two providers.

### Answer 6
Two files because the app's code is **code-split**: everything statically
imported (pages, context, hooks — React, the router) lands in the main
`index-*.js` chunk, while the tiny `Modal-*.js` chunk exists because `Modal` is
only referenced by dynamic `import()` inside `lazy(() => import('./Modal.jsx'))`.
The browser downloads the second chunk on demand, when the login modal first
renders — the concrete payoff of `React.lazy` at build time.

### Answer 7
Only keys prefixed **`VITE_`** are exposed to client code, read at
**build/dev-server start** and inlined into `import.meta.env` (e.g.
`import.meta.env.VITE_OPEN_LIBRARY_URL`). Because values are baked at that
point, you must **restart `npm run dev` or rebuild** after an edit. Never put
secrets (tokens, API keys, DB credentials) in `.env` — the bundle is public and
parsable in DevTools; `.env` here holds only public API configuration.

### Answer 8
`React.memo` shallow-compares props on parent re-renders; when all props are
`===`, it skips the child render entirely — zeroing not only the list's DOM work
but its `console.log`. The two inputs to the comparison are: `books` (the
`results` array — a new reference only when a fetch lands) and `onAdd`, which
keeps its **identity across renders** because `addWish` is `useCallback`'d in
`useWishlist`. So the wishlist toggle re-renders `HomePage` but both props are
unchanged ⇒ memo wins ⇒ 0 logs. (Without `useCallback`, a fresh `onAdd` on
every render would defeat the memo.)

### Answer 9
(a) Slow chunk: `<Suspense fallback>` shows `Loading login...` until the promise
resolves — the fallback is the in-flight UI. (b) Failed chunk: the rejected
`import()` surfaces as a render error inside the suspending subtree, which the
outer `ErrorBoundary` catches exactly like the lab's `Boom`-style crash,
rendering `Something went wrong` while the rest of the app keeps working — the
same pattern that protects `/thank-you`'s route from a dead module.

</details>