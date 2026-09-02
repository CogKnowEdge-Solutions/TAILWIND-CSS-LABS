# Lab 2: Spacing & Sizing — Padding, Margin, Width & Height

Difficulty: Beginner | ~30 min | Requires Lab 1

---

## 1. Problem Statement

Without proper spacing, web pages look crowded and hard to read. Tailwind CSS makes spacing easy with utility classes for padding, margin, width, and height. In this lab you will build a centered styled box using these utilities.

---

## 2. Input Data

No files needed. You write all content directly into the HTML.

---

## 3. Processing

1. Browser loads your HTML file
2. Tailwind CDN scans for utility classes
3. Each class applies a CSS property
4. Page renders with spacing and sizing applied

---

## 4. Output

A light-gray page with a blue box that has padding, margin, fixed dimensions, and is centered horizontally.

---

## 5. Tech Stack

- HTML5
- Tailwind CSS v4 (via Play CDN)
- A web browser
- A text editor

---

## 6. Underlying Concepts

### Padding vs Margin

| Concept | Location | Purpose |
|---------|----------|---------|
| Padding | Inside the element | Space between content and border |
| Margin | Outside the element | Space between element and other elements |

### Tailwind Spacing Scale

Common values: `1` ≈ 4px, `2` ≈ 8px, `4` ≈ 16px, `6` ≈ 24px, `8` ≈ 32px

### Key Classes

| Class | What It Does |
|-------|--------------|
| `p-6` | Padding on all sides (inside) |
| `px-6` | Padding left + right |
| `py-6` | Padding top + bottom |
| `m-4` | Margin on all sides (outside) |
| `mx-4` | Margin left + right |
| `my-4` | Margin top + bottom |
| `w-64` | Set width |
| `h-32` | Set height |
| `max-w-md` | Maximum width limit |
| `mx-auto` | Center horizontally |

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- Tailwind CDN setup (see previous lab)

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
  <title>Tailwind Spacing Lab</title>
</head>
<body class="bg-gray-100">
</body>
</html>
```

---

## 9. Step-by-Step Instructions

### Step 1: Create a basic box

```html
<div class="bg-blue-100">Tailwind CSS</div>
```

### Step 2: Add padding (inside space)

```html
<div class="bg-blue-100 p-6">Tailwind CSS</div>
```

### Step 3: Add margin (outside space)

```html
<div class="bg-blue-100 p-6 m-4">Tailwind CSS</div>
```

### Step 4: Set width and height

```html
<div class="bg-blue-100 p-6 m-4 w-64 h-32">Tailwind CSS</div>
```

### Step 5: Add maximum width

```html
<div class="bg-blue-100 p-6 m-4 w-64 h-32 max-w-md">Tailwind CSS</div>
```

### Step 6: Center the box

```html
<div class="bg-blue-100 p-6 m-4 w-64 h-32 max-w-md mx-auto">
  <h1 class="text-xl font-bold">Tailwind CSS</h1>
  <p class="mt-2">Learning Spacing and Sizing</p>
</div>
```

### Step 7: Open in browser

Save and open `index.html`. You should see a centered blue box with padding, margin, and fixed dimensions.

---

## 10. Optional Exercise

Change `p-6` to `p-10` and observe the extra inside space. Then change `m-4` to `m-8` and notice the outside space. Finally, remove `mx-auto` and watch the box move to the left.

---

## 11. What We Learnt

- Padding adds space inside an element
- Margin adds space outside an element
- `p-6` adds padding, `m-4` adds margin
- `w-64` sets width, `h-32` sets height
- `max-w-md` limits how wide an element can grow
- `mx-auto` centers an element horizontally
- The Tailwind spacing scale uses consistent values