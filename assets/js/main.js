/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Preloader: Cực nhanh, giải phóng màn hình sớm nhất có thể
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const hidePreloader = () => {
      if (preloader.parentNode) {
        preloader.style.transition = 'opacity 0.4s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
          if (preloader.parentNode) preloader.remove();
        }, 400);
      }
    };
    // Nếu trang đã tải xong hoặc đã sẵn sàng tương tác, gỡ bỏ preloader ngay
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      hidePreloader();
    } else {
      document.addEventListener('DOMContentLoaded', hidePreloader);
      window.addEventListener('load', hidePreloader);
    }
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 35,
        disable: window.innerWidth < 768
      });
    }
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    aosInit();
  } else {
    document.addEventListener('DOMContentLoaded', aosInit);
  }

  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => AOS.refresh(), 400);
    }
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      try {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (e) { }
    });
  }
  document.addEventListener("DOMContentLoaded", initSwiper);

  /**
   * Initiate glightbox
   */
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof GLightbox !== 'undefined') {
      const glightbox = GLightbox({ selector: '.glightbox' });
    }
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        }
        if (typeof AOS !== 'undefined') { AOS.refresh(); }
      }, false);
    });
  });

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') { new PureCounter(); }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Language Switcher Core Logic
   */
  const langLabels = {
    'vi': '🇻🇳 Tiếng Việt',
    'lo': '🇱🇦 Tiếng Lào',
    'th': '🇹🇭 Tiếng Thái',
    'km': '🇰🇭 Tiếng Campuchia',
    'my': '🇲🇲 Tiếng Myanmar'
  };

  function updateLangUI(lang) {
    const el = document.getElementById('current-lang');
    if (el && langLabels[lang]) el.textContent = langLabels[lang];
  }

  function hideGoogleBanner() {
    const banner = document.querySelector(".goog-te-banner-frame");
    const skiptranslate = document.querySelector(".skiptranslate");
    if (banner) {
      banner.style.display = "none";
      banner.style.visibility = "hidden";
    }
    if (skiptranslate && skiptranslate.id !== 'google_translate_element') {
      skiptranslate.style.display = "none";
    }
    document.body.style.top = "0px";
    document.body.style.position = "static";
  }

  window.googleTranslateElementInit = function () {
    if (typeof google !== 'undefined' && google.translate) {
      new google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'vi,lo,th,km,my',
        autoDisplay: false
      }, 'google_translate_element');

      // Sau khi Google Translate init xong, tự động apply ngôn ngữ đã lưu
      const savedLang = localStorage.getItem('lang') || 'vi';
      if (savedLang !== 'vi') {
        let attempts = 0;
        const applyLang = setInterval(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
            clearInterval(applyLang);
            setTimeout(hideGoogleBanner, 300);
          }
          if (++attempts > 20) clearInterval(applyLang);
        }, 100);
      }
    }
  };

  // Performance: Lazy loading the heavy Google Translate script
  function loadGoogleTranslateScript() {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  function setLangCookie(lang) {
    const pastDate = "Thu, 01 Jan 1970 00:00:00 UTC";
    const domain = window.location.hostname;
    const domains = ["", domain, "." + domain];
    
    // Xóa sạch mọi cookie cũ ở mọi cấp độ domain để tránh xung đột
    domains.forEach(d => {
      const dPart = d ? `; domain=${d}` : "";
      document.cookie = `googtrans=; expires=${pastDate}; path=/;${dPart}`;
    });

    if (lang && lang !== 'vi') {
      const val = "/vi/" + lang;
      document.cookie = `googtrans=${val}; path=/;`;
      if (domain) {
        document.cookie = `googtrans=${val}; path=/; domain=${domain};`;
        document.cookie = `googtrans=${val}; path=/; domain=.${domain};`;
      }
    }
  }

  function changeLang(lang) {
    if (!lang) return;
    localStorage.setItem("lang", lang);
    updateLangUI(lang);
    setLangCookie(lang);

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      setTimeout(hideGoogleBanner, 300);
    } else {
      loadGoogleTranslateScript();
      setTimeout(() => {
        if (!document.querySelector(".goog-te-combo")) window.location.reload();
      }, 3000);
    }

    hideGoogleBanner();
    setTimeout(hideGoogleBanner, 500);

    // Mobile Nav fix
    if (document.body.classList.contains('mobile-nav-active')) {
      mobileNavToogle();
    }
  }

  window.changeLang = changeLang;

  // Tối ưu hoá tải dữ liệu ngôn ngữ ngay khi vào
  (function initLang() {
    let savedLang = localStorage.getItem("lang") || 'vi';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lang')) {
      savedLang = urlParams.get('lang');
      localStorage.setItem("lang", savedLang);
    }

    if (savedLang !== 'vi') {
      setLangCookie(savedLang);
    }

    // Cập nhật UI ngay lập tức
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => updateLangUI(savedLang));
    } else {
      updateLangUI(savedLang);
    }

    // Load Google Translate ngay khi trang sẵn sàng (bỏ delay 1200ms)
    window.addEventListener('load', () => {
      loadGoogleTranslateScript();
      setInterval(hideGoogleBanner, 1000);
    });
  })();

  // Fix dropdown ngôn ngữ cho mobile (Bug #8)
  const langBtn = document.querySelector('.language-switcher .btn-getstarted');
  const langDropdown = document.querySelector('.language-switcher .dropdown-content');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
  }

})();
