# Lab 2: Spacing & Sizing — Assignment

Complete these exercises to test your understanding of Tailwind spacing and sizing.

---

## Exercises

### Exercise 1: Padding vs Margin (Concept)

Explain the difference between padding and margin in one sentence each.

---

### Exercise 2: Class Matching (Concept)

Match each class to what it does:

| Class | What It Does |
|-------|--------------|
| `p-6` | |
| `m-4` | |
| `w-64` | |
| `h-32` | |
| `max-w-md` | |
| `mx-auto` | |

Options: (a) Sets height, (b) Centers horizontally, (c) Adds margin outside, (d) Sets maximum width, (e) Sets width, (f) Adds padding inside

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe what the browser will display:

```html
<div class="bg-green-100 p-8 m-6 w-48 h-24 mx-auto">
  <p>Hello World</p>
</div>
```

---

### Exercise 4: Write the Classes (Code Task)

Write a `<div>` element that has:
- Light yellow background
- Padding of 10 on all sides
- Margin of 8 on all sides
- Width of 96
- Height of 48
- Centered horizontally

---

### Exercise 5: Spacing Scale (Concept)

What does the number in `p-6` represent? How does it compare to `p-2`?

---

### Exercise 6: Build a Centered Card (Applied)

Create a complete HTML document that contains a centered card with:
- `bg-blue-100` background
- `p-8` padding
- `m-4` margin
- `w-64` width
- `h-40` height
- `max-w-lg` maximum width
- `mx-auto` horizontal centering
- An `<h2>` with "My Card" using `text-xl font-bold`
- A `<p>` with "Centered and styled" using `mt-2`

---

### Exercise 7: Fix the Code (Applied)

This HTML has problems. Find and fix them:

```html
<div class="bg-red-100 p-100 m-auto w-64 h-32">
  <p>Centered box</p>
</div>
```

---

## Answer Key

### Exercise 1: Padding vs Margin

**Padding** is the space inside an element between its content and its border. **Margin** is the space outside an element that separates it from other elements.

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `p-6` | (f) Adds padding inside |
| `m-4` | (c) Adds margin outside |
| `w-64` | (e) Sets width |
| `h-32` | (a) Sets height |
| `max-w-md` | (d) Sets maximum width |
| `mx-auto` | (b) Centers horizontally |

---

### Exercise 3: Read the Code

The browser displays a light-green box centered on the page. The box has 2rem padding inside, 1.5rem margin outside, is 12rem wide and 6rem tall. Inside the box is the text "Hello World".

---

### Exercise 4: Write the Classes

```html
<div class="bg-yellow-100 p-10 m-8 w-96 h-48 mx-auto"></div>
```

---

### Exercise 5: Spacing Scale

The number `6` in `p-6` represents a value on Tailwind's spacing scale. It equals approximately 24px (1.5rem). `p-2` is smaller (approximately 8px or 0.5rem). Larger numbers mean more space.

---

### Exercise 6: Build a Centered Card

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Centered Card</title>
</head>
<body class="bg-gray-100">
  <div class="bg-blue-100 p-8 m-4 w-64 h-40 max-w-lg mx-auto">
    <h2 class="text-xl font-bold">My Card</h2>
    <p class="mt-2">Centered and styled</p>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Code

1. **Problem:** `p-100` is not a valid Tailwind class. **Fix:** Change to `p-6` or another valid padding class.

2. **Problem:** `m-auto` sets auto margin on all sides, but this doesn't center the element. **Fix:** Change to `mx-auto` for horizontal centering only.