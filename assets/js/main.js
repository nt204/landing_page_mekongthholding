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
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
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
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
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
   * Language Switcher
   */
  const langLabels = {
    'vi': '🇻🇳 Tiếng Việt',
    'lo': '🇱🇦 Tiếng Lào',
    'th': '🇹🇭 Tiếng Thái',
    'km': '🇰🇭 Tiếng Campuchia'
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

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'vi',
      includedLanguages: 'vi,lo,th,km',
      autoDisplay: false
    }, 'google_translate_element');
    
    // We don't need manual timeouts for initial translation
    // Google Translate reads the googtrans cookie automatically on load!
  };

  /**
   * Set Google Translate cookie directly for instant cross-page sync
   */
  function setLangCookie(lang) {
    if (lang === 'vi') {
      // Clear cookies
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    } else {
      // Set cookies
      const val = "/vi/" + lang;
      document.cookie = `googtrans=${val}; path=/;`;
      if (window.location.hostname) {
        document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname};`;
      }
    }
  }

  function changeLang(lang) {
    if (!lang) return;
    
    // 1. Lưu vào bộ nhớ
    localStorage.setItem("lang", lang);
    
    // 2. Cập nhật UI
    updateLangUI(lang);
    
    // 3. Ghi đè cookie ngay lập tức để trang sau có thể nhận diện liền
    setLangCookie(lang);
    
    // 4. Force widget dịch ngay trên trang hiện tại
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    } else {
      // Nếu widget chưa load kịp, reload trang để cookie phát huy tác dụng
      window.location.reload();
    }
    
    hideGoogleBanner();
    setTimeout(hideGoogleBanner, 500);
    
    // Giấu menu trên mobile nếu đang mở
    const body = document.querySelector('body');
    if (body && body.classList.contains('mobile-nav-active')) {
      const toggleBtn = document.querySelector('.mobile-nav-toggle');
      if (toggleBtn) {
        body.classList.remove('mobile-nav-active');
        toggleBtn.classList.remove('bi-x');
        toggleBtn.classList.add('bi-list');
      }
    }
  }

  window.changeLang = changeLang;
  window.changeLanguage = changeLang;

  // Xử lý tức thì khi script vừa chạy (trước cả sự kiện load)
  (function() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    let savedLang = localStorage.getItem("lang");

    if (langParam) {
      savedLang = langParam;
      localStorage.setItem("lang", langParam);
      setLangCookie(langParam);
    } else if (savedLang && savedLang !== 'vi') {
      // Đảm bảo cookie tồn tại khớp với localStorage để init của Google translate hoạt động trơn tru
      setLangCookie(savedLang);
    }
  })();

  window.addEventListener('load', () => {
    let savedLang = localStorage.getItem("lang") || 'vi';
    
    // Cập nhật giao diện menu ngôn ngữ
    updateLangUI(savedLang);

    // Kích hoạt dịch ngay cả khi cookie bị lỗi (trường hợp chạy file:/// local)
    if (savedLang && savedLang !== 'vi') {
        applyGoogleTranslate(savedLang);
    }

    // Ẩn banner định kỳ để chống hiện tượng xuất hiện lại
    setInterval(hideGoogleBanner, 500);
  });

})();
