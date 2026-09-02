// Lab 4: Arrays & Array Methods

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function runExercises() {
    outputEl.textContent = '';

    // === forEach ===
    log('=== forEach ===');
    let colors = ["Red", "Green", "Blue"];
    colors.forEach(function(color) {
        log(color);
    });

    // === map ===
    log('\n=== map ===');
    let numbers = [1, 2, 3, 4, 5];
    let doubled = numbers.map(function(num) {
        return num * 2;
    });
    log(doubled);  // [2, 4, 6, 8, 10]

    // === filter ===
    log('\n=== filter ===');
    let scores = [85, 42, 93, 67, 71, 88];
    let passing = scores.filter(function(score) {
        return score >= 70;
    });
    log(passing);  // [85, 93, 71, 88]

    // === reduce ===
    log('\n=== reduce ===');
    let prices = [10, 20, 30, 40];
    let total = prices.reduce(function(sum, price) {
        return sum + price;
    }, 0);
    log(total);  // 100

    // === find ===
    log('\n=== find ===');
    let users = ["Anshu", "Rahul", "Priya", "Karan"];
    let found = users.find(function(user) {
        return user.startsWith("P");
    });
    log(found);  // "Priya"

    // === Chaining ===
    log('\n=== Chaining ===');
    let nums = [1, 2, 3, 4, 5, 6];
    let result = nums
        .filter(function(n) { return n % 2 === 0; })
        .map(function(n) { return n * 10; });
    log(result);  // [20, 40, 60]

    // === Arrow Shortcuts ===
    log('\n=== Arrow Shortcuts ===');
    let words = ["hello", "world", "javascript"];
    let upper = words.map(w => w.toUpperCase());
    log(upper);  // ["HELLO", "WORLD", "JAVASCRIPT"]

    let short = words.filter(w => w.length <= 5);
    log(short);  // ["hello", "world"]

    // === Object Array ===
    log('\n=== Object Array ===');
    let students = [
        { name: "Anshu", score: 85 },
        { name: "Rahul", score: 42 },
        { name: "Priya", score: 93 }
    ];
    let topStudents = students
        .filter(s => s.score >= 80)
        .map(s => s.name);
    log(topStudents);  // ["Anshu", "Priya"]

    let avgScore = students
        .reduce(function(sum, s) { return sum + s.score; }, 0) / students.length;
    log(`Average: ${avgScore}`);  // 73.33

    log('\n=== All exercises completed! ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();
