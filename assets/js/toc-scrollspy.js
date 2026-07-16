// Powers the sticky, scroll-spied sidebar TOC (.article-toc). Every page that
// uses it must call window.initTocScrollspy() itself once its headings/links
// exist — project write-ups with static markup call it inline right after
// this script tag; courses/course.js and projects/project.js call it after
// building the TOC at runtime, optionally passing a different content root
// and/or heading selector (a couple of the JESD204C sub-pages track non-h2
// sectioning elements, so this isn't always the 'h2[id]' default).
window.initTocScrollspy = function (contentSelector, nodeSelector) {
  var toc = document.querySelector('.article-toc');
  if (!toc) return;
  var content = document.querySelector(contentSelector || '.proj-main');
  if (!content) return;
  var nodes = [].slice.call(content.querySelectorAll(nodeSelector || 'h2[id]'));
  var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
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
      nodes.forEach(function (n) { if (n.offsetTop <= top) hit = n; });
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
};
