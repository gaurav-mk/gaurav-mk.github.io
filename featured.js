(function () {
  var esc = window.ProjCard.esc;
  var CAT_COLOR = window.ProjCard.CAT_COLOR;

  function featuredBuildHTML(p) {
    var color = CAT_COLOR[p.catColor] || 'var(--text-faint)';
    var media = p.cover
      ? '<img src="/projects/' + esc(encodeURIComponent(p.folder)) + '/' + esc(encodeURIComponent(p.cover)) + '" alt="' + esc(p.title) + '" loading="lazy" />'
      : '<div class="ph"><span>BOARD PHOTO / RENDER</span></div>';
    var tags = (p.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    return (
      '<div class="feature-media">' + media +
        '<div class="feature-tag" style="color:' + color + ';">' + esc(p.category) + '</div>' +
      '</div>' +
      '<div class="feature-body">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.description) + '</p>' +
        '<div class="proj-card-tags">' + tags + '</div>' +
        '<div class="cta-row" style="margin-top:2px;">' +
          '<a class="btn btn-solid btn-sm" href="/projects/' + esc(encodeURIComponent(p.folder)) + '/">View project →</a>' +
          '<a class="btn btn-outline btn-sm" href="https://github.com/gaurav-mk" target="_blank" rel="external nofollow noopener">Design files</a>' +
        '</div>' +
      '</div>'
    );
  }

  function withFolder(folder, projects) {
    var p = projects[folder];
    if (!p) return null;
    p.folder = folder;
    return p;
  }

  Promise.all([
    fetch('/featured.json').then(function (r) { return r.json(); }),
    fetch('/projects/projects.json').then(function (r) { return r.json(); })
  ]).then(function (results) {
    var featured = results[0];
    var projects = results[1];

    var buildEl = document.getElementById('featured-build');
    var mainProject = withFolder(featured.main, projects);
    if (buildEl) {
      buildEl.innerHTML = mainProject
        ? featuredBuildHTML(mainProject)
        : '<p style="color:var(--danger);font:400 12.5px var(--font-mono);padding:24px;">Featured project "' + esc(featured.main) + '" not found in projects.json.</p>';
    }

    var selectedEl = document.getElementById('selected-work-cards');
    if (selectedEl) {
      var others = (featured.other || []).map(function (folder) { return withFolder(folder, projects); }).filter(Boolean);
      selectedEl.innerHTML = others.map(window.ProjCard.render).join('');
    }
  }).catch(function (err) {
    var buildEl = document.getElementById('featured-build');
    if (buildEl) buildEl.innerHTML = '<p style="color:var(--danger);font:400 12.5px var(--font-mono);padding:24px;">Could not load featured content (' + esc(err.message) + ').</p>';
  });
})();
