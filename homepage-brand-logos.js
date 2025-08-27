/**
 * 首页品牌LOGO背景
 * 为首页添加主要AI品牌的LOGO作为背景装饰
 */

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在首页
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }

    // 创建背景容器
    const backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'homepage-brand-logos';
    backgroundContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
        opacity: 0.06;
    `;
    
    document.body.appendChild(backgroundContainer);

    // 主要AI品牌配置
    const mainBrands = [
        {
            name: 'OpenAI',
            domain: 'openai.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
            fallback: '🤖'
        },
        {
            name: 'Anthropic',
            domain: 'anthropic.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png',
            fallback: '🧠'
        },
        {
            name: 'Google AI',
            domain: 'ai.google',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
            fallback: '🔍'
        },
        {
            name: 'Microsoft',
            domain: 'microsoft.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
            fallback: '🪟'
        },
        {
            name: 'Meta AI',
            domain: 'ai.meta.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
            fallback: '📘'
        },
        {
            name: 'Amazon',
            domain: 'amazon.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
            fallback: '📦'
        }
    ];

    // 创建品牌LOGO网格
    const brandGrid = document.createElement('div');
    brandGrid.className = 'homepage-brand-grid';
    brandGrid.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 40px;
        padding: 80px;
        align-items: center;
        justify-items: center;
    `;

    // 为每个品牌创建LOGO
    mainBrands.forEach((brand, index) => {
        createBrandLogo(brandGrid, brand, index);
    });

    backgroundContainer.appendChild(brandGrid);

    function createBrandLogo(container, brand, index) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'homepage-brand-logo';
        logoContainer.style.cssText = `
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.8);
            animation: brandLogoAppear 1s ease-out ${index * 0.2}s forwards;
            transition: all 0.3s ease;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        `;

        // 创建LOGO图片
        const logoImg = document.createElement('div');
        logoImg.style.cssText = `
            width: 80%;
            height: 80%;
            background-image: url('${brand.logo}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            filter: blur(0.5px) grayscale(0.3);
            transition: all 0.3s ease;
        `;

        // 添加品牌名称
        const brandName = document.createElement('div');
        brandName.textContent = brand.name;
        brandName.style.cssText = `
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.3);
            text-align: center;
            white-space: nowrap;
            opacity: 0;
            animation: brandNameAppear 0.5s ease-out ${index * 0.2 + 0.5}s forwards;
        `;

        logoContainer.appendChild(logoImg);
        logoContainer.appendChild(brandName);
        container.appendChild(logoContainer);

        // 添加悬停效果
        logoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '0.15';
            logoImg.style.filter = 'blur(0px) grayscale(0)';
        });

        logoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.1';
            logoImg.style.filter = 'blur(0.5px) grayscale(0.3)';
        });
    }
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    @keyframes brandLogoAppear {
        to {
            opacity: 0.1;
            transform: scale(1);
        }
    }
    
    @keyframes brandNameAppear {
        to {
            opacity: 0.4;
        }
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .homepage-brand-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            gap: 20px !important;
            padding: 40px !important;
        }
        
        .homepage-brand-logo {
            width: 80px !important;
            height: 80px !important;
        }
    }
    
    @media (max-width: 480px) {
        .homepage-brand-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important;
            gap: 15px !important;
            padding: 30px !important;
        }
        
        .homepage-brand-logo {
            width: 60px !important;
            height: 60px !important;
        }
    }
`;
document.head.appendChild(style);
