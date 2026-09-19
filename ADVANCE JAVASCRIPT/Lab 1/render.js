// Lab 1: Declarations, Scope & Safe Data Rendering
// ShelfWise — Store Profile & Settings Screen

const outputEl = document.getElementById('output');
function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

// Messy API records — some fields missing, some values genuinely 0.
const stores = [
    { id: 1, name: 'Downtown Market', city: 'Austin', coords: { lat: 30.26, lng: -97.74 }, tags: ['organic', 'local'], promo: { active: true } },
    { id: 2, name: 'Riverside Grocery', city: 'Nashville', tags: ['fresh'], promo: { active: false } },
    { id: 3, name: 'Main St. Foods', city: 'Portland', coords: { lat: 45.52, lng: -122.68 }, promo: null },
    { id: 4, name: 'Corner Pantry', city: 'Boise', coords: { lat: 0, lng: 0 } }
];
const users = [
    { id: 1, name: 'Anshu', location: { city: 'Mumbai', coords: { lat: 19.07, lng: 72.87 } }, tags: ['design', 'owner'], contact: { email: 'anshu@shelfwise.app' }, settings: { theme: 'dark', volume: 0, notify: false } },
    { id: 2, name: 'Maya', location: { city: 'Austin', coords: { lat: 0, lng: 0 } }, settings: { volume: 5, notify: true } },
    { id: 3, name: 'Sana', tags: ['owner'] }
];

function runExercises() {
    outputEl.textContent = '';
    const probe = (label, fn) => {
        try {
            log(`  ${label}: ${fn()}`);
        } catch (error) {
            log(`  ${label}: THROWS ${error.name}`);
        }
    };

    // === Step 1: Predict the five snippets, then run ===
    log('\n=== Step 1: var, let, const ===');
    probe('1. var hoisting — undefined before, 10 after', () => {
        var tmp = a, a = 10;
        return `before: ${tmp}, after: ${a}`;
    });
    probe('2. let — accessing b before its line throws', () => {
        let before = b, b = 20;
        return `before: ${before}`;
    });
    probe('3. const — reassigning c throws', () => {
        const c = 30;
        c = 40;
        return 'reassignment worked';
    });
    probe('4. block scope — var survives, let dies', () => {
        if (true) { var d = 50; let e = 60; }
        try { return `e (let) escaped: ${e}`; }
        catch (error) { return `d (var) survived: ${d}, e (let) THROWS ${error.name}`; }
    });
    probe('5. const — the object is mutable, the binding is not', () => {
        const obj = { n: 1 };
        obj.n = 2;
        try { obj = { n: 3 }; }
        catch (error) { return `obj.n mutated to ${obj.n}, rebind THROWS ${error.name}`; }
        return 'rebinding worked';
    });

    log('\n=== Step 2: Notification loop ===');
    const count = 3;
    function notify() {
        const notices = [];
        for (var i = 0; i < count; i++) notices.push(() => `New promotion at ${stores[i].name}`);
        return notices;
    }
    function notifyWithLet() {
        const notices = [];
        for (let i = 0; i < count; i++) notices.push(() => `New promotion at ${stores[i].name}`);
        return notices;
    }
    function notifyWithClosure() {
        const notices = [];
        for (var i = 0; i < count; i++) notices.push((function (idx) {
            return () => `New promotion at ${stores[idx].name}`;
        })(i));
        return notices;
    }
    const show = (title, getNotices) => {
        log(title);
        for (const notice of getNotices()) log(`  ${notice()}`);
    };
    show('Buggy — expected the first 3 stores, got:', notify);
    show('Fix 1 — let (block scoped):', notifyWithLet);
    show('Fix 2 — IIFE closure:', notifyWithClosure);
    log('\n=== Step 3: Store cards ===');
    function renderStoreCard(store) {
        const coords = store.coords
            ? `${store.coords.lat}, ${store.coords.lng}`
            : 'coordinates not saved';
        const tags = store.tags && store.tags.length > 0
            ? store.tags.join(', ')
            : 'no tags yet';
        return `--------------------------------------------
${store.name}
City: ${store.city}
Coordinates: ${coords}
Tags: ${tags}
--------------------------------------------`;
    }
    for (const store of stores) log(renderStoreCard(store));
    log('\n=== Step 4: Settings ===');
    function settingsSummary(user) {
        const settings = user.settings ?? {};
        const theme = settings.theme ?? 'light';
        const volume = settings.volume ?? 50;
        const notify = settings.notify ?? true;
        return `${user.name}: theme=${theme}, volume=${volume}, notifications=${notify ? 'on' : 'off'}`;
    }
    for (const user of users) log(`  ${settingsSummary(user)}`);

    log(`  || destroys real 0 → volume ${users[0].settings.volume || 50} (should be 0)`);
    log(`  ?? keeps real 0    → volume ${users[0].settings.volume ?? 50} (is 0)`);
    log(`  || flips false     → notify ${users[0].settings.notify || true} (should be false)`);
    log(`  ?? keeps false     → notify ${users[0].settings.notify ?? true} (is false)`);
    log('\n=== Step 5: User summaries ===');
    function summarise(user) {
        const city = user.location?.city ?? 'unknown city';
        const coords = user.location?.coords
            ? `${user.location.coords.lat}, ${user.location.coords.lng}`
            : 'no coordinates';
        const firstTag = user.tags?.[0] ?? 'no tags';
        const contact = user.contact?.email ?? user.contact?.phone ?? 'no contact saved';
        return `${user.name}: ${city}, ${coords}, first tag: ${firstTag}, contact: ${contact}`;
    }
    for (const user of users) log(`  ${summarise(user)}`);
    log('\n=== Step 6: Access banner ===');
    function nestedBanner(store) {
        let banner;
        if (store.promo) {
            if (store.promo.active) banner = '20% off today!';
            else banner = 'Promo has ended';
        } else banner = 'No current promo';
        return banner;
    }
    const oneLineBanner = (store) => store.promo?.active
        ? '20% off today!'
        : store.promo ? 'Promo has ended' : 'No current promo';
    for (const store of stores) {
        log(`  ${store.name}: ${oneLineBanner(store)} (matches nested: ${nestedBanner(store) === oneLineBanner(store)})`);
    }

    log('\n=== All records rendered without crashing ===');
}

document.getElementById('runBtn').addEventListener('click', runExercises);

runExercises();