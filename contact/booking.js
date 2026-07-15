const EMAILJS_SERVICE_ID = 'service_xmfyxyu';
const EMAILJS_TEMPLATE_ID = 'template_4v4mdmg';
const EMAILJS_PUBLIC_KEY = 'uPYHhFFerXMirfZxK';
const GOOGLE_MEET_LINK = 'https://meet.google.com/daj-xcoc-xtj';
const MY_EMAIL = 'mgaurav682@gmail.com';

const STORAGE_KEY = 'gk_bookings_v1';
const fsCache = {};

function loadBookingsLS() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveBookingLS(dk, slot, visitor) { const b = loadBookingsLS(); if (!b[dk]) b[dk] = []; b[dk].push({ slot, visitor, ts: Date.now() }); localStorage.setItem(STORAGE_KEY, JSON.stringify(b)); }
function lsSlotsFor(dk) { const b = loadBookingsLS(); return (b[dk] || []).map(e => e.slot); }

async function prefetchMonth(year, month) {
  const mk = year + '-' + String(month + 1).padStart(2, '0');
  if (fsCache[mk] !== undefined) return;
  fsCache[mk] = {};
  if (!window._GK) return;
  const { db, doc, getDoc } = window._GK;
  const today = new Date(); today.setHours(0,0,0,0);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const keys = [], promises = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    if (dt.getDay() === 0 || dt.getDay() === 6 || dt < today) continue;
    const dk = mk + '-' + String(d).padStart(2, '0'); keys.push(dk); promises.push(getDoc(doc(db, 'bookings', dk)));
  }
  try {
    const snaps = await Promise.all(promises);
    snaps.forEach((snap, i) => { fsCache[mk][keys[i]] = snap.exists() ? [...new Set([...(snap.data().slots||[]), ...(snap.data().gcal_slots||[])])] : []; });
  } catch(e) { console.warn('[Firebase] prefetch failed', e); }
}

function bookedSlotsFor(dk) { const mk = dk.substring(0,7); return [...new Set([...((fsCache[mk]||{})[dk]||[]), ...lsSlotsFor(dk)])]; }

async function saveBookingFS(dk, slot, email) {
  if (!window._GK) return;
  const { db, doc, setDoc, arrayUnion } = window._GK;
  try {
    await setDoc(doc(db,'bookings',dk), { slots: arrayUnion(slot), bookers: arrayUnion(email) }, { merge: true });
    const mk = dk.substring(0,7); if (!fsCache[mk]) fsCache[mk] = {}; if (!fsCache[mk][dk]) fsCache[mk][dk] = []; if (!fsCache[mk][dk].includes(slot)) fsCache[mk][dk].push(slot);
  } catch(e) { console.warn('[Firebase] Write failed', e); }
}

async function hasBookedThisMonth(email) {
  if (!window._GK) return false;
  const { db, doc, getDoc } = window._GK;
  const now = new Date(); const months = [[now.getFullYear(), now.getMonth()]];
  const nm = now.getMonth() === 11 ? 0 : now.getMonth() + 1; const ny = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(); months.push([ny, nm]);
  const promises = [];
  for (const [y, m] of months) { const days = new Date(y, m+1, 0).getDate(); for (let d = 1; d <= days; d++) promises.push(getDoc(doc(db,'bookings', y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0')))); }
  try { const snaps = await Promise.all(promises); for (const snap of snaps) { if (snap.exists() && (snap.data().bookers||[]).includes(email)) return true; } } catch(e) {}
  return false;
}

const TIME_SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let calYear, calMonth;
const _now0 = new Date(); const CAL_MIN_Y = _now0.getFullYear(), CAL_MIN_M = _now0.getMonth();
const CAL_MAX_Y = CAL_MIN_M === 11 ? CAL_MIN_Y+1 : CAL_MIN_Y; const CAL_MAX_M = CAL_MIN_M === 11 ? 0 : CAL_MIN_M+1;

function updateNavBtns() {
  const atMin = calYear===CAL_MIN_Y && calMonth===CAL_MIN_M, atMax = calYear===CAL_MAX_Y && calMonth===CAL_MAX_M;
  const prev = document.getElementById('cal-prev'), next = document.getElementById('cal-next');
  prev.disabled = atMin; prev.style.opacity = atMin ? '0.3' : ''; next.disabled = atMax; next.style.opacity = atMax ? '0.3' : '';
}

async function initCalendar() {
  const now = new Date(); calYear = now.getFullYear(); calMonth = now.getMonth();
  await renderCalendar(); updateNavBtns();
  document.getElementById('cal-prev').addEventListener('click', async () => { if (calYear===CAL_MIN_Y && calMonth===CAL_MIN_M) return; calMonth--; if (calMonth<0) { calMonth=11; calYear--; } await renderCalendar(); updateNavBtns(); });
  document.getElementById('cal-next').addEventListener('click', async () => { if (calYear===CAL_MAX_Y && calMonth===CAL_MAX_M) return; calMonth++; if (calMonth>11) { calMonth=0; calYear++; } await renderCalendar(); updateNavBtns(); });
}

async function renderCalendar() {
  const grid = document.getElementById('cal-grid');
  while (grid.children.length > 7) grid.removeChild(grid.lastChild);
  document.getElementById('cal-month-label').textContent = MONTHS[calMonth] + ' ' + calYear;
  const shimmer = document.createElement('div'); shimmer.style.cssText = 'grid-column:1/-1;text-align:center;padding:1.5rem;font-size:11px;color:var(--text-faint);font-family:var(--font-mono);'; shimmer.textContent = '// loading availability…'; grid.appendChild(shimmer);
  await prefetchMonth(calYear, calMonth);
  while (grid.children.length > 7) grid.removeChild(grid.lastChild);
  const today = new Date(); today.setHours(0,0,0,0);
  const firstDay = new Date(calYear, calMonth, 1); let startOffset = firstDay.getDay(); startOffset = startOffset === 0 ? 6 : startOffset - 1;
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  for (let i = 0; i < startOffset; i++) { const el = document.createElement('div'); el.className = 'cal-cell empty'; grid.appendChild(el); }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calYear, calMonth, d); const dow = date.getDay();
    const isPast = date < today, isToday = date.getTime()===today.getTime(), isWeekend = dow===0||dow===6;
    const dk = calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const bookedSlots = bookedSlotsFor(dk); const fullyBooked = bookedSlots.length >= TIME_SLOTS.length;
    const el = document.createElement('div'); el.textContent = d;
    if (isWeekend || isPast) { el.className = 'cal-cell '+(isToday?'today':(isWeekend?'weekend':'past')); }
    else if (fullyBooked) { el.className='cal-cell booked'; const dot=document.createElement('div'); dot.className='booked-dot'; el.appendChild(dot); }
    else { el.className='cal-cell available'+(isToday?' today':''); if (bookedSlots.length>0) { const dot=document.createElement('div'); dot.className='booked-dot'; el.appendChild(dot); } el.addEventListener('click', () => openModal(date, dk)); }
    grid.appendChild(el);
  }
}

let selectedSlot=null, currentDateKey=null, currentDate=null;

function openModal(date, dk) {
  currentDate=date; currentDateKey=dk; selectedSlot=null;
  document.getElementById('modal-date-display').textContent = date.toLocaleDateString('en-DE',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('modal-form-view').style.display='block'; document.getElementById('modal-success-view').classList.remove('show');
  ['book-name','book-email','book-msg'].forEach(id => { document.getElementById(id).value=''; document.getElementById(id).classList.remove('error'); });
  document.getElementById('err-name').classList.remove('show'); document.getElementById('err-email').classList.remove('show'); document.getElementById('slot-required-msg').classList.remove('show');
  buildSlots(dk); document.getElementById('modal-backdrop').classList.add('open'); document.body.style.overflow='hidden';
}

function buildSlots(dk) {
  const booked = bookedSlotsFor(dk); const grid = document.getElementById('slots-grid'); grid.innerHTML='';
  TIME_SLOTS.forEach(t => {
    const btn = document.createElement('button'); btn.className='slot-btn';
    btn.textContent = t + ' – ' + String(Number(t.split(':')[0])+1).padStart(2,'0') + ':00';
    if (booked.includes(t)) { btn.disabled=true; } else { btn.addEventListener('click', () => { document.querySelectorAll('.slot-btn').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); selectedSlot=t; document.getElementById('slot-required-msg').classList.remove('show'); }); }
    grid.appendChild(btn);
  });
}

function closeModal() { document.getElementById('modal-backdrop').classList.remove('open'); document.body.style.overflow=''; }
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', e => { if (e.target===document.getElementById('modal-backdrop')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });

document.getElementById('btn-book-submit').addEventListener('click', async () => {
  let valid = true;
  if (!selectedSlot) { document.getElementById('slot-required-msg').classList.add('show'); valid=false; }
  const nameEl=document.getElementById('book-name'), emailEl=document.getElementById('book-email');
  const name=nameEl.value.trim(), email=emailEl.value.trim();
  if (!name) { nameEl.classList.add('error'); document.getElementById('err-name').classList.add('show'); valid=false; } else { nameEl.classList.remove('error'); document.getElementById('err-name').classList.remove('show'); }
  const emailOk = email && /^[^@]+@[^@]+\.[^@]+$/.test(email);
  if (!emailOk) { emailEl.classList.add('error'); document.getElementById('err-email').classList.add('show'); valid=false; } else { emailEl.classList.remove('error'); document.getElementById('err-email').classList.remove('show'); }
  if (!valid) return;
  const btn = document.getElementById('btn-book-submit'); btn.disabled=true; btn.textContent='Checking…';
  const alreadyBooked = await hasBookedThisMonth(email);
  if (alreadyBooked) { btn.disabled=false; btn.textContent='📅 Book Appointment'; emailEl.classList.add('error'); document.getElementById('err-email').textContent='This email already has a booking. Only one per person is allowed.'; document.getElementById('err-email').classList.add('show'); return; }
  btn.textContent='Sending…';
  const msg=document.getElementById('book-msg').value.trim();
  const dateStr=currentDate.toLocaleDateString('en-DE',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const endHour=String(Number(selectedSlot.split(':')[0])+1).padStart(2,'0')+':00'; const timeStr=selectedSlot+' – '+endHour+' CET';
  saveBookingLS(currentDateKey, selectedSlot, {name,email});
  await saveBookingFS(currentDateKey, selectedSlot, email);
  let emailsOk=false; emailjs.init({publicKey: EMAILJS_PUBLIC_KEY});
  try { await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { visitor_name:name, visitor_email:email, message:msg||'(no message)', date:dateStr, time:timeStr, meet_link:GOOGLE_MEET_LINK, my_email:MY_EMAIL, to_email:email, to_name:name, cc_email:MY_EMAIL, subject:'Your appointment with Gaurav Kumar Mishra is confirmed!' }); emailsOk=true; } catch(err) { console.error('[EmailJS] Send failed:', err); }
  const [sh] = selectedSlot.split(':').map(Number);
  const startDT=new Date(currentDate); startDT.setHours(sh,0,0,0); const endDT=new Date(startDT.getTime()+60*60*1000);
  const fmt = d => d.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const gcalUrl='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Meeting with Gaurav Kumar Mishra')+'&dates='+fmt(startDT)+'/'+fmt(endDT)+'&details='+encodeURIComponent('Google Meet: '+GOOGLE_MEET_LINK+(msg?'\n\nNote: '+msg:''))+'&location='+encodeURIComponent(GOOGLE_MEET_LINK);
  const emailMsg = emailsOk ? '<br><br>Confirmation emails sent.' : '<br><br><span style="color:#b45309;">⚠ Email may have failed — your slot is reserved.</span>';
  document.getElementById('gcal-link').href=gcalUrl;
  document.getElementById('success-desc').innerHTML='<strong>'+name+'</strong>, your appointment on <strong>'+dateStr+'</strong> at <strong>'+timeStr+'</strong> is confirmed!'+emailMsg+'<br><br>Google Meet: <a href="'+GOOGLE_MEET_LINK+'" target="_blank" style="color:var(--accent);">'+GOOGLE_MEET_LINK+'</a>';
  document.getElementById('modal-form-view').style.display='none'; document.getElementById('modal-success-view').classList.add('show');
  renderCalendar(); btn.disabled=false; btn.textContent='📅 Book Appointment';
});

let _calInited=false;
function _startCalendar() { if (_calInited) return; _calInited=true; initCalendar(); }
document.addEventListener('gk-firebase-ready', _startCalendar);
setTimeout(_startCalendar, 4000);
