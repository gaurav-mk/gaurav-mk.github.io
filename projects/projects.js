(function () {
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
      var visible = Object.keys(projects)
        .map(function (folder) {
          var p = projects[folder];
          p.folder = folder;
          return p;
        })
        .filter(function (p) { return p.visible !== false; });
      var grid = document.getElementById('proj-cards');
      grid.innerHTML = visible.map(window.ProjCard.render).join('');
      wireFilters();
    })
    .catch(function (err) {
      document.getElementById('proj-cards').innerHTML =
        '<p style="color:var(--danger);font:400 12.5px var(--font-mono);">Could not load projects.json (' + err + ')</p>';
    });
})();
