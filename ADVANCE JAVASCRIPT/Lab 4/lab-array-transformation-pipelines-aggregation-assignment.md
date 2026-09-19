# Assignment: Lab 4 — Array Transformation Pipelines & Aggregation

Answer each question **before** checking the key at the bottom. Data is the `store` and `orders` from Section 2 of the lab. Method names, not prose, are expected in the answers.

## Exercises

**E1.** How many orders did **Anshu** (`e2`) handle? (One method call, one line.)

**E2.** Is the **Widget** (`w1`) sold in *any* order? Pick the correct prober.

**E3.** Does *every* order reference a clerk listed in `store.employees`? Write the one-liner.

**E4.** One-liner, no loops: total quantity of **Gadgets** (`g1`) sold across all orders.

**E5.** Obtain the `store.products` names sorted by price (ascending) **without** changing the order of `store.products`. Then write the check that proves the catalogue is untouched.

**E6.** One `reduce` that counts how many employees have each `role` in `store.employees` — result is an object like `{ manager: 1, ... }`.

**E7.** One `reduce` that computes the **total revenue** of all orders (line quantity × product price). What number do you get?

**E8.** In the group `reduce, sort, slice, flatMap, push` — which methods mutate the array they run on?

**E9.** `report([], store)` — what is `averageOrderValue`? Why is the `? :` guard in the function essential here?

**E10.** Using the Step 5 approach (per-product totals, then a running max), which product is the **best seller** and what quantity did it sell?

## Answer Key

**E1.**

```javascript
orders.filter(o => o.employeeId === 'e2').length   // → 2
```

**E2.** `some` — you only need *one* order to contain the Widget.

```javascript
orders.some(o => o.items.some(i => i.productId === 'w1'))   // → true
```

**E3.**

```javascript
orders.every(o => store.employees.some(e => e.id === o.employeeId))   // → true
```

**E4.**

```javascript
orders.flatMap(o => o.items).filter(i => i.productId === 'g1').reduce((s, i) => s + i.qty, 0)   // → 4
```

**E5.** Sort a *copy*, never the live array:

```javascript
const namesBefore = store.products.map(p => p.name).toString();
[...store.products].sort((a, b) => a.price - b.price);
namesBefore === store.products.map(p => p.name).toString()   // → true
```

**E6.**

```javascript
store.employees.reduce((c, e) => ({ ...c, [e.role]: (c[e.role] || 0) + 1 }), {})   // → { manager: 1, designer: 1, stock: 1 }
```

**E7.**

```javascript
orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + (store.products.find(p => p.id === i.productId)?.price ?? 0) * i.qty, 0), 0)   // → 430
```

**E8.** `sort` and `push` mutate. `reduce`, `slice`, and `flatMap` do not.

**E9.** `0`. Without the guard, `totalRevenue / orderCount` is `0 / 0` → `NaN`, which would corrupt every dashboard value downstream.

**E10.** **Charger**, with `5` units sold (per-product totals: Widget 3, Gadget 4, Charger 5, Power Bank 1, Smart Sensor 1).