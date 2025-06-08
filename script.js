document.addEventListener('DOMContentLoaded', function() {
    // Create overlay element if it doesn't exist
    const nav = document.querySelector('nav');
    if (nav && !nav.querySelector('.overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        nav.appendChild(overlay);
    }

    // Fix the duplicate hamburger button
    const hamburgers = document.querySelectorAll('.hamburger');
    if (hamburgers.length > 1) {
        hamburgers[1].remove();
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');

    function toggleNav() {
        if (nav && navLinks && overlay) {
            nav.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNav();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleNav();
        });
    }

    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleNav();
        }
    });

    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            toggleNav();
        });
    });
});


// JavaScript for Tab Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            const targetPane = document.getElementById(target);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});


// Gallery Effect
document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    if (galleryItems.length && lightboxOverlay && lightboxImg) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateLightboxImage();
                lightboxOverlay.classList.add('active');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightboxOverlay.classList.remove('active');
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxImage();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxImage();
            });
        }

        function updateLightboxImage() {
            const imgSrc = galleryItems[currentIndex].src;
            lightboxImg.src = imgSrc;
        }

        let touchStartX = 0;
        let touchEndX = 0;

        lightboxOverlay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightboxOverlay.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX) {
                currentIndex = (currentIndex + 1) % galleryItems.length;
            } else if (touchEndX > touchStartX) {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            }
            updateLightboxImage();
        }

        document.addEventListener('keydown', (e) => {
            if (lightboxOverlay.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateLightboxImage();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    updateLightboxImage();
                } else if (e.key === 'Escape') {
                    lightboxOverlay.classList.remove('active');
                }
            }
        });
    }
});


// Trust Stats Swipe + Pagination
document.addEventListener('DOMContentLoaded', function () {
    const trustStats = document.querySelector('.trust-stats');

    if (trustStats && window.innerWidth <= 767) {
        const indicator = document.createElement('div');
        indicator.className = 'swipe-indicator';
        indicator.innerHTML = '<span>Swipe to see more</span>';
        trustStats.parentNode.insertBefore(indicator, trustStats);

        let hasScrolled = false;
        trustStats.addEventListener('scroll', function () {
            if (!hasScrolled) {
                hasScrolled = true;
                indicator.style.opacity = '0';
                setTimeout(() => {
                    indicator.remove();
                }, 500);
            }
        });

        const items = trustStats.querySelectorAll('.trust-item');
        if (items.length > 1) {
            const pagination = document.createElement('div');
            pagination.className = 'trust-pagination';

            for (let i = 0; i < items.length; i++) {
                const dot = document.createElement('span');
                dot.className = i === 0 ? 'dot active' : 'dot';
                pagination.appendChild(dot);
            }

            trustStats.parentNode.appendChild(pagination);

            trustStats.addEventListener('scroll', function () {
                const scrollPosition = trustStats.scrollLeft;
                const itemWidth = items[0].offsetWidth;
                const dots = document.querySelectorAll('.trust-pagination .dot');

                const activeIndex = Math.round(scrollPosition / itemWidth);
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            });
        }
    }
});

