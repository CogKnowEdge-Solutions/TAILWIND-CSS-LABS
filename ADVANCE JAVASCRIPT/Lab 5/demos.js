// demos.js — the teaching demos for Steps 1-6, kept out of the entry file on
// purpose: a main file that connects modules should not also hold every example.

import { log } from './format.js';
import {
    delay, failAfter, timeout, retry, measure,
    loadOneByOne, loadAllAtOnce, loadTheTrap
} from './async-helpers.js';
import { getUser, getPosts, getTodos, loadUserDashboard } from './api.js';

export function runEventLoopDemo() {
    log('\n=== Step 1: Event Loop output order ===');
    log('1 script start');
    setTimeout(() => log('2 timeout 0'), 0);
    Promise.resolve().then(() => log('3 promise .then'));
    log('4 script end');
    queueMicrotask(() => log('5 queueMicrotask'));
    setTimeout(() => {
        log('6 timeout callback');
        Promise.resolve().then(() => log('7 promise inside timeout'));
    }, 0);
    (async () => {
        log('8 async function body');
        await null;
        log('9 after await');
    })();
    log('10 last sync line');
}

const getUserCb = (id, cb) => getUser(id).then(user => cb(null, user)).catch(cb);
const getPostsCb = (id, cb) => getPosts(id).then(posts => cb(null, posts)).catch(cb);
const getTodosCb = (id, cb) => getTodos(id).then(todos => cb(null, todos)).catch(cb);

export function loadTheCallbackWay(userId, done) {
    getUserCb(userId, (userError, user) => {
        if (userError) return done(userError);
        getPostsCb(user.id, (postsError, posts) => {
            if (postsError) return done(postsError);
            getTodosCb(user.id, (todosError, todos) => {
                if (todosError) return done(todosError);
                done(null, `${user.name}: ${posts.length} posts, ${todos.length} todos`);
            });
        });
    });
}

export const loadThePromiseWay = (userId) => getUser(userId)
    .then(user => Promise.all([getPosts(user.id), getTodos(user.id)])
        .then(([posts, todos]) => `${user.name}: ${posts.length} posts, ${todos.length} todos`))
    .finally(() => log('   promise chain finally() ran'));

export async function loadTheAsyncWay(userId) {
    try {
        const user = await getUser(userId);
        const [posts, todos] = await Promise.all([getPosts(user.id), getTodos(user.id)]);
        return `${user.name}: ${posts.length} posts, ${todos.length} todos`;
    } catch (error) {
        return `FAILED: ${error.message}`;
    } finally {
        log('   async/await finally ran');
    }
}

export async function runPromiseUtilities() {
    log('\n=== Step 3: Promise utilities ===');
    const started = Date.now();
    await delay(120);
    log(`   delay(120) settled after ~${Date.now() - started}ms`);
    await failAfter(40, 'boom').then(
        () => log('   failAfter resolved (unexpected)'),
        error => log(`   failAfter rejected: ${error.message}`)
    );
    await timeout(delay(60), 200).then(() => log('   timeout(60, 200): resolved in time'));
    await timeout(delay(200), 60).catch(error => log(`   timeout(200, 60): ${error.message}`));
    let tries = 0;
    const flaky = () => {
        tries += 1;
        return tries < 3 ? failAfter(20, `hiccup ${tries}`) : Promise.resolve('ok');
    };
    log(`   retry() → ${await retry(flaky, { attempts: 3, waitMs: 30 })} after ${tries} attempts`);
}

export async function runSequentialVsParallel() {
    log('\n=== Step 4: Sequential vs parallel ===');
    const makeJobs = () => Array.from({ length: 5 }, (_, i) => () => delay(200).then(() => `item ${i + 1}`));
    const sequential = await measure('one at a time', () => loadOneByOne(makeJobs()));
    const parallel = await measure('all at once', () => loadAllAtOnce(makeJobs()));
    const trap = await measure('the trap', () => loadTheTrap(makeJobs()));
    log(`   1) one at a time → ${sequential.ms}ms, ${sequential.value.length} results`);
    log(`   2) all at once   → ${parallel.ms}ms, ${parallel.value.length} results`);
    log(`   3) the trap      → ${trap.ms}ms, ${trap.value.length} results (forEach never waited)`);
}

export async function runCombinators() {
    log('\n=== Step 6: Promise combinators ===');
    log(`   all → ${(await Promise.all([delay(30).then(() => 'A'), delay(20).then(() => 'B')])).join(', ')}`);
    const settled = await Promise.allSettled([delay(10).then(() => 'kept'), failAfter(10, 'lost')]);
    log(`   allSettled → ${settled.map(result => result.status).join(', ')}`);
    log(`   any → ${await Promise.any([failAfter(10, 'down'), delay(30).then(() => 'backup')])}`);
    log(`   race → ${await Promise.race([delay(10).then(() => 'fast'), delay(40).then(() => 'slow')])}`);
    await Promise.race([delay(200), failAfter(40, 'race timeout')])
        .catch(error => log(`   race as timeout → ${error.message}`));
}

export async function runLiveDashboard() {
    log('\n=== Step 5: Live user dashboard ===');
    const dashboard = await loadUserDashboard(1);
    log(`   user 1 → ${dashboard.user} (${dashboard.city}): ` +
        `${dashboard.posts} posts, ${dashboard.todos} todos, ${dashboard.done} done`);
    const missing = await loadUserDashboard(9999);
    log(`   user 9999 → notFound=${missing.notFound} (${missing.message})`);
}

export async function runAsyncDemos() {
    runEventLoopDemo();
    await delay(80);
    log('\n=== Step 2: Three async approaches ===');
    await new Promise(resolve => loadTheCallbackWay(1, (error, text) => {
        log(`   callbacks → ${error ? `FAILED: ${error.message}` : text}`);
        resolve();
    }));
    log(`   promise chain → ${await loadThePromiseWay(1)}`);
    log(`   async/await → ${await loadTheAsyncWay(1)}`);
    await runPromiseUtilities();
    await runSequentialVsParallel();
    await runLiveDashboard();
    await runCombinators();
}
