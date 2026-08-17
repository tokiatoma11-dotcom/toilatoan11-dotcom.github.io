// ============================================================
// Minh Khang Technology — script.js
// ============================================================

// Tìm kiếm bài viết theo tiêu đề
function searchItems() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        var title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Dừng video khác khi rê chuột sang video mới (desktop)
document.addEventListener('DOMContentLoaded', function () {
    const iframes = document.querySelectorAll('.video-box iframe');
    iframes.forEach(function (iframe) {
        iframe.addEventListener('mouseenter', function () {
            iframes.forEach(function (other) {
                if (other !== iframe) {
                    other.src = other.src;
                }
            });
        });
    });
});

// Phát hiện máy cấu hình yếu (ít lõi CPU / ít RAM / mạng chậm)
// để tự động tắt bớt hiệu ứng kính nặng, ưu tiên mượt hơn đẹp
(function () {
    var cores = navigator.hardwareConcurrency || 4;
    var mem = navigator.deviceMemory || 4;
    var slowNet = navigator.connection &&
        (navigator.connection.saveData ||
         /2g/.test(navigator.connection.effectiveType || ''));
    if (cores <= 4 || mem <= 4 || slowNet) {
        document.body.classList.add('low-end');
    }
})();

// Cập nhật vị trí đốm sáng (glow) trên mặt kính theo ngón tay / chuột
// Dùng requestAnimationFrame để gộp các sự kiện, tránh giật lag khi kéo/chạm liên tục
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let ticking = false;
    let pending = null;

    function applyGlow() {
        if (pending) {
            const { card, x, y } = pending;
            card.style.setProperty('--x', x + '%');
            card.style.setProperty('--y', y + '%');
        }
        ticking = false;
    }

    function queueGlow(card, clientX, clientY) {
        const rect = card.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        pending = { card, x, y };
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(applyGlow);
        }
    }

    cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            queueGlow(card, e.clientX, e.clientY);
        }, { passive: true });
        card.addEventListener('touchstart', function (e) {
            const t = e.touches[0];
            queueGlow(card, t.clientX, t.clientY);
            card.classList.add('touching');
        }, { passive: true });
        card.addEventListener('touchmove', function (e) {
            const t = e.touches[0];
            queueGlow(card, t.clientX, t.clientY);
        }, { passive: true });
        card.addEventListener('touchend', function () {
            setTimeout(function () { card.classList.remove('touching'); }, 200);
        });
    });
});
