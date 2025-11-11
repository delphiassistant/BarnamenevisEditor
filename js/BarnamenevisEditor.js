/**
 * BarnamenevisEditor - Full Featured HTML Editor
 * Version: 1.1.0
 * A powerful, feature-rich HTML editor built with pure JavaScript, jQuery, and Bootstrap 5
 * 
 * Features:
 * - Rich text formatting (bold, italic, underline, strikethrough)
 * - Font family and size selection
 * - Text and background colors with color picker
 * - Lists (ordered and unordered)
 * - Text alignment (left, center, right, justify)
 * - LTR/RTL direction toggle
 * - Tables with full management
 * - Image and media insertion
 * - Link creation and editing
 * - Code view for HTML editing
 * - Undo/Redo functionality
 * - Fullscreen mode
 * - Responsive design
 * - Full RTL support
 * - Dark theme support
 * - Multi-language support (localization)
 * - Bootstrap 5 compatible
 * - jQuery integration
 */

(function($) {
    'use strict';

    // Initialize global namespace
    if (typeof window.BarnamenevisEditor === 'undefined') {
        window.BarnamenevisEditor = {};
    }

    // Get language strings
    function getLang(lang) {
        if (window.BarnamenevisEditor && window.BarnamenevisEditor.lang && window.BarnamenevisEditor.lang[lang]) {
            return window.BarnamenevisEditor.lang[lang];
        }
        // Fallback to English if language not found
        return window.BarnamenevisEditor.lang && window.BarnamenevisEditor.lang.en ? window.BarnamenevisEditor.lang.en : null;
    }

    // Default configuration
    const defaults = {
        height: '400px',
        theme: 'bootstrap', // bootstrap, dark, light
        toolbar: 'full', // full, basic, minimal, or custom array
        language: 'en', // Default language
        fontSizes: [1, 2, 3, 4, 5, 6, 7],
        fontFamilies: [
            'Arial',
            'Courier New',
            'Georgia',
            'Times New Roman',
            'Trebuchet MS',
            'Verdana',
            'Comic Sans MS',
            'Impact',
            // You can also use objects with displayName and value:
            // { displayName: 'میخک (Mikhak)', value: 'Mikhak, Tahoma, sans-serif' },
            // { displayName: 'My Custom Font', value: 'CustomFont, Arial, sans-serif' }
        ],
        colors: [
            '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
            '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
            '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
            '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
            '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
            '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
            '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
            '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
        ],
        onChange: null,
        onInit: null,
        showStatusBar: true,
        placeholder: null // Will be set from language file
    };

    // Toolbar configurations
    const toolbarPresets = {
        full: [
            ['undo', 'redo'],
            ['bold', 'italic', 'underline', 'strikethrough'],
            ['fontname', 'fontsize'],
            ['forecolor', 'backcolor'],
            ['removeFormat'],
            ['insertUnorderedList', 'insertOrderedList'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['directionLTR', 'directionRTL'],
            ['paragraphLTR', 'paragraphRTL'],
            ['insertLink', 'insertImage', 'insertTable'],
            ['codeView', 'fullscreen']
        ],
        basic: [
            ['undo', 'redo'],
            ['bold', 'italic', 'underline'],
            ['fontsize'],
            ['forecolor'],
            ['insertUnorderedList', 'insertOrderedList'],
            ['directionLTR', 'directionRTL'],
            ['paragraphLTR', 'paragraphRTL'],
            ['insertLink'],
            ['codeView']
        ],
        minimal: [
            ['bold', 'italic', 'underline'],
            ['insertUnorderedList', 'insertOrderedList'],
            ['insertLink']
        ]
    };

    // Toolbar button definitions
    const toolbarButtons = {
        // Undo/Redo
        undo: {
            icon: 'bi bi-arrow-counterclockwise',
            title: 'Undo (Ctrl+Z)',
            command: 'undo'
        },
        redo: {
            icon: 'bi bi-arrow-clockwise',
            title: 'Redo (Ctrl+Y)',
            command: 'redo'
        },
        // Text formatting
        bold: {
            icon: 'bi bi-type-bold',
            title: 'Bold (Ctrl+B)',
            command: 'bold'
        },
        italic: {
            icon: 'bi bi-type-italic',
            title: 'Italic (Ctrl+I)',
            command: 'italic'
        },
        underline: {
            icon: 'bi bi-type-underline',
            title: 'Underline (Ctrl+U)',
            command: 'underline'
        },
        strikethrough: {
            icon: 'bi bi-type-strikethrough',
            title: 'Strikethrough',
            command: 'strikethrough'
        },
        // Font styling
        fontname: {
            type: 'select',
            title: 'Font Family',
            command: 'fontName'
        },
        fontsize: {
            type: 'select',
            title: 'Font Size',
            command: 'fontSize'
        },
        // Colors
        forecolor: {
            icon: 'bi bi-palette',
            title: 'Text Color',
            type: 'color',
            command: 'foreColor'
        },
        backcolor: {
            icon: 'bi bi-paint-bucket',
            title: 'Background Color',
            type: 'color',
            command: 'backColor'
        },
        removeFormat: {
            icon: 'bi bi-eraser',
            title: 'Clear Formatting',
            command: 'removeFormat'
        },
        // Lists
        insertUnorderedList: {
            icon: 'bi bi-list-ul',
            title: 'Bulleted List',
            command: 'insertUnorderedList'
        },
        insertOrderedList: {
            icon: 'bi bi-list-ol',
            title: 'Numbered List',
            command: 'insertOrderedList'
        },
        // Alignment
        justifyLeft: {
            icon: 'bi bi-text-left',
            title: 'Align Left',
            command: 'justifyLeft'
        },
        justifyCenter: {
            icon: 'bi bi-text-center',
            title: 'Align Center',
            command: 'justifyCenter'
        },
        justifyRight: {
            icon: 'bi bi-text-right',
            title: 'Align Right',
            command: 'justifyRight'
        },
        justifyFull: {
            icon: 'bi bi-justify',
            title: 'Justify',
            command: 'justifyFull'
        },
        // Text direction (inline)
        directionLTR: {
            icon: 'bi bi-text-left',
            title: 'Left to Right (LTR)',
            type: 'direction',
            direction: 'ltr',
            mode: 'inline'
        },
        directionRTL: {
            icon: 'bi bi-text-right',
            title: 'Right to Left (RTL)',
            type: 'direction',
            direction: 'rtl',
            mode: 'inline'
        },
        // Paragraph direction (block-level)
        paragraphLTR: {
            icon: 'bi bi-text-paragraph',
            title: 'Paragraph Left to Right',
            type: 'direction',
            direction: 'ltr',
            mode: 'block'
        },
        paragraphRTL: {
            icon: 'bi bi-text-paragraph',
            title: 'Paragraph Right to Left',
            type: 'direction',
            direction: 'rtl',
            mode: 'block'
        },
        // Insert elements
        insertLink: {
            icon: 'bi bi-link-45deg',
            title: 'Insert Link',
            type: 'modal'
        },
        insertImage: {
            icon: 'bi bi-image',
            title: 'Insert Image',
            type: 'modal'
        },
        insertTable: {
            icon: 'bi bi-table',
            title: 'Insert Table',
            type: 'modal'
        },
        // View options
        codeView: {
            icon: 'bi bi-code-slash',
            title: 'Code View',
            type: 'toggle'
        },
        fullscreen: {
            icon: 'bi bi-arrows-fullscreen',
            title: 'Fullscreen',
            type: 'toggle'
        }
    };

    // Helper function to show Bootstrap modal alerts
    function showAlert(type, message, title, lang) {
        // Create unique ID for the modal
        const modalId = 'editorAlertModal' + Date.now();
        
        // Determine title if not provided
        if (!title && lang && lang.messages) {
            title = lang.messages.info;
            if (type === 'success') title = lang.messages.success;
            if (type === 'error') title = lang.messages.error;
        }
        
        // Determine icon
        let icon = 'bi-info-circle';
        let iconColor = 'text-info';
        if (type === 'success') {
            icon = 'bi-check-circle';
            iconColor = 'text-success';
        } else if (type === 'error') {
            icon = 'bi-x-circle';
            iconColor = 'text-danger';
        }
        
        // Create modal HTML with inline z-index to override everything (no fade animation)
        const modalHtml = `
            <div class="modal" id="${modalId}" tabindex="-1" aria-hidden="true" style="z-index: 10500 !important; display: block;">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content custom-editor-modal-content">
                        <div class="modal-header custom-editor-modal-header" style="flex-direction: row-reverse;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="margin: 0;"></button>
                            <h5 class="modal-title" style="flex: 1;"><i class="bi ${icon} ${iconColor}"></i> ${title}</h5>
                        </div>
                        <div class="modal-body custom-editor-modal-body">
                            ${message}
                        </div>
                        <div class="modal-footer custom-editor-modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">${(lang && lang.messages && lang.messages.ok) || 'OK'}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        $('body').append(modalHtml);
        
        // Create our own custom backdrop to avoid Bootstrap z-index conflicts
        const backdropId = 'editorAlertBackdrop' + Date.now();
        const backdropHtml = `<div id="${backdropId}" class="modal-backdrop" style="z-index: 10400 !important; opacity: 0.5 !important; display: block !important;"></div>`;
        $('body').append(backdropHtml);
        
        // Create and show modal WITHOUT Bootstrap's backdrop
        const modalElement = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalElement, {
            backdrop: false,  // Disable Bootstrap's backdrop - we created our own
            keyboard: true
        });
        
        // Show modal
        modal.show();
        
        // Remove modal and our custom backdrop from DOM after it's hidden
        $(modalElement).on('hidden.bs.modal', function() {
            // Remove the modal element
            $(this).remove();
            // Remove our custom backdrop
            $('#' + backdropId).remove();
        });
    }

    // BarnamenevisEditor class
    class BarnamenevisEditor {
        constructor(element, options) {
            this.element = $(element);
            // Use deep extend but override arrays (fontFamilies, colors, etc.) completely
            this.options = $.extend(true, {}, defaults, options);
            
            // If user specified fontFamilies, use only those (don't merge with defaults)
            if (options && options.fontFamilies) {
                this.options.fontFamilies = options.fontFamilies;
            }
            
            // If user specified colors, use only those (don't merge with defaults)
            if (options && options.colors) {
                this.options.colors = options.colors;
            }
            
            // If user specified fontSizes, use only those (don't merge with defaults)
            if (options && options.fontSizes) {
                this.options.fontSizes = options.fontSizes;
            }
            
            // Load language strings
            this.lang = getLang(this.options.language);
            if (!this.lang) {
                console.error('Language file not loaded. Please include js/lang/' + this.options.language + '.js');
                this.lang = {}; // Fallback to empty object
            }
            
            // Set placeholder from language if not specified
            if (!this.options.placeholder && this.lang && this.lang.placeholder) {
                this.options.placeholder = this.lang.placeholder;
            }
            
            this.history = [];
            this.historyIndex = -1;
            this.isCodeView = false;
            this.isFullscreen = false;
            
            this.init();
        }

        init() {
            this.createEditor();
            this.attachEvents();
            this.updateHistory();
            this.updateStatusBar(); // Initialize status bar with initial content
            
            if (this.options.onInit) {
                this.options.onInit.call(this, this);
            }
            
            this.element.trigger('barnameneviseditor.init', [this]);
        }

        createEditor() {
            // Hide original textarea
            this.element.hide();
            
            // Create editor wrapper
            this.wrapper = $('<div class="custom-editor-wrapper"></div>');
            if (this.options.theme !== 'bootstrap') {
                this.wrapper.addClass('theme-' + this.options.theme);
            }
            
            // Create toolbar
            this.toolbar = this.createToolbar();
            this.wrapper.append(this.toolbar);
            
            // Create content area
            this.contentArea = $('<div class="custom-editor-content" contenteditable="true"></div>');
            this.contentArea.css('min-height', this.options.height);
            this.contentArea.html(this.element.val());
            this.wrapper.append(this.contentArea);
            
            // Create code view
            this.codeArea = $('<textarea class="custom-editor-code"></textarea>');
            this.codeArea.css('min-height', this.options.height);
            this.wrapper.append(this.codeArea);
            
            // Create statusbar
            if (this.options.showStatusBar) {
                this.statusBar = this.createStatusBar();
                this.wrapper.append(this.statusBar);
            }
            
            // Insert wrapper after textarea
            this.element.after(this.wrapper);
            
            // Create modals
            this.createModals();
        }

        createToolbar() {
            const toolbar = $('<div class="custom-editor-toolbar"></div>');
            const toolbarConfig = typeof this.options.toolbar === 'string' 
                ? toolbarPresets[this.options.toolbar] 
                : this.options.toolbar;
            
            toolbarConfig.forEach(group => {
                const groupEl = $('<div class="toolbar-group"></div>');
                
                group.forEach(buttonName => {
                    const button = this.createToolbarButton(buttonName);
                    if (button) {
                        groupEl.append(button);
                    }
                });
                
                toolbar.append(groupEl);
            });
            
            return toolbar;
        }

        createToolbarButton(name) {
            const buttonDef = toolbarButtons[name];
            if (!buttonDef) return null;
            
            // Get localized title
            const title = (this.lang && this.lang.toolbar && this.lang.toolbar[name]) || buttonDef.title;
            
            if (buttonDef.type === 'select') {
                return this.createSelectButton(name, buttonDef);
            } else if (buttonDef.type === 'color') {
                return this.createColorButton(name, buttonDef);
            } else {
                const button = $('<button type="button" class="toolbar-btn"></button>');
                button.attr({
                    'data-command': name,
                    'data-tooltip': title  // Use data attribute instead of title
                });
                
                // Add data attribute for direction buttons
                if (buttonDef.type === 'direction') {
                    button.attr('data-direction', buttonDef.direction);
                    button.attr('data-mode', buttonDef.mode || 'inline');
                }
                
                button.html('<i class="' + buttonDef.icon + '"></i>');
                return button;
            }
        }

        createSelectButton(name, buttonDef) {
            const select = $('<select class="toolbar-select"></select>');
            select.attr('data-command', name);
            
            if (name === 'fontname') {
                const label = (this.lang && this.lang.toolbar && this.lang.toolbar.fontname) || 'Font Family';
                select.append(`<option value="">${label}</option>`);
                this.options.fontFamilies.forEach(font => {
                    // Support both string format and object format { displayName, value }
                    if (typeof font === 'string') {
                        select.append(`<option value="${font}" style="font-family: ${font}">${font}</option>`);
                    } else if (typeof font === 'object' && font.displayName && font.value) {
                        select.append(`<option value="${font.value}" style="font-family: ${font.value}">${font.displayName}</option>`);
                    }
                });
            } else if (name === 'fontsize') {
                const label = (this.lang && this.lang.fontSizeLabel) || 'Font Size';
                select.append(`<option value="">${label}</option>`);
                this.options.fontSizes.forEach(size => {
                    const sizeLabel = (this.lang && this.lang.fontSize && this.lang.fontSize[size]) || `Size ${size}`;
                    select.append(`<option value="${size}">${sizeLabel}</option>`);
                });
            }
            
            return select;
        }

        createColorButton(name, buttonDef) {
            const wrapper = $('<div class="color-picker-wrapper"></div>');
            const button = $('<button type="button" class="toolbar-btn color-picker-btn"></button>');
            const title = (this.lang && this.lang.toolbar && this.lang.toolbar[name]) || buttonDef.title;
            
            // Set data-tooltip on wrapper for tooltip display
            wrapper.attr('data-tooltip', title);
            
            button.attr({
                'data-command': name,
                'data-color-command': buttonDef.command  // Store the actual command
            });
            button.html('<i class="' + buttonDef.icon + '"></i>');
            
            // Set default indicator colors (foreground = black, background = yellow highlight)
            if (buttonDef.command === 'backColor') {
                button.css('--indicator-color', '#ffeb3b');
                button.attr('data-current-color', '#ffeb3b');
            } else {
                button.css('--indicator-color', '#000000');
                button.attr('data-current-color', '#000000');
            }
            
            const defaultColorValue = (buttonDef.command === 'backColor') ? '#ffeb3b' : '#000000';
            
            const dropdown = $('<div class="color-picker-dropdown"></div>');
            const colorGrid = $('<div class="color-grid"></div>');
            
            this.options.colors.forEach(color => {
                const colorOption = $('<div class="color-option"></div>');
                colorOption.css('background-color', color);
                colorOption.attr('data-color', color);
                colorGrid.append(colorOption);
            });
            
            dropdown.append(colorGrid);
            
            const customColorWrapper = $('<div class="color-input-wrapper"></div>');
            const colorInput = $(`<input type="color" value="${defaultColorValue}">`);
            const hexInput = $(`<input type="text" placeholder="${defaultColorValue}" maxlength="7">`).val(defaultColorValue);
            customColorWrapper.append(colorInput, hexInput);
            dropdown.append(customColorWrapper);
            
            wrapper.append(button, dropdown);
            return wrapper;
        }

        createStatusBar() {
            const statusBar = $('<div class="custom-editor-statusbar"></div>');
            const wordsLabel = (this.lang && this.lang.statusBar && this.lang.statusBar.words) || 'words';
            const charsLabel = (this.lang && this.lang.statusBar && this.lang.statusBar.characters) || 'characters';
            statusBar.html(`
                <div class="statusbar-left">
                    <span class="statusbar-item">
                        <i class="fas fa-info-circle"></i> 
                        <span class="word-count">0 ${wordsLabel}</span>
                    </span>
                    <span class="statusbar-item">
                        <span class="char-count">0 ${charsLabel}</span>
                    </span>
                </div>
            `);
            return statusBar;
        }

        createModals() {
            // Link modal
            this.linkModal = this.createLinkModal();
            $('body').append(this.linkModal);
            
            // Image modal
            this.imageModal = this.createImageModal();
            $('body').append(this.imageModal);
            
            // Table modal
            this.tableModal = this.createTableModal();
            $('body').append(this.tableModal);
        }

        createLinkModal() {
            const m = (this.lang && this.lang.modal) || {};
            return $(`
                <div class="custom-editor-modal" id="linkModal">
                    <div class="custom-editor-modal-content">
                        <div class="custom-editor-modal-header">
                            <h5>${m.insertLink || 'Insert Link'}</h5>
                            <button type="button" class="custom-editor-modal-close">&times;</button>
                        </div>
                        <div class="custom-editor-modal-body">
                            <div class="form-group">
                                <label>${m.linkText || 'Link Text:'}</label>
                                <input type="text" id="linkText" class="form-control" placeholder="${m.linkTextPlaceholder || 'Enter link text'}">
                            </div>
                            <div class="form-group">
                                <label>${m.linkUrl || 'URL:'}</label>
                                <input type="url" id="linkUrl" class="form-control" placeholder="${m.linkUrlPlaceholder || 'https://example.com'}" required>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" id="linkNewTab">
                                    ${m.linkNewTab || 'Open in new tab'}
                                </label>
                            </div>
                        </div>
                        <div class="custom-editor-modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${m.cancel || 'Cancel'}</button>
                            <button type="button" class="btn btn-primary" id="insertLinkBtn">${m.insertLink || 'Insert Link'}</button>
                        </div>
                    </div>
                </div>
            `);
        }

        createImageModal() {
            const m = (this.lang && this.lang.modal) || {};
            return $(`
                <div class="custom-editor-modal" id="imageModal">
                    <div class="custom-editor-modal-content">
                        <div class="custom-editor-modal-header">
                            <h5>${m.insertImage || 'Insert Image'}</h5>
                            <button type="button" class="custom-editor-modal-close">&times;</button>
                        </div>
                        <div class="custom-editor-modal-body">
                            <div class="form-group">
                                <label>${m.imageUrl || 'Image URL:'}</label>
                                <input type="url" id="imageUrl" class="form-control" placeholder="${m.imageUrlPlaceholder || 'https://example.com/image.jpg'}" required>
                            </div>
                            <div class="form-group">
                                <label>${m.imageAlt || 'Alt Text:'}</label>
                                <input type="text" id="imageAlt" class="form-control" placeholder="${m.imageAltPlaceholder || 'Image description'}">
                            </div>
                            <div class="form-group">
                                <label>${m.imageWidth || 'Width (optional):'}</label>
                                <input type="text" id="imageWidth" class="form-control" placeholder="${m.imageWidthPlaceholder || 'e.g., 300px or 100%'}">
                            </div>
                        </div>
                        <div class="custom-editor-modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${m.cancel || 'Cancel'}</button>
                            <button type="button" class="btn btn-primary" id="insertImageBtn">${m.insertImage || 'Insert Image'}</button>
                        </div>
                    </div>
                </div>
            `);
        }

        createTableModal() {
            const m = (this.lang && this.lang.modal) || {};
            return $(`
                <div class="custom-editor-modal" id="tableModal">
                    <div class="custom-editor-modal-content">
                        <div class="custom-editor-modal-header">
                            <h5>${m.insertTable || 'Insert Table'}</h5>
                            <button type="button" class="custom-editor-modal-close">&times;</button>
                        </div>
                        <div class="custom-editor-modal-body">
                            <p>${m.tableSelectSize || 'Select table size:'}</p>
                            <div class="table-builder" id="tableBuilder"></div>
                            <div class="table-size-display" id="tableSize">1 x 1</div>
                        </div>
                        <div class="custom-editor-modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${m.cancel || 'Cancel'}</button>
                            <button type="button" class="btn btn-primary" id="insertTableBtn">${m.insertTable || 'Insert Table'}</button>
                        </div>
                    </div>
                </div>
            `);
        }

        attachEvents() {
            const self = this;
            
            // Toolbar button clicks
            this.toolbar.on('click', '.toolbar-btn', function(e) {
                e.preventDefault();
                const command = $(this).data('command');
                const direction = $(this).data('direction');
                
                if (command === 'codeView') {
                    self.toggleCodeView();
                } else if (command === 'fullscreen') {
                    self.toggleFullscreen();
                } else if (command === 'insertLink') {
                    self.showLinkModal();
                } else if (command === 'insertImage') {
                    self.showImageModal();
                } else if (command === 'insertTable') {
                    self.showTableModal();
                } else if (direction) {
                    // Handle direction toggle (LTR/RTL)
                    const mode = $(this).data('mode') || toolbarButtons[command].mode || 'inline';
                    self.setDirection(direction, mode);
                } else {
                    self.execCommand(toolbarButtons[command].command);
                }
                
                self.contentArea.focus();
            });
            
            // Toolbar select changes
            this.toolbar.on('change', '.toolbar-select', function() {
                const command = $(this).data('command');
                const value = $(this).val();
                
                if (value) {
                    self.execCommand(toolbarButtons[command].command, value);
                    $(this).val('');
                }
                
                self.contentArea.focus();
            });
            
            // Color picker
            this.toolbar.on('click', '.color-picker-btn', function(e) {
                e.stopPropagation();
                
                // Save current selection
                self.saveSelection();
                
                $(this).next('.color-picker-dropdown').toggleClass('show');
            });
            
            this.toolbar.on('click', '.color-option', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const color = $(this).data('color');
                const colorCommand = $(this).closest('.color-picker-wrapper').find('.color-picker-btn').data('color-command');
                
                // Close dropdown
                $(this).closest('.color-picker-dropdown').removeClass('show');
                
                // Focus editor and restore selection
                self.contentArea.focus();
                
                // Apply color
                if (self.savedSelection) {
                    self.restoreSelection();
                }
                
                document.execCommand(colorCommand, false, color);
                self.updateHistory();
                
                // Update the indicator color
                $(this).closest('.color-picker-wrapper').find('.color-picker-btn').css('--indicator-color', color);
                
                self.contentArea.focus();
            });
            
            this.toolbar.on('change', '.color-picker-dropdown input[type="color"]', function() {
                const color = $(this).val();
                $(this).next('input[type="text"]').val(color);
                
                // Apply color immediately
                const colorCommand = $(this).closest('.color-picker-wrapper').find('.color-picker-btn').data('color-command');
                
                self.contentArea.focus();
                if (self.savedSelection) {
                    self.restoreSelection();
                }
                
                document.execCommand(colorCommand, false, color);
                self.updateHistory();
                
                // Update the indicator color
                $(this).closest('.color-picker-wrapper').find('.color-picker-btn').css('--indicator-color', color);
                
                $(this).closest('.color-picker-dropdown').removeClass('show');
            });
            
            this.toolbar.on('keypress', '.color-picker-dropdown input[type="text"]', function(e) {
                if (e.which === 13) { // Enter key
                    const color = $(this).val();
                    if (/^#[0-9A-F]{6}$/i.test(color)) {
                        $(this).prev('input[type="color"]').val(color);
                        const colorCommand = $(this).closest('.color-picker-wrapper').find('.color-picker-btn').data('color-command');
                        
                        self.contentArea.focus();
                        if (self.savedSelection) {
                            self.restoreSelection();
                        }
                        
                        document.execCommand(colorCommand, false, color);
                        self.updateHistory();
                        
                        // Update the indicator color
                        $(this).closest('.color-picker-wrapper').find('.color-picker-btn').css('--indicator-color', color);
                        
                        $(this).closest('.color-picker-dropdown').removeClass('show');
                    }
                }
            });
            
            // Close color picker on outside click
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.color-picker-wrapper').length) {
                    $('.color-picker-dropdown').removeClass('show');
                }
            });
            
            // Content changes
            this.contentArea.on('input', function() {
                self.updateHistory();
                self.updateStatusBar();
                self.triggerChange();
            });
            
            // Update toolbar state when selection changes (click, arrow keys, etc.)
            this.contentArea.on('mouseup keyup', function() {
                self.updateToolbarState();
            });
            
            this.contentArea.on('keydown', function(e) {
                // Ctrl+Z (Undo)
                if (e.ctrlKey && e.keyCode === 90 && !e.shiftKey) {
                    e.preventDefault();
                    self.undo();
                }
                // Ctrl+Y or Ctrl+Shift+Z (Redo)
                else if ((e.ctrlKey && e.keyCode === 89) || (e.ctrlKey && e.shiftKey && e.keyCode === 90)) {
                    e.preventDefault();
                    self.redo();
                }
                // Ctrl+B (Bold)
                else if (e.ctrlKey && e.keyCode === 66) {
                    e.preventDefault();
                    self.execCommand('bold');
                }
                // Ctrl+I (Italic)
                else if (e.ctrlKey && e.keyCode === 73) {
                    e.preventDefault();
                    self.execCommand('italic');
                }
                // Ctrl+U (Underline)
                else if (e.ctrlKey && e.keyCode === 85) {
                    e.preventDefault();
                    self.execCommand('underline');
                }
                // Tab key
                else if (e.keyCode === 9) {
                    e.preventDefault();
                    self.execCommand('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
                }
            });
            
            // Code view changes
            this.codeArea.on('input', function() {
                self.triggerChange();
            });
            
            // Focus/Blur events
            this.contentArea.on('focus', function() {
                self.element.trigger('customeditor.focus');
                // Update toolbar state when editor gets focus
                setTimeout(() => {
                    self.updateToolbarState();
                }, 10);
            });
            
            this.contentArea.on('blur', function() {
                self.element.trigger('customeditor.blur');
            });
            
            // Modal events
            $('#insertLinkBtn').on('click', function() {
                self.insertLink();
            });
            
            $('#insertImageBtn').on('click', function() {
                self.insertImage();
            });
            
            $('#insertTableBtn').on('click', function() {
                self.insertTable();
            });
            
            $('.custom-editor-modal-close, .custom-editor-modal [data-dismiss="modal"]').on('click', function() {
                $(this).closest('.custom-editor-modal').removeClass('show');
            });
            
            // Close modal on outside click
            $('.custom-editor-modal').on('click', function(e) {
                if ($(e.target).hasClass('custom-editor-modal')) {
                    $(this).removeClass('show');
                }
            });
            
            // Table builder
            this.initTableBuilder();
        }

        initTableBuilder() {
            const self = this;
            const builder = $('#tableBuilder');
            let selectedRows = 1;
            let selectedCols = 1;
            
            // Create 10x10 grid
            for (let i = 0; i < 100; i++) {
                const cell = $('<div class="table-cell"></div>');
                cell.data('row', Math.floor(i / 10) + 1);
                cell.data('col', (i % 10) + 1);
                builder.append(cell);
            }
            
            builder.on('mouseenter', '.table-cell', function() {
                const row = $(this).data('row');
                const col = $(this).data('col');
                selectedRows = row;
                selectedCols = col;
                
                builder.find('.table-cell').removeClass('hover');
                builder.find('.table-cell').each(function() {
                    if ($(this).data('row') <= row && $(this).data('col') <= col) {
                        $(this).addClass('hover');
                    }
                });
                
                $('#tableSize').text(`${row} x ${col}`);
            });
            
            builder.on('click', '.table-cell', function() {
                // Store the table size
                self.selectedTableRows = selectedRows;
                self.selectedTableCols = selectedCols;
                
                console.log('Table cell clicked:', selectedRows, 'x', selectedCols); // Debug
                
                // Immediately insert the table
                self.insertTable();
            });
        }

        saveSelection() {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                this.savedSelection = selection.getRangeAt(0);
            }
        }

        restoreSelection() {
            if (this.savedSelection) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.savedSelection);
            }
        }

        execCommand(command, value = null) {
            document.execCommand(command, false, value);
            this.updateHistory();
            this.updateToolbarState();
        }

        updateHistory() {
            const content = this.contentArea.html();
            
            // Don't add to history if content hasn't changed
            if (this.history[this.historyIndex] === content) {
                return;
            }
            
            // Remove any history after current index
            this.history = this.history.slice(0, this.historyIndex + 1);
            
            // Add new state
            this.history.push(content);
            this.historyIndex++;
            
            // Limit history size
            if (this.history.length > 100) {
                this.history.shift();
                this.historyIndex--;
            }
        }

        undo() {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.contentArea.html(this.history[this.historyIndex]);
                this.triggerChange();
            }
        }

        redo() {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.contentArea.html(this.history[this.historyIndex]);
                this.triggerChange();
            }
        }

        updateToolbarState() {
            const self = this;
            
            // Update button states based on current selection
            this.toolbar.find('.toolbar-btn').each(function() {
                const command = $(this).data('command');
                if (command && toolbarButtons[command] && toolbarButtons[command].command) {
                    try {
                        const isActive = document.queryCommandState(toolbarButtons[command].command);
                        $(this).toggleClass('active', isActive);
                    } catch (e) {
                        // Command not supported
                    }
                }
            });
            
            // Update font family dropdown to reflect current selection
            try {
                const currentFont = document.queryCommandValue('fontName');
                if (currentFont) {
                    const fontSelect = this.toolbar.find('select[data-command="fontname"]');
                    if (fontSelect.length) {
                        // Clean up the font name (remove quotes and extra formatting)
                        let cleanFont = currentFont.replace(/['"]/g, '').trim();
                        
                        // Try to find exact match first
                        let matchFound = false;
                        fontSelect.find('option').each(function() {
                            const optionValue = $(this).val();
                            if (optionValue) {
                                // Check if the option value matches or contains the current font
                                const optionFonts = optionValue.split(',').map(f => f.trim().replace(/['"]/g, ''));
                                if (optionFonts.some(font => font.toLowerCase() === cleanFont.toLowerCase())) {
                                    fontSelect.val(optionValue);
                                    matchFound = true;
                                    return false; // break the loop
                                }
                            }
                        });
                        
                        // If no match found, reset to default
                        if (!matchFound) {
                            fontSelect.val('');
                        }
                    }
                }
            } catch (e) {
                // queryCommandValue may fail in some browsers
            }
            
            // Update font size dropdown to reflect current selection
            try {
                const currentSize = document.queryCommandValue('fontSize');
                if (currentSize) {
                    const sizeSelect = this.toolbar.find('select[data-command="fontsize"]');
                    if (sizeSelect.length) {
                        sizeSelect.val(currentSize);
                    }
                }
            } catch (e) {
                // queryCommandValue may fail in some browsers
            }
            
            // Update color indicator bars to reflect current colors
            this.updateColorIndicators();
        }
        
        updateColorIndicators() {
            // Get the current selection's parent element
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            
            let element = selection.anchorNode;
            if (element.nodeType === 3) { // Text node
                element = element.parentElement;
            }
            
            // Get computed colors
            const computedStyle = window.getComputedStyle(element);
            const foregroundColor = computedStyle.color;
            const backgroundColor = computedStyle.backgroundColor;
            
            // Convert RGB to hex
            const rgbToHex = (rgb) => {
                if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') {
                    return null;
                }
                
                const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
                if (!match) return null;
                
                const r = parseInt(match[1]);
                const g = parseInt(match[2]);
                const b = parseInt(match[3]);
                
                return '#' + [r, g, b].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
            };
            
            // Update foreground color indicator
            const foregroundBtn = this.toolbar.find('.color-picker-btn[data-color-command="foreColor"]');
            if (foregroundBtn.length && foregroundColor) {
                const hexColor = rgbToHex(foregroundColor);
                if (hexColor) {
                    foregroundBtn.css('--indicator-color', hexColor);
                    foregroundBtn.attr('data-current-color', hexColor);
                }
            }
            
            // Update background color indicator
            const backgroundBtn = this.toolbar.find('.color-picker-btn[data-color-command="backColor"]');
            if (backgroundBtn.length) {
                const hexColor = rgbToHex(backgroundColor);
                if (hexColor && hexColor !== '#ffffff' && backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                    // Text has a non-default background color
                    backgroundBtn.css('--indicator-color', hexColor);
                    backgroundBtn.attr('data-current-color', hexColor);
                } else {
                    // Text has no background or white background - reset to default (yellow/transparent indicator)
                    backgroundBtn.css('--indicator-color', '#ffeb3b');
                    backgroundBtn.removeAttr('data-current-color');
                }
            }
        }

        updateStatusBar() {
            if (!this.options.showStatusBar) return;
            
            const text = this.contentArea.text();
            const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
            const chars = text.length;
            
            const wordLabel = (this.lang && this.lang.statusBar) ? 
                (words !== 1 ? this.lang.statusBar.words : this.lang.statusBar.word) : 
                (words !== 1 ? 'words' : 'word');
            
            const charLabel = (this.lang && this.lang.statusBar) ? 
                (chars !== 1 ? this.lang.statusBar.characters : this.lang.statusBar.character) : 
                (chars !== 1 ? 'characters' : 'character');
            
            this.statusBar.find('.word-count').text(`${words} ${wordLabel}`);
            this.statusBar.find('.char-count').text(`${chars} ${charLabel}`);
        }

        toggleCodeView() {
            this.isCodeView = !this.isCodeView;
            
            if (this.isCodeView) {
                // Get HTML and remove leading whitespace from each line
                let html = this.contentArea.html();
                html = this.formatHtmlForCodeView(html);
                this.codeArea.val(html);
                this.wrapper.addClass('code-view');
            } else {
                this.contentArea.html(this.codeArea.val());
                this.wrapper.removeClass('code-view');
            }
            
            this.toolbar.find('[data-command="codeView"]').toggleClass('active', this.isCodeView);
        }

        formatHtmlForCodeView(html) {
            // Remove leading whitespace from each line while preserving structure
            const lines = html.split('\n');
            
            // Find minimum indentation (ignoring empty lines)
            let minIndent = Infinity;
            lines.forEach(line => {
                if (line.trim().length > 0) {
                    const indent = line.match(/^\s*/)[0].length;
                    minIndent = Math.min(minIndent, indent);
                }
            });
            
            // Remove the minimum indentation from all lines
            if (minIndent > 0 && minIndent !== Infinity) {
                return lines.map(line => {
                    if (line.trim().length > 0) {
                        return line.substring(minIndent);
                    }
                    return line;
                }).join('\n');
            }
            
            return html;
        }

        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            this.wrapper.toggleClass('fullscreen', this.isFullscreen);
            
            const icon = this.toolbar.find('[data-command="fullscreen"] i');
            icon.toggleClass('bi-arrows-fullscreen', !this.isFullscreen);
            icon.toggleClass('bi-fullscreen-exit', this.isFullscreen);
            
            this.toolbar.find('[data-command="fullscreen"]').toggleClass('active', this.isFullscreen);
        }

        setDirection(direction, mode) {
            mode = mode || 'inline';
            
            if (mode === 'block') {
                // Block-level direction change (paragraph/div level)
                const selection = window.getSelection();
                
                if (selection && !selection.isCollapsed) {
                    // Find the parent block element
                    let node = selection.anchorNode;
                    while (node && node !== this.contentArea[0]) {
                        if (node.nodeType === 1 && ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE'].includes(node.nodeName)) {
                            $(node).css({
                                'direction': direction,
                                'text-align': direction === 'rtl' ? 'right' : 'left'
                            });
                            break;
                        }
                        node = node.parentNode;
                    }
                    
                    // If no block found, wrap in div
                    if (!node || node === this.contentArea[0]) {
                        const range = selection.getRangeAt(0);
                        const div = document.createElement('div');
                        div.style.direction = direction;
                        div.style.textAlign = direction === 'rtl' ? 'right' : 'left';
                        range.surroundContents(div);
                    }
                } else {
                    // Apply to entire content area
                    this.contentArea.css({
                        'direction': direction,
                        'text-align': direction === 'rtl' ? 'right' : 'left'
                    });
                }
            } else {
                // Inline direction change (original behavior)
                const selection = window.getSelection();
                
                if (selection && !selection.isCollapsed) {
                    // Wrap selection in a span with direction
                    const range = selection.getRangeAt(0);
                    const span = document.createElement('span');
                    span.style.direction = direction;
                    span.style.display = 'inline-block';
                    span.style.textAlign = direction === 'rtl' ? 'right' : 'left';
                    range.surroundContents(span);
                } else {
                    // Apply to entire content area
                    this.contentArea.css('direction', direction);
                    this.contentArea.css('text-align', direction === 'rtl' ? 'right' : 'left');
                }
            }
            
            this.updateHistory();
        }

        showLinkModal() {
            // Save the current selection first
            this.saveSelection();
            
            const selection = window.getSelection();
            const selectedText = selection.toString();
            
            if (selectedText) {
                $('#linkText').val(selectedText);
            } else {
                $('#linkText').val('');
            }
            
            $('#linkUrl').val('');
            $('#linkNewTab').prop('checked', true);
            $('#linkModal').addClass('show');
            $('#linkUrl').focus();
        }

        insertLink() {
            const text = $('#linkText').val();
            const url = $('#linkUrl').val();
            const newTab = $('#linkNewTab').is(':checked');
            
            if (!url) {
                const msg = (this.lang && this.lang.messages && this.lang.messages.enterUrl) || 'Please enter a URL';
                showAlert('error', msg, null, this.lang);
                return;
            }
            
            console.log('Inserting link, savedSelection:', this.savedSelection); // Debug
            
            // Close modal first
            $('#linkModal').removeClass('show');
            
            // Small delay to ensure modal is closed and focus can return
            setTimeout(() => {
                // Focus and restore selection before inserting
                this.contentArea.focus();
                this.restoreSelection();
                
                const linkHtml = `<a href="${url}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text || url}</a>`;
                document.execCommand('insertHTML', false, linkHtml);
                this.updateHistory();
                
                this.contentArea.focus();
            }, 50);
        }

        showImageModal() {
            // Save the current selection/cursor position
            this.saveSelection();
            
            $('#imageUrl').val('');
            $('#imageAlt').val('');
            $('#imageWidth').val('');
            $('#imageModal').addClass('show');
            $('#imageUrl').focus();
        }

        insertImage() {
            const url = $('#imageUrl').val();
            const alt = $('#imageAlt').val();
            const width = $('#imageWidth').val();
            
            if (!url) {
                const msg = (this.lang && this.lang.messages && this.lang.messages.enterImageUrl) || 'Please enter an image URL';
                showAlert('error', msg, null, this.lang);
                return;
            }
            
            let imageHtml = `<img src="${url}" alt="${alt || ''}"`;
            if (width) {
                imageHtml += ` style="width: ${width}"`;
            }
            imageHtml += '>';
            
            console.log('Inserting image, savedSelection:', this.savedSelection); // Debug
            
            // Close modal first
            $('#imageModal').removeClass('show');
            
            // Small delay to ensure modal is closed and focus can return
            setTimeout(() => {
                // Focus and restore selection before inserting
                this.contentArea.focus();
                this.restoreSelection();
                
                console.log('After restore, current selection:', window.getSelection().toString()); // Debug
                
                document.execCommand('insertHTML', false, imageHtml);
                this.updateHistory();
                
                this.contentArea.focus();
            }, 50);
        }

        showTableModal() {
            // Save the current selection/cursor position
            this.saveSelection();
            
            $('#tableModal').addClass('show');
            $('#tableModal').data('rows', 1);
            $('#tableModal').data('cols', 1);
        }

        insertTable() {
            const rows = this.selectedTableRows || 2;
            const cols = this.selectedTableCols || 2;
            
            console.log('Inserting table:', rows, 'x', cols, 'savedSelection:', this.savedSelection); // Debug
            
            let tableHtml = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
            
            for (let i = 0; i < rows; i++) {
                tableHtml += '<tr>';
                for (let j = 0; j < cols; j++) {
                    if (i === 0) {
                        tableHtml += '<th>Header</th>';
                    } else {
                        tableHtml += '<td>Cell</td>';
                    }
                }
                tableHtml += '</tr>';
            }
            
            tableHtml += '</table><p>&nbsp;</p>';
            
            // Close modal first
            $('#tableModal').removeClass('show');
            
            // Reset selection variables
            this.selectedTableRows = null;
            this.selectedTableCols = null;
            
            // Small delay to ensure modal is closed and focus can return
            setTimeout(() => {
                // Focus the editor and restore the saved selection/cursor position
                this.contentArea.focus();
                this.restoreSelection();
                
                // Insert the table at the restored cursor position
                document.execCommand('insertHTML', false, tableHtml);
                this.updateHistory();
                
                this.contentArea.focus();
            }, 50);
        }

        triggerChange() {
            // Update original textarea
            const content = this.isCodeView ? this.codeArea.val() : this.contentArea.html();
            this.element.val(content);
            
            // Trigger callbacks
            if (this.options.onChange) {
                this.options.onChange.call(this, content);
            }
            
            this.element.trigger('barnameneviseditor.change', [content]);
        }

        // Public methods
        getContent() {
            return this.isCodeView ? this.codeArea.val() : this.contentArea.html();
        }

        setContent(html) {
            this.contentArea.html(html);
            this.codeArea.val(html);
            this.updateHistory();
            this.updateStatusBar();
            this.triggerChange();
        }

        getText() {
            return this.contentArea.text();
        }

        clear() {
            this.setContent('');
        }

        focus() {
            if (this.isCodeView) {
                this.codeArea.focus();
            } else {
                this.contentArea.focus();
            }
        }

        disable() {
            this.contentArea.attr('contenteditable', 'false');
            this.codeArea.prop('disabled', true);
            this.wrapper.addClass('disabled');
        }

        enable() {
            this.contentArea.attr('contenteditable', 'true');
            this.codeArea.prop('disabled', false);
            this.wrapper.removeClass('disabled');
        }

        destroy() {
            this.wrapper.remove();
            $('.custom-editor-modal').remove();
            this.element.show();
        }
    }

    // jQuery plugin
    $.fn.barnamenevisEditor = function(options) {
        // Method calls
        if (typeof options === 'string') {
            const method = options;
            const args = Array.prototype.slice.call(arguments, 1);
            let result;
            
            this.each(function() {
                const instance = $(this).data('barnamenevisEditor');
                if (instance && typeof instance[method] === 'function') {
                    result = instance[method].apply(instance, args);
                }
            });
            
            return result !== undefined ? result : this;
        }
        
        // Initialization
        return this.each(function() {
            if (!$(this).data('barnamenevisEditor')) {
                const editor = new BarnamenevisEditor(this, options);
                $(this).data('barnamenevisEditor', editor);
            }
        });
    };

    // Backward compatibility - keep old name as alias
    $.fn.customEditor = $.fn.barnamenevisEditor;

    // Export to window for global access
    window.BarnamenevisEditor.init = function(selector, options) {
        return $(selector).barnamenevisEditor(options);
    };

})(jQuery);

