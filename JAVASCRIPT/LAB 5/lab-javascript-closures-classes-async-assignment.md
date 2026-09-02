# Lab 5: Closures, Classes & Asynchronous JavaScript — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Callback (Code Task)
Write a function called `process` that takes two parameters: a string and a callback function. The function should log the string, then call the callback. Test it by calling `process("Data loaded", function() { console.log("Ready!"); })`.

### Exercise 2: Closure (Code Task)
Write a function called `makeGreeter` that takes a `greeting` parameter and returns an inner function. The inner function takes a `name` parameter and logs the greeting with the name. Test it:
```javascript
const sayHello = makeGreeter("Hello");
sayHello("Anshu");  // "Hello, Anshu"
```

### Exercise 3: Closure Counter (Code Task)
Write a function called `createCounter` that returns an object with `increment()`, `decrement()`, and `getValue()` methods. The counter should start at 0.

### Exercise 4: Class (Code Task)
Create a class called `Student` with:
- A constructor that takes `name` and `grade`
- A method called `isPassing` that returns `true` if grade is 60 or above

### Exercise 5: Class Inheritance (Concept)
What does `extends` do in a class? How do you call the parent class constructor from a child class?

### Exercise 6: Promise (Code Task)
Create a Promise that resolves with the string `"Done!"` after 2 seconds. Use `.then()` to log the result.

### Exercise 7: async/await (Code Task)
Rewrite Exercise 6 using `async/await` instead of `.then()`.

### Exercise 8: Fetch (Code Task)
Use `fetch()` to get data from `https://jsonplaceholder.typicode.com/users`. Log the total number of users. Use `map()` to extract just the names.

### Exercise 9: try/catch (Code Task)
Wrap Exercise 8 in a `try/catch` block. Log `"Failed to fetch users"` if the request fails.

### Exercise 10: Final Project Extension (Applied Task)
Using the quotes API from the lab:
1. Fetch all quotes from `https://type.fit/api/quotes`
2. Use `filter()` to find quotes by authors whose name starts with "A"
3. Use `map()` to extract just the quote text
4. Log the count and the first matching quote

## Answer Key

### Exercise 1 Answer
```javascript
function process(data, callback) {
    console.log(data);
    callback();
}
process("Data loaded", function() {
    console.log("Ready!");
});
// Output: "Data loaded", then "Ready!"
```

### Exercise 2 Answer
```javascript
function makeGreeter(greeting) {
    return function(name) {
        console.log(`${greeting}, ${name}`);
    };
}
const sayHello = makeGreeter("Hello");
sayHello("Anshu");  // "Hello, Anshu"
```

### Exercise 3 Answer
```javascript
function createCounter() {
    let count = 0;
    return {
        increment: function() { count++; },
        decrement: function() { count--; },
        getValue: function() { return count; }
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getValue());  // 2
```

### Exercise 4 Answer
```javascript
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
    isPassing() {
        return this.grade >= 60;
    }
}
const student1 = new Student("Anshu", 85);
console.log(student1.isPassing());  // true
```

### Exercise 5 Answer
- **`extends`** lets a child class inherit properties and methods from a parent class
- **`super()`** in the child constructor calls the parent class constructor
```javascript
class Animal {
    constructor(name) { this.name = name; }
}
class Dog extends Animal {
    constructor(name, breed) {
        super(name);       // calls Animal's constructor
        this.breed = breed;
    }
}
```

### Exercise 6 Answer
```javascript
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Done!");
    }, 2000);
});
promise.then(function(result) {
    console.log(result);  // "Done!" (after 2 seconds)
});
```

### Exercise 7 Answer
```javascript
async function wait() {
    const result = await promise;
    console.log(result);  // "Done!"
}
wait();
```

### Exercise 8 Answer
```javascript
async function getUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(`Total users: ${data.length}`);
    const names = data.map(user => user.name);
    console.log(names);
}
getUsers();
```

### Exercise 9 Answer
```javascript
async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        console.log(`Total users: ${data.length}`);
    } catch (error) {
        console.log("Failed to fetch users");
    }
}
getUsers();
```

### Exercise 10 Answer
```javascript
async function getQuotesByA() {
    try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        const aQuotes = data.filter(q => q.author && q.author.startsWith("A"));
        const texts = aQuotes.map(q => q.text);
        console.log(`Quotes by authors starting with A: ${texts.length}`);
        console.log(`First match: ${texts[0]}`);
    } catch (error) {
        console.log("Error fetching quotes");
    }
}
getQuotesByA();
```
