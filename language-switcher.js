(function() {
    const LANGUAGE_MAP = {
        'zh-cn': 'zh-CN',
        'zh': 'zh-CN',
        'zh_hans': 'zh-CN',
        'zh-hans': 'zh-CN',
        'cn': 'zh-CN',
        'en': 'en',
        'en-us': 'en',
        'english': 'en'
    };

    const normalizeLang = (value) => {
        if (!value) return null;
        const lower = value.toString().trim().toLowerCase();
        if (!lower) return null;
        if (LANGUAGE_MAP[lower]) return LANGUAGE_MAP[lower];
        const base = lower.split('-')[0];
        return LANGUAGE_MAP[base] || null;
    };

    const defaultLang = normalizeLang(document.documentElement.lang) || 'zh-CN';
    let currentLang = defaultLang;
    let translatorReady = false;
    let pendingLang = null;

    const setDocumentLang = (lang) => {
        document.documentElement.setAttribute('lang', lang === 'zh-CN' ? 'zh-CN' : 'en');
    };

    const ensureTranslateContainer = () => {
        if (!document.getElementById('google_translate_element')) {
            const container = document.createElement('div');
            container.id = 'google_translate_element';
            container.style.display = 'none';
            document.body.appendChild(container);
        }
    };

    const createLanguageWidget = () => {
        if (document.querySelector('.language-widget')) return;

        const widget = document.createElement('div');
        widget.className = 'language-widget shadow-lg';
        widget.innerHTML = `
            <button type="button" class="language-toggle-btn" data-lang="zh-CN" aria-label="切换到中文">中文</button>
            <button type="button" class="language-toggle-btn" data-lang="en" aria-label="Switch to English">EN</button>
        `;
        document.body.appendChild(widget);
    };

    const updateActiveButtons = () => {
        const normalizedCurrent = currentLang;
        document.querySelectorAll('[data-lang]').forEach(element => {
            const target = normalizeLang(element.getAttribute('data-lang'));
            if (!target) return;
            if (target === normalizedCurrent) {
                element.classList.add('language-active');
            } else {
                element.classList.remove('language-active');
            }
        });
    };

    const applyLanguage = (lang) => {
        const target = normalizeLang(lang) || defaultLang;
        if (!translatorReady) {
            pendingLang = target;
            return;
        }

        const combo = document.querySelector('select.goog-te-combo');
        if (!combo) {
            setTimeout(() => applyLanguage(target), 120);
            return;
        }

        if (combo.value !== target) {
            combo.value = target;
        }
        combo.dispatchEvent(new Event('change'));
    };

    const setLanguage = (lang, options = {}) => {
        const normalized = normalizeLang(lang) || defaultLang;
        currentLang = normalized;
        setDocumentLang(normalized);
        updateActiveButtons();

        if (!translatorReady) {
            pendingLang = normalized;
        } else {
            applyLanguage(normalized);
        }

        if (!options.silent) {
            localStorage.setItem('preferred-language', normalized);
        }
    };

    const handleLanguageClick = (event) => {
        const button = event.target.closest('[data-lang]');
        if (!button) return;
        event.preventDefault();
        const targetLang = button.getAttribute('data-lang');
        setLanguage(targetLang);
    };

    const loadGoogleTranslate = () => {
        if (document.getElementById('google-translate-script')) return;
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.defer = true;
        document.head.appendChild(script);
    };

    window.googleTranslateElementInit = function() {
        const pageLang = defaultLang === 'zh-CN' ? 'zh-CN' : 'en';
        new google.translate.TranslateElement({
            pageLanguage: pageLang,
            includedLanguages: 'en,zh-CN',
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
        }, 'google_translate_element');

        translatorReady = true;

        if (pendingLang) {
            const target = pendingLang;
            pendingLang = null;
            applyLanguage(target);
        } else {
            applyLanguage(currentLang);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        ensureTranslateContainer();
        createLanguageWidget();
        document.addEventListener('click', handleLanguageClick);
        loadGoogleTranslate();

        const stored = normalizeLang(localStorage.getItem('preferred-language'));
        const initial = stored || defaultLang;
        currentLang = initial;
        setDocumentLang(initial);
        updateActiveButtons();
        setTimeout(updateActiveButtons, 300);

        if (initial !== defaultLang) {
            pendingLang = initial;
        }

        localStorage.setItem('preferred-language', initial);
    });

    window.LanguageSwitcher = {
        setLanguage,
        getCurrentLanguage: () => currentLang,
        getDefaultLanguage: () => defaultLang
    };
})();
