(function () {
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
      ? '<div class="proj-card-media"><img src="/projects/' + esc(encodeURIComponent(p.folder)) + '/' + esc(encodeURIComponent(p.cover)) + '" alt="' + esc(p.title) + '" /></div>'
      : '<div class="proj-card-media"><div class="ph"><span>BOARD PHOTO / RENDER</span></div></div>';
  }

  function projectCardHTML(p) {
    var color = CAT_COLOR[p.catColor] || 'var(--text-faint)';
    var tags = (p.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    return (
      '<a class="proj-card" data-group="' + esc(p.category) + '" href="/projects/' + esc(encodeURIComponent(p.folder)) + '/">' +
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

  function wireFilters() {
    var chips = document.querySelectorAll('.filter-chip');
    var cards = document.querySelectorAll('.proj-card');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var f = chip.dataset.filter;
        cards.forEach(function (card) {
          card.style.display = (f === 'ALL' || card.dataset.group === f) ? '' : 'none';
        });
      });
    });
  }

  fetch('projects.json')
    .then(function (r) { return r.json(); })
    .then(function (projects) {
      var visible = projects.filter(function (p) { return p.visible !== false; });
      var grid = document.getElementById('proj-cards');
      grid.innerHTML = visible.map(projectCardHTML).join('');
      wireFilters();
    })
    .catch(function (err) {
      document.getElementById('proj-cards').innerHTML =
        '<p style="color:var(--danger);font:400 12.5px var(--font-mono);">Could not load projects.json (' + err + ')</p>';
    });
})();
