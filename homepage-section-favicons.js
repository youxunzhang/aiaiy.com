(function() {
    const SECTION_TITLES = new Set([
        'AI Foundation Models & Machine Learning Tools',
        'Website Services',
        'Make Money Online',
        'Social Media',
        'Ad Networks'
    ]);

    document.addEventListener('DOMContentLoaded', () => {
        const titles = document.querySelectorAll('h2.category-title');
        titles.forEach(title => {
            const label = title.textContent.trim();
            if (!SECTION_TITLES.has(label)) {
                return;
            }

            const section = title.closest('section');
            if (!section) {
                return;
            }

            const cards = section.querySelectorAll('a.tool-card');
            cards.forEach(card => enhanceCard(card));
        });
    });

    function enhanceCard(card) {
        if (card.dataset.faviconReady === 'true') {
            return;
        }

        let cardUrl;
        try {
            cardUrl = new URL(card.href, window.location.href);
        } catch (error) {
            return;
        }

        if (cardUrl.hostname === window.location.hostname) {
            return;
        }

        const content = card.querySelector('.tool-content');
        if (!content) {
            return;
        }

        card.dataset.faviconReady = 'true';
        card.classList.add('tool-card--with-favicon');

        const inner = document.createElement('div');
        inner.className = 'tool-card__inner';

        const favicon = createFaviconElement(cardUrl, content);
        inner.appendChild(favicon);

        content.classList.add('tool-card__text');
        card.insertBefore(inner, content);
        inner.appendChild(content);
    }

    function createFaviconElement(cardUrl, content) {
        const faviconWrapper = document.createElement('div');
        faviconWrapper.className = 'tool-favicon';
        faviconWrapper.setAttribute('aria-hidden', 'true');

        const fallbackInitial = document.createElement('span');
        fallbackInitial.className = 'tool-favicon__initial';
        fallbackInitial.textContent = getInitial(content);
        faviconWrapper.appendChild(fallbackInitial);

        const faviconImage = document.createElement('img');
        faviconImage.className = 'tool-favicon__image';
        faviconImage.alt = '';
        faviconImage.loading = 'lazy';
        faviconImage.decoding = 'async';
        faviconImage.referrerPolicy = 'no-referrer';
        faviconImage.src = getFaviconUrl(cardUrl);

        faviconImage.addEventListener('load', () => {
            if (faviconImage.naturalWidth > 0) {
                faviconWrapper.classList.add('tool-favicon--image');
            }
        });

        faviconImage.addEventListener('error', () => {
            faviconWrapper.classList.add('tool-favicon--fallback');
        });

        faviconWrapper.appendChild(faviconImage);
        return faviconWrapper;
    }

    function getFaviconUrl(cardUrl) {
        return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(cardUrl.origin)}`;
    }

    function getInitial(content) {
        const heading = content.querySelector('h3');
        const text = heading ? heading.textContent.trim() : '';
        const firstChar = text.charAt(0);
        if (firstChar) {
            return firstChar.toUpperCase();
        }
        return '•';
    }
})();
