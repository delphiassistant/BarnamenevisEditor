# BarnamenevisEditor

A lightweight, fully-featured HTML editor built with vanilla JavaScript, jQuery, and Bootstrap 5. BarnamenevisEditor delivers TinyMCE-style authoring with rich formatting tools, RTL support, localization, custom fonts, and modern UX enhancements—no build step required.

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)
![jQuery](https://img.shields.io/badge/jQuery-3.7-blue.svg)

**Live Demo:** [https://delphiassistant.github.io/BarnamenevisEditor/](https://delphiassistant.github.io/BarnamenevisEditor/)

---

## Key Features

- **Rich Formatting:** bold, italic, underline, strike-through, font family/size, text/background color, clear formatting.
- **Layout Tools:** unordered/ordered lists, alignment controls, block & inline direction (LTR/RTL) switches, custom tables.
- **Insertions:** links, images, tables, code view toggle, fullscreen mode, HTML export helper.
- **Productivity:** undo/redo history, keyboard shortcuts, multilingual tooltips and modals, status bar with word/character counts.
- **UX Enhancements:** responsive toolbar that wraps on mobile, dark mode, synced color indicators, customizable palettes, Bootstrap 5 styling.
- **Accessibility:** ARIA-friendly controls, focus outlines, high-contrast & reduced-motion support, RTL aware UI, tooltips with keyboard access.

---

## Quick Start

### 1. Include Dependencies

```html
<!-- Core styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="css/BarnamenevisEditor.css">

<!-- Core scripts -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/BarnamenevisEditor.js"></script>
<script src="js/lang/en.js"></script> <!-- Optional: load languages you need -->
```

### 2. Add a Textarea

```html
<textarea id="postBody">
    <p>Welcome to BarnamenevisEditor!</p>
</textarea>
```

### 3. Initialize

```javascript
$(function () {
    $('#postBody').barnamenevisEditor({
        height: '420px',
        language: 'en',
        showStatusBar: true
    });
});
```

That’s it! The editor replaces the textarea in-place and stores the HTML output alongside the original element for form submissions.

---

## Configuration Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `height` | string | `'400px'` | Height of the editable area. Accepts any valid CSS height. |
| `language` | string | `'en'` | Language code loaded from `window.BarnamenevisEditor.lang`. |
| `toolbar` | string \| array | `'full'` | `'full'`, `'basic'`, `'minimal'`, or custom nested array of button ids. |
| `fontFamilies` | array | internal defaults | Array of strings or `{displayName, value}` objects. Replaces defaults entirely. |
| `fontSizes` | array | `[1,2,3,4,5,6,7]` | Mapping onto browser font size levels (1–7). |
| `colors` | array | 64 preset hex values | Color palette for foreground/background pickers. |
| `showStatusBar` | boolean | `true` | Toggle status bar with word/character counts. |
| `placeholder` | string | `'Start typing…'` | Placeholder shown when editor is empty. |
| `onInit` | function | `null` | Callback fired after editor mounts. Receives editor instance. |
| `onChange` | function | `null` | Fired whenever content changes. Receives HTML string. |

### Example: Custom Toolbar & Fonts

```javascript
$('#newsletter').barnamenevisEditor({
    toolbar: [
        ['undo', 'redo'],
        ['bold', 'italic', 'underline', 'strikethrough'],
        ['forecolor', 'backcolor'],
        ['insertLink', 'insertImage', 'insertTable'],
        ['codeView', 'fullscreen']
    ],
    fontFamilies: [
        'Arial',
        'Georgia',
        { displayName: 'میخک (Mikhak)', value: 'Mikhak, Tahoma, sans-serif' },
        { displayName: 'Roboto', value: 'Roboto, Arial, sans-serif' }
    ]
});
```

---

## API & Events

```javascript
// Instance methods
$('#editor').barnamenevisEditor('getContent');
$('#editor').barnamenevisEditor('setContent', '<p>Hello!</p>');
$('#editor').barnamenevisEditor('getText');
$('#editor').barnamenevisEditor('clear');
$('#editor').barnamenevisEditor('focus');
$('#editor').barnamenevisEditor('disable');
$('#editor').barnamenevisEditor('enable');
$('#editor').barnamenevisEditor('destroy');

// Events (new namespace)
$('#editor')
  .on('barnameneviseditor.init', (evt, instance) => console.log('ready', instance))
  .on('barnameneviseditor.change', (evt, html) => console.log('changed', html))
  .on('barnameneviseditor.focus', () => console.log('focused'))
  .on('barnameneviseditor.blur', () => console.log('blurred'));
```

Keyboard shortcuts: `Ctrl+B`, `Ctrl+I`, `Ctrl+U`, `Ctrl+Z`, `Ctrl+Y`, `Ctrl+Shift+Z`, `Tab` for indent, plus browser defaults for copy/cut/paste.

---

## Localization

BarnamenevisEditor ships with English (`en`) and Persian (`fa`). Adding more languages is straightforward:

1. **Load the language file(s)** after `js/app.js`. Example: `js/lang/en.js`, `js/lang/fa.js`.
2. **Initialize** with the desired language: `$('#editor').barnamenevisEditor({ language: 'fa' });`
3. **Create new translations** by copying `js/lang/en.js` and updating the language code:

```javascript
(function () {
    window.BarnamenevisEditor = window.BarnamenevisEditor || {};
    window.BarnamenevisEditor.lang = window.BarnamenevisEditor.lang || {};

    window.BarnamenevisEditor.lang.ar = {
        toolbar: {
            undo: 'تراجع (Ctrl+Z)',
            redo: 'إعادة (Ctrl+Y)',
            // …
        },
        modal: {
            insertLink: 'إدراج رابط',
            // …
        },
        statusBar: {
            words: 'كلمات',
            word: 'كلمة',
            characters: 'أحرف',
            character: 'حرف'
        },
        messages: {
            enterUrl: 'الرجاء إدخال عنوان URL'
        },
        placeholder: 'ابدأ الكتابة...'
    };
})();
```

**Tips**
- Only load the language files you need to keep bundle size small.
- RTL languages should set `<html dir="rtl">` (or wrap the editor).
- Missing translations fall back to English automatically.

---

## Custom Fonts

BarnamenevisEditor can show any font in the dropdown—system fonts, local @font-face, or Google Fonts.

1. **Load the font** (CSS `@font-face`, external stylesheet, or Google Fonts link).
2. **Provide the font list** via `fontFamilies`. When specified, your list replaces the defaults entirely.
3. **Use object format** to show localized names or include fallbacks.

```javascript
$('#editor').barnamenevisEditor({
    fontFamilies: [
        'Arial',
        'Tahoma',
        {
            displayName: 'میخک (Mikhak)',
            value: 'Mikhak, Tahoma, sans-serif'
        },
        {
            displayName: 'Roboto (Google)',
            value: 'Roboto, Arial, sans-serif'
        }
    ]
});
```

**Best Practices**
- Always include fallback fonts in `value`.
- Ensure the font stylesheet loads **before** initializing the editor.
- You can merge defaults by spreading them: `const defaults = $.fn.barnamenevisEditor.defaults.fontFamilies;`.
- Use Developer Tools → Network (Font filter) to confirm font files load successfully.

---

## Theming & Dark Mode

- Toolbar and content adapt automatically to light/dark mode via `theme-dark` class.
- Demo pages include a toggle that adds `body.dark-mode`, theming headings, buttons, code blocks, and the editor wrapper together.
- Code view and HTML preview force LTR direction, Consolas font, no left gutter, and sanitized indentation.

To switch at runtime:

```javascript
$('.custom-editor-wrapper').toggleClass('theme-dark');
```

---

## Toolbar Buttons

| Category | Buttons |
|----------|---------|
| History | `undo`, `redo` |
| Style | `bold`, `italic`, `underline`, `strikethrough`, `removeFormat` |
| Fonts | `fontname`, `fontsize`, `forecolor`, `backcolor` |
| Paragraph | `insertUnorderedList`, `insertOrderedList`, `justifyLeft`, `justifyCenter`, `justifyRight`, `justifyFull` |
| Direction | `directionLTR`, `directionRTL`, `paragraphLTR`, `paragraphRTL` |
| Insert | `insertLink`, `insertImage`, `insertTable` |
| View | `codeView`, `fullscreen` |

Color pickers include a live indicator bar that mirrors the selected text/background color and resets when no color is applied.

---

## File Structure

```
HtmlEditor/
├── index.html              # English demo
├── index-fa.html           # Persian (RTL) demo
├── README.md               # Main documentation
├── CHANGELOG.md            # Version history
├── css/
│   └── BarnamenevisEditor.css    # Editor styles
├── js/
│   ├── BarnamenevisEditor.js     # Editor logic
│   └── lang/
│       ├── en.js
│       └── fa.js
└── fonts/                  # Optional custom font assets (examples)
```

---

## Browser Support

- Chrome / Edge (Chromium)  
- Firefox  
- Safari  
- Mobile browsers (iOS/Android)

All modern browsers are supported without polyfills.

---

## Troubleshooting

- **Editor doesn't initialize** → ensure jQuery loads before `js/BarnamenevisEditor.js`.
- **Content doesn’t submit** → call `$('#editor').barnamenevisEditor('getContent')` on submit.
- **Custom font not visible** → confirm font files load (check Network tab), match the exact `font-family` name, and include fallbacks.
- **Colors apply in wrong place** → verify selection is active; modal/color pickers now save & restore selection automatically.
- **RTL layout issues** → wrap container with `dir="rtl"` or toggle paragraph direction buttons.

---

## Release Notes

- **Latest:** v1.2.0 — major UX polish (tooltips, color pickers, tables, code view, dark mode, font sync, localization enhancements).  
- **Previous:** v1.1.0 — rebrand to BarnamenevisEditor, localization system, direction buttons, Bootstrap Icons migration.  
- Full history is maintained in [`CHANGELOG.md`](CHANGELOG.md).

---

## License

MIT © 2025 — BarnamenevisEditor can be used freely in commercial and personal projects.

---

**Happy editing! ✨**

