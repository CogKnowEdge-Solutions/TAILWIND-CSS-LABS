# Lab 3: Functions, Objects & DOM — Assignment

## Exercises

Complete these exercises to test your understanding. Try them without looking back at the lab.

### Exercise 1: Function Basics (Code Task)
Write a function called `square` that takes one number parameter and returns its square (number multiplied by itself). Call it with `5` and log the result.

### Exercise 2: Parameters and Return (Code Task)
Write a function called `fullName` that takes two parameters (`first` and `last`) and returns the full name as a single string. Call it with your first and last name.

### Exercise 3: Arrow Function (Code Task)
Convert this function to an arrow function:
```javascript
function isEven(num) {
    return num % 2 === 0;
}
```
Test it by calling `isEven(4)` and `isEven(7)`.

### Exercise 4: Object Creation (Code Task)
Create an object called `book` with properties: `title`, `author`, `pages`, and a method called `summary` that returns: `"This book has X pages"`.

### Exercise 5: Object Method with `this` (Concept)
Why do we use `this` inside an object method? What would happen if you wrote the method name directly instead of `this.name`?

### Exercise 6: JSON (Code Task)
Create an object called `student` with `name`, `age`, and `grade`. Convert it to JSON with `JSON.stringify()`, then convert it back with `JSON.parse()`. Log both results.

### Exercise 7: DOM — Select and Change (Code Task)
Given this HTML: `<h1 id="heading">Hello</h1>`, write JavaScript to:
1. Select the element using `querySelector`
2. Change its text to "Goodbye"
3. Change its color to green

### Exercise 8: Click Event (Code Task)
Write JavaScript that listens for a click on a button with `id="myBtn"` and logs `"Button was clicked!"` to the console.

### Exercise 9: Mini Project Extension (Applied Task)
Using the Click Counter from the lab as a starting point:
1. Add a second button that resets the counter to 0
2. Add a third button that decrements the counter by 1
3. Display a message like "You clicked a lot!" when the count reaches 10 or more

## Answer Key

### Exercise 1 Answer
```javascript
function square(num) {
    return num * num;
}
console.log(square(5)); // 25
```

### Exercise 2 Answer
```javascript
function fullName(first, last) {
    return `${first} ${last}`;
}
console.log(fullName("Anshu", "Sharma")); // "Anshu Sharma"
```

### Exercise 3 Answer
```javascript
const isEven = (num) => num % 2 === 0;

console.log(isEven(4));  // true
console.log(isEven(7));  // false
```

### Exercise 4 Answer
```javascript
let book = {
    title: "JavaScript Basics",
    author: "John Doe",
    pages: 350,
    summary: function() {
        return `This book has ${this.pages} pages`;
    }
};

console.log(book.summary()); // "This book has 350 pages"
```

### Exercise 5 Answer
`this` refers to the object that owns the method — so `this.name` gets the value of the `name` property from that specific object. If you wrote `person.name` directly instead of `this.name`, the method would only work for that one object and couldn't be reused. `this` makes methods portable across different objects.

### Exercise 6 Answer
```javascript
let student = {
    name: "Anshu",
    age: 20,
    grade: "A"
};

let jsonString = JSON.stringify(student);
console.log(jsonString); // {"name":"Anshu","age":20,"grade":"A"}

let studentObj = JSON.parse(jsonString);
console.log(studentObj.name);  // "Anshu"
console.log(studentObj.grade); // "A"
```

### Exercise 7 Answer
```javascript
let heading = document.querySelector("#heading");
heading.textContent = "Goodbye";
heading.style.color = "green";
```

### Exercise 8 Answer
```javascript
let myBtn = document.querySelector("#myBtn");
myBtn.addEventListener("click", function() {
    console.log("Button was clicked!");
});
```

### Exercise 9 Answer
```javascript
let count = 0;
const countText = document.querySelector("#count");
const incrementBtn = document.querySelector("#counterBtn");
const resetBtn = document.querySelector("#resetBtn");
const decrementBtn = document.querySelector("#decrementBtn");

incrementBtn.addEventListener("click", function() {
    count++;
    updateDisplay();
});

decrementBtn.addEventListener("click", function() {
    count--;
    updateDisplay();
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});

function updateDisplay() {
    countText.textContent = `Clicks: ${count}`;
    if (count >= 10) {
        countText.textContent += " — You clicked a lot!";
    }
}
```
