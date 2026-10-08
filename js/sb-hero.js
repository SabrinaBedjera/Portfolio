/* ==================================================
   Sabrina Bedjera portfolio — homepage hero behaviour
   EXPERIMENT: photographic desk, desktop prototype.
   Loaded after js/main.js (the Volos template script).
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var hero = document.querySelector('.sb-hero');
    if (!hero) return;

    // The Volos menu button is hidden over the desk photo (the photo has its
    // own navigation) and comes back once the visitor scrolls past it.
    function updateMenuButton() {
        document.body.classList.toggle('sb-past-hero', hero.getBoundingClientRect().bottom < 80);
    }
    updateMenuButton();
    window.addEventListener('scroll', updateMenuButton, { passive: true });

    // Placeholder: the fun corner doesn't exist yet.
    var ball = hero.querySelector('.hit-ball');
    if (ball) ball.addEventListener('click', function (e) { e.preventDefault(); });
}());
