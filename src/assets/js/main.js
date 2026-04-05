// ─── Post data island ─────────────────────────────────────────
let postsData = [];
let postsMap  = {};
let postOrder = [];

function loadPostsData() {
  const el = document.getElementById('posts-data');
  if (!el) return;
  try {
    postsData = JSON.parse(el.textContent);
    postsMap  = Object.fromEntries(postsData.map(p => [p.id, p]));
    postOrder = postsData.map(p => p.id);
  } catch (e) {
    console.warn('Could not parse posts data', e);
  }
}

// ─── Popup ────────────────────────────────────────────────────
let currentPostId = null;

function openStory(id) {
  const post = postsMap[id];
  if (!post) return;
  currentPostId = id;

  // Update URL for SEO / sharing
  history.pushState({ postId: id }, post.title, `/posts/${id}/`);

  // Inner masthead label
  const secEl = document.getElementById('pp-section-date');
  if (secEl) {
    const parts = [post.section ? post.section.charAt(0).toUpperCase() + post.section.slice(1) : '', post.date].filter(Boolean);
    secEl.textContent = parts.join(' · ');
  }

  // Photo
  const photoWrap = document.getElementById('pp-photo-wrap');
  if (photoWrap) {
    photoWrap.innerHTML = post.photo
      ? `<img class="pp-photo" src="${post.photo}" alt="${escapeHtml(post.title)}" onerror="this.parentElement.innerHTML=''">`
      : '';
  }

  // Body
  const secLabel = post.section ? `<div class="pp-sec">${escapeHtml(post.section.toUpperCase())}</div>` : '';
  const deck     = post.deck    ? `<div class="pp-deck">${escapeHtml(post.deck)}</div>` : '';
  const byline   = post.byline  ? `<div class="pp-byline">${escapeHtml(post.byline)}</div>` : '';

  document.getElementById('pp-bd').innerHTML =
    secLabel +
    `<div class="pp-hed">${escapeHtml(post.title)}</div>` +
    `<div class="pp-rule"><div class="lr-thick"></div><div class="lr-dot"></div><div class="lr-thin"></div></div>` +
    deck + byline +
    `<div class="pp-cols">${post.body}</div>`;

  // Process redactions in popup content
  if (typeof processRedactions === 'function') {
    processRedactions(document.getElementById('pp-bd'));
  }

  // Prev / Next
  const idx    = postOrder.indexOf(id);
  const prevId = idx > 0                    ? postOrder[idx - 1] : null;
  const nextId = idx < postOrder.length - 1 ? postOrder[idx + 1] : null;
  const prevPost = prevId ? postsMap[prevId] : null;
  const nextPost = nextId ? postsMap[nextId] : null;

  const ppPrev = document.getElementById('pp-prev');
  const ppNext = document.getElementById('pp-next');
  if (ppPrev) { ppPrev.disabled = !prevPost; document.getElementById('pp-prev-title').textContent = prevPost ? prevPost.title : ''; }
  if (ppNext) { ppNext.disabled = !nextPost; document.getElementById('pp-next-title').textContent = nextPost ? nextPost.title : ''; }

  // Related
  const tags       = Array.isArray(post.tags) ? post.tags : [];
  const primaryTag = tags[0];
  const related    = primaryTag
    ? postOrder.filter(sid => {
        if (sid === id) return false;
        const s = postsMap[sid];
        return s && Array.isArray(s.tags) && s.tags.includes(primaryTag);
      }).slice(0, 3)
    : [];

  const relDiv  = document.getElementById('pp-related');
  const relGrid = document.getElementById('pp-related-grid');
  if (relDiv && relGrid) {
    if (related.length > 0) {
      relGrid.innerHTML = related.map(sid => {
        const s = postsMap[sid];
        return `<div class="pp-related-item" onclick="openStory('${sid}')">
          <div class="pp-related-tag">${escapeHtml(s.section || '')}</div>
          <div class="pp-related-hed">${escapeHtml(s.title)}</div>
        </div>`;
      }).join('');
      relDiv.style.display = '';
    } else {
      relDiv.style.display = 'none';
    }
  }

  const back = document.getElementById('popup-back');
  back.scrollTop = 0;
  back.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function navStory(dir) {
  const idx   = postOrder.indexOf(currentPostId);
  const newId = postOrder[idx + dir];
  if (newId) openStory(newId);
}

function closePopup(e) {
  if (e && e.target !== document.getElementById('popup-back')) return;
  document.getElementById('popup-back').classList.remove('open');
  if (!folded) document.body.style.overflow = '';
  currentPostId = null;
  // Restore URL to home
  history.pushState({}, document.title, '/');
}

function openFromArchive(id) { openStory(id); }

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Archive fold ─────────────────────────────────────────────
let folded = false;
function toggleFold() {
  folded = !folded;
  document.body.classList.toggle('folded', folded);
  const btn = document.getElementById('fold-btn');
  if (btn) { btn.textContent = folded ? '← Paper' : '◫\u00a0Archive'; btn.classList.toggle('on', folded); }
  document.body.style.overflow = folded ? 'hidden' : '';
}

function syncArchiveTop() {
  const arc = document.getElementById('archive');
  const mh  = document.getElementById('masthead');
  if (arc && mh) arc.style.paddingTop = (mh.offsetHeight + 32) + 'px';
}

// ─── Dark mode ────────────────────────────────────────────────
let dark = localStorage.getItem('dark') === '1';
function applyDark() {
  document.body.classList.toggle('dark', dark);
  const btn = document.getElementById('dark-btn');
  if (btn) btn.classList.toggle('on', dark);
}

// ─── Edition tint + live date/time ───────────────────────────
function setEdition() {
  const h = new Date().getHours();
  const [cls, name] =
    h < 6  ? ['ed-final',     'Late Night Edition']  :
    h < 12 ? ['ed-morning',   'Morning Edition']     :
    h < 17 ? ['ed-afternoon', 'Afternoon Edition']   :
    h < 22 ? ['ed-evening',   'Evening Edition']     :
             ['ed-final',     'Final Edition'];
  document.body.classList.add(cls);
  const strip = document.getElementById('ed-strip');
  if (strip) {
    const dateStr = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
    strip.textContent = `${name} · ${dateStr} · ${strip.textContent.split('·').pop().trim()}`;
  }
}

function updateDate() {
  const el = document.getElementById('live-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

function updateTimes() {
  const fmt = tz => new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour:'2-digit', minute:'2-digit', hour12: false });
  const dubaiEl = document.getElementById('dubai-time');
  const yourEl  = document.getElementById('your-time');
  if (dubaiEl) dubaiEl.textContent = fmt(window.SITE_CONFIG?.location?.timezone || 'Asia/Dubai');
  if (yourEl)  yourEl.textContent  = fmt(Intl.DateTimeFormat().resolvedOptions().timeZone);
}

// ─── Section filter ───────────────────────────────────────────
function initSectionFilter() {
  const filterBtns = document.querySelectorAll('.si-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const f = btn.dataset.f;
      document.querySelectorAll('.story,.brief,.now').forEach(el => {
        const tags = (el.dataset.tags || '').split(' ');
        el.classList.toggle('dim', f !== 'all' && !tags.includes(f));
      });
      const fp = document.querySelector('.front-page');
      if (fp) fp.classList.toggle('dim', f !== 'all' && !(fp.dataset.tags || '').split(' ').includes(f));
    });
  });
}

// ─── Full-text search ─────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let searchTimeout;
  input.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      // Clear previous marks
      document.querySelectorAll('mark').forEach(m => {
        const p = m.parentNode;
        p.replaceChild(document.createTextNode(m.textContent), m);
        p.normalize();
      });
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      const paper = document.getElementById('paper');
      if (!paper) return;
      const walker = document.createTreeWalker(paper, NodeFilter.SHOW_TEXT);
      const nodes  = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const idx = node.textContent.toLowerCase().indexOf(q);
        if (idx === -1) return;
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + q.length);
        const mark = document.createElement('mark');
        try { range.surroundContents(mark); } catch (_) {}
      });
    }, 180);
  });
}

// ─── Lightbox ─────────────────────────────────────────────────
function openLightbox(src, alt) {
  const img = document.getElementById('lightbox-img');
  if (img) { img.src = src; img.alt = alt || ''; }
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// ─── GitHub chart overlay ─────────────────────────────────────
function openGitHubChart() {
  document.getElementById('gh-overlay').classList.add('open');
}
function closeGitHubChart(e) {
  if (e && e.target !== document.getElementById('gh-overlay')) return;
  document.getElementById('gh-overlay').classList.remove('open');
}

// ─── Keyboard shortcuts ───────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('lightbox')?.classList.contains('open')) { closeLightbox(); return; }
  if (document.getElementById('gh-overlay')?.classList.contains('open')) { closeGitHubChart({ target: document.getElementById('gh-overlay') }); return; }
  if (document.getElementById('popup-back')?.classList.contains('open')) { closePopup({ target: document.getElementById('popup-back') }); return; }
  if (folded) toggleFold();
});

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadPostsData();
  applyDark();
  setEdition();
  updateDate();
  updateTimes();
  setInterval(updateTimes, 30000);
  initSectionFilter();
  initSearch();
  syncArchiveTop();

  const foldBtn  = document.getElementById('fold-btn');
  const darkBtn  = document.getElementById('dark-btn');
  const ghStats  = document.getElementById('gh-stats');

  if (foldBtn)  foldBtn.addEventListener('click', toggleFold);
  if (darkBtn)  darkBtn.addEventListener('click', () => { dark = !dark; localStorage.setItem('dark', dark ? '1' : '0'); applyDark(); });
  if (ghStats)  ghStats.addEventListener('click', openGitHubChart);

  window.addEventListener('resize', syncArchiveTop);

  // Handle browser back button closing popup
  window.addEventListener('popstate', e => {
    if (document.getElementById('popup-back')?.classList.contains('open')) {
      document.getElementById('popup-back').classList.remove('open');
      if (!folded) document.body.style.overflow = '';
      currentPostId = null;
    }
  });
});
