# Lab 2: Strings, Numbers, Arrays & Control Flow — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: String Methods (Code Task)
Create a string `"hello world"` and:
- Convert it to uppercase
- Slice out the word `"world"` using `slice()`
- Check if it includes the word `"Hello"` (capital H) using `includes()`

### Exercise 2: Math Object (Code Task)
Use the `Math` object to:
- Round `8.3` to the nearest integer
- Generate a random number between 0 and 1
- Find the largest value among `7, 42, 19, 85, 3`

### Exercise 3: Arrays (Code Task)
Create an array of three colors. Then:
- Print the first color (index 0)
- Add a fourth color with `push()`
- Remove the last color with `pop()`
- Print the final array

### Exercise 4: if / else (Code Task)
Create a variable `score` with a value of 85. Write an `if / else if / else` chain that prints:
- `"A"` if score >= 90
- `"B"` if score >= 80
- `"C"` if score >= 70
- `"F"` otherwise

### Exercise 5: switch (Code Task)
Create a variable `month` with a number 1–12. Write a `switch` statement that prints the name of that month. Print `"Invalid month"` for any other value.

### Exercise 6: for Loop (Code Task)
Write a `for` loop that prints all even numbers from 2 to 20 (inclusive).

### Exercise 7: while Loop (Code Task)
Write a `while` loop that counts down from 10 to 1, printing each number.

### Exercise 8: break and continue (Code Task)
Write a `for` loop from 1 to 10 that:
- Uses `continue` to skip numbers divisible by 3
- Uses `break` to stop when the number reaches 8

### Exercise 9: Concept Question
What is the difference between `break` and `continue` in a loop? Give an example of when you'd use each.

## Answer Key

### Exercise 1 Answer
```javascript
let text = "hello world";
console.log(text.toUpperCase());    // "HELLO WORLD"
console.log(text.slice(6));         // "world"
console.log(text.includes("Hello")); // false (case-sensitive!)
```

### Exercise 2 Answer
```javascript
console.log(Math.round(8.3));       // 8
console.log(Math.random());         // random number between 0 and 1
console.log(Math.max(7, 42, 19, 85, 3)); // 85
```

### Exercise 3 Answer
```javascript
let colors = ["Red", "Green", "Blue"];
console.log(colors[0]);             // "Red"

colors.push("Yellow");
console.log(colors);                // ["Red", "Green", "Blue", "Yellow"]

colors.pop();
console.log(colors);                // ["Red", "Green", "Blue"]
```

### Exercise 4 Answer
```javascript
let score = 85;
if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else {
    console.log("F");
}
// Output: "B" (because 85 >= 80 but < 90)
```

### Exercise 5 Answer
```javascript
let month = 3;
switch (month) {
    case 1: console.log("January"); break;
    case 2: console.log("February"); break;
    case 3: console.log("March"); break;
    case 4: console.log("April"); break;
    case 5: console.log("May"); break;
    case 6: console.log("June"); break;
    case 7: console.log("July"); break;
    case 8: console.log("August"); break;
    case 9: console.log("September"); break;
    case 10: console.log("October"); break;
    case 11: console.log("November"); break;
    case 12: console.log("December"); break;
    default: console.log("Invalid month");
}
// Output: "March"
```

### Exercise 6 Answer
```javascript
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}
// Output: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
```

### Exercise 7 Answer
```javascript
let i = 10;
while (i >= 1) {
    console.log(i);
    i--;
}
// Output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

### Exercise 8 Answer
```javascript
for (let i = 1; i <= 10; i++) {
    if (i % 3 === 0) continue;  // skip 3, 6, 9
    if (i === 8) break;         // stop at 8
    console.log(i);
}
// Output: 1, 2, 4, 5, 7
```

### Exercise 9 Answer
- **`break`** stops the loop entirely and jumps to the first line after the loop. Use it when you've found what you're looking for and don't need to continue (e.g., searching for an item in a list and stopping once found).
- **`continue`** skips the rest of the current iteration and jumps to the next one. Use it when you want to skip certain values but keep looping (e.g., processing only valid entries and skipping errors).
