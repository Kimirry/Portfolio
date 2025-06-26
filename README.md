# Martin's Front-End Developer Portfolio

This is a modern, responsive, and dynamic personal portfolio website designed to showcase my skills as a Front-End Web Developer. It's built with standard web technologies and implements a Single Page Application (SPA) like navigation using JavaScript for a smooth user experience.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Setup and Installation](#setup-and-installation)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Features

* **Responsive Design:** Optimized for seamless viewing across various devices (desktops, tablets, mobile phones).
* **Dynamic Content Loading:** Services, Skills, and Testimonials are loaded dynamically from a `data.json` file using JavaScript, making content updates easy without modifying HTML.
* **Single Page Application (SPA) Navigation:** Uses JavaScript's History API (`pushState`) to provide smooth, instant "page" transitions without full browser reloads, keeping the navigation bar consistent.
* **Interactive Skills Section:** Progress bars dynamically visualize skill proficiency.
* **Contact Form:** A basic contact form for inquiries.
* **Greeting Message:** A dynamic greeting (Good morning/afternoon/evening) based on the time of day.
* **Font Awesome Icons:** Utilizes Font Awesome for modern and scalable icons.

## Technologies Used

* **HTML5:** For the basic structure and semantic content.
* **CSS3:** For styling, layout, and responsive design, including CSS variables for maintainable theming.
* **JavaScript (ES6+):** For all dynamic functionalities, including:
    * DOM manipulation
    * `fetch` API for data loading
    * History API for SPA routing
    * Event handling (navigation toggle, form interaction)
* **JSON:** As a structured data source for dynamic content.
* **Font Awesome:** Icon library.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository (or download the files):**
    If this project is in a Git repository, clone it:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
    Otherwise, simply download the `index.html`, `style.css`, `script.js`, `data.json`, and the `images` folder (if applicable) into a single directory.

2.  **Create an `images` folder:**
    Ensure you have an `images` folder in your project root, and place your profile picture (e.g., `school.jpg`) and any testimonial placeholder images (e.g., `profile-placeholder.jpg`) inside it, as referenced in `index.html` and `data.json`.

3.  **Install a Local Web Server:**
    Due to the use of the JavaScript `fetch` API for loading `data.json`, you *must* run this project using a local web server. Opening `index.html` directly from your file system (e.g., `file:///C:/.../index.html`) will result in a CORS (Cross-Origin Resource Sharing) error.

    Here are a few easy ways to set up a local server:

    * **VS Code Live Server Extension (Recommended for VS Code users):**
        1.  If you use Visual Studio Code, install the "Live Server" extension by Ritwick Dey.
        2.  Right-click on your `index.html` file in VS Code and select "Open with Live Server."

    * **Python's Simple HTTP Server (if Python is installed):**
        1.  Open your terminal or command prompt.
        2.  Navigate to your project directory: `cd path/to/your/portfolio`
        3.  Run the server:
            * For Python 3: `python -m http.server`
            * For Python 2: `python -m SimpleHTTPServer`
        4.  Open your browser and go to `http://localhost:8000` (or `http://0.0.0.0:8000`).

    * **Node.js `http-server` (if Node.js is installed):**
        1.  Open your terminal.
        2.  Install `http-server` globally: `npm install -g http-server`
        3.  Navigate to your project directory: `cd path/to/your/portfolio`
        4.  Run the server: `http-server`
        5.  Open your browser and go to `http://localhost:8080` (or the address it provides).

## Usage

Once the local server is running and you open the project in your browser:

* **Navigation:** Use the navigation links in the header to smoothly transition between sections (Home, Services, Testimonials, Contact) without full page reloads. The URL in your browser's address bar will update to reflect the current section.
* **Mobile Navigation:** On smaller screens, the navigation transforms into a hamburger menu. Click the icon to toggle the menu open/closed.
* **Content Updates:** To modify your services, skills, or testimonials, simply edit the `data.json` file. The changes will be reflected on the website when you refresh the page (or if the server has live-reload enabled).

## Project Structure
