/* ==================================================
   Sabrina Bedjera portfolio — navigation bar for the content sections.
   Plain JavaScript; does not depend on jQuery. Smooth scrolling for the
   links comes from main.js (the .slow-scroll class).
   ================================================== */
(function () {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    var toggle = nav.querySelector('.sb-nav-toggle');
    var links = Array.prototype.slice.call(nav.querySelectorAll('nav a'));

    // Small screens: the links fold into a menu.
    toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.forEach(function (a) {
        a.addEventListener('click', function () {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Menu';
        });
    });

    // Highlight the section currently in view.
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    function updateCurrent() {
        var line = window.innerHeight * 0.35;
        var current = -1;
        targets.forEach(function (t, i) {
            if (t && t.getBoundingClientRect().top <= line) current = i;
        });
        // At the very bottom the last section can't reach the top: select it.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = links.length - 1;
        // Résumé and Contact share a section: highlight Contact there.
        links.forEach(function (a, i) {
            var on = i === current && a.getAttribute('href') !== '#resume';
            if (current >= 0 && a.getAttribute('href') === '#contact' && links[current].getAttribute('href') === '#resume') on = true;
            a.classList.toggle('is-current', on);
        });
    }
    updateCurrent();
    window.addEventListener('scroll', updateCurrent, { passive: true });

    // Placeholder links (marked aria-disabled) go nowhere until filled in.
    document.querySelectorAll('a[aria-disabled="true"]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); });
    });
}());
