/**
 * BarnamenevisEditor - English Language File
 * Language: English (en)
 */

(function() {
    'use strict';

    if (typeof window.BarnamenevisEditor === 'undefined') {
        window.BarnamenevisEditor = {};
    }

    window.BarnamenevisEditor.lang = window.BarnamenevisEditor.lang || {};

    window.BarnamenevisEditor.lang.en = {
        // Toolbar buttons
        toolbar: {
            undo: 'Undo (Ctrl+Z)',
            redo: 'Redo (Ctrl+Y)',
            bold: 'Bold (Ctrl+B)',
            italic: 'Italic (Ctrl+I)',
            underline: 'Underline (Ctrl+U)',
            strikethrough: 'Strikethrough',
            fontname: 'Font Family',
            fontsize: 'Font Size',
            forecolor: 'Text Color',
            backcolor: 'Background Color',
            removeFormat: 'Clear Formatting',
            insertUnorderedList: 'Bulleted List',
            insertOrderedList: 'Numbered List',
            justifyLeft: 'Align Left',
            justifyCenter: 'Align Center',
            justifyRight: 'Align Right',
            justifyFull: 'Justify',
            insertLink: 'Insert Link',
            insertImage: 'Insert Image',
            insertTable: 'Insert Table',
            codeView: 'Code View',
            fullscreen: 'Fullscreen',
            directionLTR: 'Inline Left to Right',
            directionRTL: 'Inline Right to Left',
            paragraphLTR: 'Paragraph Left to Right',
            paragraphRTL: 'Paragraph Right to Left'
        },

        // Font sizes
        fontSizeLabel: 'Font Size',
        fontSize: {
            1: 'Size 1',
            2: 'Size 2',
            3: 'Size 3',
            4: 'Size 4',
            5: 'Size 5',
            6: 'Size 6',
            7: 'Size 7'
        },

        // Modals
        modal: {
            // Link modal
            insertLink: 'Insert Link',
            linkText: 'Link Text:',
            linkUrl: 'URL:',
            linkNewTab: 'Open in new tab',
            linkTextPlaceholder: 'Enter link text',
            linkUrlPlaceholder: 'https://example.com',
            
            // Image modal
            insertImage: 'Insert Image',
            imageUrl: 'Image URL:',
            imageAlt: 'Alt Text:',
            imageWidth: 'Width (optional):',
            imageUrlPlaceholder: 'https://example.com/image.jpg',
            imageAltPlaceholder: 'Image description',
            imageWidthPlaceholder: 'e.g., 300px or 100%',
            
            // Table modal
            insertTable: 'Insert Table',
            tableSelectSize: 'Select table size:',
            
            // Common
            cancel: 'Cancel',
            insert: 'Insert',
            close: 'Close'
        },

        // Status bar
        statusBar: {
            words: 'words',
            word: 'word',
            characters: 'characters',
            character: 'character'
        },

        // Alerts and messages
        messages: {
            enterUrl: 'Please enter a URL',
            enterImageUrl: 'Please enter an image URL',
            contentCopied: 'HTML copied to clipboard!',
            browserNotSupported: 'Your browser does not support this feature',
            blogPostSaved: 'Blog post saved!',
            success: 'Success',
            info: 'Information',
            error: 'Error',
            ok: 'OK'
        },

        // Placeholder
        placeholder: 'Start typing...'
    };

})();

