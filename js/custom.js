// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 1.5;

// additional varibles for slides
const totalSlideAmount = 13;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    $('.arrow--next').addClass('arrow--white');
    nextArrowDelay = 1.5;
  },
  2: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--2__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 80, y: 50 });
    gsap.from('.slide--2__block.second', { opacity: 0, duration: 0.75, delay: 1.5, x: 80, y: 50 });
    gsap.from('.slide--2__block.third', { opacity: 0, duration: 0.75, delay: 2, x: 80, y: 50 });
    nextArrowDelay = 3;
  },
  3: () => {
    gsap.from('.slide--3__block.first', { opacity: 0, duration: 0.75, delay: 1, y: -90 });
    gsap.from('.slide--3__block.second', { opacity: 0, duration: 0.75, delay: 1.5, y: -90 });
    gsap.from('.slide--3__block.third', { opacity: 0, duration: 0.75, delay: 2, y: -90 });
    gsap.from('.slide--3__block.fourth', { opacity: 0, duration: 0.75, delay: 2.5, y: -90 });
    gsap.from('.slide--3__block.fifth', { opacity: 0, duration: 0.75, delay: 3, y: -90 });
    nextArrowDelay = 4;

  },
  4: () => {
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from(".slide--4__block.first", { opacity: 0, duration: 0.75, delay: 1, scale: 1.15, filter: "blur(20px)", y: 90 });
    gsap.from(".slide--4__block.second", { opacity: 0, duration: 0.75, delay: 1.5, scale: 1.15, filter: "blur(20px)", y: -90 });
    nextArrowDelay = 2.5;
  },
  5: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--5__img img.main', { opacity: 0, duration: 0.75, delay: 1, y: -180 });
    gsap.from('.slide--5__img img.icon', { opacity: 0, duration: 0.75, delay: 1, scale: 0, rotation: 360 });
    nextArrowDelay = 2;
  },
  6: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--6__img img.main', { opacity: 0, duration: 0.75, delay: 1, y: -180 });
    gsap.from('.slide--6__img img.icon', { opacity: 0, duration: 0.75, delay: 1, scale: 0, rotation: 360 });
    gsap.from('.slide--6__text img.skin', { opacity: 0, duration: 0.75, delay: 1.7 });
    nextArrowDelay = 2.7;
  },
  7: () => {
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--7__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 75 });
    gsap.from('.slide--7__block.second', { opacity: 0, duration: 0.75, delay: 1.5, x: -75 });
    gsap.from('.slide--7__block.third', { opacity: 0, duration: 0.75, delay: 2, x: 75 });
    nextArrowDelay = 3;
  },
  8: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--8__block.first', { opacity: 0, duration: 0.75, delay: 1, y: 75 });
    gsap.from('.slide--8__block.second', { opacity: 0, duration: 0.75, delay: 1.5, y: 75 });
    gsap.from('.slide--8__block.third', { opacity: 0, duration: 0.75, delay: 2, y: 75 });
    gsap.from('.slide--8__block.fourth', { opacity: 0, duration: 0.75, delay: 2.5, y: 75 });
    nextArrowDelay = 3.5;
  },
  9: () => {
    gsap.from('.slide--9__right-content', { opacity: 0, duration: 1, delay: 1, scale: 0 });
    nextArrowDelay = 2,3;
  },
  10: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--10__left h3', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--10__left p', { opacity: 0, duration: 0.75, delay: 1.15, y: 50 });
    gsap.from('.slide--10__block.first', { opacity: 0, duration: 1, delay: 1.9, scale: 0 });
    gsap.from('.slide--10__block.second', { opacity: 0, duration: 1, delay: 2.4, scale: 0 });
    nextArrowDelay = 3.4;
  },
  11: () => {
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--11__content img.doctor', { opacity: 0, duration: 0.75, delay: 1, x: -30 });
    gsap.from('.slide--11__bottle.first', { opacity: 0, duration: 0.75, delay: 1.5, x: 30 });
    gsap.from('.slide--11__bottle.second', { opacity: 0, duration: 0.75, delay: 1.65, x: 30 });
    gsap.from('.slide--11__bottle.third', { opacity: 0, duration: 0.75, delay: 1.8, x: 30 });
    gsap.from('.slide--11__bottle.fourth', { opacity: 0, duration: 0.75, delay: 1.95, x: 30 });
    gsap.from('.slide--11__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.45, x: 30 });
    gsap.from('.slide--11__bottle.sixth', { opacity: 0, duration: 0.75, delay: 2.6, x: 30 });
    gsap.from('.slide--11__bottle.seventh', { opacity: 0, duration: 0.75, delay: 2.75, x: 30 });
    gsap.from('.slide--11__bottle.eigth', { opacity: 0, duration: 0.75, delay: 2.9, x: 30 });
    nextArrowDelay = 3.9;
  },
  12: () => {
    clearTimeout(lastSlideActionTimeout);
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--12__text', { opacity: 0, duration: 0.75, delay: 1, x: "-95%" });
    gsap.from('.slide--12__content img.skin', { opacity: 0, duration: 0.75, delay: 1.25, x: "-95%" });
    nextArrowDelay = 2.25;
  },
  13: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--instruction__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 45 });
    gsap.from('.slide--instruction__block.first img.arrow', { opacity: 0, duration: 0.75, delay: 1.2, x: 45, y: 45 });
    gsap.from('.slide--instruction__block.second', { opacity: 0, duration: 0.75, delay: 1.6, x: 45 });
    gsap.from('.slide--instruction__block.second img.arrow', { opacity: 0, duration: 0.75, delay: 1.8, x: 45, y: 45 });
    gsap.from('.slide--instruction__block.third', { opacity: 0, duration: 0.75, delay: 2.2, x: 45 });
    gsap.from('.slide--instruction__block.third img.arrow', { opacity: 0, duration: 0.75, delay: 2.4, x: 45, y: 45 });
    lastSlideActionTimeout = setTimeout(() => {
      lastSlideAction();
    }, 10 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      $(nextSlideButton).removeClass(hiddenArrowClass);
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});
