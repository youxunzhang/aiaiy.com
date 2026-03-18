class HomepageProductLogoOptimizer {
    constructor() {
        this.logoEntries = this.createLogoEntries();
        this.palettes = [
            ['#2563eb', '#1d4ed8'],
            ['#7c3aed', '#5b21b6'],
            ['#ec4899', '#db2777'],
            ['#f97316', '#ea580c'],
            ['#0ea5e9', '#0284c7'],
            ['#10b981', '#059669'],
            ['#f59e0b', '#d97706'],
            ['#64748b', '#475569'],
            ['#8b5cf6', '#6d28d9'],
            ['#ef4444', '#dc2626']
        ];
        this.placeholder = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        this.init();
    }

    init() {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyLogos());
        } else {
            this.applyLogos();
        }
    }

    createLogoEntries() {
        const createEntry = (domains, src, options = {}) => ({
            domains: Array.isArray(domains) ? domains : [domains],
            src,
            matchSubdomains: options.matchSubdomains !== false,
            brandColor: options.brandColor || null,
            referrerPolicy: options.referrerPolicy || 'no-referrer'
        });

        return [
            createEntry('openai.com', 'https://cdn.simpleicons.org/openai/412991', { brandColor: '#412991' }),
            createEntry('deepseek.com', 'https://chat.deepseek.com/apple-touch-icon.png', { matchSubdomains: true, brandColor: '#0ea5e9', referrerPolicy: 'no-referrer' }),
            createEntry('perplexity.ai', 'https://www.perplexity.ai/favicon.ico', { brandColor: '#111827' }),
            createEntry('poe.com', 'https://poe.com/favicon.ico', { matchSubdomains: false, brandColor: '#2563eb' }),
            createEntry('character.ai', 'https://cdn.simpleicons.org/characterdotai/000000', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry(['pi.ai', 'inflection.ai'], 'https://pi.ai/favicon.ico', { matchSubdomains: false, brandColor: '#6366f1' }),
            createEntry('sensetime.com', 'https://www.sensetime.com/favicon.ico', { matchSubdomains: false, brandColor: '#ef4444' }),
            createEntry('writer.com', 'https://www.writer.com/favicon-512.png', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry(['gemini.google.com', 'ai.google.dev'], 'https://www.gstatic.com/lamda/images/share-favicon-512x512.png', { matchSubdomains: false, brandColor: '#4285f4' }),
            createEntry('notebooklm.google', 'https://www.gstatic.com/lamda/images/share-favicon-512x512.png', { matchSubdomains: false, brandColor: '#4285f4' }),
            createEntry('google.com', 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png', { brandColor: '#4285f4' }),
            createEntry('anthropic.com', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/512px-Anthropic_logo.svg.png', { brandColor: '#111827' }),
            createEntry('aws.amazon.com', 'https://cdn.simpleicons.org/amazonaws/FF9900', { matchSubdomains: false, brandColor: '#ff9900' }),
            createEntry('amazon.com', 'https://cdn.simpleicons.org/amazon/FF9900', { brandColor: '#f97316' }),
            createEntry('azure.microsoft.com', 'https://cdn.simpleicons.org/microsoftazure/0078D4', { matchSubdomains: false, brandColor: '#0078d4' }),
            createEntry('microsoft.com', 'https://cdn.simpleicons.org/microsoft/737373', { brandColor: '#2563eb' }),
            createEntry('yiyan.baidu.com', 'https://yiyan.baidu.com/favicon.ico', { matchSubdomains: false, brandColor: '#2319dc' }),
            createEntry('baidu.com', 'https://logo.clearbit.com/baidu.com', { brandColor: '#2319dc' }),
            createEntry('cloud.tencent.com', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tencent_Cloud_logo.svg/512px-Tencent_Cloud_logo.svg.png', { brandColor: '#0ea5e9', matchSubdomains: true }),
            createEntry('tencent.com', 'https://cdn.simpleicons.org/tencentqq/50C8EF', { brandColor: '#0ea5e9' }),
            createEntry('notion.so', 'https://cdn.simpleicons.org/notion/000000', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry('zapier.com', 'https://cdn.simpleicons.org/zapier/FF4A00', { matchSubdomains: false, brandColor: '#f97316' }),
            createEntry('semrush.com', 'https://cdn.simpleicons.org/semrush/FF642D', { matchSubdomains: false, brandColor: '#f97316' }),
            createEntry('framer.com', 'https://cdn.simpleicons.org/framer/0055FF', { matchSubdomains: false, brandColor: '#2563eb' }),
            createEntry('vercel.com', 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry('canva.com', 'https://cdn.simpleicons.org/canva/00C4CC', { matchSubdomains: true, brandColor: '#06b6d4' }),
            createEntry('shopify.com', 'https://cdn.simpleicons.org/shopify/7AB55C', { matchSubdomains: true, brandColor: '#16a34a' }),
            createEntry('hubspot.com', 'https://cdn.simpleicons.org/hubspot/FF7A59', { matchSubdomains: true, brandColor: '#f97316' }),
            createEntry('midjourney.com', 'https://cdn.simpleicons.org/midjourney/111111', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry('patreon.com', 'https://cdn.simpleicons.org/patreon/F96854', { matchSubdomains: false, brandColor: '#f97316' }),
            createEntry('buffer.com', 'https://cdn.simpleicons.org/buffer/3A8DDE', { matchSubdomains: false, brandColor: '#2563eb' }),
            createEntry('socialbee.com', 'https://socialbee.com/wp-content/uploads/cropped-favicon-192x192.png', { matchSubdomains: false, brandColor: '#facc15' }),
            createEntry('capcut.com', 'https://cdn.simpleicons.org/capcut/000000', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry('descript.com', 'https://cdn.simpleicons.org/descript/1B5BFF', { matchSubdomains: false, brandColor: '#2563eb' }),
            createEntry('invideo.io', 'https://cdn.simpleicons.org/invideo/8A2BE2', { matchSubdomains: false, brandColor: '#8b5cf6' }),
            createEntry('lumen5.com', 'https://cdn.simpleicons.org/lumen5/5840FF', { matchSubdomains: false, brandColor: '#6366f1' }),
            createEntry('ezoic.com', 'https://cdn.simpleicons.org/ezoic/5CFF00', { matchSubdomains: false, brandColor: '#16a34a' }),
            createEntry('media.net', 'https://www.media.net/wp-content/uploads/2021/07/cropped-media.net-icon-512x512.png', { matchSubdomains: false, brandColor: '#0ea5e9' }),
            createEntry('propellerads.com', 'https://propellerads.com/wp-content/uploads/2019/03/cropped-PROP-Logo-Black-192x192.png', { matchSubdomains: false, brandColor: '#facc15' }),
            createEntry('mgid.com', 'https://cdn.simpleicons.org/mgid/EE2127', { matchSubdomains: false, brandColor: '#ef4444' }),
            createEntry('outbrain.com', 'https://cdn.simpleicons.org/outbrain/FF4F00', { matchSubdomains: false, brandColor: '#f97316' }),
            createEntry('gamma.app', 'https://assets.gamma.app/favicon-192.png', { matchSubdomains: false, brandColor: '#38bdf8' }),
            createEntry('leonardo.ai', 'https://leonardo.ai/favicon.ico', { matchSubdomains: false, brandColor: '#f97316' }),
            createEntry('adobe.com', 'https://cdn.simpleicons.org/adobe/FF0000', { matchSubdomains: false, brandColor: '#ef4444' }),
            createEntry('loom.com', 'https://cdn.simpleicons.org/loom/615EFF', { matchSubdomains: false, brandColor: '#8b5cf6' }),
            createEntry('otter.ai', 'https://cdn.simpleicons.org/otter/3A79F7', { matchSubdomains: false, brandColor: '#0ea5e9' }),
            createEntry('jasper.ai', 'https://cdn.simpleicons.org/jasper/7950F2', { matchSubdomains: false, brandColor: '#7c3aed' }),
            createEntry('bing.com', 'https://cdn.simpleicons.org/bing/008373', { matchSubdomains: false, brandColor: '#0f766e' }),
            createEntry('aliyun.com', 'https://cdn.simpleicons.org/alibabacloud/FF6A00', { brandColor: '#f97316' }),
            createEntry('iflytek.com', 'https://logo.clearbit.com/iflytek.com', { matchSubdomains: false, brandColor: '#2563eb' }),
            createEntry('moonshot.cn', 'https://static.moonshot.cn/kimi/favicon.ico', { matchSubdomains: false, brandColor: '#6366f1' }),
            createEntry('x.ai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/X.AI_logo.svg/512px-X.AI_logo.svg.png', { matchSubdomains: false, brandColor: '#111827' }),
            createEntry('xfyun.cn', 'https://xinghuo.xfyun.cn/favicon.ico', { brandColor: '#2563eb' })
        ];
    }

    applyLogos() {
        const cards = document.querySelectorAll('a.ai-card');
        cards.forEach(card => {
            const logoWrapper = card.querySelector('.ai-card__logo');
            if (!logoWrapper) {
                return;
            }
            const img = logoWrapper.querySelector('img');
            if (!img) {
                return;
            }

            const href = card.getAttribute('href');
            if (!href) {
                return;
            }

            const domain = this.extractDomain(href);
            if (!domain) {
                return;
            }

            const productName = this.getCardName(card) || domain;
            const entry = this.findLogoEntry(domain);

            this.prepareImageElement(img, productName, domain);

            if (entry && entry.src) {
                this.applyRemoteLogo(img, logoWrapper, entry, productName, domain);
            } else {
                this.applyFallbackLogo(img, logoWrapper, productName, domain, entry);
            }
        });
    }

    prepareImageElement(img, productName, domain) {
        img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
        img.setAttribute('decoding', 'async');
        img.dataset.logoDomain = domain;
        img.dataset.logoGenerated = 'false';
        img.setAttribute('alt', `${productName} logo`);
        if (!img.getAttribute('referrerpolicy')) {
            img.setAttribute('referrerpolicy', 'no-referrer');
        }
    }

    applyRemoteLogo(img, wrapper, entry, productName, domain) {
        const applyFallbackOnce = () => {
            this.applyFallbackLogo(img, wrapper, productName, domain, entry);
        };

        img.onerror = () => {
            if (img.dataset.logoFallbackApplied === 'true') {
                return;
            }
            applyFallbackOnce();
        };

        if (entry.referrerPolicy) {
            img.setAttribute('referrerpolicy', entry.referrerPolicy);
        }

        img.dataset.logoSource = 'remote';
        wrapper.classList.remove('is-generated-logo');
        img.dataset.logoGenerated = 'false';

        if (entry.srcset) {
            img.setAttribute('srcset', entry.srcset);
        } else {
            img.removeAttribute('srcset');
        }

        if (img.getAttribute('src') !== entry.src) {
            img.setAttribute('src', entry.src);
        }
    }

    applyFallbackLogo(img, wrapper, productName, domain, entry) {
        if (img.dataset.logoFallbackApplied === 'true') {
            return;
        }

        const fallback = this.createFallbackLogo(productName, domain, entry);
        img.dataset.logoFallbackApplied = 'true';
        img.dataset.logoGenerated = 'true';
        img.dataset.logoSource = 'generated';
        wrapper.classList.add('is-generated-logo');
        img.removeAttribute('srcset');
        img.removeAttribute('referrerpolicy');
        img.setAttribute('alt', fallback.alt);
        img.setAttribute('src', fallback.src || this.placeholder);
    }

    extractDomain(url) {
        try {
            const parsed = new URL(url, window.location.href);
            return parsed.hostname.replace(/^www\./, '').toLowerCase();
        } catch (error) {
            const sanitized = (url || '').replace(/^https?:\/\//, '').split('/')[0];
            return sanitized.replace(/^www\./, '').toLowerCase();
        }
    }

    getCardName(card) {
        const nameElement = card.querySelector('.ai-card__name');
        if (!nameElement) {
            return '';
        }
        return nameElement.textContent.trim();
    }

    findLogoEntry(domain) {
        for (const entry of this.logoEntries) {
            if (!entry || !entry.domains) {
                continue;
            }

            for (const pattern of entry.domains) {
                if (pattern instanceof RegExp) {
                    if (pattern.test(domain)) {
                        return entry;
                    }
                    continue;
                }

                if (entry.matchSubdomains) {
                    if (domain === pattern || domain.endsWith(`.${pattern}`)) {
                        return entry;
                    }
                } else if (domain === pattern) {
                    return entry;
                }
            }
        }
        return null;
    }

    createFallbackLogo(name, domain, entry) {
        const label = this.extractInitials(name || domain);
        const palette = this.pickPalette(domain || name, entry && entry.brandColor);
        const gradientId = `grad-${this.hashCode(domain || name)}`;

        const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${this.escapeXml(name || domain)} generic mark"><defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${palette[0]}"/><stop offset="100%" stop-color="${palette[1]}"/></linearGradient></defs><rect width="128" height="128" rx="24" fill="url(#${gradientId})"/><text x="50%" y="52%" font-family="'Inter', 'Segoe UI', sans-serif" font-size="56" font-weight="700" fill="#f8fafc" text-anchor="middle" dominant-baseline="middle">${this.escapeXml(label)}</text></svg>`;

        return {
            src: this.svgToDataUri(svg),
            alt: `${name || domain} generic logo`
        };
    }

    extractInitials(name) {
        if (!name) {
            return '?';
        }

        const trimmed = name.trim();
        if (!trimmed) {
            return '?';
        }

        const chineseMatch = trimmed.match(/[\u4e00-\u9fa5]{1,2}/);
        if (chineseMatch) {
            return chineseMatch[0];
        }

        const parts = trimmed.split(/\s+/).filter(Boolean);
        if (parts.length === 1) {
            const cleaned = parts[0].replace(/[^a-zA-Z0-9]/g, '');
            if (cleaned.length >= 2) {
                return cleaned.slice(0, 2).toUpperCase();
            }
            if (cleaned.length === 1) {
                return cleaned.toUpperCase();
            }
        }

        const letters = trimmed.replace(/[^a-zA-Z0-9]/g, '');
        if (letters.length >= 2) {
            return letters.slice(0, 2).toUpperCase();
        }

        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }

        return trimmed.charAt(0).toUpperCase();
    }

    pickPalette(key, preferredColor) {
        if (preferredColor) {
            const darker = this.adjustColor(preferredColor, -0.25);
            return [preferredColor, darker];
        }

        const hash = Math.abs(this.hashCode(key));
        return this.palettes[hash % this.palettes.length];
    }

    adjustColor(hex, factor) {
        const sanitized = (hex || '#2563eb').replace('#', '');
        if (!/^([0-9a-fA-F]{6})$/.test(sanitized)) {
            return '#1e40af';
        }

        const r = parseInt(sanitized.substring(0, 2), 16);
        const g = parseInt(sanitized.substring(2, 4), 16);
        const b = parseInt(sanitized.substring(4, 6), 16);

        const adjust = value => {
            const next = value + value * factor;
            return Math.max(0, Math.min(255, Math.round(next)));
        };

        const toHex = value => value.toString(16).padStart(2, '0');

        return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
    }

    svgToDataUri(svg) {
        try {
            const encoded = window.btoa(unescape(encodeURIComponent(svg)));
            return `data:image/svg+xml;base64,${encoded}`;
        } catch (error) {
            console.warn('Failed to encode SVG logo, using placeholder.', error);
            return this.placeholder;
        }
    }

    escapeXml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    hashCode(value) {
        const stringValue = String(value || '');
        let hash = 0;
        for (let i = 0; i < stringValue.length; i += 1) {
            hash = (hash << 5) - hash + stringValue.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }
}

new HomepageProductLogoOptimizer();
