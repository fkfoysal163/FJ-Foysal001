/* ==========================================================================
   App General Logic & Mobile Interactions - STEP 11
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Drawer Navigation Controls
    const menuOpenBtn = document.getElementById('mobile-menu-open');
    const menuCloseBtn = document.getElementById('mobile-menu-close');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('mobile-nav-overlay');

    function openMobileMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMobileMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    // Close menu on ESC keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // 2. Active Menu Link Highlighter
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentUrlParams = new URLSearchParams(window.location.search);
    const categoryParam = currentUrlParams.get('category');

    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove default active state from static HTML
        link.classList.remove('active');

        if (categoryParam && href.includes(`category=${categoryParam}`)) {
            link.classList.add('active');
        } else if (!categoryParam && href === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Category Widget Generation for Sidebar
    const categoryWidgetList = document.getElementById('category-widget-list');
    if (categoryWidgetList) {
        const categories = [
            { name: "সরকারি চাকরি", slug: "government", icon: "fa-building-columns" },
            { name: "ব্যাংক চাকরি", slug: "bank", icon: "fa-building-ngo" },
            { name: "বেসরকারি চাকরি", slug: "private", icon: "fa-briefcase" },
            { name: "NGO চাকরি", slug: "ngo", icon: "fa-hands-holding-child" },
            { name: "IT চাকরি", slug: "it", icon: "fa-laptop-code" },
            { name: "গার্মেন্টস", slug: "garments", icon: "fa-shirt" },
            { name: "পার্ট-টাইম", slug: "part-time", icon: "fa-clock" },
            { name: "ইন্টার্নশিপ", slug: "internship", icon: "fa-graduation-cap" },
            { name: "পরীক্ষা ও ফলাফল", slug: "exam", icon: "fa-file-signature" }
        ];

        let catHtml = '';
        categories.forEach(cat => {
            catHtml += `
                <a href="category.html?category=${cat.slug}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-0 border-bottom">
                    <span><i class="fa-solid ${cat.icon} text-primary me-2 ms-1"></i>${cat.name}</span>
                    <i class="fa-solid fa-angle-right text-muted small me-1"></i>
                </a>
            `;
        });
        categoryWidgetList.innerHTML = catHtml;
    }
});