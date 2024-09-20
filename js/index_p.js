document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = document.getElementById("themeSwitcher2");
  
    themeSwitcher.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const header = document.querySelector('.header');
      header.classList.toggle("dark-theme");

      const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
      localStorage.setItem("theme", theme)
    });

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      const header = document.querySelector('.header')
      header.classList.add("dark-theme");
    }

    const toggleImage = document.getElementById('themeSwitcher2');
    const toggleImageLang = document.getElementById('languageSwitcher')
    let isImageOne = true;

    toggleImage.addEventListener('click', () => {
        if (isImageOne) {
            toggleImage.src = 'img/moon.png';
            toggleImageLang.src = 'img/languageB.png'
        } else {
            toggleImage.src = 'img/sun.png';
            toggleImageLang.src = 'img/languageW.png'
        }
        isImageOne = !isImageOne;
    });
  });

    let texts = {};
    let currentLanguage = 'ru';

    fetch('txt/texts_p.json')
        .then(response => response.json())
        .then(data => {
            texts = data;
            updateText();
        });

    document.getElementById('languageSwitcher').addEventListener('click', () => {
        currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        updateText();
    });

    function updateText() {
        document.getElementById('header').innerText = texts[currentLanguage].header;
        document.getElementById('title_test').innerText = texts[currentLanguage].title_test;
        document.getElementById('info_test').innerText = texts[currentLanguage].info_test;
        document.getElementById('title_Website').innerText = texts[currentLanguage].title_Website;
        document.getElementById('info_Website').innerText = texts[currentLanguage].info_Website;
    }
    
    function toggleText() {
        const otherInfo = document.getElementById('otherInfo');
        otherInfo.style.display = otherInfo.style.display === 'none' || otherInfo.style.display === '' ? 'block' : 'none';
        if (otherInfo.style.display === 'none'){
            document.getElementById('link').innerText = texts[currentLanguage].linkOtherInfoON;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else{
            document.getElementById('link').innerText = texts[currentLanguage].linkOtherInfoOFF;
            document.getElementById('target').scrollIntoView({ behavior: 'smooth' });
        }
    }

    let currentSlides = {
        slider1: 0,
        slider2: 0
    };

    function moveSlide(direction, sliderId) {
        const slides = document.querySelector(`#${sliderId} .slides`);
        const totalSlides = slides.querySelectorAll('.slide').length;
    
        currentSlides[sliderId] += direction;
    
        if (currentSlides[sliderId] < 0) {
            currentSlides[sliderId] = totalSlides - 1;
        } else if (currentSlides[sliderId] >= totalSlides) {
            currentSlides[sliderId] = 0;
        }
    
        const offset = -currentSlides[sliderId] * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }

