(function () {
    const DETAIL_PAGE = 'products/product.html';

    const slugify = (text) => {
        if (!text) return 'product';
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') || 'product';
    };

    const extractText = (root, selector) => {
        if (!root) return '';
        const element = root.querySelector(selector);
        return element ? element.textContent.trim() : '';
    };

    const findSectionInfo = (anchor) => {
        const section = anchor.closest('section');
        if (!section) {
            return {
                title: '首页推荐',
                id: 'overview'
            };
        }

        const heading = section.querySelector('h2, h3');
        const title = heading ? heading.textContent.trim() : '首页推荐';
        return {
            title,
            id: section.id || slugify(title)
        };
    };

    const buildProductPayload = (anchor) => {
        if (!(anchor instanceof HTMLAnchorElement)) return null;

        const sectionInfo = findSectionInfo(anchor);
        const name = anchor.dataset.productName || extractText(anchor, '.modern-card__title, .tool-card__title, h3');
        const description = anchor.dataset.productSummary || extractText(anchor, '.modern-card__description, p');
        const category = anchor.dataset.productCategory || extractText(anchor, '.modern-card__badge');
        const badge = extractText(anchor, '.modern-card__badge');
        const logoImg = anchor.dataset.productLogo || (anchor.querySelector('img') ? anchor.querySelector('img').src : '');
        const website = anchor.dataset.productUrl || anchor.getAttribute('href');
        const id = anchor.dataset.productId || slugify(name || website);

        if (!website || !/^https?:/i.test(website)) {
            return null;
        }

        const summary = description || (badge ? `${name} - ${badge}` : '');
        const keyFeatures = [];
        if (description) keyFeatures.push(description);
        if (badge && (!description || !description.includes(badge))) {
            keyFeatures.push(`特色：${badge}`);
        }

        const idealUsers = sectionInfo.title ? [`适用于关注${sectionInfo.title}的用户`] : [];
        const highlights = badge ? [`重点优势：${badge}`] : [];

        return {
            id,
            name: name || website,
            category: category || sectionInfo.title || 'AI 工具',
            summary,
            tagline: anchor.dataset.productTagline || summary,
            website,
            productUrl: website,
            logo: logoImg,
            keyFeatures,
            idealUsers,
            pricing: ['访问官网了解定价信息'],
            highlights,
            integrations: [],
            relatedTools: [],
            sectionTitle: sectionInfo.title,
            sectionId: sectionInfo.id,
            storedAt: Date.now()
        };
    };

    const storePendingProduct = (product) => {
        try {
            sessionStorage.setItem('pendingProduct', JSON.stringify(product));
        } catch (error) {
            console.warn('Failed to cache pending product detail:', error);
        }
    };

    const redirectToDetail = (product) => {
        const detailUrl = `${DETAIL_PAGE}?id=${encodeURIComponent(product.id)}`;
        window.location.href = detailUrl;
    };

    const shouldIntercept = (anchor) => {
        if (!(anchor instanceof HTMLAnchorElement)) return false;
        const href = anchor.getAttribute('href');
        if (!href) return false;
        if (!/^https?:/i.test(href)) return false;
        if (anchor.dataset.skipProductDetail === 'true') return false;
        return true;
    };

    const attachInterceptors = () => {
        const candidates = new Set();
        const selectors = [
            'a.modern-card',
            'a.tool-card',
            '.tool-card a',
            '.modern-card a'
        ];

        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                if (element instanceof HTMLAnchorElement) {
                    candidates.add(element);
                }
            });
        });

        candidates.forEach((anchor) => {
            if (!shouldIntercept(anchor)) return;
            anchor.addEventListener('click', (event) => {
                const product = buildProductPayload(anchor);
                if (!product) return;
                event.preventDefault();
                storePendingProduct(product);
                redirectToDetail(product);
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachInterceptors);
    } else {
        attachInterceptors();
    }
})();
