/* ==================================================
   Sabrina Bedjera portfolio — homepage hero behaviour
   Loaded after js/main.js (the Volos template script).
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var card = document.getElementById('researcher-card');
    if (!card) return;
    card.addEventListener('click', function () {
        var flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    });
}());
