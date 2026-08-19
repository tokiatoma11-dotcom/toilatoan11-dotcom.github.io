// Search / filter on video.html
function searchItems() {
  var input = document.getElementById('searchInput');
  if (!input) return;
  var value = input.value.toLowerCase().trim();
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    var title = card.getAttribute('data-title').toLowerCase();
    card.classList.toggle('hidden', value !== '' && !title.includes(value));
  });
}

// Counter animation for stats (index.html)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.stat-item .num').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    var current = 0;
    var step = Math.max(1, Math.ceil(target / 40));
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
  });

  // Chart bar animation
  var chartBlock = document.querySelector('.chart-block');
  if (chartBlock) {
    var chartObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.chart-bar').forEach(function (bar) {
            bar.style.height = bar.getAttribute('data-h') + '%';
          });
          chartObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    chartObserver.observe(chartBlock);
  }

  // Pause other videos when hovering one (video.html)
  var iframes = document.querySelectorAll('.video-box iframe');
  var lastHovered = null;
  iframes.forEach(function (iframe) {
    iframe.addEventListener('mouseenter', function () {
      if (lastHovered && lastHovered !== iframe) { lastHovered.src = lastHovered.src; }
      lastHovered = iframe;
    });
  });
});