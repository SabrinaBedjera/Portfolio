/* ==================================================
   Sabrina Bedjera portfolio — Selected Work project detail views.
   Adapted from the Figma Make prototype's ProjectDetail component:
   opens as a full-screen dialog, locks page scroll, moves focus to Close,
   closes on Close or Escape, keeps keyboard focus inside while open and
   returns focus to the project that opened it.
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var triggers = document.querySelectorAll('.sg-link[data-detail]');
    if (!triggers.length) return;

    var open = null;      // the detail currently shown
    var opener = null;    // the gallery button that opened it
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function focusables(el) {
        return Array.prototype.filter.call(
            el.querySelectorAll('a[href], button:not([disabled])'),
            function (n) { return n.offsetParent !== null; }
        );
    }

    function show(detail, trigger) {
        if (open) return;
        open = detail;
        opener = trigger;
        detail.hidden = false;
        detail.scrollTop = 0;
        document.documentElement.style.overflow = 'hidden';
        trigger.setAttribute('aria-expanded', 'true');
        detail.querySelector('[data-close-detail]').focus();
    }

    function hide() {
        if (!open) return;
        var detail = open;
        open = null;
        function done() {
            detail.classList.remove('is-closing');
            detail.hidden = true;
            document.documentElement.style.overflow = '';
            if (opener) {
                opener.setAttribute('aria-expanded', 'false');
                opener.focus({ preventScroll: true });
            }
        }
        if (reduceMotion) return done();
        detail.classList.add('is-closing');
        setTimeout(done, 300);
    }

    Array.prototype.forEach.call(triggers, function (btn) {
        var detail = document.getElementById(btn.getAttribute('data-detail'));
        if (!detail) return;
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', function () { show(detail, btn); });
        detail.querySelectorAll('[data-close-detail]').forEach(function (b) { b.addEventListener('click', hide); });
    });

    document.addEventListener('keydown', function (e) {
        if (!open) return;
        if (e.key === 'Escape') { e.preventDefault(); hide(); return; }
        if (e.key === 'Tab') {
            var items = focusables(open);
            if (!items.length) return;
            var first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
}());
