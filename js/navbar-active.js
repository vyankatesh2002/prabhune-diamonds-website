// Universal Navbar Active State Manager
// Detects current page and highlights active nav links across desktop/mobile/menu-card

document.addEventListener('DOMContentLoaded', function() {
    // Get current page path (normalized)
    const currentPath = window.location.pathname.toLowerCase().replace(/\\|\/|\.html/g, '');
    const currentPage = currentPath.split('/').pop() || 'index';
    
    console.log('Navbar Active: Current page detected:', currentPage);
    
    // Function to set active state
    function setActiveNav() {
        // Reset all active classes first
        document.querySelectorAll('.nav a, .mobile-menu a, .menu-card-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Map page names to nav links (handle inconsistencies)
        const pageLinks = {
            'index': ['index.html', 'home'],
            'about': ['about.html', 'about-us', 'about'],
            'products': ['products.html', 'Products.html', 'our-products', 'products'],
            'consultation': ['consultation.html', 'consultation']
        };
        
        const targetLinks = pageLinks[currentPage] || [];
        
        // Highlight matching links
        document.querySelectorAll('.nav a, .mobile-menu a, .menu-card-links a').forEach(link => {
            const href = link.getAttribute('href')?.toLowerCase().replace(/\\|\/|\.html/g, '') || '';
            if (targetLinks.some(target => href.includes(target))) {
                link.classList.add('active');
                console.log('Active link found:', link.textContent.trim());
            }
        });
    }
    
    // Initial activation
    setActiveNav();
    
    // Re-run on nav clicks (for smooth transitions)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.nav a, .mobile-menu a, .menu-card-links a')) {
            setTimeout(setActiveNav, 100); // Small delay for mobile menu animations
        }
    });
    
    // Handle browser back/forward (popstate)
    window.addEventListener('popstate', setActiveNav);
});

// Export for potential reuse
window.setNavbarActive = setActiveNav;

