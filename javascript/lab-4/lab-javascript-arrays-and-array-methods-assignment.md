# Lab 4: Arrays & Array Methods — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: forEach (Code Task)
Create an array of three fruits. Use `forEach` to log each fruit to the console.

### Exercise 2: map (Code Task)
Create an array `[1, 2, 3, 4, 5]`. Use `map` to create a new array where each number is squared. Log the result.

### Exercise 3: filter (Code Task)
Create an array `[10, 15, 20, 25, 30]`. Use `filter` to create a new array containing only numbers greater than 20. Log the result.

### Exercise 4: reduce (Code Task)
Create an array `[5, 10, 15, 20]`. Use `reduce` to calculate the total sum. Log the result.

### Exercise 5: find (Code Task)
Create an array `["apple", "banana", "cherry", "date"]`. Use `find` to get the first fruit that starts with "b". Log the result.

### Exercise 6: Chaining (Code Task)
Create an array `[1, 2, 3, 4, 5, 6, 7, 8]`. Chain `filter` and `map` to:
1. Keep only odd numbers
2. Multiply each by 3
Log the result.

### Exercise 7: Object Array (Code Task)
Create an array of objects: `[{name: "A", age: 25}, {name: "B", age: 17}, {name: "C", age: 30}]`. Use `filter` to get only people aged 18 or above, then use `map` to extract their names.

### Exercise 8: Concept Question
What is the difference between `map` and `forEach`? When would you use one over the other?

### Exercise 9: Arrow Function (Code Task)
Rewrite Exercise 2's `map` using an arrow function in one line.

## Answer Key

### Exercise 1 Answer
```javascript
let fruits = ["apple", "banana", "cherry"];
fruits.forEach(function(fruit) {
    console.log(fruit);
});
// Output: "apple", "banana", "cherry"
```

### Exercise 2 Answer
```javascript
let numbers = [1, 2, 3, 4, 5];
let squared = numbers.map(function(num) {
    return num * num;
});
console.log(squared);  // [1, 4, 9, 16, 25]
```

### Exercise 3 Answer
```javascript
let nums = [10, 15, 20, 25, 30];
let big = nums.filter(function(num) {
    return num > 20;
});
console.log(big);  // [25, 30]
```

### Exercise 4 Answer
```javascript
let nums = [5, 10, 15, 20];
let total = nums.reduce(function(sum, num) {
    return sum + num;
}, 0);
console.log(total);  // 50
```

### Exercise 5 Answer
```javascript
let fruits = ["apple", "banana", "cherry", "date"];
let found = fruits.find(function(fruit) {
    return fruit.startsWith("b");
});
console.log(found);  // "banana"
```

### Exercise 6 Answer
```javascript
let nums = [1, 2, 3, 4, 5, 6, 7, 8];
let result = nums
    .filter(function(n) { return n % 2 !== 0; })  // [1, 3, 5, 7]
    .map(function(n) { return n * 3; });            // [3, 9, 15, 21]
console.log(result);  // [3, 9, 15, 21]
```

### Exercise 7 Answer
```javascript
let people = [{name: "A", age: 25}, {name: "B", age: 17}, {name: "C", age: 30}];
let adults = people
    .filter(function(p) { return p.age >= 18; })
    .map(function(p) { return p.name; });
console.log(adults);  // ["A", "C"]
```

### Exercise 8 Answer
- **`forEach`** runs a function on each item but returns `undefined` — use it when you want to *do something* with each item (like logging) but don't need a new array.
- **`map`** runs a function on each item and returns a **new array** with the results — use it when you want to *transform* every item into something new.
- If you're not creating a new array, use `forEach`. If you are, use `map`.

### Exercise 9 Answer
```javascript
let numbers = [1, 2, 3, 4, 5];
let squared = numbers.map(n => n * n);
console.log(squared);  // [1, 4, 9, 16, 25]
```
