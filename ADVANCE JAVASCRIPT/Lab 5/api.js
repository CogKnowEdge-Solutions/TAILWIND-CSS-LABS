// api.js — real API integration against JSONPlaceholder (Step 5)

import { retry } from './async-helpers.js';

const BASE = 'https://jsonplaceholder.typicode.com';

export class NotFoundError extends Error {
    constructor(url) {
        super(`Not found: ${url}`);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

// fetch() only rejects on network failure. An HTTP 404/500 is a *resolved*
// promise, so we have to inspect response.ok and throw ourselves.
export async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) throw new NotFoundError(url);
        throw new Error(`HTTP ${response.status} for ${url}`);
    }
    return response.json();
}

export const getUser = (id) => fetchJson(`${BASE}/users/${id}`);
export const getPosts = (userId) => fetchJson(`${BASE}/posts?userId=${userId}`);
export const getTodos = (userId) => fetchJson(`${BASE}/todos?userId=${userId}`);

const isPermanent = (error) => error instanceof NotFoundError;

export async function loadUserDashboard(userId, { attempts = 3 } = {}) {
    try {
        const [user, posts, todos] = await Promise.all([
            retry(() => getUser(userId), { attempts, retryOn: error => !isPermanent(error) }),
            retry(() => getPosts(userId), { attempts, retryOn: error => !isPermanent(error) }),
            retry(() => getTodos(userId), { attempts, retryOn: error => !isPermanent(error) })
        ]);
        return {
            notFound: false,
            user: user.name,
            city: user.address.city,
            posts: posts.length,
            todos: todos.length,
            done: todos.filter(todo => todo.completed).length
        };
    } catch (error) {
        if (error instanceof NotFoundError) {
            return { notFound: true, message: `No dashboard for user ${userId}` };
        }
        throw error;
    }
}
