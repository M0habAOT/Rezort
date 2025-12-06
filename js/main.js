// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
   // Get the current page filename
   const currentPage = window.location.pathname.split('/').pop();

   // Get all navigation links
   const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

   // Remove active class from all links first
   navLinks.forEach(link => {
      link.classList.remove('active');
   });

   // Add active class to the matching link
   navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');

      // Check if the link href matches the current page
      if (linkHref === currentPage) {
         link.classList.add('active');
      }

      // Special case for home page (index.html or empty path)
      if (currentPage === 'index.html' && linkHref === 'index.html') {
         link.classList.add('active');
      } else if (currentPage === '' && linkHref === 'index.html') {
         link.classList.add('active');
      }
   });

   // ===== SCROLL TO TOP BUTTON =====
   const scrollBtn = document.getElementById('scrollBtn');

   window.addEventListener('scroll', function () {
      if (scrollY > 700) {
         scrollBtn.classList.add('show');
      }
      else {
         scrollBtn.classList.remove("show");
      }
   });

   scrollBtn.addEventListener('click', scrollToTop);

   function scrollToTop() {
      scrollTo({
         top: 0,
      });
   }

   let imgContainer = Array.from(document.getElementsByClassName("gallery__img"));
   let fullscreen = document.getElementById("fullscreen");
   let next = document.getElementById("next");
   let prev = document.getElementById("prev");
   let close = document.getElementById("close");
   let currentIndex = -1;
   for (let i = 0; i < imgContainer.length; i++) {
      imgContainer[i].addEventListener("click", function () {
         currentIndex = i;
         updateFullscreenImage(currentIndex);
         openPreview();
      });
   }

   function openPreview() {
      fullscreen.style.display = "flex";
      document.body.classList.add("overflow-hidden");
   }

   function updateFullscreenImage(currentIndex) {
      let fullscreenImage = fullscreen.querySelector('img');
      let imgSrc = imgContainer[currentIndex].src;
      fullscreenImage.src = imgSrc;
   }

   if (next) {
      next.addEventListener("click", nextSlide);
      function nextSlide() {
         currentIndex++;
         if (currentIndex >= imgContainer.length) {
            currentIndex = 0;
         }
         updateFullscreenImage(currentIndex);
      }
   }

   if (prev) {
      prev.addEventListener("click", prevSlide);
      function prevSlide() {
         currentIndex--;
         if (currentIndex < 0) {
            currentIndex = imgContainer.length - 1;
         }
         updateFullscreenImage(currentIndex);
      }
   }

   if (close) {
      close.addEventListener("click", closePreview);
   }

   function closePreview() {
      fullscreen.style.display = "none";
      document.body.classList.remove("overflow-hidden");
   }

   if (fullscreen) {
      fullscreen.addEventListener("click", function (e) {
         if (e.target === fullscreen) {
            closePreview();
         }
      });
   }

   document.addEventListener("keydown", function (e) {
      if (fullscreen) {
         if (fullscreen.style.display === "flex") {
            if (e.key === "ArrowRight") {
               next.click();
            } else if (e.key === "ArrowLeft") {
               prev.click();
            } else if (e.key === "Escape") {
               closePreview();
            }
            else if (e.key === "Tab") {
               e.preventDefault();
            }
         }
      }
   });
});