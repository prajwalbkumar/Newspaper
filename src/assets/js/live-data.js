const WMO_MAP = {
  0:  ['Clear','☀️'],        1: ['Mostly clear','🌤️'],
  2:  ['Partly cloudy','⛅'], 3: ['Overcast','☁️'],
  45: ['Foggy','🌫️'],        51: ['Drizzle','🌦️'],
  61: ['Rain','🌧️'],         71: ['Light snow','🌨️'],
  80: ['Showers','🌦️'],      95: ['Thunderstorm','⛈️']
};

async function fetchWeather() {
  const { lat, lon, cacheTTL } = window.SITE_CONFIG.weather;
  const KEY = 'irregular_weather';
  try {
    const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cached && Date.now() - cached.ts < cacheTTL) return cached.data;
  } catch (_) {}
  const tz = encodeURIComponent(window.SITE_CONFIG.location.timezone);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,apparent_temperature&timezone=${tz}&forecast_days=1`;
  const json = await (await fetch(url)).json();
  const data = { temp: Math.round(json.current.temperature_2m), code: json.current.weathercode };
  try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data })); } catch (_) {}
  return data;
}

async function initWeather() {
  if (!window.SITE_CONFIG.weather.enabled) return;
  try {
    const w = await fetchWeather();
    const [label, icon] = WMO_MAP[w.code] || ['—', ''];
    const el = document.getElementById('weather-display');
    if (el) el.textContent = `${window.SITE_CONFIG.location.city} ${w.temp}°C · ${label} ${icon}`;
  } catch (_) {}
}

async function fetchGitHubStats() {
  const { username, showStats, cacheTTL } = window.SITE_CONFIG.github;
  if (!showStats) return null;
  const KEY = `irregular_gh_${username}`;
  try {
    const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cached && Date.now() - cached.ts < (cacheTTL || 3600000)) return cached.data;
  } catch (_) {}
  const [user, events] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`).then(r => r.json())
  ]);
  const thirtyAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const commits30d = Array.isArray(events)
    ? events
        .filter(e => e.type === 'PushEvent' && new Date(e.created_at).getTime() > thirtyAgo)
        .reduce((n, e) => n + (e.payload?.commits?.length || 0), 0)
    : 0;
  const data = { publicRepos: user.public_repos, followers: user.followers, commits30d };
  try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data })); } catch (_) {}
  return data;
}

async function initGitHubStats() {
  try {
    const g = await fetchGitHubStats();
    const el = document.getElementById('gh-stats');
    if (el && g) el.textContent = `${g.publicRepos} repos · ${g.commits30d} commits (30d) · ${g.followers} followers`;
  } catch (_) {}
}

document.addEventListener('DOMContentLoaded', () => {
  initWeather();
  initGitHubStats();
});
