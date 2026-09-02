// Lab 5: Closures, Classes & Asynchronous JavaScript

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function runExercises() {
    outputEl.textContent = '';

    // === Callbacks ===
    log('=== Callbacks ===');
    function greet(name, callback) {
        log("Hello " + name);
        callback();
    }
    greet("Anshu", function() {
        log("Task completed!");
    });

    // === Closures ===
    log('\n=== Closures ===');
    function counter() {
        let count = 0;
        return function() {
            count++;
            log(count);
        };
    }
    const myCounter = counter();
    myCounter();  // 1
    myCounter();  // 2
    myCounter();  // 3

    // === Classes ===
    log('\n=== Classes ===');
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
        }
        describe() {
            return `${this.make} ${this.model}`;
        }
    }
    const car1 = new Car("Toyota", "Camry");
    log(car1.describe());  // "Toyota Camry"

    // === Promises ===
    log('\n=== Promises ===');
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task completed!");
        }, 1000);
    });

    promise.then(function(result) {
        log(result);
    });

    // === async/await ===
    log('\n=== async/await ===');
    async function run() {
        const result = await promise;
        log(result);
    }
    run();

    // === Fetch API ===
    log('\n=== Fetch API ===');
    async function getQuotes() {
        try {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            log(`Total quotes: ${data.length}`);

            const quotes = data.map(item => item.text);
            log(`First quote: ${quotes[0]}`);

            const longQuotes = data.filter(q => q.text.length > 100);
            log(`Quotes over 100 chars: ${longQuotes.length}`);
        } catch (error) {
            log("Error: " + error.message);
        }
    }
    getQuotes();

    log('\n=== All exercises completed! ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();
