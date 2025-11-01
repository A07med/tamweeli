// تفاعلات بسيطة للشعار وروابط الصفحة

function lerp(a, b, t) { return a + (b - a) * t; }

window.initLogoInteraction = function(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  let tx = 0, ty = 0, rx = 0, ry = 0;
  const update = () => {
    rx = lerp(rx, ty * 8, 0.12);
    ry = lerp(ry, -tx * 8, 0.12);
    el.style.transform = `translateY(-2px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    requestAnimationFrame(update);
  };
  update();

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / rect.width;
    const y = (e.clientY - cy) / rect.height;
    tx = Math.max(-0.5, Math.min(0.5, x));
    ty = Math.max(-0.5, Math.min(0.5, y));
  };

  window.addEventListener('mousemove', onMove);

  // وميض بسيط عند المرور
  el.addEventListener('mouseenter', () => {
    el.style.filter = 'drop-shadow(0 10px 24px rgba(123,192,144,.45))';
  });
  el.addEventListener('mouseleave', () => {
    el.style.filter = 'drop-shadow(0 6px 18px rgba(87,163,108,.25))';
  });
};

// تمييز الرابط النشط في الشريط العلوي
(function markActiveNav(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').toLowerCase() === path) a.classList.add('active');
  });
})();


