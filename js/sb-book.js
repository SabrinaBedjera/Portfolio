/* ==================================================
   Sabrina Bedjera portfolio — Portfolio book viewer
   EXPERIMENT: desktop prototype. Styles in css/sb-book.css.
   Any element with [data-open-book] opens the book; [data-close-book] closes it.
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var viewer = document.getElementById('portfolio-book');
    if (!viewer) return;

    var fly = viewer.querySelector('.pf-fly');
    var book = viewer.querySelector('.pf-book');
    var leaves = Array.prototype.slice.call(viewer.querySelectorAll('.pf-leaf'));
    var prevBtn = viewer.querySelector('.pf-prev');
    var nextBtn = viewer.querySelector('.pf-next');
    var count = viewer.querySelector('.pf-count');
    var desk = document.querySelector('.sb-hero .desk');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Where the notebook sits in the desk photo (percent of the photo):
    // centre, width of the cover, and its rotation.
    var NOTEBOOK = { cx: .5683, cy: .5766, w: .2625, angle: -10.6 };

    var LAST = leaves.length - 1;   // the final leaf is never turned
    var spread = 0;                 // number of leaves turned; 0 = closed cover
    var busy = false;
    var opener = null;

    var T_FLY = reduceMotion ? 1 : 750;
    var T_TURN = reduceMotion ? 1 : 950;
    var T_FAST = reduceMotion ? 1 : 320;

    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function nextFrame() { return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); }); }

    // Unturned leaves stack first-on-top on the right; turned leaves stack
    // last-on-top on the left.
    function restack() {
        leaves.forEach(function (leaf, i) {
            leaf.style.zIndex = leaf.classList.contains('is-flipped') ? i + 1 : leaves.length * 2 - i;
        });
    }

    function label() {
        if (spread === 0) return '';
        if (spread === 1) return 'Contents';
        return 'Pages ' + (spread * 2 - 2) + '–' + (spread * 2 - 1);
    }

    function updateControls() {
        prevBtn.disabled = busy || spread <= 1;
        nextBtn.disabled = busy || spread >= LAST;
        count.textContent = label();
        // Only the two visible pages are exposed to assistive technology.
        leaves.forEach(function (leaf, i) {
            leaf.querySelector('.pf-front').setAttribute('aria-hidden', i === spread ? 'false' : 'true');
            leaf.querySelector('.pf-back').setAttribute('aria-hidden', i === spread - 1 ? 'false' : 'true');
            leaf.querySelectorAll('button, a').forEach(function (el) {
                var face = el.closest('.pf-face');
                el.tabIndex = face.getAttribute('aria-hidden') === 'true' ? -1 : 0;
            });
        });
    }

    // Turn one leaf forward (dir = 1) or back (dir = -1).
    function turn(dir, duration) {
        var leaf = dir > 0 ? leaves[spread] : leaves[spread - 1];
        leaf.style.zIndex = 100;
        leaf.classList.add('is-turning');
        leaf.classList.toggle('is-flipped', dir > 0);
        spread += dir;
        return wait(duration * .55).then(function () {
            leaf.classList.remove('is-turning');
            return wait(duration * .45);
        }).then(restack);
    }

    function go(target) {
        if (busy || target === spread || target < 1 || target > LAST) return;
        busy = true;
        updateControls();
        var steps = Math.abs(target - spread);
        var dir = target > spread ? 1 : -1;
        var fast = steps > 1;
        book.classList.toggle('is-fast', fast);
        var chain = Promise.resolve();
        for (var i = 0; i < steps; i++) {
            chain = chain.then(function () { return turn(dir, fast ? T_FAST : T_TURN); });
        }
        chain.then(function () {
            book.classList.remove('is-fast');
            busy = false;
            updateControls();
        });
    }

    // Transform that places the closed book exactly over the notebook in the
    // desk photo, so the book appears to lift off the desk.
    function fromDesk() {
        if (!desk) return null;
        var d = desk.getBoundingClientRect();
        var cx = d.left + d.width * NOTEBOOK.cx;
        var cy = d.top + d.height * NOTEBOOK.cy;
        if (cy < 0 || cy > window.innerHeight) return null;   // notebook not on screen
        var cover = leaves[0].getBoundingClientRect();        // closed cover, centred
        var scale = (d.width * NOTEBOOK.w) / cover.width;
        var dx = cx - (cover.left + cover.width / 2);
        var dy = cy - (cover.top + cover.height / 2);
        return 'translate(' + dx + 'px,' + dy + 'px) rotate(' + NOTEBOOK.angle + 'deg) scale(' + scale + ')';
    }

    function open(trigger) {
        if (busy || !viewer.hidden) return;
        busy = true;
        opener = trigger || document.activeElement;
        spread = 0;
        leaves.forEach(function (l) { l.classList.remove('is-flipped', 'is-turning'); });
        restack();
        book.classList.add('is-closed');
        viewer.hidden = false;
        document.documentElement.style.overflow = 'hidden';
        updateControls();

        var start = fromDesk();
        var flyIn = start
            ? fly.animate([{ transform: start }, { transform: 'none' }], { duration: T_FLY, easing: 'cubic-bezier(.3,.7,.2,1)' })
            : fly.animate([{ transform: 'scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: T_FLY * .6, easing: 'ease-out' });

        nextFrame().then(function () {
            viewer.classList.add('is-visible');
            return flyIn.finished;
        }).then(function () {
            // Open the cover and slide the book to centre the spread.
            book.classList.remove('is-closed');
            return turn(1, T_TURN);
        }).then(function () {
            viewer.classList.add('is-open');
            busy = false;
            updateControls();
            nextBtn.focus();
        });
    }

    function close(thenHash) {
        if (busy || viewer.hidden) return;
        var turned = spread;
        busy = true;
        updateControls();
        viewer.classList.remove('is-open');

        // Turn every page back, close the cover, then return to the desk.
        book.classList.add('is-fast');
        var chain = Promise.resolve();
        for (var i = 0; i < turned; i++) {
            chain = chain.then(function () { return turn(-1, T_FAST); });
        }
        chain.then(function () {
            book.classList.remove('is-fast');
            book.classList.add('is-closed');
            return wait(reduceMotion ? 1 : 500);
        }).then(function () {
            viewer.classList.remove('is-visible');
            var end = fromDesk();
            var anim = end
                ? fly.animate([{ transform: 'none' }, { transform: end }], { duration: T_FLY, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' })
                : fly.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.85)' }], { duration: T_FLY * .6, fill: 'forwards' });
            return anim.finished.then(function () { return anim; });
        }).then(function (anim) {
            viewer.hidden = true;
            anim.cancel();
            document.documentElement.style.overflow = '';
            busy = false;
            if (thenHash) {
                var target = document.querySelector(thenHash);
                if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
            } else if (opener && opener.focus) {
                opener.focus({ preventScroll: true });
            }
        });
    }

    // ---------- Wiring ----------
    document.querySelectorAll('[data-open-book]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            open(el);
        });
    });
    viewer.querySelectorAll('[data-close-book]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            close(el.getAttribute('data-then'));
        });
    });
    viewer.querySelectorAll('[data-goto]').forEach(function (el) {
        el.addEventListener('click', function () { go(+el.getAttribute('data-goto')); });
    });
    prevBtn.addEventListener('click', function () { go(spread - 1); });
    nextBtn.addEventListener('click', function () { go(spread + 1); });

    document.addEventListener('keydown', function (e) {
        if (viewer.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); go(spread + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(spread - 1); }
        else if (e.key === 'Tab') {
            // Keep keyboard focus inside the book while it is open.
            var focusable = Array.prototype.filter.call(
                viewer.querySelectorAll('button, a[href]'),
                function (el) { return el.tabIndex !== -1 && !el.disabled && el.offsetParent !== null; }
            );
            if (!focusable.length) return;
            var first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
}());
