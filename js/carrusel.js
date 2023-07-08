window.addEventListener('DOMContentLoaded', function () {
      var carousel = document.querySelector('.carousel__inner');
      var carouselItems = carousel.querySelectorAll('.carousel__item');
      var totalItems = carouselItems.length;
      var currentItem = 0;

      function moveNext() {
        if (currentItem === totalItems - 1) {
          currentItem = 0;
        } else {
          currentItem++;
        }
        carousel.style.transform = `translateX(-${currentItem * 100}%)`;
      }

      setInterval(moveNext, 3000); // Cambiar de imagen cada 3 segundos
    });