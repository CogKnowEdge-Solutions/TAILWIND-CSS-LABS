# Lab 1: Getting Started with Tailwind CSS

Difficulty: Beginner | ~30 min | Requires Lab 1

---

## 1. Problem Statement / Use Case Overview

Writing CSS from scratch is slow. Tailwind CSS fixes this by giving you small utility classes you add directly to your HTML. Instead of writing CSS rules, you just add classes like `text-3xl font-bold text-blue-600` to style elements.

In this lab you will:
- Learn what utility-first CSS means
- Use common Tailwind classes to style text, backgrounds, and spacing
- Build a simple styled welcome page

---

## 2. Input Data

No files needed. You write all content directly into the HTML.

---

## 3. Processing

How Tailwind works with the Play CDN:

1. Browser loads your HTML file
2. Tailwind CDN script runs and scans for class names
3. Each class name gets matched to a CSS property
4. Page renders with styles applied

You style elements by adding one class at a time to HTML tags.

---

## 4. Output

When you open the file in a browser you will see:

- A large blue heading
- A paragraph with gray text
- A light-blue rounded box with a subheading

All styled without writing any CSS file.

---

## 5. Tech Stack

- HTML5
- Tailwind CSS v4 (via Play CDN — no install needed)
- A web browser
- A text editor

---

## 6. Underlying Concepts

### What is Utility-First CSS?

**Traditional CSS:** You write rules in a separate file

```css
.heading {
  font-size: 1.875rem;
  font-weight: 700;
  color: #2563eb;
}
```

**Tailwind CSS:** You add classes directly in HTML

```html
<h1 class="text-3xl font-bold text-blue-600">Welcome</h1>
```

Each class does one thing. You combine them to build any design.

### Common Tailwind Classes

| Category | What It Does | Examples |
|----------|--------------|----------|
| Text size | Make text bigger or smaller | `text-sm` `text-xl` `text-3xl` |
| Font weight | Make text bold or light | `font-normal` `font-semibold` `font-bold` |
| Text color | Change text color | `text-blue-600` `text-gray-700` `text-green-500` |
| Background color | Change element background | `bg-blue-100` `bg-yellow-100` `bg-white` |
| Padding | Add space inside an element | `p-2` `p-6` `p-10` |
| Margin | Add space outside an element | `mt-2` `mt-4` `mt-6` |
| Border radius | Round the corners | `rounded` `rounded-lg` `rounded-full` |

### How Spacing Works

Tailwind uses a number scale for spacing. Bigger number = more space.

- `p-2` = small padding
- `p-6` = medium padding
- `p-10` = large padding

Same scale works for margins: `mt-4` means margin-top 4.

### About the Play CDN

The Play CDN loads Tailwind in your browser. It is for **learning and practice only**. For real projects you would install Tailwind as a build tool.

---

## 7. Prerequisites

- Basic HTML knowledge (see Lab 1)
- A text editor and browser

---

## 8. Environment Setup

1. Create a folder called `lab-tailwind-basics`
2. Create a file called `index.html` inside it
3. Paste this starter code:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>Tailwind Lab</title>
</head>
<body>
  <!-- Your code goes here -->
</body>
</html>
```

No Node.js or npm required. Tailwind runs in the browser.

---

## 9. Step-by-Step Instructions

### Step 1: Create the file

Create `index.html` and paste the starter code above. The `<script>` tag loads Tailwind in your browser.

### Step 2: Add a heading

Inside `<body>`, add this heading with three utility classes:

```html
<h1 class="text-3xl font-bold text-blue-600">
  Welcome to Tailwind CSS
</h1>
```

What each class does:
- `text-3xl` — makes text extra large
- `font-bold` — makes text bold
- `text-blue-600` — makes text blue

### Step 3: Add a paragraph

Add a paragraph below the heading:

```html
<p class="mt-4 text-gray-700">
  I am learning Tailwind CSS step by step.
</p>
```

What each class does:
- `mt-4` — adds space above the paragraph
- `text-gray-700` — makes text dark gray

### Step 4: Add a colored box

Add a `<div>` with background, padding, and rounded corners:

```html
<div class="mt-6 bg-blue-100 p-6 rounded-lg">
  <h2 class="text-xl font-semibold">My First Tailwind Box</h2>
  <p class="mt-2 text-gray-700">Utility classes make styling quick.</p>
</div>
```

What each class does:
- `mt-6` — adds space above the box
- `bg-blue-100` — light blue background
- `p-6` — space inside the box
- `rounded-lg` — rounds the corners

### Step 5: Open in browser

Save the file and open `index.html` in your browser.

You should see a large blue heading, a gray paragraph, and a light-blue box with text inside.

---

## 10. Optional Exercise

Make three changes:
1. Change `text-blue-600` to `text-green-600` on the heading
2. Change `p-6` to `p-10` on the box and notice the extra space
3. Add a second box below with `bg-yellow-100` and different text

---

## 11. What We Learnt

- Utility-first CSS means using small classes instead of writing CSS rules
- Classes go directly in the HTML `class` attribute
- `text-3xl` makes text large, `font-bold` makes it bold
- `text-blue-600` colors text, `bg-blue-100` sets background color
- `p-6` adds padding inside, `mt-4` adds margin above
- `rounded-lg` rounds corners
- The Play CDN lets you practice without installing anything