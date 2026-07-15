(function () {
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
})();
