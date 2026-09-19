// data.js — the shared ShelfWise dataset carried through Labs 1-4

export const store = {
    name: 'ShelfWise Austin',
    address: { city: 'Austin', street: '5th Ave' },
    manager: { name: 'Maya', salary: 80000 },
    staff: [
        { id: 'e1', name: 'Maya', role: 'manager', skills: ['ops'] },
        { id: 'e2', name: 'Anshu', role: 'designer', skills: ['design'] },
        { id: 'e3', name: 'Sana', role: 'stock', skills: ['stock'] }
    ],
    products: [
        { id: 'w1', name: 'Widget', price: 30 },
        { id: 'g1', name: 'Gadget', price: 45 },
        { id: 'c1', name: 'Charger', price: 15 },
        { id: 'p1', name: 'Power Bank', price: 60 },
        { id: 's1', name: 'Smart Sensor', price: 25 }
    ],
    tags: ['new', 'popular', 'new']
};

export const orders = [
    { id: 'o1', employeeId: 'e1', items: [{ productId: 'w1', qty: 2 }, { productId: 'g1', qty: 1 }] },
    { id: 'o2', employeeId: 'e3', items: [{ productId: 's1', qty: 1 }] },
    { id: 'o3', employeeId: 'e2', items: [{ productId: 'c1', qty: 5 }] },
    { id: 'o4', employeeId: 'e1', items: [{ productId: 'p1', qty: 1 }] },
    { id: 'o5', employeeId: 'e3', items: [{ productId: 'g1', qty: 3 }] },
    { id: 'o6', employeeId: 'e2', items: [{ productId: 'w1', qty: 1 }] }
];
