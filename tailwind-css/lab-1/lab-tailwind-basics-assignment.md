# Lab 2: Getting Started with Tailwind CSS — Assignment

Complete these exercises to test your understanding of Tailwind utility classes.

---

## Exercises

### Exercise 1: Utility-First Concept (Concept)

In your own words, explain the difference between traditional CSS and utility-first CSS. Give one advantage of using utility classes directly in HTML.

---

### Exercise 2: Class Matching (Concept)

Match each Tailwind class to what it does:

| Class | What It Does |
|-------|--------------|
| `text-3xl` | |
| `font-bold` | |
| `bg-blue-100` | |
| `mt-4` | |
| `rounded-lg` | |
| `text-gray-700` | |

Options: (a) Makes text bold, (b) Adds margin above, (c) Sets background to light blue, (d) Sets text color to dark gray, (e) Rounds corners, (f) Sets text to extra large

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe what the browser will display:

```html
<h1 class="text-2xl font-semibold text-green-600">Hello World</h1>
<p class="mt-3 text-gray-500">This is a paragraph.</p>
```

---

### Exercise 4: Write the Classes (Code Task)

Write an `<h1>` element with the text "My Page" that is:
- Extra extra large text
- Bold
- Red colored

Use Tailwind classes to achieve this.

---

### Exercise 5: Spacing (Concept)

What is the difference between `p-6` and `mt-6`? When would you use each?

---

### Exercise 6: Build a Welcome Card (Applied)

Create a complete HTML document (with `<!doctype html>`, CDN script, etc.) that contains:

- An `<h1>` with the text "Welcome to My Site" using `text-3xl font-bold text-purple-600`
- A `<p>` with the text "This is my first Tailwind page." using `mt-4 text-gray-600`
- A `<div>` with `bg-purple-100 p-8 rounded-xl` containing:
  - An `<h2>` with "About This Project" using `text-lg font-semibold text-purple-800`
  - A `<p>` with "Learning Tailwind one class at a time." using `mt-2 text-gray-600`

---

### Exercise 7: Fix the Classes (Applied)

This HTML has incorrect Tailwind classes. Identify and fix each problem:

```html
<h1 class="text-3xl font-bold bg-blue-600">Welcome</h1>
<p class="mt-4 text-blue-100">This text is invisible.</p>
<div class="p-100">Too much padding</div>
```

---

## Answer Key

### Exercise 1: Utility-First Concept

**Traditional CSS** writes separate rules in a stylesheet that target elements by selector. **Utility-first CSS** uses small single-purpose classes applied directly in the HTML to build any design. One advantage is speed — you style elements as you write HTML without switching files.

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `text-3xl` | (f) Sets text to extra large |
| `font-bold` | (a) Makes text bold |
| `bg-blue-100` | (c) Sets background to light blue |
| `mt-4` | (b) Adds margin above |
| `rounded-lg` | (e) Rounds corners |
| `text-gray-700` | (d) Sets text color to dark gray |

---

### Exercise 3: Read the Code

The browser displays:
- "Hello World" as a large (extra large) heading in green, with semi-bold weight
- A paragraph below it with a small top margin, in medium gray text: "This is a paragraph."

---

### Exercise 4: Write the Classes

```html
<h1 class="text-2xl font-bold text-red-600">My Page</h1>
```

---

### Exercise 5: Spacing

`p-6` adds **padding inside** the element — it pushes the content away from the element's border. `mt-6` adds **margin above** the element — it pushes the element away from whatever is above it. Use `p-6` when you want space inside a box or card. Use `mt-6` when you want space between elements.

---

### Exercise 6: Build a Welcome Card

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Welcome Card</title>
</head>
<body>
  <h1 class="text-3xl font-bold text-purple-600">Welcome to My Site</h1>
  <p class="mt-4 text-gray-600">This is my first Tailwind page.</p>
  <div class="mt-6 bg-purple-100 p-8 rounded-xl">
    <h2 class="text-lg font-semibold text-purple-800">About This Project</h2>
    <p class="mt-2 text-gray-600">Learning Tailwind one class at a time.</p>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Classes

1. **Problem:** `bg-blue-600` on the `<h1>` makes the background dark blue, hiding the text (no text color is set to contrast it). **Fix:** Change `bg-blue-600` to `text-blue-600` to set the text color instead.

2. **Problem:** `text-blue-100` is very light blue text — nearly invisible on a white background. **Fix:** Change to `text-gray-700` for readable dark gray text.

3. **Problem:** `p-100` is not a valid Tailwind class. **Fix:** Change to a valid class like `p-6` or `p-8`.