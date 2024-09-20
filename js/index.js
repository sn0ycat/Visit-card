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

    fetch('txt/texts.json')
        .then(response => response.json())
        .then(data => {
            texts = data;
            updateText();
        });

    document.getElementById('languageSwitcher').addEventListener('click', () => {
        currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        updateText();
    });

    const otherInfo = document.getElementById('otherInfo');
    otherInfo.style.display = 'none'

    function updateText() {
        document.getElementById('header').innerText = texts[currentLanguage].header;
        document.getElementById('title').innerText = texts[currentLanguage].title;
        document.getElementById('info').innerText = texts[currentLanguage].info;
        if (otherInfo.style.display === 'none'){
            document.getElementById('link').innerText = texts[currentLanguage].linkOtherInfoON;
        }
        else{
            document.getElementById('link').innerText = texts[currentLanguage].linkOtherInfoOFF;
        }
        document.getElementById('otherInfo').innerText = texts[currentLanguage].otherInfo;
        document.getElementById('buttonToContacts').innerText = texts[currentLanguage].buttonToContacts;
        document.getElementById('buttonToProjects').innerText = texts[currentLanguage].buttonToProjects;
        document.getElementById('mysocial').innerText = texts[currentLanguage].mysocial;
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

    document.getElementById('buttonToProjects').onclick = function() {
        window.location.href = 'projects.html';
    };

    document.getElementById('buttonToContacts').onclick = function() {
        document.getElementById('socialPopup').style.display = 'block';
    }
    
    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('socialPopup').style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == document.getElementById('socialPopup')) {
            document.getElementById('socialPopup').style.display = 'none';
        }
    }