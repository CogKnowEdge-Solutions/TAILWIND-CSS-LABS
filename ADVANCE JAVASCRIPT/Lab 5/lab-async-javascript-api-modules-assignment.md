# Assignment: Lab 5 — Async JavaScript, API Integration & Modules

Answer before checking the key. Where code is expected, keep it to one expression or a short function. `log` is the logger from `format.js`.

## Exercises

**E1.** Predict the exact output order:

```javascript
log('A');
setTimeout(() => log('B'), 0);
Promise.resolve().then(() => log('C'));
(async () => { log('D'); await null; log('E'); })();
log('F');
```

**E2.** Rewrite this callback-style function as a Promise-returning `wait(ms)`:

```javascript
function waitThen(ms, callback) {
    setTimeout(() => callback(`waited ${ms}ms`), ms);
}
```

**E3.** Write `delay(ms)` and `timeout(promise, ms)` — each as a single expression using `new Promise` / `Promise.race`.

**E4.** `loadTheTrap` prints `0ms, 0 results`. Explain why, and give the one-line fix that makes it truly parallel.

**E5.** Choose the combinator for each: (a) load a product *and* its reviews, or fail entirely; (b) run five jobs and report which succeeded and which failed; (c) take whichever of three CDN mirrors answers first; (d) abort a request that takes longer than 3 seconds.

**E6.** What happens when `fetch()` receives an HTTP 404 — does the promise reject? What must your code do?

**E7.** `retry(fn, { attempts: 4 })` — how many times is `fn` called if it always rejects? How many if it rejects twice and then succeeds?

**E8.** A module `math.js` contains `export const add = (a, b) => a + b;`. Write the line that imports it into `main.js` and one example call.

**E9.** What does `loadUserDashboard(9999)` return? Does it throw?

**E10.** Match each export to the lab that introduced it: `report()`, `changeCity()`, `delay()`, `getUser()`, `store`/`orders`.

## Answer Key

**E1.** `A, D, F, C, E, B`. Synchronous code (`A`, the async IIFE body `D`, and `F`) runs first; then microtasks in order (`.then` `C`, then the `await` continuation `E`); then the timer `B`.

**E2.**

```javascript
const wait = (ms) => new Promise(resolve => {
    setTimeout(() => resolve(`waited ${ms}ms`), ms);
});
```

**E3.**

```javascript
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function timeout(promise, ms) {
    const bomb = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms));
    return Promise.race([promise, bomb]);
}
```

**E4.** `jobs.forEach(async job => { results.push(await job()); })` — `forEach` ignores the Promise each async callback returns, so it starts the callbacks, does not wait for them, and returns before any result is pushed. The function returns immediately with an empty array (hence `0ms, 0 results`). Fix: `loadAllAtOnce = (jobs) => Promise.all(jobs.map(job => job()));`

**E5.** (a) `Promise.all` · (b) `Promise.allSettled` · (c) `Promise.any` · (d) `Promise.race` (racing the request against a rejecting 3-second timer).

**E6.** No — `fetch()` rejects only on network failure. A 404 (or 500) is a **resolved** promise, so you must check `response.ok` and throw yourself; otherwise the error body is treated as data.

**E7.** Always rejects → **4** calls. Rejects twice then succeeds → **3** calls (attempts 1 and 2 throw, attempt 3 returns).

**E8.**

```javascript
import { add } from './math.js';

add(2, 3);   // → 5
```

**E9.** `{ notFound: true, message: 'No dashboard for user 9999' }`. It does **not** throw — the 404 becomes a `NotFoundError` inside `fetchJson`, which `loadUserDashboard` catches and converts into a value.

**E10.** `report()` → Lab 4 · `changeCity()` → Lab 3 · `delay()` → Lab 5 · `getUser()` → Lab 5 · `store`/`orders` → Lab 3 (store) / Lab 4 (orders).