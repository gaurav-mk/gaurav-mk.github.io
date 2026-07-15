(function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function rangeText(e) {
    var fromYY = String(e.year).slice(-2);
    if (e['month-to'] === 'PRESENT') {
      return e['month-from'] + "'" + fromYY + ' – PRESENT';
    }
    var toYY = String(e['year-to'] || e.year).slice(-2);
    return e['month-from'] + "'" + fromYY + ' – ' + e['month-to'] + "'" + toYY;
  }

  function entryHTML(e) {
    var isNow = e.category === 'NOW';
    var tags = (e.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var status = isNow
      ? '<span class="entry-status"><span class="dot"></span> Now</span>'
      : '';
    return (
      '<article class="entry' + (isNow ? ' current' : '') + '">' +
        '<div class="entry-year">' + esc(e.year) + '<span class="range">' + esc(rangeText(e)) + '</span></div>' +
        '<div>' +
          '<div class="entry-kind">' + esc(e.kind) + '</div>' +
          '<h3 class="entry-title">' + esc(e.title) + '</h3>' +
          '<div class="entry-org">' + esc(e.org) + '</div>' +
          '<div class="entry-loc">' + esc(e.location) + '</div>' +
          '<p class="entry-summary">' + esc(e.description) + '</p>' +
          '<div class="entry-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="entry-aside"><span class="entry-duration">' + esc(e.duration) + '</span>' + status + '</div>' +
      '</article>'
    );
  }

  fetch('/trajectory.json')
    .then(function (r) { return r.json(); })
    .then(function (entries) {
      var visible = entries.filter(function (e) { return e.visible !== false; });
      var ledger = document.getElementById('ledger');
      ledger.insertAdjacentHTML('beforeend', visible.map(entryHTML).join(''));
    })
    .catch(function (err) {
      document.getElementById('ledger').insertAdjacentHTML('beforeend',
        '<p style="color:var(--danger);font:400 12.5px var(--font-mono);">Could not load trajectory.json (' + err + ')</p>');
    });
})();
