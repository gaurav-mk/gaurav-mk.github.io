(function () {
  var STATUS_LABEL = { current: '● In Progress', done: '✓ Completed', planned: '○ Planned' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function encodePath(folder, file) {
    return folder.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  function courseCardHTML(c) {
    var tags = (c.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var footLink = c.notesFile
      ? '<span class="course-link">Read notes →</span>'
      : '<span class="course-link muted">Notes coming soon</span>';
    var cover = c.cover
      ? '<img src="' + esc(encodePath(c.folder, c.cover)) + '" alt="" loading="lazy" />'
      : '<span>NO COVER</span>';
    var tag = c.notesFile ? 'a' : 'div';
    var hrefAttr = c.notesFile ? ' href="course.html?slug=' + encodeURIComponent(c.folder) + '"' : '';
    return (
      '<' + tag + ' class="course-card"' + hrefAttr + '>' +
        '<div class="course-cover' + (c.cover ? '' : ' no-cover') + '">' + cover + '</div>' +
        '<div class="course-body">' +
          '<h3>' + esc(c.title) + '</h3>' +
          '<div class="course-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="course-foot">' +
          footLink +
          '<span class="course-chip ' + esc(c.status) + '">' + esc(STATUS_LABEL[c.status] || c.status) + '</span>' +
        '</div>' +
      '</' + tag + '>'
    );
  }

  fetch('courses.json')
    .then(function (r) { return r.json(); })
    .then(function (courses) {
      var visible = courses.filter(function (c) { return c.visible !== false; });
      var grid = document.getElementById('course-grid');
      grid.innerHTML = visible.map(courseCardHTML).join('');
      document.getElementById('stat-total').textContent = visible.length;
      document.getElementById('stat-in-progress').textContent =
        visible.filter(function (c) { return c.status === 'current'; }).length;
    })
    .catch(function (err) {
      document.getElementById('course-grid').innerHTML =
        '<p style="color:var(--danger);font:400 12.5px var(--font-mono);">Could not load courses.json (' + err + ')</p>';
    });
})();
