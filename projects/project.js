(function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function encodePath(folder, file) {
    return folder.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  // Same Obsidian-style image embed as courses/course.js:
  //   ![[image.png]]      -> ![image.png](<folder>/image.png)
  //   ![[image.png|alt]]  -> ![alt](<folder>/image.png)
  function preprocessObsidian(md, folder) {
    return md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, file, alias) {
      var alt = alias || file;
      return '![' + alt + '](' + encodePath(folder, file.trim()) + ')';
    });
  }

  function buildToc() {
    var tocEl = document.getElementById('note-toc');
    var headings = [].slice.call(bodyEl.querySelectorAll('h2'));
    if (!tocEl || !headings.length) return;
    headings.forEach(function (h, i) { h.id = 'heading-' + i; });
    tocEl.innerHTML = headings.map(function (h, i) {
      return '<a href="#heading-' + i + '">' + esc(h.textContent) + '</a>';
    }).join('') + '<div class="toc-pill"></div>';
    tocEl.classList.add('ready');
    window.initTocScrollspy('.note-body');
  }

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var bodyEl = document.getElementById('note-body');
  var titleEl = document.getElementById('note-title');

  if (!slug) {
    titleEl.textContent = 'Project not found';
    bodyEl.innerHTML = '<p class="note-empty">No project specified. <a href="/projects/">Back to projects.</a></p>';
    return;
  }

  fetch('projects.json')
    .then(function (r) { return r.json(); })
    .then(function (projects) {
      var project = projects[slug];
      if (!project) {
        titleEl.textContent = 'Project not found';
        bodyEl.innerHTML = '<p class="note-empty">No project matches "' + esc(slug) + '". <a href="/projects/">Back to projects.</a></p>';
        return;
      }

      document.getElementById('page-title').textContent = project.title + ' | Gaurav Kumar Mishra';
      titleEl.textContent = project.title;

      var path = encodePath(slug, slug + '.md');
      fetch(path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function (md) {
          bodyEl.innerHTML = window.marked.parse(preprocessObsidian(md, slug));
          buildToc();
        })
        .catch(function (err) {
          bodyEl.innerHTML = '<p class="note-empty">Could not load notes (' + esc(err.message) + ').</p>';
        });
    })
    .catch(function (err) {
      titleEl.textContent = 'Error';
      bodyEl.innerHTML = '<p class="note-empty">Could not load projects.json (' + esc(err.message) + ').</p>';
    });
})();
