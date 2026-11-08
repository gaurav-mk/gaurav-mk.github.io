(function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function encodePath(folder, file) {
    return folder.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  // Converts Obsidian-style embeds/links into normal markdown before handing off to marked.js:
  //   ![[image.png]]         -> ![image.png](folder/image.png)
  //   ![[image.png|alt]]     -> ![alt](folder/image.png)
  //   [[Note Name]]          -> link to course.html?slug=folder&note=Note Name.md
  //   [[Note Name|Label]]    -> same link, shown as "Label"
  function preprocessObsidian(md, folder) {
    md = md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, file, alias) {
      var alt = alias || file;
      return '![' + alt + '](' + encodePath(folder, file.trim()) + ')';
    });
    md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, note, alias) {
      note = note.trim();
      var label = (alias || note).trim();
      var href = 'course.html?slug=' + encodeURIComponent(folder) + '&note=' + encodeURIComponent(note + '.md');
      return '<a class="wikilink" href="' + href + '">' + esc(label) + '</a>';
    });
    return md;
  }

  function noteTitleFromFile(file) {
    return file.replace(/\.md$/i, '').replace(/[-_]/g, ' ');
  }

  // Builds the left-hand index from the note's own h2 sections, then hands off
  // to the shared scroll-spy (same sticky TOC behavior as the project write-ups).
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

  // Turns Obsidian callouts (> [!tip] Title) into styled boxes. marked leaves them
  // as plain blockquotes, so without this the site shows the raw [!tip] text.
  // A - or + after the type makes one foldable, starting closed or open, as in Obsidian.
  function renderCallouts() {
    [].forEach.call(bodyEl.querySelectorAll('blockquote'), function (quote) {
      var first = quote.firstElementChild;
      var match = first && first.tagName === 'P' && first.innerHTML.match(/^\[!([\w-]+)\]([+-]?)[ \t]*(.*)\n?/);
      if (!match) return;

      var type = match[1].toLowerCase();
      var foldable = !!match[2];
      var box = document.createElement(foldable ? 'details' : 'div');
      var title = document.createElement(foldable ? 'summary' : 'div');
      var content = document.createElement('div');
      box.className = 'callout callout-' + type;
      if (match[2] === '+') box.open = true;
      title.className = 'callout-title';
      title.innerHTML = match[3] || type.charAt(0).toUpperCase() + type.slice(1);
      content.className = 'callout-content';

      first.innerHTML = first.innerHTML.slice(match[0].length);
      if (!first.innerHTML.trim()) first.remove();
      while (quote.firstChild) content.appendChild(quote.firstChild);
      box.appendChild(title);
      box.appendChild(content);
      quote.parentNode.replaceChild(box, quote);
    });
  }

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var noteParam = params.get('note');
  var bodyEl = document.getElementById('note-body');
  var titleEl = document.getElementById('note-title');
  var backEl = document.getElementById('note-back');

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

      var noteFile = noteParam || course.notesFile;
      if (!noteFile) {
        document.getElementById('page-title').textContent = course.title + ' | Gaurav Kumar Mishra';
        titleEl.textContent = course.title;
        bodyEl.innerHTML = '<p class="note-empty">Notes for this course haven\'t been written up yet — check back soon.</p>';
        return;
      }

      if (noteParam) {
        var noteTitle = noteTitleFromFile(noteParam);
        document.getElementById('page-title').textContent = noteTitle + ' | Gaurav Kumar Mishra';
        titleEl.textContent = noteTitle;
        backEl.href = 'course.html?slug=' + encodeURIComponent(course.folder);
        backEl.textContent = '← ' + course.title;
      } else {
        document.getElementById('page-title').textContent = course.title + ' | Gaurav Kumar Mishra';
        titleEl.textContent = course.title;
      }

      var path = encodePath(course.folder, noteFile);
      fetch(path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function (md) {
          var processed = preprocessObsidian(md, course.folder);
          bodyEl.innerHTML = window.marked.parse(processed);
          renderCallouts();
          buildToc();
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
