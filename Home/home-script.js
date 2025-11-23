$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});
// Load saved ratings
const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};

function initRatings() {
  document.querySelectorAll(".rating").forEach((container) => {
    const itemName = container.dataset.item;

    // Clear previous stars
    container.innerHTML = "";

    // Create 5 stars
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.innerText = "★";
      star.dataset.value = i;

      // Highlight saved rating
      if (savedRatings[itemName] && i <= savedRatings[itemName].rating) {
        star.classList.add("selected");
      }

      // Click to rate
      star.addEventListener("click", () => {
        const rating = i;

        // Save rating
        savedRatings[itemName] = {
          rating: rating,
          timestamp: Date.now(),
        };
        localStorage.setItem("ratings", JSON.stringify(savedRatings));

        // Update visual stars
        updateStars(container, rating);

        // Show average beside item
        updateAverageRating(itemName);
      });

      container.appendChild(star);
    }

    // Load average on page load
    updateAverageRating(itemName);
  });
}

function updateStars(container, rating) {
  const stars = container.querySelectorAll("span");
  stars.forEach((s, index) => {
    s.classList.remove("selected");
    if (index < rating) s.classList.add("selected");
  });
}

function updateAverageRating(itemName) {
  const avgEl = document.querySelector(`.avg-rating[data-item="${itemName}"]`);
  if (!avgEl) return;

  if (savedRatings[itemName]) {
    avgEl.textContent = savedRatings[itemName].rating + " ★";
  } else {
    avgEl.textContent = "0 ★";
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initRatings);
const voteStore = JSON.parse(localStorage.getItem("votes")) || {};

function initLikes() {
  document.querySelectorAll(".like-box").forEach((box) => {
    const itemName = box.dataset.item;

    // If not present in storage, initialize
    if (!voteStore[itemName]) {
      voteStore[itemName] = { likes: 0, dislikes: 0 };
    }

    // Update UI
    updateCounts(itemName);

    // Buttons
    const likeBtn = box.querySelector(".like-btn");
    const dislikeBtn = box.querySelector(".dislike-btn");

    likeBtn.addEventListener("click", () => {
      voteStore[itemName].likes++;
      saveVotes();
      updateCounts(itemName);
    });

    dislikeBtn.addEventListener("click", () => {
      voteStore[itemName].dislikes++;
      saveVotes();
      updateCounts(itemName);
    });
  });
}

function saveVotes() {
  localStorage.setItem("votes", JSON.stringify(voteStore));
}

function updateCounts(itemName) {
  document
    .querySelectorAll(`.like-box[data-item="${itemName}"] .like-count`)
    .forEach((el) => (el.textContent = voteStore[itemName].likes));

  document
    .querySelectorAll(`.like-box[data-item="${itemName}"] .dislike-count`)
    .forEach((el) => (el.textContent = voteStore[itemName].dislikes));
}

document.addEventListener("DOMContentLoaded", initLikes);
// Mapping categories to items ON YOUR PAGE:
const mealMap = {
  all: [
    "Poha",
    "Idli Sambar",
    "Upma",
    "Bread Omlette",
    "Masala Dosa",
    "Aloo Paratha",
    "Veg sandwich",
    "kachori sabzi",
    "Veg Thali",
    "Paneer Butter Masala + Roti (2 pcs)",
    "Chole Bhature",
    "Fried Rice + Manchurian",
    "Rajma Chawal",
    "Chicken Curry + Rice",
    "Dal Khichdi",
    "Veg Biryani + Raita",
    "Chicken Biryani (Regular)",
    "Egg Curry + Rice",
    "Mix Veg Curry + Roti (3 pcs)",
    "Veg sandwich",
    "Samosa (1 pc)",
    "Veg Puff",
    "Paneer Pakoda (4 pcs)",
    "Bread Pakoda (1 pc)",
    "Momos (Veg, 6 pcs)",
    "Egg Roll",
  ],
  breakfast: [
    "Poha",
    "Idli Sambar",
    "Upma",
    "Bread Omlette",
    "Masala Dosa",
    "Aloo Paratha",
    "Veg sandwich",
    "kachori sabzi",
  ],
  lunch: [
    "Veg Thali",
    "Paneer Butter Masala + Roti (2 pcs)",
    "Chole Bhature",
    "Fried Rice + Manchurian",
    "Rajma Chawal",
    "Chicken Curry + Rice",
    "Dal Khichdi",
    "Veg Biryani + Raita",
    "Chicken Biryani (Regular)",
    "Egg Curry + Rice",
    "Mix Veg Curry + Roti (3 pcs)",
  ],
  snacks: [
    "Veg sandwich",
    "Samosa (1 pc)",
    "Veg Puff",
    "Paneer Pakoda (4 pcs)",
    "Bread Pakoda (1 pc)",
    "Momos (Veg, 6 pcs)",
    "Egg Roll",
  ],
  special: [
    "Chicken Biryani (Regular)",
    "Fried Rice + Manchurian",
    "Momos (Veg, 6 pcs)",
    "Veg Thali",
  ],
};

function showSection(type) {
  document.querySelector(".special-heading").style.display =
    type === "special" ? "block" : "none";

  // hide all foods
  document
    .querySelectorAll(".food-menu-item")
    .forEach((item) => (item.style.display = "none"));

  // show only matching foods
  mealMap[type].forEach((food) => {
    document.querySelectorAll(".food-title").forEach((title) => {
      if (title.textContent.trim().toLowerCase() === food.toLowerCase()) {
        title.closest(".food-menu-item").style.display = "flex";
      }
    });
  });
}

// Feedback

const stars = document.querySelectorAll(".star");
let rating = 0;

// Star hover/select effect
stars.forEach((star) => {
  star.addEventListener("click", () => {
    rating = star.dataset.value;

    stars.forEach((s) => s.classList.remove("active"));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("active");
    }
  });
});

// Form submit
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (rating == 0) {
      alert("Please give a rating!");
      return;
    }

    document.getElementById("successMessage").style.display = "block";

    // Optional: Reset form
    this.reset();
    stars.forEach((s) => s.classList.remove("active"));
    rating = 0;
  });


