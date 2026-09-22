# Lab 5: Routing, Context & Book Club — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: The Router's Job (Concept)
In your own words, what does `BrowserRouter` do, and why does clicking a `<Link>` not reload the whole page while an ordinary `<a href>` would?

### Exercise 2: Which Route Renders? (Concept)
With these routes, say which component renders for each URL:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

1. `http://localhost:5173/`
2. `http://localhost:5173/about`
3. `http://localhost:5173/team`

### Exercise 3: Context Mechanics (Concept)
What is "prop drilling", and how do `Provider` + `useContext` remove it? When the theme value changes, WHICH components re-render — the whole tree or only some?

### Exercise 4: Write a Provider (Code Task)
Write a `UserContext` with a `UserProvider` holding `{ name, setName }` in state, plus a `useUser()` hook. Mirror the `theme.jsx` structure from the lab.

### Exercise 5: className vs. Inline Style (Concept)
Explain the double-brace `style={{ background: '...' }}` in App.jsx and why the value needs JavaScript. Also: why is the property `backgroundColor` and not `background-color` when written this way? When is a `className` from `styles.css` the better choice?

### Exercise 6: Bug Hunt (Applied)
Explain what goes wrong in each snippet and fix it.

```jsx
// A — inside Navbar.jsx, someone "fixes" the theme so the label always says Dark:
function Navbar() {
  const [theme, setTheme] = useState('dark');
  ...
}

// B — the toggle is applied to the wrong element; background never changes:
<div className="app" style={{ backgroundColor: theme }}>   // theme === 'dark'
```

### Exercise 7: The Vanishing Book (Applied)
You add *The Hobbit* on Home, click **About**, click **Home** again — it's gone, and the API books are back. Explain precisely why, and name the two changes (from the Optional Exercise) that fix it.

### Exercise 8: Write the Nav (Code Task)
Write the `Navbar` component that renders a brand, `<Link to="/">Home</Link>`, `<Link to="/about">About</Link>`, and a button whose text is `Dark` in light mode and `Light` in dark mode, using `useTheme()`.
## Answer Key

### Exercise 1 Answer
`BrowserRouter` is the top-level piece that React Router provides: it wraps the app, listens to the browser's URL and history, and makes router state available to every component below it (that is why the whole `<App />` is nested inside it in `main.jsx`). A plain `<a href>` tells the *browser* to navigate, so the browser fetches a new HTML document and replaces the page (full reload). A `<Link to>` also renders an `<a href>`, but React Router intercepts the click, updates the URL through the History API (pushes `/about`), then re-renders only the matching route component in place. No HTML document is fetched, nothing is thrown away, and in-memory state survives. The lab verified this: a sentinel set on the page before clicking About was still present after — proof of no reload.

### Exercise 2 Answer
1. `/` → Home.
2. `/about` → About.
3. `/team` → **neither** route matches, so nothing renders (and no document is fetched — the URL just doesn't match any declared route). React Router v7 lets you add a `path="*"` route with a "page not found" element to make that case visible.

### Exercise 3 Answer
Prop drilling is passing data down the tree solely so an *unrelated middle* component can forward it: `App → A → B → C` where only `C` needs the theme but `A` and `B` must accept and re-pass the prop. Context removes it by moving the value to a Provider and letting *any* descendant call `useContext` directly. When the value changes, **only components that called `useContext(ThemeContext)` re-render** — not the whole tree. In the lab that is `Layout` (reads `theme` for the background) and `Navbar` (reads both and owns the button); `Home` and `About` do not subscribe, so flipping the theme does not make them re-render.

### Exercise 4 Answer
Following the `theme.jsx` structure:

```jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState('');
  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
```

Key pieces: state lives in the Provider; the Provider exposes `{ name, setName }` via `value`; consumers call `useUser()` (never the raw context); the Provider must wrap the tree that needs it.

### Exercise 5 Answer
The outer `{}` is JSX interpolation ("this attribute's value is JavaScript"); the inner `{}` is an object literal whose key is `background` and whose value is the ternary `theme === 'dark' ? '#111827' : '#f4f6f8'`. The property needs JavaScript because the color *depends on application state* — a static `.css` file cannot compute values from `theme`. Inside an inline style object, CSS properties are camelCase because the object is JavaScript, and hyphenated names would be mistaken for subtraction (`background-color` would parse as a minus expression) — so it is `backgroundColor` (or the short `background` used in the lab). A `className` from `styles.css` is the better choice for styles that never change with state (layout, typography, spacing): more readable, reusable, and keeps markup clean — inline styles are for `state`-driven values like the theme background.

### Exercise 6 Answer
- **Bug A — duplicate state in the wrong place:** declaring a second private `theme` state inside `Navbar` creates a parallel copy that React knows nothing about app-wide: `toggleTheme` updates the global Context theme, but the label reads the *local* copy stuck at `'dark'`, so the label lies (and the two themes silently diverge). The rule: **one source of truth** — a provider holds the state; consumers only *read* and *call* it. Fix: delete the local `useState` and read `const { theme, toggleTheme } = useTheme();` exactly as Navbar does; the provider's state and the button are then the same value.
- **Bug B — theme value is not a CSS color:** the context value is the string `'dark'` (or `'light')`, not a color, but the inline style uses it *directly* as `backgroundColor`. Setting `backgroundColor: 'dark'` is an invalid color, so the browser ignores it and nothing visually changes. Fix (as in the lab): translate the state to a color — `style={{ background: theme === 'dark' ? '#111827' : '#f4f6f8' }}`. State names like `'light'`/`'dark'` are for the app; the stylesheet or inline style maps them to actual colors.

### Exercise 7 Answer
`books` is **state inside the Home component**. When you click About, React unmounts Home (the route no longer matches), so its `useState` is destroyed. Returning to `/` mounts a *fresh* Home: `books` restarts as `[]`, the `useEffect` fires and refetches from Open Library, and your added entry is gone. The Optional Exercise fixes it with the same two moves as the theme: (1) move the list into a `BooksProvider` sitting **above the routes** (so it outlives any single page), and (2) have the fetch *fill only if the shelf is empty* (`setBooks(current => current.length ? current : fetched)`), otherwise the re-mount's refetch would wipe manual additions from context. After that, added books survive navigation and appear on a dedicated `/shelf` page.

### Exercise 8 Answer
```jsx
import { Link } from 'react-router-dom';
import { useTheme } from '../theme.jsx'; // or './theme.jsx' relative to the file location

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <strong className="brand">Book Club</strong>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button type="button" onClick={toggleTheme} className="theme-btn">
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </nav>
  );
}
```

Points: `Link` from `react-router-dom` (not `<a>`), `useTheme` supplies both the value (for the label) and the toggle (for the click), and the label flips because the ternary reads the *current* theme — in dark mode it says `Light` (click to go light), in light mode `Dark`.
