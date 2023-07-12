import 'swiper/css';

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper, { Autoplay, Navigation } from 'swiper';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

window.Webflow ||= [];
window.Webflow.push(() => {
  document.querySelectorAll('.swiper-testimonials_item').forEach((item) => {
    const defaultZindex: number = item?.style.zIndex || 0;

    item.addEventListener('mouseover', () => {
      item.style.zIndex = 10;
    });
    item.addEventListener('mouseout', () => {
      item.style.zIndex = defaultZindex;
    });
  });

  const tl = [];

  document.querySelectorAll('.hero_cta').forEach((button, i) => {
    const speed = button.getAttribute('marquee-speed') || 750;
    const arrowEl = button.querySelectorAll('.hero_cta_arrow');
    const tickerEl = button.querySelectorAll('.hero_cta_ticker');

    tl[i] = gsap.timeline();
    tl[i].to(tickerEl, {
      xPercent: -100,
      ease: 'none',
      duration: speed / 100,
      repeat: -1,
    });

    button.addEventListener('mouseenter', () => {
      setTimeout(() => {
        gsap.to(tl[i], { timeScale: 0.4, overwrite: true });
        gsap.to(arrowEl, {
          xPercent: 125,
          yPercent: -125,
          duration: 0.4,
          delay: 0.1,
          // ease: CustomEase.create('custom', '0.76, 0, 0.24, 1'),
        });
      }, 100);
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(tl[i], { timeScale: 1, overwrite: true });
      gsap.to(arrowEl, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.5,
      });
    });
  });

  const footerArticleLink = document.querySelector('.prefooter_article-item.is-link');
  const footerArticleLinkArrows = footerArticleLink?.querySelectorAll(
    '.prefooter_article-item_arrow'
  );
  footerArticleLink.addEventListener('mouseenter', () => {
    gsap.to(footerArticleLinkArrows, {
      xPercent: 125,
      yPercent: -125,
      duration: 0.4,
      delay: 0.1,
      // ease: CustomEase.create('custom', '0.76, 0, 0.24, 1'),
    });
  });
  footerArticleLink.addEventListener('mouseleave', () => {
    gsap.to(footerArticleLinkArrows, {
      xPercent: 0,
      yPercent: 0,
      duration: 0.5,
    });
  });

  document.querySelector('.page_preloader').style.display = 'block';
  gsap.to('.page_preloader', {
    opacity: 0,
    delay: 2,
    onStart: function () {
      gsap.to(tl[0], { timeScale: 0.1, overwrite: true });
      // document.querySelector('.aura-wrap').style.display = 'block';
    },
    onComplete: function () {
      this.targets()[0].style.display = 'none';
    },
  });
  gsap.from(
    '.hero_logo, .hero_title-sans',
    {
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      delay: 0.5,
    },
    '>'
  );
  gsap.from(
    '.hero_title_span-02, .hero_title_span-03',
    {
      filter: 'blur(0.1em)',
      yPercent: 25,
      duration: 1.5,
      opacity: 0,
      ease: 'power2.out',
    },
    '<'
  );
  gsap.from(
    '.hero_title_span-01',
    {
      x: '1.5em',
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
    },
    '<'
  );
  gsap.from(
    '.hero_title_span-04, .hero_title_span-05',
    {
      x: '-1.5em',
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
    },
    '<'
  );
  gsap.from(
    '.hero_info-button-1, .hero_info-button-2, .hero_info-button-3, .hero_cta',
    {
      opacity: 0,
      duration: 1,
      delay: 0.25,
      onComplete: () => {
        gsap.to(tl[0], { timeScale: 1, overwrite: true });
      },
    },
    '>'
  );

  const projectsEl = document.querySelectorAll('.project-link');

  projectsEl.forEach((projectThumbnail) => {
    projectThumbnail.addEventListener('mouseover', () => {
      gsap.to(projectThumbnail.querySelector('img:first-child'), {
        scale: 1.05,
        ease: 'slow(0.7, 0.7, false)',
      });
    });
    projectThumbnail.addEventListener('mouseout', () => {
      gsap.to(projectThumbnail.querySelector('img:first-child'), {
        scale: 1,
        ease: 'slow(0.7, 0.7, false)',
      });
    });
  });

  gsap.fromTo(
    projectsEl,
    { scale: 1 },
    {
      scale: 0.975,
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: 0.5,
      // ease: 'slow(0.7, 0.7, false)',
      yoyoEase: 'slow(0.7, 0.7, false)',
    }
  );

  const projectSwiper = new Swiper('.swiper-projects_container', {
    wrapperClass: 'swiper-projects_wrapper',
    slideClass: 'swiper-projects_slide',
    centeredSlides: true,
    grabCursor: true,
    speed: 600,
    spaceBetween: 300,
    slidesPerView: 'auto',
    loop: false,
    navigation: {
      nextEl: '.swiper-projects_navigation_button.is-next',
      prevEl: '.swiper-projects_navigation_button.is-prev',
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
    modules: [Navigation],
  });

  let causeSwiper;
  const breakpoint = window.matchMedia('(min-width:767px)');

  const enableDesktopSwiper = function () {
    causeSwiper = new Swiper('.swiper-testimonials_container', {
      wrapperClass: 'swiper-testimonials_wrapper',
      slideClass: 'swiper-testimonials_slide',
      centeredSlides: true,
      speed: 100000,
      slidesPerView: 'auto',
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        waitForTransition: true,
      },
      on: {
        beforeInit: (swiper) => {
          swiper.wrapperEl.style.transitionTimingFunction = 'linear';
        },
      },
      modules: [Autoplay],
    });
  };

  const enableMobileSwiper = function () {
    causeSwiper = new Swiper('.swiper-testimonials_wrapper', {
      wrapperClass: 'swiper-testimonials_slide',
      slideClass: 'swiper-testimonials_item.show--mobile-landscape',
      centeredSlides: true,
      speed: 15000,
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 0,
        // disableOnInteraction: true,
        // waitForTransition: true,
      },
      on: {
        beforeInit: (swiper) => {
          swiper.wrapperEl.style.transitionTimingFunction = 'linear';
        },
        autoplayStop: (swiper) => {
          swiper.params.speed = 600;
          swiper.wrapperEl.style.transitionTimingFunction = 'ease';
        },
      },
      modules: [Autoplay],
    });

    document.querySelector('.swiper-testimonials_container')?.addEventListener('touchend', () => {
      causeSwiper.params.speed = 15000;
      causeSwiper.wrapperEl.style.transitionTimingFunction = 'linear';
    });
  };

  const breakpointChecker = function () {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      if (causeSwiper !== undefined) causeSwiper.destroy(true, true);
      enableDesktopSwiper();
      console.log('desktop swiper');

      // else if a small viewport and single column layout needed
    }
    if (breakpoint.matches === false) {
      if (causeSwiper !== undefined) causeSwiper.destroy(true, true);
      console.log('mobile swiper');
      return enableMobileSwiper();
    }
  };

  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();

  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal;
    if (attrVal === 'true' && defaultValType === 'boolean') return true;
    if (attrVal === 'false' && defaultValType === 'boolean') return false;
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal;
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal;
    return defaultVal;
  }

  // marquee component
  document.querySelectorAll("[tr-marquee-element='component']").forEach(function (element, index) {
    element.querySelectorAll('.display--inline').forEach((div) => {
      let text = div.textContent;
      if (text.includes('TM')) {
        text = text?.replace('TM', '<sup>TM</sup>');
        div.innerHTML = text;
      }
    });

    const componentEl = element;
    const panelEl = componentEl.querySelectorAll("[tr-marquee-element='panel']");
    // const triggerHoverEl = componentEl.querySelector("[tr-marquee-element='triggerhover']"));
    // const triggerClickEl = componentEl.querySelector("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.getAttribute('tr-marquee-speed'));
    const verticalSetting = attr(false, componentEl.getAttribute('tr-marquee-vertical'));
    const reverseSetting = attr(false, componentEl.getAttribute('tr-marquee-reverse'));
    const scrollDirectionSetting = attr(
      false,
      componentEl.getAttribute('tr-marquee-scrolldirection')
    );
    const scrollScrubSetting = attr(false, componentEl.getAttribute('tr-marquee-scrollscrub'));
    let moveDistanceSetting = -100;
    const timeScaleSetting = 1;
    const pausedStateSetting = false;

    if (reverseSetting) moveDistanceSetting = 100;
    const marqueeTimeline = gsap.timeline({
      repeat: -1,
      onReverseComplete: () => marqueeTimeline.progress(1),
    });

    // console.log(panelEl?.clientWidth);

    speedSetting = panelEl[0]?.clientWidth / speedSetting;

    marqueeTimeline.fromTo(
      panelEl,
      { xPercent: 0 },
      { xPercent: moveDistanceSetting, ease: 'none', duration: speedSetting }
    );

    element.addEventListener('mouseover', () => {
      marqueeTimeline.timeScale(0.5);
    });
    element.addEventListener('mouseout', () => {
      marqueeTimeline.timeScale(1);
    });
  });

  class ActivityMonitor {
    private readonly timeoutDuration: number;
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor(timeoutDuration = 10000) {
      this.timeoutDuration = timeoutDuration;

      window.addEventListener('click', () => this.resetTimer());
      window.addEventListener('touch', () => this.resetTimer());
      window.addEventListener('scroll', () => this.resetTimer());
    }

    private resetTimer(): void {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => this.onInactive(), this.timeoutDuration);
    }

    private onInactive(): void {
      document.querySelector('.hero_title_span-05').click();
    }

    public startMonitoring(): void {
      this.resetTimer();
    }
  }

  // Usage
  const monitor = new ActivityMonitor();
  monitor.startMonitoring();
});
