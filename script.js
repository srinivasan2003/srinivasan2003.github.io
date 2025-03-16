// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const body = document.body
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")
const cvBtn = document.getElementById("cv-btn")
const contactForm = document.getElementById("contactForm")

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  body.classList.add("dark")
}

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark")
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light")
})

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  // Animate hamburger to X
  const spans = mobileMenuBtn.querySelectorAll("span")
  spans.forEach((span) => span.classList.toggle("active"))
})

// Close mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")

    // Reset hamburger icon
    const spans = mobileMenuBtn.querySelectorAll("span")
    spans.forEach((span) => span.classList.remove("active"))
  })
})

// CV Download Button
cvBtn.addEventListener("click", () => {
  // In a real scenario, this would link to an actual CV file
  //alert("This is my CV take a Look.");

  // For a real implementation, use:
  window.open('Ramesh-Srinivasan-Resume.pdf', 'Resume');
})

// Add EmailJS initialization - make sure this runs after the EmailJS script is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if EmailJS is loaded
  if (typeof emailjs !== "undefined") {
    // Replace with your actual EmailJS public key
    emailjs.init("Wa7XjGXyVWj03Lq03")
    console.log("EmailJS initialized successfully")
  } else {
    console.error("EmailJS not loaded. Check your script inclusion.")
  }
})

// Update Contact Form Submission with EmailJS
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Check if EmailJS is loaded
  if (typeof emailjs === "undefined") {
    alert("Email service not loaded. Please refresh the page and try again.")
    return
  }

  // Get form elements
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const formStatus = document.getElementById("form-status")

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.innerHTML = 'Sending... <span class="loading-spinner"></span>'

  // Get form data
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Prepare template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_name: "Ramesh Srinivasan",
    reply_to: email,
  }

  console.log("Sending email with parameters:", templateParams)

  // Send email using EmailJS
  // Replace with your actual service ID and template ID
  emailjs.send("service_729ny28", "template_ca86so7", templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text)

      // Reset form
      contactForm.reset()

      // Show success message
      formStatus.className = "form-status success"
      formStatus.textContent = "Your message has been sent successfully!"

      // Reset button
      submitBtn.classList.remove("loading")
      submitBtn.textContent = "Send Message"
    },
    (error) => {
      console.error("FAILED...", error)

      // Show error message with more details
      formStatus.className = "form-status error"
      formStatus.textContent =
        "Failed to send message: " + (error.text || "Unknown error. Please check console for details.")

      // Reset button
      submitBtn.classList.remove("loading")
      submitBtn.textContent = "Send Message"

      // Alert for debugging
      alert(
        "There was an error sending your message. Please check that you've correctly set up your EmailJS account with the proper service ID and template ID.",
      )
    },
  )
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerOffset = 70
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add active class to nav links on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add scroll animation for elements
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Add animation classes to CSS and observe elements
document.querySelectorAll(".skill-item, .certification-card, .project-card, .timeline-item").forEach((el) => {
  observer.observe(el)
})

// Add header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 0) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

