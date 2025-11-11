# Changelog

All notable changes to BarnamenevisEditor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-11-10

### Fixed
- **Double Tooltips:** Fixed issue where both custom CSS tooltip and browser default tooltip appeared on hover
  - Changed from `title` attribute to `data-tooltip` attribute to prevent browser tooltip
  - Updated all CSS selectors to use `data-tooltip` instead of `title`
  - Now only custom tooltips appear, providing consistent UX
- **Color Picker Tooltips:** Color picker buttons now properly display tooltips
  - Added separate CSS rules for color picker wrapper tooltips
  - Color indicator bar and tooltip now coexist without conflicts
- **Table Insertion:** Fixed table not inserting after selecting size in table builder
  - Standardized on instance variables for storing selected table dimensions
  - Fixed focus management before inserting table HTML
  - Added proper cleanup of selection variables after insertion
  - Tables now insert immediately upon clicking a cell in the builder grid
- **Cursor Position Preservation:** Fixed tables, links, and images not inserting at cursor position
  - Added selection save/restore when opening modals
  - Implemented proper timing with `setTimeout()` to ensure modal closes before insertion
  - Fixed race condition between modal closing and focus restoration
  - Content now inserts exactly where the user's cursor was positioned
  - Applies to all modal-based insertions (tables, links, images)
- **Code View Gutter and Direction:** Fixed large left gutter/whitespace in code view
  - **Major fix:** Implemented `formatHtmlForCodeView()` to remove leading whitespace from HTML
  - Browser's contenteditable adds indentation (spaces/tabs) that created large left gutter
  - Method finds minimum common indentation and removes it from all lines
  - Preserves relative indentation structure while eliminating visual gutter
  - Removed default browser textarea margins
  - Set textarea to 100% width with border-box sizing for proper layout
  - Code view now always displays in LTR (left-to-right) for proper code readability
  - Fixed additional gutter in RTL mode by forcing wrapper to LTR when in code view
  - Toolbar remains RTL for correct UI button positioning
  - Used `!important` to override inherited RTL styles
  - Reduced padding from 1rem to 0.75rem for better spacing
- **Modal Form Improvements:** Fixed checkbox alignment and URL input direction
  - Fixed "Open in new tab" checkbox appearing on separate line from its label text
  - Checkbox and label now properly aligned horizontally using inline-flex
  - URL inputs in all modals (Link, Image) now always display in LTR direction
  - URLs are left-aligned for proper readability regardless of editor language
  - Improved cursor styling for better UX
- **Modal Overlay Transitions:** Fixed jarring modal backdrop appearance/disappearance
  - Replaced `display` toggle with `opacity` and `visibility` transitions
  - Backdrop now smoothly fades in/out over 200ms
  - Modal content scales up from 0.9 to 1.0 while fading in for polished effect
  - No more abrupt pop-in/pop-out behavior
  - Consistent smooth animations across all modals
- **HTML Output Display:** Fixed code display in demo pages
  - All `pre` and `code` elements now forced to LTR direction and left-aligned
  - Added `formatHtmlOutput()` function to remove leading whitespace from HTML output
  - HTML output in demo pages now clean, readable, and properly formatted
  - Applied universal principle: **all code displays are LTR and left-aligned**
  - Works correctly in both LTR (`index.html`) and RTL (`index-fa.html`) demo pages
- **Code Font Enhancement:** Improved code readability across the board
  - All code displays now use Consolas font (with 'Courier New' and monospace fallbacks)
  - Applied to: code view, HTML output, inline code, and all `<pre><code>` blocks
  - Consolas provides superior readability for code and is standard in development tools
- **Custom Font Support:** Enhanced font management system
  - Added support for custom fonts with different display names (object format)
  - Fonts can have localized display names (e.g., Persian names for Persian fonts)
  - Fixed: User-specified `fontFamilies` now completely replace defaults (no merging)
  - Same behavior applied to `colors` and `fontSizes` arrays
  - Created comprehensive Custom Fonts Guide with examples
- **Toolbar State Synchronization:** Font dropdown reflects current selection
  - Font family dropdown now updates to show the font at cursor position
  - Font size dropdown also syncs with current selection
  - Updates on click, keyboard navigation, and focus
  - Helps users know which font is currently applied to selected text
- **Demo Enhancements:** Added dark mode toggle for entire page
  - Both demo pages (`index.html`, `index-fa.html`) now have a "Toggle Dark Mode" button
  - Dark mode now applies to entire page, not just the editor
  - All page elements (headings, paragraphs, buttons, code blocks) have dark theme styling
  - Consistent dark theme across editor and page content
  - Button icon changes to sun when in dark mode, moon when in light mode
  - Persian demo includes localized button text that changes with theme
- **UI Improvements:** Fixed toolbar and color picker spacing
  - Increased space between color picker icon and indicator bar (better visual separation)
  - Fixed toolbar wrapping on mobile/responsive mode (items now wrap instead of scrolling)
  - Improved mobile usability with proper toolbar layout
- **Color Indicator Synchronization:** Color picker indicators now reflect current text colors
  - Foreground color indicator updates to show current text color
  - Background color indicator updates to show current background color
  - Indicators update when clicking on text with applied colors
  - Background indicator properly resets when moving to text without background color
  - Smooth color transition animation for better visual feedback
  - Works similarly to font family dropdown synchronization

### Technical Changes
- Updated `createToolbarButton()` and `createColorButton()` methods to use `data-tooltip`
- Updated `initTableBuilder()` to use instance variables (`selectedTableRows`, `selectedTableCols`)
- Simplified `insertTable()` method to read from instance variables only
- Added `updateColorIndicators()` method to sync color indicator bars with current selection
- Color indicators use CSS custom properties (`--indicator-color`) for dynamic color updates
- Added RGB to hex color conversion utility for color synchronization
- Color indicators update automatically when user clicks on or selects colored text
- Added debug console.log statements for troubleshooting table insertion
- Modified all modal show methods (`showLinkModal()`, `showImageModal()`, `showTableModal()`) to save selection
- Modified all insert methods (`insertLink()`, `insertImage()`, `insertTable()`) to:
  - Close modal first
  - Use `setTimeout(50ms)` delay for proper timing
  - Restore selection before inserting
  - Insert content at correct cursor position
- Added `formatHtmlForCodeView()` method to strip leading whitespace from HTML before displaying in code view
- Updated `toggleCodeView()` to use formatting method
- Updated `.custom-editor-code` CSS to force LTR direction, optimize padding, and fix dimensions
- Added wrapper direction override for code view mode to eliminate RTL gutter
- Toolbar direction preserved in RTL mode even when code view is LTR
- Added CSS for checkbox label alignment using `:has()` selector and inline-flex
- Added CSS to force URL inputs to LTR direction in all modals
- Refactored modal animation system to use `opacity` and `visibility` transitions instead of `display` toggle
- Added smooth scale transition for modal content (0.9 to 1.0)
- Added global CSS rules to force all `pre` and `code` elements to LTR direction
- Added `formatHtmlOutput()` function to demo pages (`index.html`, `index-fa.html`)
- Updated all code-related font-family declarations to use Consolas as primary font
- Enhanced `createSelectButton()` to support both string and object formats for fonts
- Fixed options merging in constructor to replace array options instead of deep-merging them
- Created `CUSTOM_FONTS_GUIDE.md` with comprehensive documentation
- Enhanced `updateToolbarState()` to update font family and font size dropdowns based on current selection
- Added `mouseup` and `keyup` event handlers to trigger toolbar state updates
- Added dark mode toggle button and handler to demo pages (`index.html`, `index-fa.html`)

## [1.1.0] - 2025-11-10

### Changed
- **Rebranded:** Renamed library from "CustomEditor" to "BarnamenevisEditor"
  - Updated all class names, function names, and documentation
  - Maintained backward compatibility with `$.fn.customEditor` alias
  - Updated event names to use `barnameneviseditor.` prefix

### Added
- **Localization System:** Full internationalization support
  - Created language file system (`js/lang/en.js`, `js/lang/fa.js`)
  - All UI strings are now localizable
  - Added `language` option to editor configuration
  - Easy to add new languages by creating new language files
- **Direction Control Buttons:** Added LTR/RTL text direction controls
  - **Inline Direction:** Wrap selected text in `<span>` with direction
  - **Block Direction:** Apply direction to entire paragraph/block
  - Added 4 new toolbar buttons: directionLTR, directionRTL, paragraphLTR, paragraphRTL
  - Full support for mixed-direction content
- **Persian Demo:** Created `index-fa.html` with Persian language demo
- **Bootstrap Icons:** Replaced Font Awesome with Bootstrap Icons throughout
  - Updated all icon classes from `fa fa-*` to `bi bi-*`
  - Updated CDN links in demo pages

### Fixed
- **Tooltip Positioning:** Fixed tooltips appearing at top of editor instead of above buttons
  - Added `position: relative` to `.toolbar-btn` and `.color-picker-wrapper`
  - Adjusted tooltip positioning with proper `bottom` and `transform` values
- **Color Picker Functionality:** Fixed color pickers not applying colors
  - Implemented `saveSelection()` and `restoreSelection()` methods
  - Added `data-color-command` attribute to store correct command
  - Color changes now properly apply to selected text
- **Status Bar:** Fixed word/character count not updating
  - Added initial `updateStatusBar()` call in `init()` method
  - Status bar now shows correct counts on load and during typing

### Documentation
- Original release shipped dedicated guides (localization, color picker fixes, v1.1 change log)
- All guidance has since been consolidated into a single `README.md` to simplify maintenance
- `test-colors.html` remains as a regression playground for color picker behaviour

## [1.0.0] - 2025-11-10

### Added
- Initial release of CustomEditor
- Rich text formatting (bold, italic, underline, strikethrough)
- Font family selection with 8 popular fonts
- Font size selection with 7 sizes
- Text color picker with 64 preset colors plus custom color input
- Background color picker with 64 preset colors plus custom color input
- Bulleted and numbered lists
- Text alignment (left, center, right, justify)
- Table insertion with visual 10x10 grid builder
- Image insertion with URL, alt text, and width options
- Link insertion with text, URL, and new tab option
- Code view for HTML editing
- Fullscreen mode for distraction-free editing
- Undo/Redo functionality with 100-state history
- Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z, Ctrl+Y)
- Status bar with real-time word and character count
- Responsive design for mobile, tablet, and desktop
- RTL (right-to-left) language support
- Dark theme option
- Light theme option
- Bootstrap 5 native integration
- jQuery plugin format
- Font Awesome icons
- Customizable toolbar (full, basic, minimal, custom)
- Event system (change, init, focus, blur)
- Public API methods (getContent, setContent, getText, clear, focus, disable, enable, destroy)
- Modal dialogs for link, image, and table insertion
- Color picker dropdown with grid and custom input
- Accessibility features (keyboard navigation, ARIA labels, focus indicators)
- High contrast mode support
- Reduced motion support
- Custom scrollbar styling
- Tooltips for toolbar buttons
- Loading state animation
- Print styles
- Multiple editor instances support
- Form integration support

### Documentation
- Complete `README.md` with all features and examples (now the single authoritative guide)
- (Initial release also included documentation.html, examples.html, quick-start, and feature comparison files; these have been folded into the README to reduce duplication)
- MIT License file
- This changelog

### Technical Details
- Pure JavaScript (ES6+)
- jQuery 3.7.1+ compatible
- Bootstrap 5.3.2+ integration
- Font Awesome 6.4.2+ icons
- ~50KB combined file size (CSS + JS)
- No build process required
- Modern browser support (Chrome, Firefox, Safari, Edge, Opera)

### File Structure
```
HtmlEditor/
├── index.html              # Main demo page
├── documentation.html      # Full documentation
├── examples.html          # Multiple examples
├── README.md              # Complete guide
├── QUICK_START.md         # Quick start guide
├── FEATURES.md            # Feature comparison
├── CHANGELOG.md           # This file
├── LICENSE                # MIT License
├── css/
│   └── BarnamenevisEditor.css    # All styles (merged)
└── js/
    └── BarnamenevisEditor.js     # All JavaScript (merged)
```

## [Unreleased]

### Planned Features
- Subscript and superscript formatting
- Indent and outdent buttons
- Blockquote formatting
- Horizontal rule insertion
- Find and replace functionality
- Character/symbol picker
- Emoji picker
- File upload for images
- Image editing capabilities
- Video embed support
- Advanced table operations (add/remove rows/columns, merge cells)
- Paste from Word cleanup
- Spell checker integration
- Multiple language support
- Template system
- Auto-save functionality
- Markdown support
- Export to PDF
- Custom plugins system

### Future Enhancements
- Performance optimizations
- Additional themes
- More color palette options
- Enhanced mobile experience
- Touch gesture support
- Voice input support
- Accessibility improvements
- More keyboard shortcuts
- Context menu (right-click menu)
- Drag and drop for images
- Inline image editing
- Table cell styling
- Border and spacing controls
- Background patterns
- Gradient support
- Shadow effects
- Animation options

## Version History

### Version 1.0.0 (Current)
- First stable release
- All core features implemented
- Full documentation provided
- Production-ready

---

For more information, check the consolidated [README](README.md).

