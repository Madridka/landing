// --- Логика переключения картин (Живая сетка) ---
const galleryImages = [
  "/assets/6.jpg",
  "/assets/5.jpg",
  "/assets/4.jpg",
  "/assets/3.jpg",
  "/assets/2.jpg",
  "/assets/1.jpg",
];

function shuffleGallery() {
  const items = document.querySelectorAll(".gallery-item img");
  // Выбираем случайную ячейку в сетке
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomImage = items[randomIndex];

  // Выбираем случайную новую картинку из запаса
  const newSrc =
    galleryImages[Math.floor(Math.random() * galleryImages.length)];

  // Эффект затухания
  randomImage.style.opacity = 0;

  setTimeout(() => {
    randomImage.src = newSrc;
    randomImage.onload = () => {
      randomImage.style.opacity = 1;
    };
  }, 500); // Ждем пока исчезнет (0.5s)
}

// Запускаем смену картин каждые 3 секунды
setInterval(shuffleGallery, 3000);

// --- Анимация появления при скролле (Observer API) ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".fade-on-scroll")
  .forEach((el) => observer.observe(el));

// --- Мобильное меню (Бургер) ---
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

// Функция переключения меню
const toggleMenu = () => {
  // Переключаем класс навигации
  nav.classList.toggle("nav-active");

  // Анимация ссылок (появление)
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Анимация крестика
  burger.classList.toggle("toggle");
};

burger.addEventListener("click", toggleMenu);

// Закрываем меню при клике на ссылку
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("nav-active")) {
      toggleMenu();
    }
  });
});
