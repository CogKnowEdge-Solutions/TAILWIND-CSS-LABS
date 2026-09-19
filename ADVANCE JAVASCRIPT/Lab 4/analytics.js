// Lab 4: Array Transformation Pipelines & Aggregation
// ShelfWise sales analytics dashboard — everything from raw orders, in the browser

const outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

const store = {
    name: 'ShelfWise Austin',
    products: [
        { id: 'w1', name: 'Widget', price: 30 },
        { id: 'g1', name: 'Gadget', price: 45 },
        { id: 'c1', name: 'Charger', price: 15 },
        { id: 'p1', name: 'Power Bank', price: 60 },
        { id: 's1', name: 'Smart Sensor', price: 25 }
    ],
    employees: [
        { id: 'e1', name: 'Maya', role: 'manager' },
        { id: 'e2', name: 'Anshu', role: 'designer' },
        { id: 'e3', name: 'Sana', role: 'stock' }
    ]
};

const orders = [
    { id: 'o1', employeeId: 'e1', items: [{ productId: 'w1', qty: 2 }, { productId: 'g1', qty: 1 }] },
    { id: 'o2', employeeId: 'e3', items: [{ productId: 's1', qty: 1 }] },
    { id: 'o3', employeeId: 'e2', items: [{ productId: 'c1', qty: 5 }] },
    { id: 'o4', employeeId: 'e1', items: [{ productId: 'p1', qty: 1 }] },
    { id: 'o5', employeeId: 'e3', items: [{ productId: 'g1', qty: 3 }] },
    { id: 'o6', employeeId: 'e2', items: [{ productId: 'w1', qty: 1 }] }
];

const productOf = (id) => store.products.find(p => p.id === id);
const orderValue = (order) => order.items.reduce(
    (total, it) => total + (productOf(it.productId)?.price ?? 0) * it.qty, 0);

function report(orders, store) {
    const orderValue = (o) => o.items.reduce(
        (total, it) => total + (store.products.find(p => p.id === it.productId)?.price ?? 0) * it.qty, 0);
    const orderCount = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + orderValue(o), 0);
    const bestSeller = orderCount === 0 ? null : store.products
        .map(p => ({ name: p.name, qty: orders.flatMap(o => o.items).filter(i => i.productId === p.id).reduce((s, i) => s + i.qty, 0) }))
        .reduce((best, p) => (p.qty > best.qty ? p : best));
    const topEmployee = orderCount === 0 ? null : store.employees
        .map(e => ({ name: e.name, revenue: orders.filter(o => o.employeeId === e.id).reduce((s, o) => s + orderValue(o), 0) }))
        .reduce((top, e) => (e.revenue > top.revenue ? e : top));
    return {
        orderCount,
        totalRevenue,
        averageOrderValue: orderCount ? +(totalRevenue / orderCount).toFixed(2) : 0,
        bestSeller: bestSeller ? bestSeller.name : null,
        topEmployee: topEmployee ? topEmployee.name : null
    };
}

function runAnalytics() {
    log('\n=== Step 1: Choose the Correct Array Method ===');
    log(`1. Total revenue → ${orders.reduce((sum, o) => sum + orderValue(o), 0)}`);
    log(`2. Orders handled by Maya → ${orders.filter(o => o.employeeId === 'e1').length}`);
    log(`3. Find order 'o3' → ${JSON.stringify(orders.find(o => o.id === 'o3'))}`);
    log(`4. Any order worth more than $100 → ${orders.some(o => orderValue(o) > 100)}`);
    log(`5. Every order has at least one item → ${orders.every(o => o.items.length > 0)}`);
    log(`6. Widgets sold → ${orders.flatMap(o => o.items).filter(i => i.productId === 'w1').reduce((s, i) => s + i.qty, 0)}`);
    log(`7. Product names → ${store.products.map(p => p.name).join(', ')}`);
    log(`8. Cheapest product → ${store.products.reduce((a, b) => a.price < b.price ? a : b).name}`);
    log(`9. First order containing a Smart Sensor → ${orders.find(o => o.items.some(i => i.productId === 's1')).id}`);
    log(`10. Every clerk exists → ${orders.every(o => store.employees.some(e => e.id === o.employeeId))}`);

    log('\n=== Step 2: Array Pipelines (one line each) ===');
    log(`1. Revenue per order → ${orders.map(o => orderValue(o))}`);
    log(`2. Total units sold → ${orders.flatMap(o => o.items).reduce((s, i) => s + i.qty, 0)}`);
    log(`3. Orders worth over $100 → ${orders.filter(o => orderValue(o) > 100).map(o => o.id)}`);
    log(`4. Sorted unique product names → ${[...new Set(orders.flatMap(o => o.items).map(i => productOf(i.productId).name))].sort()}`);
    log(`5. Highest-value order → ${orders.reduce((best, o) => orderValue(o) > orderValue(best) ? o : best).id}`);
    log(`6. Units sold per product → ${store.products.map(p => `${p.name}: ${orders.flatMap(o => o.items).filter(i => i.productId === p.id).reduce((s, i) => s + i.qty, 0)}`)}`);

    log('\n=== Step 3: reduce() builds four things ===');
    log(`1. Number — total units: ${orders.reduce((tot, o) => tot + o.items.reduce((s, i) => s + i.qty, 0), 0)}`);
    log(`2. Object — qty per product: ${JSON.stringify(orders.reduce((group, o) => o.items.reduce((g, i) => ({ ...g, [i.productId]: (g[i.productId] || 0) + i.qty }), group), {}))}`);
    log(`3. Object — orders per employee: ${JSON.stringify(orders.reduce((c, o) => ({ ...c, [o.employeeId]: (c[o.employeeId] || 0) + 1 }), {}))}`);
    log(`4. String — receipt: ${orders[0].items.reduce((text, i) => text + `${i.qty}× ${productOf(i.productId).name} — $${(productOf(i.productId).price * i.qty).toFixed(2)}\n`, '')}`);

    log('\n=== Step 4: Mutation vs New Arrays ===');
    const testMutation = (name, apply) => {
        const source = [3, 1, 2];
        const before = source.toString();
        apply(source);
        log(`  ${name}: ${source.toString() === before ? 'returns new — original intact' : 'MUTATES original'}`);
    };
    testMutation('push', a => a.push(4));
    testMutation('pop', a => a.pop());
    testMutation('shift', a => a.shift());
    testMutation('unshift', a => a.unshift(0));
    testMutation('splice', a => a.splice(0, 1));
    testMutation('reverse', a => a.reverse());
    testMutation('sort', a => a.sort());
    testMutation('map', a => a.map(x => x * 2));
    testMutation('filter', a => a.filter(x => x > 1));
    testMutation('slice', a => a.slice(0, 1));
    testMutation('concat', a => a.concat(4));
    testMutation('flatMap', a => a.flatMap(x => [x, x]));
    testMutation('join', a => a.join('-'));
    testMutation('reduce', a => a.reduce((s, x) => s + x, 0));
    const catalogueBefore = store.products.map(p => p.name).toString();
    [...store.products].sort((a, b) => a.price - b.price);
    log(`Safe sort used a spread copy — live catalogue untouched: ${catalogueBefore === store.products.map(p => p.name).toString()}`);

    log('\n=== Step 5: Dashboard Report ===');
    const dash = report(orders, store);
    log(`Orders: ${dash.orderCount}`);
    log(`Total revenue: $${dash.totalRevenue}`);
    log(`Average order value: $${dash.averageOrderValue}`);
    log(`Best-selling item: ${dash.bestSeller}`);
    log(`Top employee (by revenue): ${dash.topEmployee}`);
    const empty = report([], store);
    log(`Empty orders → orders: ${empty.orderCount}, revenue: $${empty.totalRevenue}, avg: $${empty.averageOrderValue}, best: ${empty.bestSeller}, top: ${empty.topEmployee}`);
}

document.getElementById('runBtn').addEventListener('click', runAnalytics);
runAnalytics();