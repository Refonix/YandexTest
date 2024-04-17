document.addEventListener("DOMContentLoaded", function () {
  const slideContainer = document.querySelector(".slide-container");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slideWidth = slides[2].offsetWidth;
  const totalSlides = slides.length; // Изменение здесь
  let currentIndex = 0;
  let slideInterval;

  const counter = document.querySelector(".counter");

  function updateCounter() {
    counter.textContent = `${currentIndex + 1}/${totalSlides}`;
  }

  updateCounter();

  function nextSlide() {
    clearInterval(slideInterval);
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
      slideContainer.style.transition = "none";
      slideContainer.style.transform = `translateX(-${slideWidth}px)`;
      setTimeout(() => {
        slideContainer.style.transition = "transform 0.5s ease";
        slideContainer.style.transform = `translateX(0px)`;
      }, 10);
    } else {
      slideContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    updateCounter();
    startSlideInterval();
    // Блокировка кнопок
    
  }

  function prevSlide() {
    clearInterval(slideInterval);
    if (currentIndex > 0) {
      currentIndex--;
      slideContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    updateCounter();
    startSlideInterval();
  }

  function startSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  function autoSlide() {
    startSlideInterval();
  }

  prevBtn.addEventListener("click", function () {
    prevSlide();
    stopSlideInterval();
  });

  nextBtn.addEventListener("click", function () {
    nextSlide();
    stopSlideInterval();
  });

  autoSlide();
});




document.addEventListener('DOMContentLoaded', function () {
  // Проверяем, что ширина экрана меньше или равна 768px (типичная ширина мобильных устройств)
  if (window.innerWidth <= 768) {
    const sliderContainer = document.querySelector('.sec__cont_grid_tab');
    const slides = sliderContainer.querySelectorAll('.div1, .div2, .div3, .div4, .div5, .div6, .div7');
    const navigationContainer = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const dotsContainer = document.createElement('div');
    let currentIndex = 0;

    // Создаем контейнер для кнопок перелистывания и точек навигации
    navigationContainer.classList.add('navigation');
    sliderContainer.appendChild(navigationContainer);

    // Создаем кнопки перелистывания
    prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
    prevBtn.classList.add('prev-btn');
    prevBtn.disabled = true;
    navigationContainer.appendChild(prevBtn);
    

    // Создаем точки навигации
    dotsContainer.classList.add('dots-container');
    slides.forEach((slide, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('data-index', index);
      dot.addEventListener('click', function () {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
    navigationContainer.appendChild(dotsContainer);

    const dots = dotsContainer.querySelectorAll('.dot');

    nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    nextBtn.classList.add('next-btn');
    navigationContainer.appendChild(nextBtn);

    // Обновление состояния слайдера
    function updateSlider() {
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.style.display = 'flex';
          dots[index].classList.add('active');
          
        } else {
          slide.style.display = 'none';
          dots[index].classList.remove('active');
          
        }
      });
    }

    // Перелистывание к следующему слайду
    function nextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = slides.length - 1;
  }
  updateSlider();
  updateButtonState();
}

// Перелистывание к предыдущему слайду
function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  updateSlider();
  updateButtonState();
}

// Обновление состояния кнопок
function updateButtonState() {
  if (currentIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  if (currentIndex === slides.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

    // Обработчики событий для кнопок перелистывания
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Инициализация слайдера
    updateSlider();
    
  }
});