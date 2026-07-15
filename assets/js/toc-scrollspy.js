(function () {
  var toc = document.querySelector('.article-toc');
  if (!toc) return;
  var content = document.querySelector('.proj-main');
  if (!content) return;
  var nodes = [...content.querySelectorAll('h2[id]')];
  var links = [...toc.querySelectorAll('a[href^="#"]')];
  var pill = toc.querySelector('.toc-pill');

  function place(link) {
    if (!pill) return;
    if (!link) { pill.style.opacity = '0'; return; }
    pill.style.top    = link.offsetTop   + 'px';
    pill.style.left   = link.offsetLeft  + 'px';
    pill.style.width  = link.offsetWidth  + 'px';
    pill.style.height = link.offsetHeight + 'px';
    pill.style.opacity = '1';
  }

  function update() {
    var top = window.scrollY + 110;
    var hit = nodes[0];
    var atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 25);
    if (atBottom) {
      hit = nodes[nodes.length - 1];
    } else {
      for (var n of nodes) { if (n.offsetTop <= top) hit = n; }
    }
    var href = hit ? '#' + hit.id : '';
    var active = null;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === href;
      a.classList.toggle('active', on);
      if (on) active = a;
    });
    place(active);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
