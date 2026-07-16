// Shared project-card renderer — used by both projects/projects.js (the full listing)
// and featured.js (the "Selected work" preview on the home page), so both places
// render an identical card from the same projects.json entry.
window.ProjCard = (function () {
  var CAT_COLOR = {
    green: 'var(--accent)',
    yellow: '#e6c229',
    orange: 'var(--gold)'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function mediaHTML(p) {
    return p.cover
      ? '<div class="proj-card-media"><img src="/projects/' + esc(encodeURIComponent(p.folder)) + '/' + esc(encodeURIComponent(p.cover)) + '" alt="' + esc(p.title) + '" loading="lazy" /></div>'
      : '<div class="proj-card-media"><div class="ph"><span>BOARD PHOTO / RENDER</span></div></div>';
  }

  // Projects migrated to the markdown-note system (p.md === true) route through
  // the shared /projects/project.html?slug=... template; everything else still
  // has its own hand-authored /projects/<folder>/index.html.
  function href(p) {
    return p.md
      ? '/projects/project.html?slug=' + esc(encodeURIComponent(p.folder))
      : '/projects/' + esc(encodeURIComponent(p.folder)) + '/';
  }

  function render(p) {
    var color = CAT_COLOR[p.catColor] || 'var(--text-faint)';
    var tags = (p.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    return (
      '<a class="proj-card" data-group="' + esc(p.category) + '" href="' + href(p) + '">' +
        mediaHTML(p) +
        '<div class="proj-card-body">' +
          '<h2>' + esc(p.title) + '</h2>' +
          '<p>' + esc(p.description) + '</p>' +
          '<div class="proj-card-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="proj-card-aside">' +
          '<span class="proj-card-badge" style="color:' + color + ';">● ' + esc(p.category) + '</span>' +
          '<span class="proj-card-cta">View project →</span>' +
        '</div>' +
      '</a>'
    );
  }

  return { render: render, esc: esc, CAT_COLOR: CAT_COLOR, href: href };
})();
