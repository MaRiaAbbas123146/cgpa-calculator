// Initialize AOS animation
AOS.init();

// Appointment form submission alert
document.getElementById("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Your appointment request has been submitted successfully!");
  e.target.reset();
});

// Contact form submission alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent successfully.");
  this.reset();
});

// Back to top button
const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  backToTop.style.display = (window.scrollY > 200) ? "block" : "none";
};
backToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};