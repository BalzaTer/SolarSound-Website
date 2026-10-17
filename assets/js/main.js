/**
 * SolarSound Website - Main JavaScript
 * Formulaire de contact, animations et interactions du site
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
    contactEmail: 'dev.hcstudio@gmail.com',
    animationsEnabled: true,
    githubRepo: 'https://github.com/BalzaTer/SolarSound',
    githubLicense: 'https://github.com/BalzaTer/SolarSound?tab=MIT-1-ov-file'
};

// ============================================
// Contact Form Handler
// ============================================
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> <span>Envoi en cours...</span>`;
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Send email using mailto
        const subject = encodeURIComponent(`[SolarSound] ${data.subject || 'Formulaire de contact'}`);
        const body = encodeURIComponent(
            `Nom : ${data.name}\n` +
            `Adresse e-mail : ${data.email}\n` +
            `Message :\n${data.message}`
        );
        
        const mailtoLink = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
        
        // Open mail client
        window.location.href = mailtoLink;
        
        // Reset form and button
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.form.reset();
            
            // Show success message
            this.showMessage(
                'Message envoyé ! Veuillez vérifier votre client de messagerie.',
                'success'
            );
        }, 1000);
    }
    
    showMessage(text, type) {
        // Remove existing message
        const existingMsg = this.form.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = text;
        messageEl.style.cssText = `
            padding: 12px;
            margin-top: 16px;
            border-radius: 8px;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)'};
            color: ${type === 'success' ? '#4caf50' : '#f44336'};
            border: 1px solid ${type === 'success' ? '#4caf50' : '#f44336'};
            animation: fadeIn 0.3s ease;
            text-align: center;
        `;
        
        this.form.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// ============================================
// Changelog Accordion
// ============================================
class ChangelogAccordion {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            this.bindEvents();
        }, 100);
    }
    
    bindEvents() {
        const toggles = document.querySelectorAll('.changelog-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAccordion(toggle);
            });
        });
    }
    
    toggleAccordion(toggle) {
        const targetId = toggle.getAttribute('aria-controls');
        const content = document.getElementById(targetId);
        if (!content) return;
        
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions in the same group
        const group = toggle.closest('.download-item');
        if (group) {
            const otherToggles = group.querySelectorAll('.changelog-toggle');
            otherToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherId = otherToggle.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherId);
                    if (otherContent) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                        otherContent.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = null;
                    }
                }
            });
        }
        
        // Toggle current accordion
        toggle.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
        }
    }
}

// ============================================
// Animations
// ============================================
class Animations {
    constructor() {
        if (!CONFIG.animationsEnabled) return;
        this.init();
    }
    
    init() {
        // Intersection Observer for fade-in animations
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        
                        // Add delay based on data-delay attribute
                        const delay = entry.target.getAttribute('data-delay');
                        if (delay) {
                            entry.target.style.animationDelay = delay;
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
        
        // Parallax effect for hero section
        this.initParallax();
        
        // Animated background elements
        this.initFloatingElements();
    }
    
    initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            const logo = hero.querySelector('.hero-logo');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }
            
            if (logo) {
                const currentTransform = logo.style.transform || '';
                logo.style.transform = `translateY(${scrolled * 0.5}px) ${currentTransform}`;
            }
        });
    }
    
    initFloatingElements() {
        // Create floating particles
        const particles = document.createElement('div');
        particles.className = 'floating-particles';
        particles.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 149, 0, ${Math.random() * 0.2 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            particles.appendChild(particle);
        }
        
        document.body.appendChild(particles);
        
        // Add keyframes for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideIn {
                from { transform: translateX(-20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInRight {
                from { transform: translateX(20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// Download Manager
// ============================================
class DownloadManager {
    constructor() {
        if (!Array.isArray(window.SOLARSOUND_RELEASES)) {
            throw new Error('La liste des versions SolarSound est introuvable.');
        }

        this.releases = window.SOLARSOUND_RELEASES;
        this.renderDownloads();
    }
    
    renderDownloads() {
        const container = document.querySelector('.downloads-container');
        if (!container) return;
        
        let html = '';
        
        // Latest release first
        if (this.releases.length > 0) {
            const latest = this.releases[0];
            html += this.createDownloadItem(latest, true);
        }
        
        // Other releases
        if (this.releases.length > 1) {
            html += '<div class="section-title" style="margin-top: 2rem;">' +
                'Versions précédentes' +
                '</div>';
            
            for (let i = 1; i < this.releases.length; i++) {
                html += this.createDownloadItem(this.releases[i], false);
            }
        }
        
        container.innerHTML = html;
        
        // Re-initialize accordions after rendering
        if (window.changelogAccordion) {
            window.changelogAccordion.bindEvents();
        }
    }
    
    createDownloadItem(release, isLatest) {
        const changesHtml = release.changes.map(change => 
            `<li class="changelog-item"><strong>•</strong> ${change}</li>`
        ).join('');
        
        const changelogId = `changelog-${release.version.replace(/\./g, '-')}`;
        const seeChangesText = 'Voir les changements';
        const standaloneText = 'Version Portable (EXE)';
        const installerText = 'Installateur';
        
        return `
            <div class="download-item fade-on-scroll" ${isLatest ? 'data-delay="0.1s"' : ''}>
                <div class="download-item-header">
                    <div>
                        <h3 class="download-item-title">${release.title}</h3>
                        <span class="download-item-date">${release.date}</span>
                    </div>
                    <span class="download-item-version">v${release.version}</span>
                </div>
                <p class="download-item-description">${release.description}</p>
                <div class="download-buttons">
                    <a href="${release.standalone.url}" class="btn btn-primary download-btn">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        ${standaloneText}
                    </a>
                    <a href="${release.installer.url}" class="btn btn-secondary download-btn">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        ${installerText}
                    </a>
                </div>
                <div class="changelog-section">
                    <button class="changelog-toggle" 
                            aria-expanded="false" 
                            aria-controls="${changelogId}">
                        <span>${seeChangesText}</span>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="changelog-content" 
                         id="${changelogId}" 
                         aria-expanded="false" 
                         style="max-height: 0; overflow: hidden; transition: max-height 0.5s ease;">
                        <ul class="changelog-list">
                            ${changesHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// Screenshot Gallery
// ============================================
class ScreenshotGallery {
    constructor() {
        this.images = Array.from(document.querySelectorAll('.screenshot-image'));
        this.activeIndex = 0;
        this.previousFocus = null;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.dragPosition = null;

        if (this.images.length === 0) return;

        this.createLightbox();
        this.bindEvents();
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.setAttribute('role', 'dialog');
        this.lightbox.setAttribute('aria-modal', 'true');
        this.lightbox.setAttribute('aria-label', 'Galerie de captures d’écran');
        this.lightbox.setAttribute('tabindex', '-1');

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        this.closeButton = this.createButton('lightbox-close', 'Fermer la galerie', '×');
        this.image = document.createElement('img');
        this.image.className = 'lightbox-image';
        this.image.alt = '';

        const zoomControls = document.createElement('div');
        zoomControls.className = 'lightbox-zoom-controls';
        this.zoomOutButton = this.createButton('lightbox-zoom-button', 'Réduire le zoom', '−');
        this.zoomLevel = document.createElement('span');
        this.zoomLevel.className = 'lightbox-zoom-level';
        this.zoomLevel.setAttribute('aria-live', 'polite');
        this.zoomInButton = this.createButton('lightbox-zoom-button', 'Agrandir le zoom', '+');
        this.resetZoomButton = this.createButton('lightbox-zoom-reset', 'Réinitialiser le zoom', 'Réinitialiser');
        zoomControls.append(
            this.zoomOutButton,
            this.zoomLevel,
            this.zoomInButton,
            this.resetZoomButton
        );

        this.caption = document.createElement('p');
        this.caption.className = 'lightbox-caption';
        this.caption.setAttribute('aria-live', 'polite');

        this.previousButton = this.createButton('lightbox-nav prev', 'Capture précédente', '‹');
        this.nextButton = this.createButton('lightbox-nav next', 'Capture suivante', '›');

        content.append(
            this.closeButton,
            this.image,
            zoomControls,
            this.caption,
            this.previousButton,
            this.nextButton
        );
        this.lightbox.appendChild(content);
        document.body.appendChild(this.lightbox);
    }

    createButton(className, label, text) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.setAttribute('aria-label', label);
        button.textContent = text;
        return button;
    }

    bindEvents() {
        this.images.forEach((image, index) => {
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', `Agrandir : ${image.alt}`);
            image.addEventListener('click', () => this.open(index));
            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.open(index);
                }
            });
        });

        this.closeButton.addEventListener('click', () => this.close());
        this.previousButton.addEventListener('click', () => this.showImage(this.activeIndex - 1));
        this.nextButton.addEventListener('click', () => this.showImage(this.activeIndex + 1));
        this.zoomOutButton.addEventListener('click', () => this.setZoom(this.zoom - 0.25));
        this.zoomInButton.addEventListener('click', () => this.setZoom(this.zoom + 0.25));
        this.resetZoomButton.addEventListener('click', () => this.setZoom(1));
        this.image.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.setZoom(this.zoom + (event.deltaY < 0 ? 0.25 : -0.25));
        }, { passive: false });
        this.image.addEventListener('pointerdown', (event) => this.startDragging(event));
        this.image.addEventListener('pointermove', (event) => this.drag(event));
        this.image.addEventListener('pointerup', () => this.stopDragging());
        this.image.addEventListener('pointercancel', () => this.stopDragging());
        this.lightbox.addEventListener('click', (event) => {
            if (event.target === this.lightbox) this.close();
        });
        document.addEventListener('keydown', (event) => this.handleKeydown(event));
    }

    open(index) {
        this.previousFocus = document.activeElement;
        this.lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
        this.showImage(index);
        this.closeButton.focus();
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        if (this.previousFocus instanceof HTMLElement) this.previousFocus.focus();
    }

    showImage(index) {
        this.activeIndex = (index + this.images.length) % this.images.length;
        const selectedImage = this.images[this.activeIndex];
        this.image.src = selectedImage.src;
        this.image.alt = selectedImage.alt;
        this.setZoom(1);
        this.caption.textContent = `${selectedImage.alt} — ${this.activeIndex + 1} / ${this.images.length}`;
    }

    setZoom(zoom) {
        this.zoom = Math.min(3, Math.max(1, zoom));
        if (this.zoom === 1) {
            this.panX = 0;
            this.panY = 0;
        }

        this.image.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
        this.image.classList.toggle('zoomed', this.zoom > 1);
        this.zoomLevel.textContent = `${Math.round(this.zoom * 100)} %`;
        this.zoomOutButton.disabled = this.zoom === 1;
        this.zoomInButton.disabled = this.zoom === 3;
        this.resetZoomButton.disabled = this.zoom === 1;
    }

    startDragging(event) {
        if (this.zoom === 1 || event.button !== 0) return;

        event.preventDefault();
        this.dragPosition = { x: event.clientX, y: event.clientY };
        this.image.setPointerCapture(event.pointerId);
    }

    drag(event) {
        if (!this.dragPosition) return;

        this.panX += event.clientX - this.dragPosition.x;
        this.panY += event.clientY - this.dragPosition.y;
        this.dragPosition = { x: event.clientX, y: event.clientY };
        this.image.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    }

    stopDragging() {
        this.dragPosition = null;
    }

    handleKeydown(event) {
        if (!this.lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') {
            this.close();
        } else if (event.key === 'ArrowLeft') {
            this.showImage(this.activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
            this.showImage(this.activeIndex + 1);
        } else if (event.key === '+' || event.key === '=') {
            this.setZoom(this.zoom + 0.25);
        } else if (event.key === '-') {
            this.setZoom(this.zoom - 0.25);
        } else if (event.key === '0') {
            this.setZoom(1);
        }
    }
}

// ============================================
// Navigation
// ============================================
class Navigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMain = document.querySelector('.nav-main');
        
        if (menuToggle && navMain) {
            menuToggle.addEventListener('click', () => {
                navMain.classList.toggle('mobile-visible');
            });
        }
        
        // Active nav link based on current page
        this.setActiveLink();
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Fix header z-index issue
        this.fixHeaderZindex();
    }
    
    setActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const pageName = currentPath.replace('.html', '');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href').replace('.html', '');
            if (href === pageName || (href === '' && pageName === 'index')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    fixHeaderZindex() {
        // Make sure header doesn't overlap content
        const header = document.querySelector('.header');
        const mainContent = document.querySelector('.main-content');
        
        if (header && mainContent) {
            // Add padding to main content equal to header height
            const headerHeight = parseInt(getComputedStyle(header).height) || 70;
            mainContent.style.paddingTop = `${headerHeight}px`;
        }
    }
}

// ============================================
// Initialize everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize other components
    window.contactForm = new ContactForm();
    if (document.querySelector('.downloads-container')) {
        window.downloadManager = new DownloadManager();
    }
    window.animations = new Animations();
    window.navigation = new Navigation();
    window.changelogAccordion = new ChangelogAccordion();
    window.screenshotGallery = new ScreenshotGallery();
    
    console.log('Site SolarSound initialisé');
});

// ============================================
// Utility Functions
// ============================================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Make functions globally available
window.formatDate = formatDate;
window.formatFileSize = formatFileSize;
