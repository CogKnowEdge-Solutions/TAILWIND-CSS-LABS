// analytics.js — the Lab 4 report, now a module other modules can import

export const productOf = (store, id) => store.products.find(p => p.id === id);

export const orderValue = (order, store) => order.items.reduce(
    (total, item) => total + (productOf(store, item.productId)?.price ?? 0) * item.qty, 0);

export function report(orders, store) {
    const orderCount = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + orderValue(order, store), 0);
    const bestSeller = orderCount === 0 ? null : store.products
        .map(product => ({
            name: product.name,
            qty: orders.flatMap(order => order.items)
                .filter(item => item.productId === product.id)
                .reduce((sum, item) => sum + item.qty, 0)
        }))
        .reduce((best, product) => (product.qty > best.qty ? product : best));
    const topEmployee = orderCount === 0 ? null : store.staff
        .map(member => ({
            name: member.name,
            revenue: orders.filter(order => order.employeeId === member.id)
                .reduce((sum, order) => sum + orderValue(order, store), 0)
        }))
        .reduce((top, member) => (member.revenue > top.revenue ? member : top));
    return {
        orderCount,
        totalRevenue,
        averageOrderValue: orderCount ? +(totalRevenue / orderCount).toFixed(2) : 0,
        bestSeller: bestSeller ? bestSeller.name : null,
        topEmployee: topEmployee ? topEmployee.name : null,
        unitsSold: orders.flatMap(order => order.items).reduce((sum, item) => sum + item.qty, 0)
    };
}
