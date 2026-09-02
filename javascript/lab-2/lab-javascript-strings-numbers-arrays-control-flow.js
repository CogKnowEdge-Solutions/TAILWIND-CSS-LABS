// Lab 2: Strings, Numbers, Arrays & Control Flow

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function runExercises() {
    outputEl.textContent = '';

    // === Strings ===
    log('=== Strings ===');
    let name = "anshu";
    log(name.toUpperCase());                // "ANSHU"

    let course = "JavaScript";
    log(course.slice(0, 4));                // "Java"
    log(course.includes("Script"));         // true

    // === Math Object ===
    log('\n=== Math Object ===');
    log(Math.round(4.7));                   // 5
    log(Math.random());                     // random 0–1
    log(Math.max(10, 50, 20));              // 50

    // === Arrays ===
    log('\n=== Arrays ===');
    let foods = ["Pizza", "Pasta", "Burger", "Sushi", "Tacos"];
    log(foods[0]);                          // "Pizza"

    foods.push("Ramen");
    log(foods);

    foods.pop();
    log(foods);

    // === if / else ===
    log('\n=== if / else ===');
    let number = 10;
    if (number > 0) {
        log("Positive");
    } else if (number < 0) {
        log("Negative");
    } else {
        log("Zero");
    }

    // === switch ===
    log('\n=== switch ===');
    let day = 2;
    switch (day) {
        case 1: log("Monday"); break;
        case 2: log("Tuesday"); break;
        case 3: log("Wednesday"); break;
        default: log("Invalid day");
    }

    // === for Loop ===
    log('\n=== for Loop ===');
    for (let i = 1; i <= 5; i++) {
        log(i);
    }

    // === while Loop ===
    log('\n=== while Loop ===');
    let i = 1;
    while (i <= 5) {
        log(i);
        i++;
    }

    // === break ===
    log('\n=== break ===');
    for (let i = 1; i <= 10; i++) {
        if (i === 5) break;
        log(i);
    }

    // === continue ===
    log('\n=== continue ===');
    for (let i = 1; i <= 5; i++) {
        if (i === 3) continue;
        log(i);
    }

    log('\n=== All exercises completed! ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();
