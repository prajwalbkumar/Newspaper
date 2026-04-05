// Converts <redact> elements to clickable redacted spans
function processRedactions(root) {
  (root || document).querySelectorAll('redact').forEach(el => {
    const span = document.createElement('span');
    span.className = 'redacted';
    span.textContent = el.textContent;
    span.title = 'Click to reveal';
    span.addEventListener('click', () => span.classList.toggle('shown'));
    el.replaceWith(span);
  });
}

// Run on page load for any redactions in the static HTML
document.addEventListener('DOMContentLoaded', () => processRedactions());
