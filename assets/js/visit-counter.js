// Visitor counter in the footer bar (#visit-count, see _includes/footer.html).
// Talks to Firestore's REST API directly instead of loading the Firebase SDK
// on every page: one commit atomically bumps stats/site — `views` on every
// page load, `visitors` only on a browser's first visit (remembered in
// localStorage) — and returns the new totals. Localhost only reads, so
// `jekyll serve` doesn't inflate the numbers. The doc is guarded by a
// stats/site rule in the Firebase console that only allows +1 bumps; if the
// request fails for any reason the counter just stays hidden.
(function () {
  var el = document.getElementById('visit-count');
  if (!el) return;

  var API_KEY = 'AIzaSyCv4ttjCV0EZZ8j5-ZpljTF03ephWFISIQ';
  var DB = 'projects/gaurav-mk/databases/(default)/documents';
  var DOC = DB + '/stats/site';
  var BASE = 'https://firestore.googleapis.com/v1/';
  var SEEN_KEY = 'gk_visited_v1';

  var isNew = false;
  try { isNew = !localStorage.getItem(SEEN_KEY); } catch (e) {}

  function show(n) {
    if (n == null || isNaN(n)) return;
    el.textContent = 'VISITORS ' + Number(n).toLocaleString('en-US', { minimumIntegerDigits: 6 }) + ' · ';
    el.hidden = false;
  }

  function json(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    fetch(BASE + DOC + '?key=' + API_KEY)
      .then(json)
      .then(function (d) { show(d.fields && d.fields.visitors && d.fields.visitors.integerValue); })
      .catch(function () {});
    return;
  }

  fetch(BASE + DB + ':commit?key=' + API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      writes: [{
        update: { name: DOC, fields: {} },
        updateMask: { fieldPaths: [] },
        updateTransforms: [
          { fieldPath: 'visitors', increment: { integerValue: isNew ? '1' : '0' } },
          { fieldPath: 'views', increment: { integerValue: '1' } }
        ]
      }]
    })
  })
    .then(json)
    .then(function (d) {
      if (isNew) { try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) {} }
      show(d.writeResults[0].transformResults[0].integerValue);
    })
    .catch(function () {});
})();
