// Lab 3: Destructuring, Rest/Spread & Immutable Updates
// ShelfWise shopping cart & undoable admin panel

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

const store = {
    name: 'ShelfWise Austin',
    address: { city: 'Austin', street: '5th Ave' },
    manager: { name: 'Maya', salary: 80000 },
    staff: [{ id: 1, name: 'Anshu', role: 'designer', skills: ['design', 'support'] },
            { id: 2, name: 'Sana', role: 'manager', skills: ['stock'] }],
    stock: [{ name: 'Widget', qty: 10 }, { name: 'Gadget', qty: 4 }],
    tags: ['new', 'popular', 'new', 'popular']
};

// --- helpers the page can use: badge, deepClone and the four pure updaters ---

function badge({ name = 'unknown', role = 'staff', skills = [] } = {}) {
    return `${name} — ${role} (${skills[0] || 'no skills yet'})`;
}

function deepClone(value) {
    if (Array.isArray(value)) return value.map(deepClone);
    if (value && typeof value === 'object') {
        const copy = {};
        for (const key in value) copy[key] = deepClone(value[key]);
        return copy;
    }
    return value;
}

function changeCity(st, city) {
    return { ...st, address: { ...st.address, city } };
}

function restockItem(st, name, qty) {
    return { ...st, stock: st.stock.map(i => i.name === name ? { ...i, qty: i.qty + qty } : i) };
}

function addSkill(st, id, skill) {
    return { ...st, staff: st.staff.map(m => m.id === id ? { ...m, skills: [...m.skills, skill] } : m) };
}

function removeStaff(st, id) {
    return { ...st, staff: st.staff.filter(m => m.id !== id) };
}

function runReview() {
    log('\n=== Step 1: Destructuring ===');
    const { name } = store;
    log(`1. Name: ${name}`);
    const { address: { city } } = store;
    log(`2. Nested city: ${city}`);
    const { address: { city: town } } = store;
    log(`3. Renamed town: ${town}`);
    const { website = 'not set' } = store;
    log(`4. Default: website = ${website}`);
    const [first, second] = store.staff;
    log(`5. Array: first = ${first.name}, second = ${second.name}`);
    const { stock: [{ name: item }] } = store;
    log(`6. First stock item: ${item}`);

    log('\n=== Step 2: badge() ===');
    log(badge(store.staff[0]));
    log(badge(store.staff[1]));
    log(badge());

    log('\n=== Step 3: Rest & Spread ===');
    const sumCart = (...prices) => prices.reduce((a, b) => a + b, 0);
    log(`1. Cart total: $${sumCart(9, 15, 7, 12)}`);
    const { manager: { salary, ...safeManager } } = store;
    log(`2. Salary pulled out (${salary}) → safe rest: ${JSON.stringify(safeManager)}`);
    const moreSettings = { theme: 'dark', currency: 'USD' };
    const settings = { theme: 'light', ...moreSettings };
    log(`3. Merged settings: theme=${settings.theme}, currency=${settings.currency}`);
    const uniqueTags = [...new Set(store.tags)];
    log(`4. Unique tags: ${uniqueTags.join(', ')}`);

    log('\n=== Step 4: Deep clone ===');
    const cart = { items: ['Widget'], address: { city: 'Austin' } };
    const alias = cart;
    alias.address.city = 'Houston';
    log(`BUG: alias is the SAME object → cart city: ${cart.address.city}`);
    const clone = deepClone(cart);
    clone.address.city = 'Denver';
    log(`Fixed: clone is independent → cart: ${cart.address.city}, clone: ${clone.address.city}`);

    log('\n=== Step 5: Pure updates & undo ===');
    const snap1 = deepClone(store);
    const v1 = changeCity(store, 'Dallas');
    const snap2 = deepClone(v1);
    const v2 = restockItem(v1, 'Gadget', 3);
    const v3 = addSkill(v2, 1, 'sales');
    const v4 = removeStaff(v3, 2);
    log(`store untouched: city=${store.address.city}, staff=${store.staff.length}, gadget=${store.stock[1].qty}`);
    log(`v4: city=${v4.address.city}, staff=${v4.staff.length}, skills=${v4.staff[0].skills.join(', ')}, gadget=${v4.stock[1].qty}`);
    log(`v4 is a whole new object, not store: ${v4 !== store}`);
    log(`Undo 1 (restock) → gadget ${snap2.stock[1].qty} | Undo 2 (city) → ${snap1.address.city}`);
}

document.getElementById('runBtn').addEventListener('click', runReview);
runReview();