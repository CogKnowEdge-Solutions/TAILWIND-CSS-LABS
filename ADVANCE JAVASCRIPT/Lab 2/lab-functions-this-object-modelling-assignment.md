# Lab 2: Functions, `this` & Object Modelling — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Hoisting Prediction (Concept)
What does this snippet do? Predict the output, then explain the difference between the two functions.
```javascript
console.log(f(2));
console.log(g(2));

function f(x) { return x * 10; }
const g = (x) => x * 10;
```

### Exercise 2: Shortest Arrows (Code Task)
Rewrite each as the shortest correct arrow form:
```javascript
function subtract(a, b) { return a - b; }
function plusOne(n) { return n + 1; }
function hello() { return 'hi'; }
```

### Exercise 3: `once` (Code Task)
```javascript
let counter = 0;
const init = once(() => { counter++; return 42; });
console.log(init());   // ?
console.log(init());   // ?
console.log(counter);  // ?
```
Implement `once(fn)` yourself, then say what the three `console.log` lines print.

### Exercise 4: Currying (Code Task)
Write a curried `multiply` such that `multiply(2)(5)` returns `10`, then reuse it to create a `double` function. Show the code and the call `double(5)`.

### Exercise 5: Arrow Constructors (Concept)
What happens when this runs, and why?
```javascript
const Point = (x) => ({ x });
const p = new Point(3);
```

### Exercise 6: Private Counter (Code Task)
Write `createCounter()` that returns an object with `increment()` and `get()`, where the count is stored only inside a closure — prove `counter.count` is `undefined` and `counter.increment()` still works.

### Exercise 7: Fix Lost `this` with `bind` (Code Task)
This returns `NaN`. Fix it in one line using `bind` so `getDouble` returns `10`.
```javascript
const obj = { n: 5, double() { return this.n * 2; } };
const getDouble = obj.double;
```

### Exercise 8: Arrow in `map` (Code Task)
This also breaks. Fix it with an arrow that captures the context object.
```javascript
const ctx = { factor: 3 };
const scaled = [1, 2, 3].map(function (x) { return x * this.factor; });
```

### Exercise 9: `new` Internals (Concept)
Explain, step by step, what `new Product('Widget', 100)` does when `Product` is a constructor function with a `Product.prototype.withTax` method. How does using `class Product { }` change (or not change) that mechanism?

### Exercise 10: Atomic Transfer (Applied Task)
Add `transfer(amount, targetAccount)` to `createAccount()`. Given `a = createAccount('Anshu', 1000)` and `b = createAccount('Sana', 500)`, what must `a.transfer(300, b)` return, and what are the two balances afterwards? What happens (what is returned, and what changes) when you then call `a.transfer(9999, b)`? Include a guard so a failed transfer changes **nothing**.

## Answer Key

### Exercise 1 Answer
```javascript
20
ReferenceError: Cannot access 'g' before initialization
```
`f` is a function **declaration**, fully hoisted — callable anywhere in its scope. `g` is an **arrow** assigned to a `const`; the binding stays in the Temporal Dead Zone until its line runs, so calling it earlier throws `ReferenceError`.

### Exercise 2 Answer
```javascript
const subtract = (a, b) => a - b;
const plusOne = n => n + 1;
const hello = () => 'hi';
```
One expression → drop `function` and `return`. Single parameter → parentheses optional (keep them with zero or multiple parameters, or with defaults/rest).

### Exercise 3 Answer
Implementation:
```javascript
function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            result = fn(...args);
            called = true;
        }
        return result;
    };
}
```
Output:
```javascript
42
42
1
```
The closure remembers `called` and `result`. The first call runs `fn` (bumping `counter` to `1`) and captures `42`; the second call skips `fn` and returns the cached `42`, so `counter` stays `1`.

### Exercise 4 Answer
```javascript
const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log(double(5));   // 10
```
`multiply(2)` returns a function that closes over `a = 2`; calling that with `5` multiplies by it.

### Exercise 5 Answer
```javascript
TypeError: Point is not a constructor
```
Arrows have **no `this`/`new` target** and cannot be used with `new` (the required internal `[[Construct]]` method is missing). Only regular functions and classes are constructors.

### Exercise 6 Answer
```javascript
function createCounter() {
    let count = 0;
    return {
        increment() { count += 1; return count; },
        get() { return count; }
    };
}

const counter = createCounter();
console.log(counter.count);          // undefined
counter.increment();
console.log(counter.get());          // 1
```
`count` exists only in the closure created by `createCounter`; it is never attached to the returned object, so `counter.count` is `undefined` yet `increment` and `get` still read and change it.

### Exercise 7 Answer
```javascript
const getDouble = obj.double.bind(obj);
console.log(getDouble());            // 10
```
`obj.double` extracted and called bare has no receiver, so `this` is the global object and `this.n` is `undefined`. `bind(obj)` permanently fixes `this` to `obj`.

### Exercise 8 Answer
```javascript
const scaled = [1, 2, 3].map(x => x * ctx.factor);
console.log(scaled);                 // [3, 6, 9]
```
The arrow inherits `this` from the enclosing scope and, importantly, could capture `ctx` directly through the closure — no `this` juggling at all.

### Exercise 9 Answer
For the constructor function, `new Product('Widget', 100)` does four things:
1. Creates a fresh, empty object.
2. Sets its prototype to `Product.prototype`, so it inherits `withTax` (shared, not copied).
3. Calls `Product` with `this` bound to the new object — the constructor's assignments land on it.
4. Returns that object (the default return when the constructor returns nothing).

A `class Product { constructor(...) {} withTax() {} }` performs **exactly the same** steps — `class` is syntactic sugar for `constructor function + prototype`. The only differences are cosmetic (cleaner syntax) and legal (a class requires `new`).

### Exercise 10 Answer
```javascript
function createAccount(owner, initialBalance) {
    let balance = initialBalance;
    const history = [];

    function transfer(amount, targetAccount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        history.push({ type: 'transfer out', amount, balance });
        targetAccount.deposit(amount);
        return true;
    }

    return {
        transfer,
        deposit(amount) {
            if (amount <= 0) return false;
            balance += amount;
            history.push({ type: 'deposit', amount, balance });
            return true;
        },
        withdraw(amount) { /* same shape as deposit */ },
        getBalance() { return balance; },
        getHistory() { return [...history]; }
    };
}

const a = createAccount('Anshu', 1000);
const b = createAccount('Sana', 500);
console.log(a.transfer(300, b));   // true
console.log(a.getBalance());       // 700
console.log(b.getBalance());       // 800
console.log(a.transfer(9999, b));  // false
console.log(a.getBalance());       // 700 (unchanged)
console.log(b.getBalance());       // 800 (unchanged)
```
The `if` guard runs **before** anything is mutated, so an invalid or too-large transfer returns `false` and both balances and both histories stay exactly as they were — the transfer is atomic. `balance` still lives only inside the closure, so `a.balance` remains `undefined`.