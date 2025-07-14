// --- Greeting Logic ---
const now = new Date();
const hours = now.getHours();

let greetElement = document.getElementById("greet");
function showGreeting() {
    if (hours < 12) {
        greetElement.textContent = "Good morning";
    } else if (hours >= 12 && hours <= 16) {
        greetElement.textContent = "Good afternoon";
    } else {
        greetElement.textContent = "Good evening";
    }
}
showGreeting();

// --- Navigation Logic ---
const icon = document.getElementById("bars");
const navList = document.getElementById("navlist");

icon.addEventListener("click", function () {
    if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
    navList.classList.toggle("show");
});

// --- Dynamic Content Loading ---
async function loadDynamicContent() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Render Services
        const servicesWrapper = document.querySelector('#services .wrapper');
        if (servicesWrapper) {
            servicesWrapper.innerHTML = '';
            data.services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('service-card');
                serviceCard.innerHTML = `
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>
                `;
                servicesWrapper.appendChild(serviceCard);
            });
        }

        // Render Skills
        const skillsLanguages = document.querySelector('#skills .languages');
        if (skillsLanguages) {
            skillsLanguages.innerHTML = '';
            data.skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-item');
                skillItem.innerHTML = `
                    <div class="flex items-center gap-2 mb-2">
                        <img src="${skill.image}" alt="${skill.name} logo" class="w-6 h-6">
                        <h2>${skill.name}</h2>
                    </div>
                    <div class="outer-progress-bar">
                        <div class="progress" data-progress="${skill.progress}"></div>
                    </div>
                    <p>${skill.progress}%</p>
                `;
                skillsLanguages.appendChild(skillItem);
            });
        }

        updateProgress(); // Call this after content is rendered
    } catch (error) {
        console.error('Error loading content:', error);

        // Optional: Show fallback error messages
        if (document.getElementById('services')) {
            document.getElementById('services').innerHTML = `
                <h1>Services</h1>
                <p style="text-align: center; color: red;">Failed to load services. Please try again later.</p>
            `;
        }
        if (document.getElementById('skills')) {
            document.getElementById('skills').innerHTML = `
                <h1>Skills</h1>
                <p style="text-align: center; color: red;">Failed to load skills. Please try again later.</p>
            `;
        }
    }
}

// Call when DOM is ready
window.addEventListener('DOMContentLoaded', loadDynamicContent);

// --- Progress Bar Logic ---
function updateProgress() {
    const bars = document.querySelectorAll(".progress");
    bars.forEach(bar => {
        const value = parseInt(bar.getAttribute("data-progress"), 10);
        const progress = Math.max(0, Math.min(100, value));
        bar.style.width = progress + "%";
    });
}

// --- Contact Form Submission ---
const contactForm = document.getElementById('contactForm');
const formStatusDiv = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        formStatusDiv.textContent = 'Sending message...';
        formStatusDiv.style.color = 'rgb(29, 192, 170)';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatusDiv.textContent = 'Message sent successfully! Thank you.';
                formStatusDiv.style.color = 'var(--clr-primary)';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatusDiv.textContent = `Error: ${data.errors.map(err => err.message).join(', ')}`;
                } else {
                    formStatusDiv.textContent = 'Oops! There was a problem sending your message.';
                }
                formStatusDiv.style.color = 'red';
            }
        } catch (error) {
            console.error('Submission error:', error);
            formStatusDiv.textContent = 'Network error. Please try again later.';
            formStatusDiv.style.color = 'red';
        }
    });
}

// --- AOS Init ---
AOS.init({
    duration: 1000,
    once: false,
});

// --- Google Analytics Tag ---
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-E2MHNFZD3C');
