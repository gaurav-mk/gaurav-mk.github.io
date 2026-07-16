(function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Always absolute (/projects/<folder>/<file>) — this page lives *inside* the
  // project's own folder, so a path relative to folder+file would double-nest.
  function assetPath(folder, file) {
    return '/projects/' + folder.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  // Same Obsidian-style image embed as courses/course.js:
  //   ![[image.png]]      -> ![image.png](/projects/<folder>/image.png)
  //   ![[image.png|alt]]  -> ![alt](/projects/<folder>/image.png)
  function preprocessObsidian(md, folder) {
    return md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, file, alias) {
      var alt = alias || file;
      return '![' + alt + '](' + assetPath(folder, file.trim()) + ')';
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

  var bodyEl = document.getElementById('note-body');
  var titleEl = document.getElementById('note-title');

  // Derive this project's folder name from the page's own URL — no query
  // param needed, since each project already lives at its own /projects/<folder>/.
  var segs = location.pathname.split('/').filter(Boolean);
  if (segs[segs.length - 1] === 'index.html') segs.pop();
  var folder = decodeURIComponent(segs.pop() || '');

  fetch('/projects/projects.json')
    .then(function (r) { return r.json(); })
    .then(function (projects) {
      var project = projects[folder];
      if (!project) {
        titleEl.textContent = 'Project not found';
        bodyEl.innerHTML = '<p class="note-empty">No project matches "' + esc(folder) + '". <a href="/projects/">Back to projects.</a></p>';
        return;
      }

      document.getElementById('page-title').textContent = project.title + ' | Gaurav Kumar Mishra';
      titleEl.textContent = project.title;

      fetch(assetPath(folder, folder + '.md'))
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function (md) {
          bodyEl.innerHTML = window.marked.parse(preprocessObsidian(md, folder));
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
