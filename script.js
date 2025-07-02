// --- Greeting Logic ---
const now = new Date();
const hours = now.getHours();

let greetElement = document.getElementById("greet");
function showGreeting() {
    if (hours < 12) {
        greetElement.textContent = "Good morning";
    } else if (hours >= 12 && hours <= 16)  {
        greetElement.textContent = "Good afternoon";
    } else {
        greetElement.textContent = "Good evening";
    }
}
showGreeting();

// --- Navigation Logic ---
const icon = document.getElementById("bars");
const navList = document.getElementById("navlist");

icon.addEventListener("click", function() {
    if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
    navList.classList.toggle("show");
});

// --- Dynamic Content Loading (NEW) ---

// Function to load and display dynamic content from data.json
async function loadDynamicContent() {
    try {
        const response = await fetch('data.json'); // Fetch the JSON data
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON into a JavaScript object

        // Render Services
        const servicesWrapper = document.querySelector('#services .wrapper');
        if (servicesWrapper) { // Check if element exists before manipulating
            servicesWrapper.innerHTML = ''; // Clear existing dummy content
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
        if (skillsLanguages) { // Check if element exists before manipulating
            skillsLanguages.innerHTML = ''; // Clear existing dummy content
            data.skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-item');
                skillItem.innerHTML = `
                    <h2>${skill.name}</h2>
                    <div class="outer-progress-bar">
                        <div class="progress" data-progress="${skill.progress}"></div>
                    </div>
                    <p>${skill.progress}%</p>
                `;
                skillsLanguages.appendChild(skillItem);
            });
            // Call updateProgress after skills are rendered to set widths
            updateProgress();
        }
    } catch (error) {
        console.error('Error loading content:', error);
        // Optional: Display user-friendly messages on the page if content fails to load
        // if (document.getElementById('services')) document.getElementById('services').innerHTML = '<h1>Services</h1><p style="text-align: center; color: red;">Failed to load services. Please try again later.</p>';
        // if (document.getElementById('skills')) document.getElementById('skills').innerHTML = '<h1>Skills</h1><p style="text-align: center; color: red;">Failed to load skills. Please try again later.</p>';
        // if (document.getElementById('testimonials')) document.getElementById('testimonials').innerHTML = '<h1>Testimonials</h1><p style="text-align: center; color: red;">Failed to load testimonials. Please try again later.</p>';
    }
}

// Ensure dynamic content loads when the page is fully loaded
window.addEventListener('DOMContentLoaded', loadDynamicContent);


// --- Progress Bar Logic (Modified to be called by loadDynamicContent) ---
function updateProgress() {
    const bars = document.querySelectorAll(".progress");

    bars.forEach(bar => {
        const value = parseInt(bar.getAttribute("data-progress"), 10);
        const progress = Math.max(0, Math.min(100, value));
        bar.style.width = progress + "%";
    });
}

// Get a reference to the form and the status div
const contactForm = document.getElementById('contactForm');
const formStatusDiv = document.getElementById('form-status');

if (contactForm) { // Ensure the form exists before adding event listener
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission (page reload)

        formStatusDiv.textContent = 'Sending message...';
        formStatusDiv.style.color = 'white'; // Initial status color

        const formData = new FormData(contactForm); // Collects all form data by name attributes

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Crucial for Formspree's AJAX responses
                }
            });

            if (response.ok) { // Check if the submission was successful
                formStatusDiv.textContent = 'Message sent successfully! Thank you.';
                formStatusDiv.style.color = 'var(--clr-primary)'; // Success color
                contactForm.reset(); // Clear the form fields
            } else {
                // Handle errors from Formspree or network issues
                const data = await response.json();
                if (data.errors) {
                    formStatusDiv.textContent = `Error: ${data.errors.map(err => err.message).join(', ')}`;
                } else {
                    formStatusDiv.textContent = 'Oops! There was a problem sending your message.';
                }
                formStatusDiv.style.color = 'red'; // Error color
            }
        } catch (error) {
            console.error('Submission error:', error);
            formStatusDiv.textContent = 'Network error. Please try again later.';
            formStatusDiv.style.color = 'red'; // Network error color
        }
    });
}

         AOS.init({
         duration: 1000,
         once: false, // allow repeated animation when scrolling up/down
    });