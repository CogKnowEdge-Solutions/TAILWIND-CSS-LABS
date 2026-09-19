// Lab 2: Functions, this & Object Modelling — Shared Utilities
// ShelfWise store-credit backend utilities

var outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

function runUtils() {
    // === Step 1: Function Hoisting ===
    log('\n=== Step 1: Function Hoisting ===');

    log(`basicPrice(100): ${basicPrice(100)}`);

    try {
        log(`discountPrice(100, 20): ${discountPrice(100, 20)}`);
    } catch (error) {
        log(`discountPrice: THROWS ${error.name}`);
    }

    try {
        log(`finalPrice(100): ${finalPrice(100)}`);
    } catch (error) {
        log(`finalPrice: THROWS ${error.name}`);
    }

    function basicPrice(amount) { return amount; }
    const discountPrice = (amount, pct) => amount * (1 - pct / 100);
    const finalPrice = (amount) => amount * 1.08;

    // === Step 2: Arrow Functions ===
    log('\n=== Step 2: Arrow Functions ===');

    const double = x => x * 2;
    const triple = x => x * 3;
    const greet = name => `Hello, ${name}`;
    const add = (a, b) => a + b;
    const isEven = n => n % 2 === 0;

    log(`double(5): ${double(5)}`);
    log(`triple(5): ${triple(5)}`);
    log(`greet("Anshu"): ${greet('Anshu')}`);
    log(`add(3, 4): ${add(3, 4)}`);
    log(`isEven(7): ${isEven(7)}`);

    const product = { price: 25, getPrice: function() { return this.price; } };
    log(`product.getPrice(): ${product.getPrice()}`);
    log('(this one keeps a regular function — arrows do not bind this)');

    // === Step 3: Utility Toolkit ===
    log('\n=== Step 3: Utility Toolkit ===');

    function repeat(times, action) {
        for (let i = 0; i < times; i++) action(i);
    }

    function once(fn) {
        let called = false;
        let result;
        return function (...args) {
            if (!called) {
                result = fn(...args);
                called = true;
            }
            return result;
        };
    }

    function withLogging(fn) {
        return function (...args) {
            const result = fn(...args);
            log(`  ${fn.name}(${args.join(', ')}) → ${result}`);
            return result;
        };
    }

    const applyTax = (rate) => (price) => +(price * (1 + rate)).toFixed(2);

    log('repeat(3):');
    repeat(3, (i) => log(`  iteration ${i}`));

    const setupOnce = once(() => { log('   → setup ran'); return 'ready'; });
    log(`once, call 1: ${setupOnce()}`);
    log(`once, call 2: ${setupOnce()} (cached)`);

    const loggedDouble = withLogging(double);
    loggedDouble(7);

    log(`applyTax(0.08)(100): $${applyTax(0.08)(100)}`);
    log(`applyTax(0.10)(200): $${applyTax(0.10)(200)}`);
}