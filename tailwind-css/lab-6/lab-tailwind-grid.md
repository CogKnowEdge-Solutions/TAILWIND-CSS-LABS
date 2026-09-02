# Lab 6: Grid Layout — Building Structured, Multi-Column Sections

Difficulty: Beginner | ~30 min | Requires Lab 5

---

## 1. Problem Statement

Flexbox arranges items in one direction, but sometimes you need a structured grid with rows and columns. CSS Grid solves this by letting you create multi-column layouts with consistent spacing. In this lab you will convert the Flexbox cards from Lab 5 into a Grid layout.

---

## 2. Input Data

No files needed. All content is written directly into the HTML.

---

## 3. Processing

1. Browser loads your HTML file
2. Tailwind CDN applies utility classes
3. `grid` turns the parent into a Grid container
4. `grid-cols-3` creates three equal columns
5. Grid items automatically fill the columns in order

---

## 4. Output

A page with a centered heading and four skill cards arranged in a 3-column grid. The first card spans two columns while the rest occupy one column each.

---

## 5. Tech Stack

- HTML5
- Tailwind CSS v4 (via Play CDN)
- A web browser
- A text editor

---

## 6. Underlying Concepts

### Key Classes

| Category | Class | What It Does |
|----------|-------|--------------|
| Container | `grid` | Turns element into Grid container |
| Columns | `grid-cols-2` | Creates 2 columns |
| Columns | `grid-cols-3` | Creates 3 columns |
| Spacing | `gap-4` | Adds space between rows and columns |
| Horizontal gap | `gap-x-4` | Controls horizontal spacing only |
| Vertical gap | `gap-y-4` | Controls vertical spacing only |
| Column span | `col-span-2` | Makes item occupy 2 columns |

### Grid vs Flexbox

| Feature | Flexbox | Grid |
|---------|---------|------|
| Direction | One-dimensional | Two-dimensional |
| Best for | Small components | Page sections |
| Rows + Columns | Limited | Full control |
| Example | Navigation bar | Card gallery |

Simple rule:
- **Flexbox** = One direction (row OR column)
- **Grid** = Rows AND columns together

### Combining Grid and Flexbox

Use Grid for overall page structure. Use Flexbox inside individual components.

```
PAGE
 |
 +-- GRID (card layout)
 |    |
 |    +-- CARD
 |         |
 |         +-- FLEX (content inside card)
 |
 +-- FOOTER
```

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- Tailwind Flexbox (see Lab 5)

---

## 8. Environment Setup

Create `index.html` with this starter code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Tailwind Grid Lab</title>
</head>
<body class="bg-gray-100">
</body>
</html>
```

---

## 9. Step-by-Step Instructions

### Step 1: Add a heading

```html
<h1 class="mt-10 text-3xl font-bold text-center text-gray-800">My Skills</h1>
```

### Step 2: Create the grid container

```html
<div class="max-w-6xl mx-auto mt-8 grid grid-cols-3 gap-6">
</div>
```

- `max-w-6xl` — limits container width
- `mx-auto` — centers horizontally
- `grid` — creates Grid container
- `grid-cols-3` — creates 3 columns
- `gap-6` — adds space between items

### Step 3: Add the first card (wide card)

```html
<div class="col-span-2 bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-blue-500"></div>
    <h2 class="text-2xl font-bold text-blue-600">HTML & CSS</h2>
  </div>
  <p class="mt-4 text-gray-600">Learn the basic structure and styling of modern websites.</p>
  <button class="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>
```

- `col-span-2` — this card occupies 2 columns
- `flex items-center gap-3` — Flexbox inside the card

### Step 4: Add the second card

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-yellow-600">JavaScript</h2>
  <p class="mt-3 text-gray-600">Learn programming concepts and interactive web development.</p>
  <button class="mt-5 bg-yellow-500 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>
```

### Step 5: Add the third card

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-purple-600">Tailwind CSS</h2>
  <p class="mt-3 text-gray-600">Build modern user interfaces using utility-first CSS classes.</p>
  <button class="mt-5 bg-purple-600 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>
```

### Step 6: Add the fourth card

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-green-600">Python</h2>
  <p class="mt-3 text-gray-600">Learn Python programming and problem-solving concepts.</p>
  <button class="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>
```

### Step 7: Open in browser

Save and open `index.html`. You should see a 3-column grid with the first card spanning two columns.

---

## 10. Optional Exercise

Change `grid-cols-3` to `grid-cols-2` and observe the layout change. Then change `col-span-2` to `col-span-1` on the first card and watch it return to a single column.

---

## 11. What We Learnt

- `grid` turns an element into a Grid container
- `grid-cols-2` creates 2 columns, `grid-cols-3` creates 3 columns
- `gap-4` adds spacing between grid items
- `gap-x-4` controls horizontal spacing, `gap-y-4` controls vertical spacing
- `col-span-2` makes an item occupy 2 columns
- Grid is for two-dimensional layouts (rows + columns)
- Flexbox is for one-dimensional layouts (row or column)
- Grid and Flexbox can work together in the same page