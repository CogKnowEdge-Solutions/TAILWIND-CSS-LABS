# Lab 6: Grid Layout — Assignment

Complete these exercises to test your understanding of Tailwind CSS Grid.

---

## Exercises

### Exercise 1: Grid vs Flexbox (Concept)

What is the main difference between Grid and Flexbox? When would you use each?

---

### Exercise 2: Class Matching (Concept)

Match each class to what it does:

| Class | What It Does |
|-------|--------------|
| `grid` | |
| `grid-cols-2` | |
| `grid-cols-3` | |
| `gap-4` | |
| `gap-x-4` | |
| `gap-y-4` | |
| `col-span-2` | |

Options: (a) Creates 3 columns, (b) Adds vertical spacing, (c) Creates 2 columns, (d) Makes item span 2 columns, (e) Creates Grid container, (f) Adds horizontal spacing, (g) Adds row and column spacing

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe how the three boxes will be arranged:

```html
<div class="grid grid-cols-2 gap-4">
  <div class="bg-blue-200 p-4">Box 1</div>
  <div class="bg-blue-200 p-4">Box 2</div>
  <div class="bg-blue-200 p-4">Box 3</div>
</div>
```

---

### Exercise 4: Write the Classes (Code Task)

Write a `<div>` element that creates a Grid container with:
- 3 columns
- A gap of 8 between items
- Maximum width of 4xl
- Centered horizontally

---

### Exercise 5: Column Span (Concept)

If a grid has `grid-cols-3`, what does `col-span-2` mean? How many columns does the item occupy?

---

### Exercise 6: Build a Grid Layout (Applied)

Create a complete HTML document that contains:
- A heading "Photo Gallery" centered with `text-3xl font-bold text-center`
- A grid container with `grid grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto`
- Six photo cards inside, each with:
  - `bg-white border border-gray-200 rounded-lg shadow-md p-4`
  - A colored placeholder div using `h-32 rounded-lg bg-blue-200`
  - A caption using `mt-2 text-sm text-gray-600`

---

### Exercise 7: Fix the Code (Applied)

This HTML has problems. Find and fix them:

```html
<div class="grid-cols-3 gap-4">
  <div class="col-span bg-white p-4">Card 1</div>
  <div class="bg-white p-4">Card 2</div>
  <div class="bg-white p-4">Card 3</div>
</div>
```

---

## Answer Key

### Exercise 1: Grid vs Flexbox

**Flexbox** is one-dimensional — it arranges items in a single row or column. Use it for navigation bars, button groups, and small component layouts. **Grid** is two-dimensional — it arranges items in rows and columns together. Use it for card galleries, dashboards, and page sections.

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `grid` | (e) Creates Grid container |
| `grid-cols-2` | (c) Creates 2 columns |
| `grid-cols-3` | (a) Creates 3 columns |
| `gap-4` | (g) Adds row and column spacing |
| `gap-x-4` | (f) Adds horizontal spacing |
| `gap-y-4` | (b) Adds vertical spacing |
| `col-span-2` | (d) Makes item span 2 columns |

---

### Exercise 3: Read the Code

Box 1 and Box 2 appear side by side in the first row. Box 3 appears alone in the second row on the left side. There is spacing between all items.

---

### Exercise 4: Write the Classes

```html
<div class="grid grid-cols-3 gap-8 max-w-4xl mx-auto"></div>
```

---

### Exercise 5: Column Span

`col-span-2` means the item occupies **2 columns** out of the 3 available columns. The item becomes wider than the other items which each occupy 1 column.

---

### Exercise 6: Build a Grid Layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Photo Gallery</title>
</head>
<body class="bg-gray-100">
  <h1 class="mt-10 text-3xl font-bold text-center text-gray-800">Photo Gallery</h1>
  <div class="grid grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-blue-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 1</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-green-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 2</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-yellow-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 3</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-purple-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 4</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-red-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 5</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div class="h-32 rounded-lg bg-pink-200"></div>
      <p class="mt-2 text-sm text-gray-600">Photo 6</p>
    </div>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Code

1. **Problem:** The container is missing the `grid` class. Without `grid`, the children are not grid items and classes like `grid-cols-3` and `gap-4` will not work. **Fix:** Add `grid` to the container: `class="grid grid-cols-3 gap-4"`.

2. **Problem:** `col-span` is not a valid class — it needs a number. **Fix:** Change to `col-span-2` or remove it entirely.