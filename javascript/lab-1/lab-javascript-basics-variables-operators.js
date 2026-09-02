// JavaScript Basics, Variables & Operators - Lab 1

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function runExercises() {
    outputEl.textContent = '';
    
    log('=== Exercise 1: Hello JavaScript ===');
    log('Hello, JavaScript!');
    
    log('\n=== Exercise 2: Variables ===');
    let name = 'Anshu';
    const birthYear = 2006;
    log(`Name: ${name}`);
    log(`Birth Year: ${birthYear}`);
    
    log('\n=== Exercise 3: Data Types ===');
    log(`typeof name: ${typeof name}`);
    log(`typeof birthYear: ${typeof birthYear}`);
    
    log('\n=== Exercise 4: Arithmetic Operators ===');
    let a = 10;
    let b = 3;
    log(`a = ${a}, b = ${b}`);
    log(`a + b = ${a + b}`);
    log(`a - b = ${a - b}`);
    log(`a * b = ${a * b}`);
    log(`a / b = ${a / b}`);
    log(`a % b = ${a % b}`);
    
    log('\n=== Exercise 5: Comparison Operators ===');
    let age = 20;
    log(`age === 20: ${age === 20}`);
    log(`age > 18: ${age > 18}`);
    log(`age < 18: ${age < 18}`);
    
    log('\n=== Exercise 6: Logical Operators ===');
    let hasID = true;
    log(`age >= 18 && hasID: ${age >= 18 && hasID}`);
    log(`age >= 18 || hasID: ${age >= 18 || hasID}`);
    
    log('\n=== Exercise 7: Template Literals ===');
    log(`My name is ${name} and I am ${2024 - birthYear} years old.`);
    
    log('\n=== Exercise 8: Const Reassignment Error ===');
    try {
        birthYear = 2007;
    } catch (error) {
        log(`Error: ${error.message}`);
    }
    
    log('\n=== All exercises completed! ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();