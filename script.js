/* ================================================
   Project Data
   ================================================ */

const projects = [
    {
        title: "StackLoop",
        description: "Developer community platform with JWT-based authentication, RBAC, CRUD flows, lazy loading, and API optimization for fast load times.",
        tech: ["React.js", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
        live: "https://stack-loop-developer-social-communi.vercel.app/",
        github: "https://github.com/zaid2904/StackLoop-Developer-Social-Community-Platform",
        // githubBackend: "https://github.com/zaid2904/StackLoop-Developer-Community-Platform-BACKEND-"
    },
    // {
    //     title: "Real-Time Chat Application",
    //     description: "WebSocket-driven messaging system with live updates, read receipts, and efficient real-time event handling.",
    //     tech: ["React.js", "Node.js", "Socket.io"],
    //     live: "https://example.com",
    //     github: "https://github.com"
    // },
    {
        title: "CourseHub",
        description: "MERN-stack course buying platform with user authentication, course listings, secure checkout, RESTful APIs, and a dynamic React frontend.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
        live: "https://course-hub-online-course-management.vercel.app/",
        github: "https://github.com/zaid2904/CourseHub-Online-Course-Management-Learning-Platform.git"
    }
];

/* ================================================
   Project Rendering
   ================================================ */

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const techStack = project.tech
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techStack}
            </div>
            <div class="project-links">
                <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

/* ================================================
   Mobile Hamburger Menu
   ================================================ */

class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.menuBtn && this.navMenu) {
            this.init();
        }
    }

    init() {
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');

        // Update icon based on state
        const isActive = this.navMenu.classList.contains('active');
        if (isActive) {
            this.menuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            this.menuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
    }

    handleOutsideClick(e) {
        if (!this.navMenu.contains(e.target) && !this.menuBtn.contains(e.target)) {
            this.closeMenu();
        }
    }
}

/* ================================================
   Active Navigation Link
   ================================================ */

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "-80px 0px 0px 0px" // Account for navbar
    });

    sections.forEach(section => observer.observe(section));
}

/* ================================================
   Page Load & Initialization
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic content
    renderProjects();

    // Initialize UI components
    new MobileMenu();
    updateActiveNavLink();
    // Contact copy/email helpers
    const copyBtn = document.getElementById('copy-email');
    const emailCompose = document.getElementById('email-compose');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const email = 'zzaid.dev@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                const original = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = original; }, 2000);
            } catch (err) {
                // Fallback: select and prompt
                alert('Copy failed — please copy manually: ' + email);
            }
        });
    }
    if (emailCompose) {
        // small analytics hook or graceful degrade can go here
        emailCompose.addEventListener('click', () => {
            // no-op for now; reserved for tracking or prefill adjustments
        });
    }
});
