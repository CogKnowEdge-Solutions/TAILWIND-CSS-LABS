# Lab 1: Declarations, Scope & Safe Data Rendering — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Prediction (Concept)
What does this snippet print to the console, and why?
```javascript
console.log(x);
var x = 5;
```

### Exercise 2: Prediction (Concept)
What happens when this snippet runs?
```javascript
console.log(y);
let y = 5;
```

### Exercise 3: `const` Behaviour (Concept)
Explain why this works:
```javascript
const arr = [1, 2, 3];
arr.push(4);
```
…but this throws:
```javascript
const n = 5;
n = 6;
```

### Exercise 4: Safe Defaults (Code Task)
Write a one-line expression that reads `settings.theme` and falls back to `'light'` — but only when `theme` is actually missing, never when it is legitimately `''` or `0`. Show the code and state why `settings.theme || 'light'` would not satisfy the requirement.

### Exercise 5: Keep Real Zeros (Code Task)
This code is wrong — when `user.settings.volume` is the real value `0`, it shows `50`. Rewrite the line correctly.
```javascript
const volume = user.settings.volume || 50;
```

### Exercise 6: `||` vs `??` (Concept)
Give a single value of `a` for which `a || 'default'` and `a ?? 'default'` give different results, and say what each evaluates to.

### Exercise 7: Loop Closure Fix (Code Task)
This code logs `3` three times instead of `0, 1, 2`. Fix it by wrapping the push in an IIFE that captures each `i` value, keeping `var`.
```javascript
const fns = [];
for (var i = 0; i < 3; i++) {
    fns.push(() => i);
}
for (const fn of fns) console.log(fn());
```

### Exercise 8: Store Card (Code Task)
Write `renderStoreCard(store)` that returns a multi-line string (template literals, no `+`) showing the name and city, printing `"coordinates not saved"` when `store.coords` is missing. The store may have `coords` equal to `{ lat: 0, lng: 0 }` — that is a valid location and must render.

### Exercise 9: Safe Nested Access (Code Task)
Write a one-line expression that retrieves `user.profile.street`, falling back to `"(no street)"`, using optional chaining so a missing `profile` does not crash. Then write the equivalent using nested ternaries (no `?.`, no `if`).

### Exercise 10: One-Line Banner (Applied Task)
Rewrite this with a single expression using `?.` and ternaries so all three branches keep their exact strings, and add a line that proves your version matches `nestedBanner` for a store with `promo: { active: false }`.
```javascript
function nestedBanner(store) {
    if (store.promo) {
        if (store.promo.active) return '20% off today!';
        return 'Promo has ended';
    }
    return 'No current promo';
}
```

## Answer Key

### Exercise 1 Answer
```javascript
undefined
```
`var x` is hoisted to the top of the scope, so the declaration exists before the `console.log` runs — only the assignment `= 5` waits. Reading an unassigned `var` gives `undefined`, not a crash.

### Exercise 2 Answer
```javascript
ReferenceError: Cannot access 'y' before initialization
```
`let` is also scoped, but it sits in the Temporal Dead Zone until its declaration line executes. Touching it earlier throws `ReferenceError`.

### Exercise 3 Answer
- `const` freezes the **binding**, not the object. `arr.push(4)` mutates the array the binding points to, which is allowed.
- `n = 6` tries to rebind `n` to a different value, which is exactly what `const` forbids → `TypeError: Assignment to constant variable`.

### Exercise 4 Answer
```javascript
const theme = settings.theme ?? 'light';
```
`??` falls back only on `null`/`undefined`. A genuine `''` or `0` is a valid value and is kept. `settings.theme || 'light'` would replace `''` and `0` with the default because they are falsy — wrong when those are real data.

### Exercise 5 Answer
```javascript
const volume = user.settings.volume ?? 50;
```
`??` sees `0` as a real value and returns it; `||` sees `0` as falsy and wrongly substitutes `50`.

### Exercise 6 Answer
```javascript
a = 0;
a || 'default';   // 'default'
a ?? 'default';   // 0
```
Same for `a = false` and `a = ''` — falsy but not nullish. `||` picks the default, `??` keeps the value.

### Exercise 7 Answer
```javascript
const fns = [];
for (var i = 0; i < 3; i++) {
    fns.push((function (idx) {
        return () => idx;
    })(i));
}
for (const fn of fns) console.log(fn());   // 0, 1, 2
```
The IIFE passes each iteration's value as the argument `idx`. Each returned arrow closes over its own `idx` instead of the shared `var i`, so the captured values are `0, 1, 2`.

### Exercise 8 Answer
```javascript
function renderStoreCard(store) {
    const coords = store.coords
        ? `${store.coords.lat}, ${store.coords.lng}`
        : 'coordinates not saved';
    return `${store.name} (${store.city}) — ${coords}`;
}
```
`{ lat: 0, lng: 0 }` is a truthy object, so the ternary renders `"0, 0"`; only a missing `coords` (falsy) hits the fallback.

### Exercise 9 Answer
```javascript
const street = user.profile?.street ?? '(no street)';
```
Nested-ternary equivalent:
```javascript
const street = user.profile
    ? (user.profile.street ?? '(no street)')
    : '(no street)';
```
Both produce the same result and never crash when `profile` is missing.

### Exercise 10 Answer
```javascript
const oneLineBanner = (store) => store.promo?.active
    ? '20% off today!'
    : store.promo ? 'Promo has ended' : 'No current promo';

const store = { promo: { active: false } };
console.log(oneLineBanner(store) === nestedBanner(store)); // true → 'Promo has ended'
```
With `promo` present and `active: false`, the optional chain yields `false` (falsy but defined), so it reaches `store.promo ? 'Promo has ended' : ...` → `'Promo has ended'`. This exactly mirrors the nested `if/else`.