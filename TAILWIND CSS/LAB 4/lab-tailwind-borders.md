# Lab 4: Backgrounds, Borders & Shadows — Making Elements Look Like Cards

Difficulty: Beginner | ~30 min | Requires Lab 3

---

## 1. Problem Statement

Plain HTML elements look flat and boring. Tailwind CSS gives you utility classes to add backgrounds, borders, rounded corners, and shadows. In this lab you will learn how to transform a simple `<div>` into an attractive card component.

---

## 2. Input Data

No files needed. All content is written directly into the HTML.

---

## 3. Processing

1. Browser loads your HTML file
2. Tailwind CDN scans for utility classes
3. Each class applies a CSS property (background, border, shadow, etc.)
4. Page renders with styled card component

---

## 4. Output

A light-gray page with a centered white card that has a border, rounded corners, shadow, and padding.

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
| Background | `bg-white` `bg-blue-100` | Sets background color |
| Border | `border` `border-2` `border-4` | Adds border with width |
| Border color | `border-gray-200` `border-blue-500` | Changes border color |
| Rounded | `rounded` `rounded-lg` `rounded-xl` | Rounds corners |
| Full round | `rounded-full` | Makes circular/pill shape |
| Shadow | `shadow` `shadow-md` `shadow-lg` | Adds box shadow |
| Padding | `p-6` | Adds inner spacing |

### The Card Pattern

A basic card combines these classes:

```
bg-white + border + border-gray-200 + rounded-xl + shadow-md + p-6
```

This is the reusable pattern you will use for cards.

### Visual Breakdown

```
bg-white          → Background color
border            → Border line
border-gray-200   → Border color
rounded-xl        → Rounded corners
shadow-md         → Shadow depth
p-6               → Inner spacing
```

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- Tailwind spacing and typography (see Labs 2-3)

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
  <title>Tailwind Borders Lab</title>
</head>
<body class="bg-gray-100">
</body>
</html>
```

---

## 9. Step-by-Step Instructions

### Step 1: Create the page background

The `<body>` already has `bg-gray-100`. This makes the white card stand out.

### Step 2: Create the card container

```html
<div class="max-w-md mx-auto mt-10">
</div>
```

- `max-w-md` limits width
- `mx-auto` centers horizontally
- `mt-10` adds space above

### Step 3: Add the card background

```html
<div class="bg-white">
  Card content here
</div>
```

### Step 4: Add a border

```html
<div class="bg-white border border-gray-200">
  Card content here
</div>
```

- `border` adds the border line
- `border-gray-200` sets a light gray color

### Step 5: Round the corners

```html
<div class="bg-white border border-gray-200 rounded-xl">
  Card content here
</div>
```

### Step 6: Add shadow

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md">
  Card content here
</div>
```

### Step 7: Add padding

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
  Card content here
</div>
```

### Step 8: Add profile content

```html
<div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
  <h1 class="text-3xl font-bold text-gray-800">Student Profile</h1>
  <p class="mt-2 text-blue-600 font-semibold">B.Tech Computer Science Student</p>
  <p class="mt-4 text-gray-600">I am learning Tailwind CSS and building modern web interfaces.</p>
  <button class="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg">View Profile</button>
</div>
```

### Step 9: Open in browser

Save and open `index.html`. You should see a centered white card with border, rounded corners, shadow, and padding.

---

## 10. Optional Exercise

Change `bg-white` to `bg-blue-50`. Then change `border-gray-200` to `border-blue-300`. Finally, change `shadow-md` to `shadow-lg` and observe the larger shadow.

---

## 11. What We Learnt

- `bg-white` sets background color
- `border` adds a border line around an element
- `border-gray-200` changes the border color
- `rounded-xl` rounds the corners
- `shadow-md` adds a medium box shadow
- `p-6` adds padding inside the card
- The card pattern combines all these classes together
- A white card on a gray background creates visual separation