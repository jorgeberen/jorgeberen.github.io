// Slow-drifting starfield. Static when the user prefers reduced motion.
(function () {
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars = [];
  var w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round((w * h) / 9000);
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        v: Math.random() * 0.06 + 0.01,
        p: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.08,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = 0.35 + 0.35 * Math.sin(t / 1800 + s.p);
      ctx.fillStyle = s.gold ? "rgba(218,165,32," + a + ")" : "rgba(200,205,220," + a * 0.7 + ")";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.2832);
      ctx.fill();
      if (!reduce) {
        s.y -= s.v;
        if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () { resize(); if (reduce) draw(0); });
  resize();
  requestAnimationFrame(draw);

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
