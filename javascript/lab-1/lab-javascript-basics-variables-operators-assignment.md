# Lab 1: JavaScript Basics, Variables & Operators — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Variables (Concept)
What's the difference between `let`, `const`, and `var`? When would you use each?

### Exercise 2: Data Types (Code Task)
Create variables for each data type (string, number, boolean, null, undefined) and use `typeof` to verify each one. Write the code in the browser console.

### Exercise 3: Arithmetic (Code Task)
Create two numbers and calculate:
- Their sum
- Their difference
- Their product
- Their quotient
- The remainder when dividing the first by the second

### Exercise 4: Comparisons (Code Task)
Create two different numbers and test all these comparisons:
- `===` (strict equality)
- `!==` (strict inequality)
- `>` (greater than)
- `<` (less than)
- `>=` (greater than or equal)
- `<=` (less than or equal)

### Exercise 5: Logical Operators (Code Task)
Create two boolean variables and test:
- `&&` (AND) with both true
- `||` (OR) with one true and one false
- `!` (NOT) to flip a boolean

### Exercise 6: Template Literals (Code Task)
Create three variables (your name, age, and favorite color) and use template literals to print: "My name is [name], I'm [age] years old, and my favorite color is [color]."

### Exercise 7: Const Error (Concept)
What happens when you try to reassign a `const` variable? Why does JavaScript prevent this?

## Answer Key

### Exercise 1 Answer
- **`let`**: Use when the value will change (e.g., a counter, user input)
- **`const`**: Use when the value should never change (e.g., configuration, mathematical constants)
- **`var`**: Avoid in modern JavaScript — it has function scope instead of block scope, which can cause unexpected bugs

### Exercise 2 Answer
```javascript
let myString = "Hello";
let myNumber = 42;
let myBoolean = true;
let myNull = null;
let myUndefined; // no value assigned

console.log(typeof myString);    // "string"
console.log(typeof myNumber);    // "number"
console.log(typeof myBoolean);   // "boolean"
console.log(typeof myNull);      // "object" (this is a known JS quirk)
console.log(typeof myUndefined); // "undefined"
```

### Exercise 3 Answer
```javascript
let x = 15;
let y = 4;

console.log(x + y);  // 19 (sum)
console.log(x - y);  // 11 (difference)
console.log(x * y);  // 60 (product)
console.log(x / y);  // 3.75 (quotient)
console.log(x % y);  // 3 (remainder)
```

### Exercise 4 Answer
```javascript
let a = 10;
let b = 20;

console.log(a === b);   // false
console.log(a !== b);   // true
console.log(a > b);     // false
console.log(a < b);     // true
console.log(a >= b);    // false
console.log(a <= b);    // true
```

### Exercise 5 Answer
```javascript
let isRaining = true;
let hasUmbrella = false;

console.log(isRaining && hasUmbrella);  // false (both must be true)
console.log(isRaining || hasUmbrella);  // true (at least one true)
console.log(!isRaining);                // false (flips true to false)
console.log(!hasUmbrella);              // true (flips false to true)
```

### Exercise 6 Answer
```javascript
let name = "Anshu";
let age = 20;
let color = "blue";

console.log(`My name is ${name}, I'm ${age} years old, and my favorite color is ${color}.`);
```

### Exercise 7 Answer
JavaScript throws a `TypeError: Assignment to constant variable`. This prevents accidental changes to values that should remain fixed, like configuration settings or mathematical constants. Once declared with `const`, the variable name is permanently bound to its value.