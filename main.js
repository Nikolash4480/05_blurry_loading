class LoadingManager {
  constructor(sectionSelector, containerSelector) {
    const section = document.querySelector(sectionSelector);
    const loadingContainer = document.querySelector(containerSelector);
    let load = 0;
    let intervalId = null;
    let loadingElement = null;
    let loadingTextElement = null;
    
    startLoading();

    function createLoadingElement() {
      const loading = document.createElement('div');
      loading.classList.add("loading");
      loadingContainer.appendChild(loading);

      loadingTextElement = document.createElement('span');
      loadingTextElement.classList.add("loading-text");
      loadingTextElement.textContent = "LOADING...";
      loading.appendChild(loadingTextElement);

      loadingElement = loading;
    }

    function updateLoadingProgress() {
      load++;
      if (load > 100) {
        clearInterval(intervalId);
        setTimeout(() => {
          loadingElement.style.background = 'var(--negro-oscuro)';
          loadingElement.style.color = 'var(--naranja-fuerte)';
          loadingElement.style.transition = 'ease-in-out .4s';
          loadingTextElement.textContent = "COMPLETE";
          setTimeout(() => {
            fadeOutComplete();
          }, 1000);
        }, 1000);
        return;
      }

      loadingTextElement.innerText = `LOADING... ${load}%`;
      section.style.filter = `blur(${Math.map(load, 0, 100, 30, 0)}px)`;
    }

    function startLoading() {
      createLoadingElement();
      intervalId = setInterval(() => updateLoadingProgress(), 30);
    }

    function fadeOutComplete() {
      let opacity = 1;
      const fadeIntervalId = setInterval(() => {
        opacity -= 0.05;
        if (opacity <= 0) {
          clearInterval(fadeIntervalId);
          section.style.filter = "blur(0px)";
          section.style.background = `url('./assets/eva.png') no-repeat center center/cover`;
        } else {
          loadingElement.style.opacity = opacity;
          section.style.filter = `blur(${Math.map(opacity, 0, 1, 30, 0)}px)`;
        }
      }, 30);
    }

    Math.map = function (value, in_min, in_max, out_min, out_max) {
      return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };
  }
}

new LoadingManager('.section', '.loading-container');
