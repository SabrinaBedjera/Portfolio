/* ==================================================
   Sabrina Bedjera portfolio — homepage hero behaviour
   EXPERIMENT: photographic desk, desktop prototype.
   Loaded after js/main.js (the Volos template script).
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var hero = document.querySelector('.sb-hero');
    if (!hero) return;

    // Desktop: the site navigation bar stays out of the desk photo (the photo
    // has its own menu) and appears once the visitor scrolls past it.
    function updatePastHero() {
        document.body.classList.toggle('sb-past-hero', hero.getBoundingClientRect().bottom < 80);
    }
    updatePastHero();
    window.addEventListener('scroll', updatePastHero, { passive: true });
    window.addEventListener('resize', updatePastHero);

    // Placeholders: the Lab and the fun corner don't exist yet.
    hero.querySelectorAll('[data-soon]').forEach(function (el) {
        el.addEventListener('click', function (e) { e.preventDefault(); });
    });
}());
