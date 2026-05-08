(function() {
            const openBtn = document.getElementById('openMenuBtn');
            const overlay = document.getElementById('menuOverlay');
            const mobileMenu = document.getElementById('mobileMenu');

            if (openBtn && overlay && mobileMenu) {
                openBtn.addEventListener('click', function() {
                    mobileMenu.classList.add('active');
                    overlay.classList.add('active');
                });

                overlay.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
        })();

        // ========== js/menu-card.js ==========
        (function() {
            // The original menu card was triggered by a separate button, but here we
            // reuse the same openMenuBtn to toggle the card as per original design.
            const openBtn = document.getElementById('openMenuBtn');
            const closeBtn = document.getElementById('closeMenuBtn');
            const menuCard = document.getElementById('menuCard');

            if (openBtn && closeBtn && menuCard) {
                openBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    menuCard.classList.toggle('active');
                });

                closeBtn.addEventListener('click', function() {
                    menuCard.classList.remove('active');
                });

                // Close when clicking outside the card
                document.addEventListener('click', function(e) {
                    if (!menuCard.contains(e.target) && e.target !== openBtn) {
                        menuCard.classList.remove('active');
                    }
                });
            }
        })();

        // ========== Smooth scroll for product pills ==========
        document.querySelectorAll('.nav-pill').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-pill').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ========== Highlight active pill on scroll ==========
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.product-section');
            const pills = document.querySelectorAll('.nav-pill');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            pills.forEach(pill => {
                pill.classList.remove('active');
                if (pill.getAttribute('href') === '#' + current) {
                    pill.classList.add('active');
                }
            });
        });