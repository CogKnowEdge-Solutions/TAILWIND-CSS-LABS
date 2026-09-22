# Lab 1: JSX, Components, Rendering & Props — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: What is JSX? (Concept)
List three ways JSX differs from plain HTML.

### Exercise 2: One Root Element (Concept)
Why must a component return exactly one root element, and what are the two ways to wrap several siblings?

### Exercise 3: Predict the Output (Code Task)
Given this component:

```jsx
function Welcome({ name = 'friend' }) {
  return <h3>Welcome, {name}!</h3>;
}
```

Write the exact output for each usage:
- `<Welcome name="Asha" />`
- `<Welcome name="Bilal" />`
- `<Welcome />`

### Exercise 4: Write a Component (Code Task)
Write a `Greeting` component that takes a `name` prop and renders `<p>Hello, {name}!</p>`. Then show how to use it once with the name `"Asha"`.

### Exercise 5: Default Props (Code Task)
Modify your `Greeting` component so `name` is optional and falls back to `"World"`. What does `<Greeting />` render?

### Exercise 6: props.children (Concept + Code Task)
Explain what happens to the content written between a component's tags (e.g. between `<Card>` and `</Card>`). Then write a `Card` component that renders a `title` prop inside an `<h3>` and the `{children}` content after it.

### Exercise 7: Component Composition (Applied)
You have `Header`, `Welcome`, `Card`, and `Footer` components. Write an `App` component that composes them in this order: `Header` with `title="My Notes App"`, one `Welcome` with `name="Asha"`, one `Card` containing a paragraph, and a `Footer` with `year={2026}`. Use a fragment `<> ... </>` so the app can return multiple siblings.

### Exercise 8: Passing Prop Values (Applied)
Explain the difference between `<Welcome name="Asha" />` and `<Welcome name={userName} />`. Then explain why rendering the same component twice with different `name` values is better than writing the two headings by hand.

## Answer Key

### Exercise 1 Answer
- **`className`, not `class`** — `class` is a JavaScript keyword, so JSX uses `className` for CSS classes.
- **JavaScript expressions go in curly braces** — `{name}` inserts a value, while plain HTML would need concatenation or a templating library.
- **Component tags start with an uppercase letter** — `<Card>` is your component; `<div>` is an HTML element. Lowercase tags are always treated as HTML.
- **Comments use `{/* ... */}`** — HTML-style `<!-- -->` comments do not work inside JSX.
- **JSX is compiled to JavaScript** — Vite turns JSX into `React.createElement(...)` calls before the browser sees it; HTML is parsed directly by the browser.

(Any three are correct; the first three are the most important.)

### Exercise 2 Answer
React needs one root element because a component must return a single value that React can render into the DOM. To return several siblings, either:
- Wrap them in a **fragment**: `<> ... </>` (short syntax) or `<Fragment> ... </Fragment>`, which adds no extra DOM node, or
- Wrap them in a **single element** like `<div>`, which does add an extra DOM node.

`App` uses the fragment so the page gets `header`, `main`, and `footer` as siblings with no wrapping `<div>`.

### Exercise 3 Answer
- `<Welcome name="Asha" />` → `Welcome, Asha!`
- `<Welcome name="Bilal" />` → `Welcome, Bilal!`
- `<Welcome />` → `Welcome, friend!`

The default `'friend'` only fills the gap when `name` is missing. The same component renders different text because the prop value changes.

### Exercise 4 Answer
```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}
```

Usage inside `App`:

```jsx
<Greeting name="Asha" />
```

This renders `<p>Hello, Asha!</p>`. `({ name })` destructures `props.name` from the props object, and `{name}` inserts the value into the JSX as a JavaScript expression.

### Exercise 5 Answer
```jsx
function Greeting({ name = 'World' }) {
  return <p>Hello, {name}!</p>;
}
```

`<Greeting />` renders `Hello, World!`. A named one still works: `<Greeting name="Asha" />` renders `Hello, Asha!`. The default is applied only when the prop is missing or `undefined` — passing `name=""` would still print an empty greeting because an empty string is a real value.

### Exercise 6 Answer
The content between the opening and closing tags is passed to the component as the special `children` prop, and React renders it exactly where `{children}` appears in the JSX:

```jsx
function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
```

Used as `<Card title="Note"><p>Body text</p></Card>`, the `<p>` lands inside the card while the card's frame (heading, border, background) stays the same. This is what makes `Card` a reusable wrapper.

### Exercise 7 Answer
```jsx
import Header from './Header.jsx';
import Welcome from './Welcome.jsx';
import Card from './Card.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <>
      <Header title="My Notes App" />
      <Welcome name="Asha" />
      <Card title="Note">
        <p>Content between the Card tags.</p>
      </Card>
      <Footer year={2026} />
    </>
  );
}

export default App;
```

`App` composes four smaller components into one screen. The fragment `<> ... </>` is required because `App` returns four sibling elements — without it, JSX would throw an error about missing a single root element.

### Exercise 8 Answer
- `<Welcome name="Asha" />` passes the **string literal** `"Asha"` as the prop.
- `<Welcome name={userName} />` passes the **value of the JavaScript variable** `userName`. The curly braces tell JSX to evaluate an expression instead of treating the text as a literal string.

Rendering `<Welcome name="Asha" />` and `<Welcome name="Bilal" />` is better than writing the two headings by hand because the component is written **once** and reused with different data. If the greeting format changes (e.g. adding a city), you edit `Welcome.jsx` in one place and both headings update — with hand-written HTML you would have to find and edit every copy.