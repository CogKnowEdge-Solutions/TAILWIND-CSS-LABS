# Lab 5: Flexbox Layout — Arranging Elements in Rows & Columns

Difficulty: Beginner | ~30 min | Requires Lab 4

---

## 1. Problem Statement

Stacking elements vertically is easy, but arranging them side by side is harder without a layout system. Flexbox solves this by letting you align, distribute, and wrap elements in rows or columns. In this lab you will arrange three skill cards using Flexbox.

---

## 2. Input Data

No files needed. All content is written directly into the HTML.

---

## 3. Processing

1. Browser loads your HTML file
2. Tailwind CDN applies utility classes
3. `flex` turns the parent into a Flexbox container
4. Children become flex items arranged by the direction and alignment classes

---

## 4. Output

A page with a centered heading and three skill cards arranged horizontally. When the browser narrows, cards wrap to a new row.

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
| Container | `flex` | Turns element into Flexbox container |
| Direction | `flex-row` | Arranges items horizontally |
| Direction | `flex-col` | Arranges items vertically |
| Main axis | `justify-center` | Centers items on main axis |
| Main axis | `justify-between` | Puts space between items |
| Cross axis | `items-center` | Aligns items on cross axis |
| Spacing | `gap-4` | Adds space between children |
| Wrapping | `flex-wrap` | Allows items to move to new rows |

### Flex Container vs Flex Items

- **Flex Container:** The parent element with `flex` class
- **Flex Items:** The direct children inside the container

### Main Axis vs Cross Axis

- **Main Axis:** The direction items flow (left-right for row, top-bottom for column)
- **Cross Axis:** The opposite direction
- `justify-*` controls main axis alignment
- `items-*` controls cross axis alignment

### Memory Trick

```
FLEX = Make a container
ROW = Horizontal
COL = Vertical
JUSTIFY = Main axis
ITEMS = Cross axis
GAP = Space between
WRAP = New row
```

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- Tailwind cards (see Lab 4)

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
  <title>Tailwind Flexbox Lab</title>
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

### Step 2: Create the flex container

```html
<div class="mt-8 flex flex-wrap gap-4 justify-center items-center">
</div>
```

- `flex` — creates Flexbox container
- `flex-wrap` — allows cards to wrap to new rows
- `gap-4` — adds space between cards
- `justify-center` — centers cards horizontally
- `items-center` — aligns cards vertically

### Step 3: Add three cards inside the container

```html
<!-- Card 1 -->
<div class="w-72 bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-blue-600">HTML & CSS</h2>
  <p class="mt-3 text-gray-600">Learn the basic structure and styling of modern websites.</p>
  <button class="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>

<!-- Card 2 -->
<div class="w-72 bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-yellow-600">JavaScript</h2>
  <p class="mt-3 text-gray-600">Learn programming concepts and interactive web development.</p>
  <button class="mt-5 bg-yellow-500 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>

<!-- Card 3 -->
<div class="w-72 bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-purple-600">Tailwind CSS</h2>
  <p class="mt-3 text-gray-600">Build modern user interfaces using utility-first CSS classes.</p>
  <button class="mt-5 bg-purple-600 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>
```

### Step 4: Open in browser

Save and open `index.html`. You should see three cards arranged horizontally. Narrow the browser to see them wrap.

---

## 10. Optional Exercise

Change `flex-row` to `flex-col` and observe the cards stacking vertically. Then change `justify-center` to `justify-between` and notice how space is distributed between the cards.

---

## 11. What We Learnt

- `flex` turns an element into a Flexbox container
- `flex-row` arranges items horizontally, `flex-col` vertically
- `justify-center` centers items on the main axis
- `justify-between` puts maximum space between items
- `items-center` aligns items on the cross axis
- `gap-4` adds consistent spacing between flex children
- `flex-wrap` allows items to move to new rows when space is limited
- Flexbox combines with card patterns from Lab 4 to build real layouts