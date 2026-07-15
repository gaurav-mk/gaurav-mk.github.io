(function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function mediaHTML(entry) {
    var covers = Array.isArray(entry.cover) ? entry.cover : [entry.cover];
    var imgs = covers.map(function (c) {
      return '<img src="' + esc(encodeURIComponent(c)) + '" alt="' + esc(entry.title) + '" loading="lazy" />';
    }).join('');
    var gridClass = covers.length > 1 ? ' vol-media-grid' : '';
    return '<div class="vol-media' + gridClass + '">' + imgs + '</div>';
  }

  function bodyHTML(entry) {
    var kicker = (entry.tags || []).join(' · ');
    var paragraphs = String(entry.description || '')
      .split('</br>')
      .map(function (p) { return '<p>' + p + '</p>'; })
      .join('');
    return (
      '<div class="vol-body">' +
        '<div class="vol-kicker">' + esc(kicker) + '</div>' +
        '<h3>' + esc(entry.title) + '</h3>' +
        paragraphs +
      '</div>'
    );
  }

  function entryHTML(entry) {
    var media = mediaHTML(entry);
    var body = bodyHTML(entry);
    var parts = entry.mediaPosition === 'right' ? [body, media] : [media, body];
    return '<div class="vol-row">' + parts.join('') + '</div>';
  }

  fetch('community.json')
    .then(function (r) { return r.json(); })
    .then(function (entries) {
      var visible = entries.filter(function (e) { return e.visible !== false; });
      var list = document.getElementById('vol-list');
      list.innerHTML = visible.map(entryHTML).join('');
    })
    .catch(function (err) {
      document.getElementById('vol-list').innerHTML =
        '<p style="color:var(--danger);font:400 12.5px var(--font-mono);">Could not load community.json (' + err + ')</p>';
    });
})();
