# Lab 3: Lists, Keys & Forms — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Keys (Concept)
Why does every element rendered by `.map()` need a `key` prop, and why must it not be the array index? Give an example of a failure that a bad key can silently cause.

### Exercise 2: Render a List (Code Task)
Write the `.map()` that renders this array as `<li>`s:

```js
const tasks = [
  { id: 10, title: 'Water the plants' },
  { id: 11, title: 'Reply to emails' },
];
```

What `key` do you use, and what does generated output look like?

### Exercise 3: Controlled or Not (Concept)
A teammate writes `<input value={todo.text} onChange={handleChange} />` and is surprised they can't type. Then they write `<input placeholder="hi" />` with no `value` at all. Which is controlled? What happens in each case and why?

### Exercise 4: One Handler, Two Fields (Code Task)
You manage a `song` state object `{ title: '', genre: '' }`. Write a single `handleChange` that updates `title` when the title input changes and `genre` when that select changes, using the `name` attribute — and only `name`, no `if` statements.

### Exercise 5: preventDefault (Concept)
What does `e.preventDefault()` do in `handleSubmit`, and what happens if you leave it out and click the submit button?

### Exercise 6: Write a Submit Handler (Code Task)
Write `handleSubmit` for a state `todos`. On submit, ignore blank `title`, add `{ id: Date.now(), title }` to the end of the list **without mutating** the old array, and then clear the title. Assume `todo` holds `{ title: '' }`.

### Exercise 7: Bug Hunt (Applied)
Two bugs — explain what goes wrong for each and fix it.

```jsx
// A
<ul>{todos.map((t, i) => <li key={i}>{t.text}</li>)}</ul>

// B
function handleSubmit(e) {
  e.preventDefault();
  todos.push({ id: Date.now(), text: todo.text });
  setTodos(todos);
}
```

### Exercise 8: The Shared Handler's Magic Line (Concept)
Explain `setTodo({ ...todo, [e.target.name]: e.target.value })` piece by piece: what `...todo` keeps, what `[e.target.name]` evaluates to, and why the whole thing needs to be a *new object*.

## Answer Key

### Exercise 1 Answer
`key` is React's identity card for a list element: when the list re-renders, React matches old entries to new ones **by key** and updates only the changed node. Using the array index is wrong because a key must identify the *item*, and an index identifies only the *position* — insert, delete, or reorder and every positional key shifts, so React pairs old and new items wrongly (e.g., the checkbox state of a row "travels" to a different row, or a wrongly-preserved text input). The fix is the item's own stable `id`.

### Exercise 2 Answer
```jsx
<ul>
  {tasks.map((t) => (
    <li key={t.id}>{t.title}</li>
  ))}
</ul>
```

Generated output:

```html
<ul>
  <li>Water the plants</li>
  <li>Reply to emails</li>
</ul>
```

The `key` is `t.id` — the task's own unique number. (It never appears in the DOM.)

### Exercise 3 Answer
- `<input value={todo.text} onChange={handleChange} />` is a **controlled** input — if `handleChange` calls `setTodo`, typing works. If it doesn't (a bug), state never changes, re-render never comes, and `value` snaps the field back to the old state — which is why the teammate "can't type": state must be updated in the handler for a controlled field to accept input.
- `<input placeholder="hi" />` with no `value` is **uncontrolled** — the browser owns the text, so the user *can* type, but React has no knowledge of it and it is lost on submit unless read through a ref. In this course, always use controlled fields so the app truly "knows" the data.

### Exercise 4 Answer
```jsx
const [song, setSong] = useState({ title: '', genre: '' });

function handleChange(e) {
  setSong({ ...song, [e.target.name]: e.target.value });
}

<input name="title" value={song.title} onChange={handleChange} />
<select name="genre" value={song.genre} onChange={handleChange}>
  <option value="Rock">Rock</option>
  <option value="Jazz">Jazz</option>
</select>
```

`e.target.name` is `"title"` or `"genre"` depending on which field changed, and `[e.target.name]` turns that string into the property to update. No branching needed — one function serves both.

### Exercise 5 Answer
`e.preventDefault()` blocks the browser's **default form submission**, which reloads the page with the form data in the URL/request. In a single-page React app a reload would destroy all state and the whole UI. In `handleSubmit` it is always the first call so the rest of the handler runs against a stable page.

### Exercise 6 Answer
```jsx
function handleSubmit(e) {
  e.preventDefault();
  if (!todo.title.trim()) return;
  setTodos([...todos, { id: Date.now(), title: todo.title }]);
  setTodo({ ...todo, title: '' });
}
```

- `!todo.title.trim()` — blank/whitespace subtitles are ignored.
- `[...todos, newTodo]` — a **new array**: old todos copied with the spread, the new one appended at the end; the old `todos` array is never touched (state is only changed through its updater).
- `setTodo({ ...todo, title: '' })` — clears the title, keeping anything else (like a prior selection).

### Exercise 7 Answer
- **Bug A — index key:** `key={i}` identifies position, not item. Deleting/reordering shifts all indexes and React attributes the *old* positioned nodes to the *wrong* items (stale state follows the position, not the data). Fix: `key={t.id}`.
- **Bug B — direct mutation:** `todos.push(...)` **mutates the existing array in place**, then passes the same (already-changed) array reference to `setTodos`. React compares by reference, sees "same array", and **does not re-render** — the list never updates even though the data changed. Fix: build a new array — `setTodos([...todos, { id: Date.now(), text: todo.text }])` — so the reference changes and React re-renders. (Never mutate state directly: the exact rule from Lab 2.)

### Exercise 8 Answer
- `...todo` — the spread copies all *existing* fields of the draft object into the new object, so only one field is changed at a time and the others (like `priority`) survive.
- `[e.target.name]` — computed property syntax. `e.target.name` is the **string** `"text"` (or `"priority"`, or any other `name` you add); putting it in square brackets makes that string the property name being written on the new object.
- Taking the whole object **new** — `{ ...todo, text: newText }` returns a brand-new object instead of editing `todo`. React detects state change by reference, so a fresh object triggers the re-render; editing `todo` in place would leave the exact object reference unchanged and the screen stale — the same immutability rule as arrays in Exercise 2/7.