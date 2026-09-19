# Lab 3: Destructuring, Rest/Spread & Immutable Updates — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Object Destructuring (Concept)
What is printed, and why?
```javascript
const user = { name: 'Anshu', city: 'Mumbai' };
const { name } = user;
console.log(name);
```

### Exercise 2: Renaming (Code Task)
Using destructuring, store the object's `city` value in a variable called `town`, then print `town`. Do not use `user.city`.
```javascript
const user = { name: 'Sana', city: 'Austin' };
```

### Exercise 3: Default Values (Code Task)
Write one destructuring statement so that `price` is `19.99` when the object has no `price` key, but keeps the real value when it exists.
```javascript
const product = { name: 'Widget' };
```

### Exercise 4: Array Destructuring (Concept)
What is printed?
```javascript
const [first, second, ...rest] = [10, 20, 30, 40];
console.log(first, second, rest);
```

### Exercise 5: Parameter Destructuring (Code Task)
Write a function `intro({ name, age = '?' } = {})` that returns `"I'm <name>, age <age>"`. Call it with `({ name: 'Anshu' })` and with no argument. Show both outputs.

### Exercise 6: Find the Highest Price (Code Task)
Use a rest parameter so `maxPrice` works with any number of arguments and returns the largest. What does `maxPrice(3, 9, 2, 6)` return?
```javascript
// maxPrice(...prices) → ?
```

### Exercise 7: Spread Merge (Code Task)
Merge `base` and `extra` into one object `merged` so `extra` wins on conflicts. What is `merged.currency`?
```javascript
const base = { theme: 'light', currency: 'INR' };
const extra = { currency: 'USD', font: 'large' };
```

### Exercise 8: Shallow Copy Trap (Concept)
Explain why this code ends up printing two different results for `obj`:
```javascript
const obj = { tags: ['a', 'b'] };
const copy = { ...obj };
copy.tags.push('c');
console.log(obj.tags);   // → ['a', 'b', 'c'] — why?
```

### Exercise 9: Deep Clone (Code Task)
Write `deepClone(value)` for any mix of objects and arrays, then verify that modifying `clone.a.b` does **not** change `original.a.b`.

### Exercise 10: Pure Updater (Applied Task)
Write a pure `renameManager(st, newName)` that returns a **new** store whose manager has the new name, without touching the original. Show how you prove `renameManager(store, 'Nina').manager.name === 'Nina'` while `store.manager.name` is unchanged.

## Answer Key

### Exercise 1 Answer
```javascript
Anshu
```
`const { name } = user` reads the `name` property of `user` and creates a variable called `name` with that value — no dot notation needed.

### Exercise 2 Answer
```javascript
const { city: town } = user;
console.log(town);   // Austin
```
The syntax reads `user.city` but assigns it to the new variable name `town`.

### Exercise 3 Answer
```javascript
const { price = 19.99 } = product;
```
When `product` has no `price` key, the default `19.99` is used; when it does, the real value survives (a legit `0` also survives, because the default only applies to a missing key).

### Exercise 4 Answer
```javascript
10 20 [30, 40]
```
Array destructuring matches by position: `first` is index 0 (`10`), `second` is index 1 (`20`), and the rest operator gathers everything from index 2 onward into `[30, 40]`.

### Exercise 5 Answer
```javascript
function intro({ name, age = '?' } = {}) {
    return `I'm ${name}, age ${age}`;
}
console.log(intro({ name: 'Anshu' }));   // I'm Anshu, age ?
console.log(intro());                    // I'm undefined, age ?
```
The `= {}` default means calling with no argument does not crash — destructuring runs against an empty object, so `name` is `undefined` and `age` falls back to `'?'`.

### Exercise 6 Answer
```javascript
const maxPrice = (...prices) => Math.max(...prices);
maxPrice(3, 9, 2, 6);   // 9
```
`...prices` gathers the arguments into an array `[3, 9, 2, 6]`, then the spread `...prices` hands them to `Math.max` one at a time. The rest–spread pair turns "any number of arguments" into "one call".

### Exercise 7 Answer
```javascript
const merged = { ...base, ...extra };
merged.currency;   // 'USD'
```
Spread copies `base`, then overwrites overlapping keys with `extra` — later spreads win, so `currency` is `'USD'` and `theme` stays `'light'`.

### Exercise 8 Answer
`{ ...obj }` is a **shallow** copy: it copies the top level, but `copy.tags` still points at the **same array** as `obj.tags`. `push('c')` mutates that shared array, so the change appears in both. To fix this, copy the array too: `{ ...obj, tags: [...obj.tags] }` (or use a deep clone).

### Exercise 9 Answer
```javascript
function deepClone(value) {
    if (Array.isArray(value)) return value.map(deepClone);
    if (value && typeof value === 'object') {
        const copy = {};
        for (const key in value) copy[key] = deepClone(value[key]);
        return copy;
    }
    return value;
}

const original = { a: { b: 1 } };
const clone = deepClone(original);
clone.a.b = 99;
console.log(original.a.b);   // 1 — untouched
console.log(clone.a.b);      // 99
```
Arrays are rebuilt with `.map(deepClone)` and objects with a `for...in` loop that routes every key through `deepClone` again, so every nested level is its own independent copy.

### Exercise 10 Answer
```javascript
function renameManager(st, newName) {
    return { ...st, manager: { ...st.manager, name: newName } };
}

const store = {
    manager: { name: 'Maya', salary: 80000 },
    stock: [{ name: 'Widget', qty: 10 }]
};

console.log(renameManager(store, 'Nina').manager.name);   // Nina
console.log(store.manager.name);                          // Maya (unchanged)
console.log(store !== renameManager(store, 'Nina'));      // true — a new object
```
The function never assigns to `store`; it builds a fresh object with spread and only replaces the `manager` field. Because `manager` is nested, its own update must also use spread (`{ ...st.manager, name: newName }`) so the original manager is never mutated either.