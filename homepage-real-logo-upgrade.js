/**
 * 首页真实 LOGO 优化器
 * 优先使用站点自身 favicon / apple-touch-icon，失败时再回退到公共 favicon 服务。
 */
(function () {
    const FALLBACK_SERVICES = {
        iconHorse: (domain) => `https://icon.horse/icon/${domain}`,
        googleS2: (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    };

    const getDomain = (url) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace(/^www\./i, '');
        } catch (error) {
            return '';
        }
    };

    const buildCandidates = (domain, originalSrc = '') => {
        if (!domain) {
            return originalSrc ? [originalSrc] : [];
        }

        const directIconCandidates = [
            `https://${domain}/favicon.ico`,
            `https://${domain}/favicon.png`,
            `https://${domain}/apple-touch-icon.png`,
            `https://${domain}/apple-touch-icon-precomposed.png`
        ];

        const networkCandidates = [
            FALLBACK_SERVICES.iconHorse(domain),
            FALLBACK_SERVICES.googleS2(domain)
        ];

        const candidates = [...directIconCandidates, ...networkCandidates];
        if (originalSrc && !candidates.includes(originalSrc)) {
            candidates.push(originalSrc);
        }
        return candidates;
    };

    const applyFallbackChain = (img, candidates) => {
        if (!img || !candidates.length) return;

        let currentIndex = 0;
        const tried = new Set();

        const loadNext = () => {
            while (currentIndex < candidates.length && tried.has(candidates[currentIndex])) {
                currentIndex += 1;
            }

            if (currentIndex >= candidates.length) {
                img.classList.add('is-logo-fallback-failed');
                return;
            }

            const nextUrl = candidates[currentIndex];
            currentIndex += 1;
            tried.add(nextUrl);
            img.src = nextUrl;
        };

        img.addEventListener('error', loadNext);
        loadNext();
    };

    const enhanceHomepageLogos = () => {
        const cards = document.querySelectorAll('.ai-card');

        cards.forEach((card) => {
            const logoImg = card.querySelector('.ai-card__logo img');
            const href = card.getAttribute('href') || '';
            if (!logoImg || !href) return;

            const domain = getDomain(href);
            const originalSrc = logoImg.getAttribute('src') || '';
            const candidates = buildCandidates(domain, originalSrc);

            logoImg.loading = 'lazy';
            logoImg.decoding = 'async';
            logoImg.referrerPolicy = 'no-referrer';
            logoImg.crossOrigin = 'anonymous';
            applyFallbackChain(logoImg, candidates);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceHomepageLogos);
    } else {
        enhanceHomepageLogos();
    }
})();
