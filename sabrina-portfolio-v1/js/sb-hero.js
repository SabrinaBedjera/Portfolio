/* ==================================================
   Sabrina Bedjera portfolio — homepage hero behaviour
   EXPERIMENT: "creative workspace" desk scene.
   Loaded after js/main.js (the Volos template script).
   Plain JavaScript; does not depend on jQuery.
   ================================================== */
(function () {
    var hero = document.querySelector('.sb-hero');
    if (!hero) return;

    var scene = hero.querySelector('.ws-scene');
    var stage = hero.querySelector('.ws-stage');
    // The objects occupy roughly 860×700 of the 1000×760 canvas; the rest is
    // soft, fading desk that may bleed past the scene's edges.
    var FIT_W = 860;
    var FIT_H = 700;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scale the fixed-size design canvas to fit the space the layout gives it.
    function fitStage() {
        var s = Math.min(scene.clientWidth / FIT_W, scene.clientHeight / FIT_H);
        stage.style.setProperty('--s', Math.max(s, 0.2).toFixed(4));
        hero.style.setProperty('--s', Math.max(s, 0.2).toFixed(4));
    }
    fitStage();
    window.addEventListener('resize', fitStage);

    // Miniature display: a slowly wandering sensor trace and pH readout.
    var trace = hero.querySelector('.display-trace');
    var value = hero.querySelector('.display-value');
    var POINTS = 40;
    var samples = [];
    var level = 32;
    for (var i = 0; i < POINTS; i++) samples.push(level);

    function step() {
        level += (Math.random() - 0.5) * 7 + (32 - level) * 0.08;
        samples.push(level);
        samples.shift();
        trace.setAttribute('points', samples.map(function (y, k) {
            return (k * 120 / (POINTS - 1)).toFixed(1) + ',' + y.toFixed(1);
        }).join(' '));
        value.textContent = (6.82 + (32 - level) * 0.012).toFixed(2);
    }
    for (var j = 0; j < POINTS; j++) step();

    var timer = null;
    function start() { if (!timer && !reduceMotion) timer = setInterval(step, 160); }
    function stop() { clearInterval(timer); timer = null; }

    // Pause ambient animation while the hero is off-screen.
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            var visible = entries[0].isIntersecting;
            hero.classList.toggle('ws-paused', !visible);
            if (visible) start(); else stop();
        }).observe(hero);
    } else {
        start();
    }
}());
