// Lab 2: Functions, this & Object Modelling — Pricing System (Prototype)
// ShelfWise product pricing — older constructor-function approach

var outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

function runPricingPrototype() {
    // === Step 6: Product Pricing (Prototype) ===
    log('\n=== Step 6: Product Pricing (Prototype) ===');

    function ProductPricing(name, basePrice, taxRate) {
        this.name = name;
        this.basePrice = basePrice;
        this.taxRate = taxRate || 0.08;
    }

    ProductPricing.prototype.withTax = function () {
        return +(this.basePrice * (1 + this.taxRate)).toFixed(2);
    };

    ProductPricing.prototype.applyDiscount = function (percent) {
        this.basePrice = +(this.basePrice * (1 - percent / 100)).toFixed(2);
        return this;
    };

    ProductPricing.prototype.toString = function () {
        const tax = (this.withTax() - this.basePrice).toFixed(2);
        return `${this.name}: $${this.basePrice.toFixed(2)} (+tax $${tax})`;
    };

    const w2 = new ProductPricing('Widget', 100);
    w2.applyDiscount(10);
    log(`${w2}`);

    const g2 = new ProductPricing('Gadget', 250, 0.10);
    g2.applyDiscount(20);
    log(`${g2}`);

    const b2 = new ProductPricing('Bundle', 300);
    log(`${b2.applyDiscount(10).applyDiscount(5)}`);
}