# Lab 5: Flexbox Layout — Assignment

Complete these exercises to test your understanding of Tailwind Flexbox.

---

## Exercises

### Exercise 1: Flex Container (Concept)

What class turns an element into a Flexbox container? What are the direct children of this container called?

---

### Exercise 2: Class Matching (Concept)

Match each class to what it does:

| Class | What It Does |
|-------|--------------|
| `flex` | |
| `flex-row` | |
| `flex-col` | |
| `justify-center` | |
| `justify-between` | |
| `items-center` | |
| `gap-4` | |
| `flex-wrap` | |

Options: (a) Adds space between children, (b) Allows items to wrap to new rows, (c) Creates Flexbox container, (d) Arranges items vertically, (e) Centers items on main axis, (f) Puts space between items, (g) Aligns items on cross axis, (h) Arranges items horizontally

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe how the three boxes will be arranged:

```html
<div class="flex flex-col gap-4 items-center">
  <div class="bg-blue-200 p-4">Box 1</div>
  <div class="bg-blue-200 p-4">Box 2</div>
  <div class="bg-blue-200 p-4">Box 3</div>
</div>
```

---

### Exercise 4: Write the Classes (Code Task)

Write a `<div>` element that creates a Flexbox container where:
- Items are arranged horizontally
- Items are centered on the main axis
- Items are aligned on the cross axis
- There is spacing of 6 between items
- Items can wrap to new rows

---

### Exercise 5: Main Axis vs Cross Axis (Concept)

What is the difference between `justify-center` and `items-center`? Which axis does each control?

---

### Exercise 6: Build a Flex Layout (Applied)

Create a complete HTML document that contains:
- A heading "My Team" centered with `text-3xl font-bold text-center`
- A flex container with `flex flex-wrap gap-6 justify-center mt-8`
- Three team member cards inside, each with:
  - `w-64 bg-white border border-gray-200 rounded-xl shadow-md p-6`
  - A name using `text-xl font-bold`
  - A role using `mt-2 text-gray-500`

---

### Exercise 7: Fix the Code (Applied)

This HTML has problems. Find and fix them:

```html
<div class="gap-4 justify-center">
  <div class="bg-white p-4">Card 1</div>
  <div class="bg-white p-4">Card 2</div>
  <div class="bg-white p-4">Card 3</div>
</div>
```

---

## Answer Key

### Exercise 1: Flex Container

The `flex` class turns an element into a Flexbox container. The direct children inside this container are called **flex items**.

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `flex` | (c) Creates Flexbox container |
| `flex-row` | (h) Arranges items horizontally |
| `flex-col` | (d) Arranges items vertically |
| `justify-center` | (e) Centers items on main axis |
| `justify-between` | (f) Puts space between items |
| `items-center` | (g) Aligns items on cross axis |
| `gap-4` | (a) Adds space between children |
| `flex-wrap` | (b) Allows items to wrap to new rows |

---

### Exercise 3: Read the Code

The three boxes will be stacked vertically (top to bottom) with spacing between them. Each box will be centered horizontally within the container.

---

### Exercise 4: Write the Classes

```html
<div class="flex flex-row flex-wrap justify-center items-center gap-6"></div>
```

---

### Exercise 5: Main Axis vs Cross Axis

`justify-center` controls alignment on the **main axis** (left-right for rows, top-bottom for columns). `items-center` controls alignment on the **cross axis** (top-bottom for rows, left-right for columns).

---

### Exercise 6: Build a Flex Layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>My Team</title>
</head>
<body class="bg-gray-100">
  <h1 class="mt-10 text-3xl font-bold text-center text-gray-800">My Team</h1>
  <div class="flex flex-wrap gap-6 justify-center mt-8">
    <div class="w-64 bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800">Alice Smith</h2>
      <p class="mt-2 text-gray-500">Frontend Developer</p>
    </div>
    <div class="w-64 bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800">Bob Johnson</h2>
      <p class="mt-2 text-gray-500">Backend Developer</p>
    </div>
    <div class="w-64 bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800">Carol White</h2>
      <p class="mt-2 text-gray-500">UI/UX Designer</p>
    </div>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Code

**Problem:** The container is missing the `flex` class. Without `flex`, the children are not flex items and classes like `gap-4` and `justify-center` will not work as expected.

**Fix:** Add `flex` to the container:

```html
<div class="flex gap-4 justify-center">
```