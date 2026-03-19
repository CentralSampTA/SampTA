/* ============================================================
   SampTA — Mobile Navigation Toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var logo = document.querySelector('.site-logo-img');
  var contentImages = document.querySelectorAll('.featured-event img, .content-body img');

  function hideBrokenImage(img) {
    var wrapper = img.closest('p');

    if (wrapper) {
      var onlyImageChild = wrapper.children.length === 1 && wrapper.firstElementChild === img;
      var hasText = wrapper.textContent && wrapper.textContent.trim() !== '';

      if (onlyImageChild && !hasText) {
        wrapper.style.display = 'none';
        return;
      }
    }

    img.style.display = 'none';
  }

  if (logo) {
    logo.addEventListener('error', function () {
      logo.style.display = 'none';
    });
  }

  contentImages.forEach(function (img) {
    img.addEventListener('error', function () {
      hideBrokenImage(img);
    });

    if (img.complete && typeof img.naturalWidth === 'number' && img.naturalWidth === 0) {
      hideBrokenImage(img);
    }
  });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      nav.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active page in nav
  var path = window.location.pathname;
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href !== '/' && path.indexOf(href) === 0) {
      a.classList.add('active');
    } else if (href === '/' && path === '/') {
      a.classList.add('active');
    }
  });
});
