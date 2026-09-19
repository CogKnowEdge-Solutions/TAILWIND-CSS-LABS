// main.js — the ShelfWise entry point. It connects the modules from all five
// labs and prints the complete live dashboard; the demos live in demos.js.

import { log, title, money } from './format.js';
import { store, orders } from './data.js';
import { report } from './analytics.js';
import { changeCity, uniqueTags, snapshot, addSkill } from './state.js';
import { loadUserDashboard } from './api.js';
import { runAsyncDemos } from './demos.js';

export async function runShelfWise() {
    log(`${title('shelfwise')} — Lab 5: Async JavaScript, APIs & Modules`);

    await runAsyncDemos();

    log('\n=== Step 7: Complete ShelfWise dashboard ===');
    const analytics = report(orders, store);
    log(`   orders ${analytics.orderCount} | revenue ${money(analytics.totalRevenue)} | ` +
        `average ${money(analytics.averageOrderValue)} | units ${analytics.unitsSold}`);
    log(`   best seller ${analytics.bestSeller} | top employee ${analytics.topEmployee}`);
    const updated = changeCity(store, 'Dallas');
    log(`   state update: original ${store.address.city}, updated ${updated.address.city} | ` +
        `unique tags ${uniqueTags(store).join(', ')}`);
    const original = snapshot(store);
    const skilled = addSkill(store, 'e2', 'sales');
    log(`   skills: original ${original.staff[1].skills.join('+')} → updated ${skilled.staff[1].skills.join('+')}`);
    const live = await loadUserDashboard(1);
    log(`   live user: ${live.user} (${live.city}) — ${live.posts} posts, ` +
        `${live.todos} todos, ${live.done} done`);
}

if (typeof document !== 'undefined') {
    document.getElementById('runBtn').addEventListener('click', runShelfWise);
}

runShelfWise().catch(error => log(`FATAL: ${error.message}`));
