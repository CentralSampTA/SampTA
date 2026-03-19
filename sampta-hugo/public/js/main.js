/* ============================================================
   SampTA — Mobile Navigation Toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

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
