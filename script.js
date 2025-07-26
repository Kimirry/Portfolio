// --- Greeting Logic ---
(function showGreeting() {
    const hours = new Date().getHours();
    const greet = document.getElementById("greet");
    if (!greet) return;
    greet.textContent =
        hours < 12 ? "Good morning" :
            hours <= 16 ? "Good afternoon" :
                "Good evening";
})();

// --- Navigation Toggle ---
document.getElementById("bars")?.addEventListener("click", () => {
    const icon = document.getElementById("bars");
    const navList = document.getElementById("navlist");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
    navList?.classList.toggle("show");
});

// --- Progress Bar Logic ---
function updateProgress() {
    document.querySelectorAll(".progress").forEach(bar => {
        const val = parseInt(bar.dataset.progress, 10);
        bar.style.width = `${Math.min(Math.max(val, 0), 100)}%`;
    });
}

// --- Dynamic Content Load ---
async function loadDynamicContent() {
    try {
        const res = await fetch('data.json');
        const data = await res.json();

        // Render Services
        const services = document.querySelector('#services .wrapper');
        services.innerHTML = data.services.map(s =>
            `<div class="service-card"><h2>${s.title}</h2><p>${s.description}</p></div>`
        ).join('');

        // Render Skills
        const skills = document.querySelector('#skills .languages');
        skills.innerHTML = data.skills.map(skill =>
            `<div class="skill-item">
        <div class="flex items-center gap-2 mb-2">
          <img src="${skill.image}" alt="${skill.name}" class="w-10 h-10 object-contain">
          <h2>${skill.name}</h2>
        </div>
        <div class="outer-progress-bar"><div class="progress" data-progress="${skill.progress}"></div></div>
        <p>${skill.progress}%</p>
      </div>`
        ).join('');

        updateProgress();
    } catch (err) {
        console.error("Load failed:", err);
    }
}
document.addEventListener('DOMContentLoaded', loadDynamicContent);

// --- Contact Form Submission ---
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Sending message...';
    status.style.color = 'teal';

    try {
        const res = await fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        const msg = res.ok
            ? 'Message sent successfully! Thank you.'
            : 'Oops! There was a problem.';
        status.textContent = msg;
        status.style.color = res.ok ? 'var(--clr-primary)' : 'red';
        if (res.ok) contactForm.reset();
    } catch {
        status.textContent = 'Network error. Try again.';
        status.style.color = 'red';
    }
});

// --- AOS Init ---
import AOS from 'https://cdn.skypack.dev/aos';
AOS.init({ duration: 1000, once: false });

// --- Google Analytics ---
window.addEventListener("load", () => {
    const s = document.createElement("script");
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-E2MHNFZD3C";
    s.async = true;
    document.head.appendChild(s);
    s.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-E2MHNFZD3C');
    };
});

// --- Lazy-load Modal ---
document.getElementById('open-modal')?.addEventListener('click', async () => {
    const modal = await import('./modal.js');
    modal.show();
});

// --- Debounced Scroll Animation ---
function animateStuff() {
    // put lightweight scroll logic here (example: AOS refresh or animations)
}
function debounce(fn, delay) {
    let t; return () => { clearTimeout(t); t = setTimeout(fn, delay); };
}
window.addEventListener('scroll', debounce(animateStuff, 100));