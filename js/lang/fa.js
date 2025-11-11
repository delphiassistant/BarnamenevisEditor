/**
 * BarnamenevisEditor - Persian/Farsi Language File
 * Language: Persian/Farsi (fa)
 * زبان: فارسی
 */

(function() {
    'use strict';

    if (typeof window.BarnamenevisEditor === 'undefined') {
        window.BarnamenevisEditor = {};
    }

    window.BarnamenevisEditor.lang = window.BarnamenevisEditor.lang || {};

    window.BarnamenevisEditor.lang.fa = {
        // Toolbar buttons - دکمه‌های نوار ابزار
        toolbar: {
            undo: 'واگرد (Ctrl+Z)',
            redo: 'بازگرد (Ctrl+Y)',
            bold: 'درشت (Ctrl+B)',
            italic: 'کج (Ctrl+I)',
            underline: 'زیرخط‌دار (Ctrl+U)',
            strikethrough: 'خط‌خورده',
            fontname: 'نوع قلم',
            fontsize: 'اندازه قلم',
            forecolor: 'رنگ متن',
            backcolor: 'رنگ پس‌زمینه',
            removeFormat: 'پاک‌سازی قالب‌بندی',
            insertUnorderedList: 'فهرست نقطه‌ای',
            insertOrderedList: 'فهرست شماره‌دار',
            justifyLeft: 'چیدمان چپ',
            justifyCenter: 'چیدمان وسط',
            justifyRight: 'چیدمان راست',
            justifyFull: 'هم‌تراز',
            insertLink: 'درج پیوند',
            insertImage: 'درج تصویر',
            insertTable: 'درج جدول',
            codeView: 'نمای کد',
            fullscreen: 'تمام‌صفحه',
            directionLTR: 'درون‌خطی چپ به راست',
            directionRTL: 'درون‌خطی راست به چپ',
            paragraphLTR: 'پاراگراف چپ به راست',
            paragraphRTL: 'پاراگراف راست به چپ'
        },

        // Font sizes - اندازه‌های قلم
        fontSizeLabel: 'اندازه قلم',
        fontSize: {
            1: 'اندازه ۱',
            2: 'اندازه ۲',
            3: 'اندازه ۳',
            4: 'اندازه ۴',
            5: 'اندازه ۵',
            6: 'اندازه ۶',
            7: 'اندازه ۷'
        },

        // Modals - پنجره‌های محاوره‌ای
        modal: {
            // Link modal - پنجره پیوند
            insertLink: 'درج پیوند',
            linkText: 'متن پیوند:',
            linkUrl: 'آدرس:',
            linkNewTab: 'باز شدن در زبانه جدید',
            linkTextPlaceholder: 'متن پیوند را وارد کنید',
            linkUrlPlaceholder: 'https://example.com',
            
            // Image modal - پنجره تصویر
            insertImage: 'درج تصویر',
            imageUrl: 'آدرس تصویر:',
            imageAlt: 'متن جایگزین:',
            imageWidth: 'عرض (اختیاری):',
            imageUrlPlaceholder: 'https://example.com/image.jpg',
            imageAltPlaceholder: 'توضیحات تصویر',
            imageWidthPlaceholder: 'مثلاً: 300px یا 100%',
            
            // Table modal - پنجره جدول
            insertTable: 'درج جدول',
            tableSelectSize: 'اندازه جدول را انتخاب کنید:',
            
            // Common - عمومی
            cancel: 'انصراف',
            insert: 'درج',
            close: 'بستن'
        },

        // Status bar - نوار وضعیت
        statusBar: {
            words: 'کلمه',
            word: 'کلمه',
            characters: 'نویسه',
            character: 'نویسه'
        },

        // Alerts and messages - هشدارها و پیام‌ها
        messages: {
            enterUrl: 'لطفاً آدرس را وارد کنید',
            enterImageUrl: 'لطفاً آدرس تصویر را وارد کنید',
            contentCopied: 'کد HTML کپی شد!',
            browserNotSupported: 'مرورگر شما از این قابلیت پشتیبانی نمی‌کند',
            blogPostSaved: 'مقاله ذخیره شد!',
            success: 'موفقیت',
            info: 'اطلاعات',
            error: 'خطا',
            ok: 'تأیید'
        },

        // Placeholder - متن پیش‌فرض
        placeholder: 'شروع به نوشتن کنید...'
    };

})();

