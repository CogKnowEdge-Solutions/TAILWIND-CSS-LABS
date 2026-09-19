// Lab 2: Functions, this & Object Modelling — Pricing System (Class)
// ShelfWise product pricing — modern class-based approach

var outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

function runPricingClass() {
    // === Step 5: Fix Lost this ===
    log('\n=== Step 5: Fix Lost this ===');

    const pricing = {
        base: 100,
        taxRate: 0.08,
        calculate() { return this.base * (1 + this.taxRate); },
        totalFor(quantity) { return this.calculate() * quantity; },
        format(n) { return `$${Number(n).toFixed(2)}`; }
    };

    const calc = pricing.calculate;
    log(`1. Detached method: ${pricing.format(calc())}`);
    log(`   Fix (bind): ${pricing.format(calc.bind(pricing)())}`);

    const runLater = (fn) => fn();
    log(`2. Passed as callback: ${pricing.format(runLater(pricing.calculate))}`);
    log(`   Fix (arrow wrapper): ${pricing.format(runLater(() => pricing.calculate()))}`);

    const items = [100, 200, 50];
    const taxSum = items.reduce((sum, p) => sum + p * (1 + pricing.taxRate), 0);
    log(`3. Fix (arrow in reduce): ${pricing.format(taxSum)}`);

    log(`4. Fix (call): ${pricing.format(pricing.totalFor.call(pricing, 3))}`);
    log(`5. Fix (apply): ${pricing.format(pricing.totalFor.apply(pricing, [3]))}`);

    // === Step 6: Product Pricing (Class) ===
    log('\n=== Step 6: Product Pricing (Class) ===');

    class ProductPricing {
        constructor(name, basePrice, taxRate = 0.08) {
            this.name = name;
            this.basePrice = basePrice;
            this.taxRate = taxRate;
        }
        withTax() {
            return +(this.basePrice * (1 + this.taxRate)).toFixed(2);
        }
        applyDiscount(percent) {
            this.basePrice = +(this.basePrice * (1 - percent / 100)).toFixed(2);
            return this;
        }
        toString() {
            const tax = (this.withTax() - this.basePrice).toFixed(2);
            return `${this.name}: $${this.basePrice.toFixed(2)} (+tax $${tax})`;
        }
    }

    const w1 = new ProductPricing('Widget', 100);
    w1.applyDiscount(10);
    log(`${w1}`);

    const g1 = new ProductPricing('Gadget', 250, 0.10);
    g1.applyDiscount(20);
    log(`${g1}`);

    const b1 = new ProductPricing('Bundle', 300);
    log(`${b1.applyDiscount(10).applyDiscount(5)}`);
}