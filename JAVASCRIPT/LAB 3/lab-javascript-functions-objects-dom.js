// Lab 3: Functions, Objects & DOM — Mini Project

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function runExercises() {
    outputEl.textContent = '';

    // === Basic Function ===
    log('=== Functions ===');
    function greet() {
        console.log("Hello!");
    }
    greet();

    // === Parameters ===
    function greetName(name) {
        console.log(`Hello ${name}`);
    }
    greetName("Anshu");

    // === Return ===
    function add(a, b) {
        return a + b;
    }
    log(add(10, 20));       // 30

    // === Arrow Function ===
    log('\n=== Arrow Functions ===');
    const multiply = (a, b) => a * b;
    log(multiply(4, 5));    // 20

    // === Objects ===
    log('\n=== Objects ===');
    let person = {
        name: "Anshu",
        age: 20,
        city: "Indore",
        introduce: function() {
            return `My name is ${this.name}`;
        }
    };
    log(person.name);           // "Anshu"
    log(person.age);            // 20
    log(person.introduce());    // "My name is Anshu"

    // === JSON ===
    log('\n=== JSON ===');
    let jsonData = JSON.stringify(person);
    log(jsonData);

    let newPerson = JSON.parse(jsonData);
    log(newPerson.name);        // "Anshu"

    // === DOM ===
    log('\n=== DOM ===');
    let title = document.querySelector("#title");
    title.textContent = "Functions, Objects & DOM";
    title.style.color = "blue";
    log("Page heading updated!");

    // === Click Counter ===
    log('\n=== Click Counter ===');
    let count = 0;
    const counterBtn = document.querySelector("#counterBtn");
    const countText = document.querySelector("#count");

    counterBtn.addEventListener("click", function() {
        count++;
        countText.textContent = `Clicks: ${count}`;
        console.log(`Clicked! Count: ${count}`);
    });

    log("Click the 'Click Me' button to test the counter!");

    log('\n=== All exercises completed! ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();
