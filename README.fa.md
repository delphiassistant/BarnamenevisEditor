# ویرایشگر BarnamenevisEditor

یک ویرایشگر HTML سبک ولی کامل که با جاوااسکریپت خالص، jQuery و Bootstrap 5 ساخته شده است. BarnamenevisEditor تجربه‌ای مشابه TinyMCE ارائه می‌دهد؛ با ابزارهای غنی قالب‌بندی، پشتیبانی از راست‌به‌چپ، بومی‌سازی، فونت‌های سفارشی و تجربه کاربری مدرن—بدون نیاز به مرحله ساخت.

![نسخه](https://img.shields.io/badge/version-1.2.0-blue.svg)
![مجوز](https://img.shields.io/badge/license-MIT-green.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)
![jQuery](https://img.shields.io/badge/jQuery-3.7-blue.svg)

**دموی زنده:** [https://delphiassistant.github.io/BarnamenevisEditor/](https://delphiassistant.github.io/BarnamenevisEditor/)

---

## ویژگی‌های کلیدی

- **قالب‌بندی غنی:** بولد، ایتالیک، زیرخط، خط‌خورده، انتخاب فونت و اندازه، رنگ متن/پس‌زمینه، پاک‌سازی قالب.
- **ابزارهای چیدمان:** فهرست‌های شماره‌گذاری‌شده و نقطه‌ای، ترازبندی متن، تغییر جهت بلوک و پاراگراف (LTR/RTL)، جدول‌های سفارشی.
- **درج محتوا:** لینک‌ها، تصاویر، جدول‌ها، نمای کد، حالت تمام‌صفحه، خروجی HTML.
- **بهره‌وری:** تاریخچه بازگشت/انجام مجدد، میانبرهای صفحه‌کلید، راهنما و پنل وضعیت با شمارش واژه/کاراکتر.
- **تجربه کاربری:** نوارابزار واکنش‌گرا برای موبایل، حالت تیره، رنگ‌های همگام، پالت‌های قابل سفارشی‌سازی، استایل Bootstrap 5.
- **دسترس‌پذیری:** کنترل‌های سازگار با ARIA، نمایش فوکوس، پشتیبانی کنتراست بالا و کاهش حرکت، رابط آگاه به راست‌به‌چپ، راهنماهای صفحه‌کلید.

---

## شروع سریع

### 1. افزوده‌های لازم

```html
<!-- استایل‌های اصلی -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="css/BarnamenevisEditor.css">

<!-- اسکریپت‌های اصلی -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/BarnamenevisEditor.js"></script>
<script src="js/lang/fa.js"></script> <!-- در صورت نیاز زبان‌های دیگر را اضافه کنید -->
```

### 2. افزودن یک تکست‌ایریا

```html
<textarea id="postBody">
    <p>به BarnamenevisEditor خوش آمدید!</p>
</textarea>
```

### 3. راه‌اندازی

```javascript
$(function () {
    $('#postBody').barnamenevisEditor({
        height: '420px',
        language: 'fa',
        showStatusBar: true
    });
});
```

کار تمام است! ویرایشگر جایگزین تکست‌ایریا می‌شود و محتوای HTML را در کنار عنصر اصلی برای ارسال فرم نگه می‌دارد.

---

## مرجع پیکربندی

| گزینه | نوع | مقدار پیش‌فرض | توضیح |
|-------|-----|----------------|--------|
| `height` | رشته | `'400px'` | ارتفاع ناحیه قابل ویرایش؛ هر ارتفاع معتبر CSS پذیرفته می‌شود. |
| `language` | رشته | `'en'` | کد زبانی که از `window.BarnamenevisEditor.lang` بارگذاری می‌شود. |
| `toolbar` | رشته یا آرایه | `'full'` | مقادیر `'full'`، `'basic'`، `'minimal'`، یا آرایه سفارشی از شناسه دکمه‌ها. |
| `fontFamilies` | آرایه | مقادیر داخلی | آرایه‌ای از رشته‌ها یا آبجکت‌های `{displayName, value}`؛ به طور کامل جایگزین پیش‌فرض‌ها می‌شود. |
| `fontSizes` | آرایه | `[1,2,3,4,5,6,7]` | نگاشت اندازه فونت مرورگر (۱ تا ۷). |
| `colors` | آرایه | ۶۴ مقدار hex | پالت رنگ برای انتخابگرهای متن و پس‌زمینه. |
| `showStatusBar` | بولین | `true` | نمایش یا مخفی کردن نوار وضعیت با شمارنده واژه/کاراکتر. |
| `placeholder` | رشته | `'Start typing…'` | متن راهنما هنگام خالی بودن ویرایشگر. |
| `onInit` | تابع | `null` | فراخوانی پس از بارگذاری ویرایشگر؛ نمونه ویرایشگر را دریافت می‌کند. |
| `onChange` | تابع | `null` | هنگام تغییر محتوا اجرا می‌شود و HTML را برمی‌گرداند. |

### نمونه: نوارابزار و فونت‌های سفارشی

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
        { displayName: 'میخک', value: 'Mikhak, Tahoma, sans-serif' },
        { displayName: 'Roboto', value: 'Roboto, Arial, sans-serif' }
    ]
});
```

---

## API و رویدادها

```javascript
// متدهای نمونه
$('#editor').barnamenevisEditor('getContent');
$('#editor').barnamenevisEditor('setContent', '<p>سلام!</p>');
$('#editor').barnamenevisEditor('getText');
$('#editor').barnamenevisEditor('clear');
$('#editor').barnamenevisEditor('focus');
$('#editor').barnamenevisEditor('disable');
$('#editor').barnamenevisEditor('enable');
$('#editor').barnamenevisEditor('destroy');

// رویدادها
$('#editor')
  .on('barnameneviseditor.init', (evt, instance) => console.log('آماده', instance))
  .on('barnameneviseditor.change', (evt, html) => console.log('تغییر کرد', html))
  .on('barnameneviseditor.focus', () => console.log('فوکوس شد'))
  .on('barnameneviseditor.blur', () => console.log('فوکوس از دست رفت'));
```

میانبرهای صفحه‌کلید: `Ctrl+B`، `Ctrl+I`، `Ctrl+U`، `Ctrl+Z`، `Ctrl+Y`، `Ctrl+Shift+Z`، `Tab` برای تورفتگی، به‌علاوه میانبرهای پیش‌فرض مرورگر برای کپی/برش/چسباندن.

---

## بومی‌سازی

BarnamenevisEditor با فایل‌های انگلیسی (`en`) و فارسی (`fa`) عرضه می‌شود. افزودن زبان‌های بیش‌تر بسیار ساده است:

1. **فایل‌های زبان** را پس از `js/app.js` بارگذاری کنید؛ مثال: `js/lang/en.js`، `js/lang/fa.js`.
2. **ویرایشگر را راه‌اندازی کنید** و کد زبان دلخواه را بدهید: `$('#editor').barnamenevisEditor({ language: 'fa' });`
3. **ترجمه جدید** بسازید؛ فایل `js/lang/en.js` را کپی کرده و کد زبان را تغییر دهید:

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

**نکات**
- تنها زبان‌های موردنیاز را بارگذاری کنید تا حجم بسته کوچک بماند.
- برای زبان‌های راست‌به‌چپ، `dir="rtl"` را روی عنصر `<html>` یا والد ویرایشگر قرار دهید.
- در صورت نبود ترجمه، متن انگلیسی به صورت خودکار جایگزین می‌شود.

---

## فونت‌های سفارشی

BarnamenevisEditor می‌تواند هر فونتی را در لیست نمایش دهد—فونت‌های سیستمی، @font-face محلی یا Google Fonts.

1. **فونت را بارگذاری کنید** (با `@font-face`، لینک استایل خارجی یا Google Fonts).
2. **لیست فونت‌ها** را با `fontFamilies` بدهید؛ در این صورت لیست شما جایگزین پیش‌فرض می‌شود.
3. **از آبجکت‌ها** برای نمایش نام بومی یا افزودن فونت‌های جایگزین استفاده کنید.

```javascript
$('#editor').barnamenevisEditor({
    fontFamilies: [
        'Arial',
        'Tahoma',
        {
            displayName: 'میخک',
            value: 'Mikhak, Tahoma, sans-serif'
        },
        {
            displayName: 'Roboto (Google)',
            value: 'Roboto, Arial, sans-serif'
        }
    ]
});
```

**بهترین تمرین‌ها**
- همیشه فونت جایگزین در `value` قرار دهید.
- مطمئن شوید فایل‌های فونت **قبل از** راه‌اندازی ویرایشگر بارگذاری شده‌اند.
- می‌توانید پیش‌فرض‌ها را با پخش کردنشان ترکیب کنید: `const defaults = $.fn.barnamenevisEditor.defaults.fontFamilies;`.
- از ابزار توسعه مرورگر → شبکه (فیلتر فونت) برای اطمینان از لود شدن فایل‌های فونت استفاده کنید.

---

## پوسته و حالت تیره

- نوار ابزار و محتوا با افزودن کلاس `theme-dark` به صورت خودکار با حالت‌های روشن/تیره هماهنگ می‌شوند.
- صفحات دموی پروژه دکمه‌ای برای افزودن `body.dark-mode` دارند که تیترها، دکمه‌ها، بلوک‌های کد و لفاف ویرایشگر را یکپارچه تغییر می‌دهد.
- نمای کد و پیش‌نمایش HTML جهت LTR، فونت Consolas، بدون حاشیه چپ و یکدست‌سازی فاصله‌ها را اعمال می‌کنند.

برای تغییر در زمان اجرا:

```javascript
$('.custom-editor-wrapper').toggleClass('theme-dark');
```

---

## دکمه‌های نوارابزار

| دسته | دکمه‌ها |
|------|---------|
| تاریخچه | `undo`، `redo` |
| استایل | `bold`، `italic`، `underline`، `strikethrough`، `removeFormat` |
| فونت‌ها | `fontname`، `fontsize`، `forecolor`، `backcolor` |
| پاراگراف | `insertUnorderedList`، `insertOrderedList`، `justifyLeft`، `justifyCenter`، `justifyRight`، `justifyFull` |
| جهت | `directionLTR`، `directionRTL`، `paragraphLTR`، `paragraphRTL` |
| درج | `insertLink`، `insertImage`، `insertTable` |
| نمایش | `codeView`، `fullscreen` |

انتخابگرهای رنگ یک نوار نشانگر زنده دارند که رنگ متن یا پس‌زمینه انتخاب‌شده را نمایش می‌دهد و در صورت نبود قالب به حالت اولیه بازمی‌گردد.

---

## ساختار فایل‌ها

```
HtmlEditor/
├── index.html              # دموی انگلیسی
├── index-fa.html           # دموی فارسی (RTL)
├── README.md               # مستندات اصلی
├── CHANGELOG.md            # تاریخچه نسخه‌ها
├── css/
│   └── BarnamenevisEditor.css    # استایل ویرایشگر
├── js/
│   ├── BarnamenevisEditor.js     # منطق ویرایشگر
│   └── lang/
│       ├── en.js
│       └── fa.js
└── fonts/                  # نمونه فونت‌های سفارشی (اختیاری)
```

---

## پشتیبانی مرورگر

- Chrome / Edge (Chromium)
- Firefox
- Safari
- مرورگرهای موبایل (iOS/Android)

تمام مرورگرهای مدرن بدون نیاز به پلی‌فیل پشتیبانی می‌شوند.

---

## عیب‌یابی

- **ویرایشگر فعال نمی‌شود** → مطمئن شوید jQuery قبل از `js/BarnamenevisEditor.js` بارگذاری شده باشد.
- **محتوا ارسال نمی‌شود** → هنگام ارسال فرم، `$('#editor').barnamenevisEditor('getContent')` را فراخوانی کنید.
- **فونت سفارشی دیده نمی‌شود** → بارگذاری فایل‌های فونت، تطابق نام `font-family` و حضور فونت‌های جایگزین را بررسی کنید.
- **رنگ‌ها در جای اشتباه اعمال می‌شوند** → از فعال بودن انتخاب متن مطمئن شوید؛ پنجره‌ها و انتخابگرهای رنگ به صورت خودکار انتخاب را ذخیره و بازیابی می‌کنند.
- **مشکل در چیدمان RTL** → والد ویرایشگر را با `dir="rtl"` بپیچید یا از دکمه‌های تغییر جهت پاراگراف استفاده کنید.

---

## یادداشت‌های انتشار

- **آخرین نسخه:** v1.2.0 — بهبودهای بزرگ UX (راهنماها، انتخابگرهای رنگ، جدول‌ها، نمای کد، حالت تیره، همگام‌سازی فونت، ارتقای بومی‌سازی).
- **نسخ قبلی:** v1.1.0 — بازنام‌گذاری به BarnamenevisEditor، سیستم بومی‌سازی، دکمه‌های جهت، مهاجرت به Bootstrap Icons.
- تاریخچه کامل در [`CHANGELOG.md`](CHANGELOG.md) موجود است.

---

## مجوز

MIT © 2025 — استفاده آزاد در پروژه‌های تجاری و شخصی.

---

**ویرایش دلپذیر! ✨**

