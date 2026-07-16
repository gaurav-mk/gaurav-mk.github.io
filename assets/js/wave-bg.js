// Animated wave-grid backdrop, shared across all pages.
(function () {
  var bg = document.getElementById('wave-bg');
  if (!bg) return;

  var sp = 54, A = 10, wl = 360, W = 1440, H = 810;

  function lineD(i, horiz, ph) {
    var base = sp / 2 + i * sp, lph = i * 0.7;
    var len = horiz ? W : H;
    var d = '';
    for (var t = 0; t <= len; t += 30) {
      var off = A * Math.sin((2 * Math.PI * t) / wl + lph + ph);
      var a = horiz ? t : base + off, b = horiz ? base + off : t;
      d += (t === 0 ? 'M' : 'L') + a.toFixed(1) + ' ' + b.toFixed(1);
    }
    return d;
  }

  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 810');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  bg.appendChild(svg);

  var meta = [];
  for (var i = 0; i < 15; i++) meta.push({ i: i, horiz: true });
  for (var j = 0; j < 27; j++) meta.push({ i: j, horiz: false });

  var paths = meta.map(function (m) {
    var p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', lineD(m.i, m.horiz, 0));
    svg.appendChild(p);
    return p;
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var period = 9000;
    var rafId = null;

    function tick(ts) {
      var ph = ((ts % period) / period) * 2 * Math.PI;
      for (var k = 0; k < paths.length; k++) {
        var m = meta[k];
        paths[k].setAttribute('d', lineD(m.i, m.horiz, m.horiz ? ph : -ph));
      }
      rafId = requestAnimationFrame(tick);
    }

    // Pause the redraw loop while the tab is hidden — no visible change, but
    // stops ~1,450 Math.sin calls/frame from running in every backgrounded tab.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      } else if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    });

    if (!document.hidden) rafId = requestAnimationFrame(tick);
  }
})();
