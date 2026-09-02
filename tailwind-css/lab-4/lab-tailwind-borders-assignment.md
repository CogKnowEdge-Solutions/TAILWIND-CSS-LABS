# Lab 4: Backgrounds, Borders & Shadows — Assignment

Complete these exercises to test your understanding of Tailwind backgrounds, borders, and shadows.

---

## Exercises

### Exercise 1: Card Components (Concept)

List the six Tailwind classes that make up the basic card pattern. What does each class do?

---

### Exercise 2: Class Matching (Concept)

Match each class to what it does:

| Class | What It Does |
|-------|--------------|
| `bg-white` | |
| `border` | |
| `border-gray-200` | |
| `rounded-xl` | |
| `shadow-md` | |
| `p-6` | |

Options: (a) Adds border line, (b) Sets border color, (c) Adds inner spacing, (d) Rounds corners, (e) Adds shadow, (f) Sets background color

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe what the browser will display:

```html
<div class="bg-blue-50 border-2 border-blue-300 rounded-lg shadow-lg p-8">
  <h2 class="text-xl font-bold">Hello Card</h2>
</div>
```

---

### Exercise 4: Write the Classes (Code Task)

Write a `<div>` element that has:
- Green background (`bg-green-50`)
- A green border (`border border-green-300`)
- Large rounded corners (`rounded-2xl`)
- A large shadow (`shadow-lg`)
- Padding of 8 (`p-8`)

---

### Exercise 5: Rounded Corners (Concept)

What is the difference between `rounded`, `rounded-xl`, and `rounded-full`? When would you use each?

---

### Exercise 6: Build a Product Card (Applied)

Create a complete HTML document that contains a centered product card with:
- `bg-white` background
- `border border-gray-200` border
- `rounded-xl` corners
- `shadow-md` shadow
- `p-6` padding
- An `<h2>` with "Wireless Headphones" using `text-2xl font-bold text-gray-800`
- A `<p>` with "$49.99" using `mt-2 text-green-600 font-semibold`
- A `<p>` with a short description using `mt-4 text-gray-600`
- A `<button>` with "Add to Cart" using `mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg`

---

### Exercise 7: Fix the Code (Applied)

This HTML has problems. Find and fix them:

```html
<div class="bg-white border-gray-200 shadow-md p-6">
  <h2 class="text-xl font-bold">Card</h2>
</div>
```

---

## Answer Key

### Exercise 1: Card Components

1. `bg-white` — Sets white background color
2. `border` — Adds a border line
3. `border-gray-200` — Sets light gray border color
4. `rounded-xl` — Rounds the corners
5. `shadow-md` — Adds medium shadow
6. `p-6` — Adds padding inside the card

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `bg-white` | (f) Sets background color |
| `border` | (a) Adds border line |
| `border-gray-200` | (b) Sets border color |
| `rounded-xl` | (d) Rounds corners |
| `shadow-md` | (e) Adds shadow |
| `p-6` | (c) Adds inner spacing |

---

### Exercise 3: Read the Code

The browser displays a blue-tinted card with a thicker blue border, large rounded corners, a strong shadow, and generous padding. Inside the card is the heading "Hello Card" in large bold text.

---

### Exercise 4: Write the Classes

```html
<div class="bg-green-50 border border-green-300 rounded-2xl shadow-lg p-8"></div>
```

---

### Exercise 5: Rounded Corners

- `rounded` — Slightly rounds corners. Use for subtle softness.
- `rounded-xl` — Moderately rounds corners. Use for cards and containers.
- `rounded-full` — Fully rounds corners. Use for circles, pills, badges, and profile images.

---

### Exercise 6: Build a Product Card

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Product Card</title>
</head>
<body class="bg-gray-100">
  <div class="max-w-md mx-auto mt-10">
    <div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800">Wireless Headphones</h2>
      <p class="mt-2 text-green-600 font-semibold">$49.99</p>
      <p class="mt-4 text-gray-600">High-quality wireless headphones with noise cancellation.</p>
      <button class="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg">Add to Cart</button>
    </div>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Code

1. **Problem:** `border-gray-200` sets a border color but no border line is added. **Fix:** Add `border` class to create the border line: `border border-gray-200`.