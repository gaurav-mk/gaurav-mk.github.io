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

  // Converts Obsidian-style embeds/links into normal markdown before handing off to marked.js:
  //   ![[image.png]]        -> ![image.png](folder/image.png)
  //   ![[image.png|alt]]    -> ![alt](folder/image.png)
  //   [[Some Note]]         -> styled span (no cross-note linking yet, just avoids raw "[[ ]]" text)
  function preprocessObsidian(md, folder) {
    md = md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, file, alias) {
      var alt = alias || file;
      return '![' + alt + '](' + encodePath(folder, file.trim()) + ')';
    });
    md = md.replace(/\[\[([^\]]+)\]\]/g, function (_, label) {
      return '<span class="wikilink">' + esc(label) + '</span>';
    });
    return md;
  }

  function renderMeta(course) {
    var chip = '<span class="note-chip ' + esc(course.status) + '">' + esc(STATUS_LABEL[course.status] || course.status) + '</span>';
    var tags = '<div class="note-tags">' + (course.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
    return chip + tags;
  }

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var bodyEl = document.getElementById('note-body');
  var titleEl = document.getElementById('note-title');
  var metaEl = document.getElementById('note-meta');

  if (!slug) {
    titleEl.textContent = 'Course not found';
    bodyEl.innerHTML = '<p class="note-empty">No course specified. <a href="/courses/">Back to courses.</a></p>';
    return;
  }

  fetch('courses.json')
    .then(function (r) { return r.json(); })
    .then(function (courses) {
      var course = courses.find(function (c) { return c.folder === slug; });
      if (!course) {
        titleEl.textContent = 'Course not found';
        bodyEl.innerHTML = '<p class="note-empty">No course matches "' + esc(slug) + '". <a href="/courses/">Back to courses.</a></p>';
        return;
      }

      document.getElementById('page-title').textContent = course.title + ' | Gaurav Kumar Mishra';
      titleEl.textContent = course.title;
      metaEl.innerHTML = renderMeta(course);

      if (!course.notesFile) {
        bodyEl.innerHTML = '<p class="note-empty">Notes for this course haven\'t been written up yet — check back soon.</p>';
        return;
      }

      var path = encodePath(course.folder, course.notesFile);
      fetch(path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function (md) {
          var processed = preprocessObsidian(md, course.folder);
          bodyEl.innerHTML = window.marked.parse(processed);
        })
        .catch(function (err) {
          bodyEl.innerHTML = '<p class="note-empty">Could not load notes (' + esc(err.message) + ').</p>';
        });
    })
    .catch(function (err) {
      titleEl.textContent = 'Error';
      bodyEl.innerHTML = '<p class="note-empty">Could not load courses.json (' + esc(err.message) + ').</p>';
    });
})();
