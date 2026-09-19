// async-helpers.js — Promise utilities, built from scratch (Step 3) plus the
// three loaders used in Step 4 to compare sequential and parallel execution.

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const failAfter = (ms, reason = 'failed') => new Promise((_, reject) => {
    setTimeout(() => reject(new Error(reason)), ms);
});

export function timeout(promise, ms) {
    const bomb = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, bomb]);
}

export async function retry(fn, { attempts = 3, waitMs = 50, retryOn = () => true } = {}) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === attempts || !retryOn(error)) break;
            await delay(waitMs);
        }
    }
    throw lastError;
}

export async function measure(label, fn) {
    const started = Date.now();
    const value = await fn();
    return { label, ms: Date.now() - started, value };
}

export async function loadOneByOne(jobs) {
    const results = [];
    for (const job of jobs) {
        results.push(await job());
    }
    return results;
}

export const loadAllAtOnce = (jobs) => Promise.all(jobs.map(job => job()));

export async function loadTheTrap(jobs) {
    const results = [];
    jobs.forEach(async (job) => {
        results.push(await job());
    });
    return results;
}
