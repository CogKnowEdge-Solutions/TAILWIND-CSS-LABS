# Lab 3: Typography & Colors — Fonts, Text Styling & Color Palette

Difficulty: Beginner | ~30 min | Requires Lab 2

---

## 1. Problem Statement

Plain text looks boring. Tailwind CSS gives you utility classes to control font size, weight, alignment, text color, background color, and more. In this lab you will style a student profile card using typography and color utilities.

---

## 2. Input Data

No files needed. All content is written directly into the HTML.

---

## 3. Processing

1. Browser loads your HTML file
2. Tailwind CDN scans for utility classes
3. Each class applies a CSS property (size, color, weight, etc.)
4. Page renders with styled text and colors

---

## 4. Output

A student profile card with styled headings, colored text, color shade examples, and a blue background section.

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
| Font size | `text-sm` `text-xl` `text-3xl` `text-5xl` | Make text bigger or smaller |
| Font weight | `font-light` `font-bold` `font-black` | Make text thin or thick |
| Alignment | `text-left` `text-center` `text-right` | Position text horizontally |
| Text color | `text-blue-600` `text-gray-500` | Change text color |
| Background | `bg-blue-100` `bg-yellow-100` | Change element background |
| Underline | `underline` | Add underline to text |
| Letter spacing | `tracking-wide` `tracking-widest` | Space between letters |

### Color Shades

Tailwind uses numbers to show shade intensity:

- `blue-300` = light blue
- `blue-500` = medium blue
- `blue-700` = dark blue

Higher number = darker shade. Same rule applies to all colors.

### Important Rule

The `text-` prefix is used for multiple things:
- `text-4xl` = font size
- `text-blue-600` = text color
- `text-center` = alignment

The complete class name tells Tailwind which property to apply.

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- Tailwind spacing concepts (see Lab 2)

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
  <title>Tailwind Typography Lab</title>
</head>
<body class="bg-gray-100">
</body>
</html>
```

---

## 9. Step-by-Step Instructions

### Step 1: Add a heading

```html
<h1 class="text-3xl font-bold text-center text-blue-700">
  Student Profile
</h1>
```

- `text-3xl` = large text
- `font-bold` = thick text
- `text-center` = centered
- `text-blue-700` = dark blue color

### Step 2: Add a subtitle

```html
<p class="mt-2 text-center text-gray-500">
  B.Tech Computer Science Student
</p>
```

### Step 3: Add a description

```html
<p class="mt-4 text-gray-600">
  I am learning HTML, CSS, JavaScript and Tailwind CSS.
  My goal is to become a skilled web developer.
</p>
```

### Step 4: Show color shades

```html
<p class="text-blue-300">Light Blue — blue-300</p>
<p class="text-blue-500">Medium Blue — blue-500</p>
<p class="text-blue-700">Dark Blue — blue-700</p>
```

### Step 5: Add a link with underline

```html
<a href="#" class="mt-4 inline-block underline text-blue-600">
  View My Profile
</a>
```

### Step 6: Add letter spacing

```html
<h2 class="mt-6 text-xl font-bold tracking-wide">MY SKILLS</h2>
<p class="mt-2 text-gray-600">HTML, CSS, JavaScript and Tailwind CSS</p>
```

### Step 7: Add background section

```html
<div class="mt-6 bg-blue-100 p-6">
  <h2 class="text-2xl font-bold text-blue-700">About Me</h2>
  <p class="mt-2 text-gray-700">I am learning Tailwind CSS step by step.</p>
</div>
```

### Step 8: Open in browser

Save and open `index.html`. You should see a profile card with styled typography and colors.

---

## 10. Optional Exercise

Change `text-blue-700` to `text-green-600` on the heading. Then change `bg-blue-100` to `bg-yellow-100` on the About section. Finally, add `tracking-widest` to the skills heading and observe the wider letter spacing.

---

## 11. What We Learnt

- `text-3xl` `text-5xl` control font size
- `font-bold` `font-light` control font weight
- `text-center` `text-left` control alignment
- `text-blue-600` changes text color
- `bg-blue-100` changes background color
- Color shades like `blue-300` `blue-500` `blue-700` show different intensities
- `underline` adds text decoration
- `tracking-wide` increases letter spacing
- Multiple classes can be combined on one element