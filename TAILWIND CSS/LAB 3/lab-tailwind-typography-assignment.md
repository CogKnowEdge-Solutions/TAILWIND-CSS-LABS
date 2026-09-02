# Lab 3: Typography & Colors — Assignment

Complete these exercises to test your understanding of Tailwind typography and colors.

---

## Exercises

### Exercise 1: Font Size vs Text Color (Concept)

Explain the difference between `text-4xl` and `text-blue-600`. What does each class control?

---

### Exercise 2: Class Matching (Concept)

Match each class to what it does:

| Class | What It Does |
|-------|--------------|
| `text-3xl` | |
| `font-bold` | |
| `text-center` | |
| `text-gray-500` | |
| `bg-blue-100` | |
| `tracking-wide` | |
| `underline` | |

Options: (a) Adds underline, (b) Centers text, (c) Sets font size, (d) Makes text bold, (e) Increases letter spacing, (f) Changes text color, (g) Changes background color

---

### Exercise 3: Read the Code (Concept)

Given this HTML, describe what the browser will display:

```html
<h1 class="text-5xl font-light text-center text-green-600 tracking-widest">
  Hello World
</h1>
```

---

### Exercise 4: Write the Classes (Code Task)

Write an `<h1>` element with the text "Welcome" that is:
- Extra large text
- Bold
- Red colored
- Center aligned
- Has wide letter spacing

---

### Exercise 5: Color Shades (Concept)

What is the difference between `blue-300`, `blue-500`, and `blue-700`? Which is darkest?

---

### Exercise 6: Build a Profile Card (Applied)

Create a complete HTML document that contains:
- An `<h1>` with "My Profile" using `text-4xl font-bold text-center text-purple-600`
- A `<p>` with "Web Developer" using `mt-2 text-center text-gray-500`
- A `<p>` with a short bio using `mt-4 text-gray-600`
- Three paragraphs showing `text-green-300`, `text-green-500`, `text-green-700`
- An `<h2>` with "HOBBIES" using `mt-6 text-xl font-bold tracking-wider`
- An `<a>` with "Read More" using `underline text-purple-600`

---

### Exercise 7: Fix the Code (Applied)

This HTML has problems. Find and fix them:

```html
<h1 class="text-blue text-3xl font-bold">Welcome</h1>
<p class="bg-gray text-center">Gray text</p>
<div class="text-red-100 p-6">Red background</div>
```

---

## Answer Key

### Exercise 1: Font Size vs Text Color

`text-4xl` controls **font size** — it makes the text large. `text-blue-600` controls **text color** — it makes the text blue. They are different properties even though both start with `text-`.

---

### Exercise 2: Class Matching

| Class | What It Does |
|-------|--------------|
| `text-3xl` | (c) Sets font size |
| `font-bold` | (d) Makes text bold |
| `text-center` | (b) Centers text |
| `text-gray-500` | (f) Changes text color |
| `bg-blue-100` | (g) Changes background color |
| `tracking-wide` | (e) Increases letter spacing |
| `underline` | (a) Adds underline |

---

### Exercise 3: Read the Code

The browser displays "Hello World" as very large, thin (light weight) green text, centered on the page with wide spacing between each letter.

---

### Exercise 4: Write the Classes

```html
<h1 class="text-5xl font-bold text-red-600 text-center tracking-wide">
  Welcome
</h1>
```

---

### Exercise 5: Color Shades

They are three different shades of blue. `blue-300` is light, `blue-500` is medium, and `blue-700` is the darkest. Higher numbers mean darker shades.

---

### Exercise 6: Build a Profile Card

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <title>My Profile</title>
</head>
<body class="bg-gray-100">
  <div class="max-w-md mx-auto mt-10 bg-white p-6">
    <h1 class="text-4xl font-bold text-center text-purple-600">My Profile</h1>
    <p class="mt-2 text-center text-gray-500">Web Developer</p>
    <p class="mt-4 text-gray-600">I build websites using HTML, CSS, and JavaScript.</p>
    <p class="text-green-300">Light Green — green-300</p>
    <p class="text-green-500">Medium Green — green-500</p>
    <p class="text-green-700">Dark Green — green-700</p>
    <h2 class="mt-6 text-xl font-bold tracking-wider">HOBBIES</h2>
    <a href="#" class="mt-2 inline-block underline text-purple-600">Read More</a>
  </div>
</body>
</html>
```

---

### Exercise 7: Fix the Code

1. **Problem:** `text-blue` is not a valid Tailwind class. **Fix:** Change to `text-blue-600` for a specific shade.

2. **Problem:** `bg-gray` is used for text color — `bg-` sets background, not text. **Fix:** Change to `text-gray-600`.

3. **Problem:** `text-red-100` makes text very light red (hard to read). **Fix:** Change to `bg-red-100` if you want a red background, or `text-red-600` for readable red text.