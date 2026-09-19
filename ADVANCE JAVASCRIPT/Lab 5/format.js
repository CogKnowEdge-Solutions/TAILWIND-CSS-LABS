// format.js — display helpers and the cross-environment logger

export const money = (amount) => `$${Number(amount).toFixed(2)}`;

export const title = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Renders into #output in the browser and falls back to the console in Node.
export function log(message) {
    if (typeof document === 'undefined') {
        console.log(message);
        return;
    }
    const line = document.createElement('div');
    line.textContent = message;
    document.getElementById('output').append(line);
}
