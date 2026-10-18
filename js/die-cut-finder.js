/**
 * GÓI Packaging - Interactive Die-Cut Size Finder & Vector Dieline Generator
 * Features:
 * - Dynamic SVG dieline drawing (Cut lines vs Crease lines)
 * - Real-time warehouse die matching from 400+ presets
 * - Animated Eased Count-Up savings calculation
 * - Dynamic Zalo consultation link generation with dimensions
 */

(function () {
  "use strict";

  const WAREHOUSE_DIES = [
    {
      id: "KB-2216-AD",
      type: "Hộp Âm Dương Nắp Chụp Thời Trang",
      category: "fashion",
      l: 22.0,
      w: 16.0,
      h: 6.5,
      paper: "Carton lạnh 2.0mm bồi C150",
      saving: 1800000,
      leadTime: "Nhanh hơn 2 ngày",
      note: "Có sẵn cữ bế mút EVA nhung, nắp chụp khít 100% không xô lệch."
    },
    {
      id: "KB-1812-NC",
      type: "Hộp Nam Châm Nắp Gập Mỹ Phẩm",
      category: "cosmetics",
      l: 18.0,
      w: 12.0,
      h: 5.0,
      paper: "Carton lạnh 2.0mm bồi Mỹ Thuật Đen",
      saving: 2200000,
      leadTime: "Nhanh hơn 3 ngày",
      note: "Đã tích hợp 2 viên nam châm N52 âm trong bìa, hít êm ái."
    },
    {
      id: "KB-1510-NH",
      type: "Hộp Rút Nước Hoa & Nến Thơm",
      category: "perfume",
      l: 15.0,
      w: 10.0,
      h: 5.5,
      paper: "Ivory 350gsm cán màng mờ",
      saving: 1500000,
      leadTime: "Nhanh hơn 2 ngày",
      note: "Có sẵn cữ xỏ quai ruy băng lụa kéo êm tay."
    },
    {
      id: "KB-3022-QT",
      type: "Hộp Quà Tết & Yến Sào Hoàng Gia",
      category: "gift",
      l: 30.0,
      w: 22.0,
      h: 9.0,
      paper: "Carton lạnh 2.5mm bồi Couche cán cát",
      saving: 3500000,
      leadTime: "Nhanh hơn 3 ngày",
      note: "Khuôn chịu lực tải 5kg, có sẵn khay 6 hũ yến hoặc 2 chai rượu."
    }
  ];

  function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  }

  function animateCount(el, start, end, duration) {
    if (!el) return;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);

      el.textContent = "TIẾT KIỆM " + formatMoney(current) + " TIỀN DAO";

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Draw clean vector SVG dieline based on L, W, H
  function renderSvgDieline(svgEl, l, w, h) {
    if (!svgEl) return;
    const svgWidth = 500;
    const svgHeight = 280;

    // Scale dimensions to fit inside SVG
    const totalBoxL = (l + 2 * h) || 30;
    const totalBoxW = (w + 2 * h) || 24;
    const scale = Math.min((svgWidth - 60) / totalBoxL, (svgHeight - 60) / totalBoxW);

    const sL = l * scale;
    const sW = w * scale;
    const sH = h * scale;

    const startX = (svgWidth - (sL + 2 * sH)) / 2;
    const startY = (svgHeight - (sW + 2 * sH)) / 2;

    // Build SVG paths
    // Outer cut lines (solid #17181C)
    // Inner fold lines (dashed red #D7262B)
    const cutPath = `
      M ${startX} ${startY + sH}
      H ${startX + sH}
      V ${startY}
      H ${startX + sH + sL}
      V ${startY + sH}
      H ${startX + 2 * sH + sL}
      V ${startY + sH + sW}
      H ${startX + sH + sL}
      V ${startY + 2 * sH + sW}
      H ${startX + sH}
      V ${startY + sH + sW}
      H ${startX}
      Z
    `;

    const foldPath = `
      M ${startX + sH} ${startY + sH}
      H ${startX + sH + sL}
      V ${startY + sH + sW}
      H ${startX + sH}
      Z
    `;

    svgEl.innerHTML = `
      <g>
        <!-- Background grid subtle -->
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0EBE3" stroke-width="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" rx="8" />

        <!-- Box Flaps Cut Lines -->
        <path d="${cutPath}" fill="#FAF8F5" stroke="#17181C" stroke-width="1.8" stroke-linejoin="round" />

        <!-- Inner Creasing / Fold Lines (Dashed Red) -->
        <path d="${foldPath}" fill="#FFFFFF" stroke="#D7262B" stroke-width="1.5" stroke-dasharray="4,3" stroke-linejoin="round" />

        <!-- Dimension Labels -->
        <text x="${startX + sH + sL / 2}" y="${startY + sH + sW / 2 + 5}" font-family="Inter" font-size="12" font-weight="bold" fill="#17181C" text-anchor="middle">
          ${l} × ${w} × ${h} cm
        </text>
        <text x="${startX + sH + sL / 2}" y="${startY + sH - 8}" font-family="Inter" font-size="10" fill="#8C827A" text-anchor="middle">
          Dài (L): ${l}cm
        </text>
        <text x="${startX + sH - 8}" y="${startY + sH + sW / 2}" font-family="Inter" font-size="10" fill="#8C827A" text-anchor="end" dominant-baseline="middle">
          Rộng (W): ${w}cm
        </text>
        <text x="${startX + sH + sL + sH / 2}" y="${startY + sH + sW / 2 + 5}" font-family="Inter" font-size="10" fill="#D7262B" text-anchor="middle">
          Cao: ${h}cm
        </text>
      </g>
    `;
  }

  function initDieCutFinder() {
    const root = document.querySelector("[data-diecut-finder]");
    if (!root) return;

    const inputL = root.querySelector("[data-dim-l]");
    const inputW = root.querySelector("[data-dim-w]");
    const inputH = root.querySelector("[data-dim-h]");
    const categoryBtns = root.querySelectorAll("[data-cat-filter]");

    const matchBadge = root.querySelector("[data-match-badge]");
    const matchDieId = root.querySelector("[data-match-id]");
    const matchTitle = root.querySelector("[data-match-title]");
    const matchPhuBi = root.querySelector("[data-match-phubi]");
    const matchLotLong = root.querySelector("[data-match-lotlong]");
    const matchPaper = root.querySelector("[data-match-paper]");
    const matchLead = root.querySelector("[data-match-lead]");
    const matchNote = root.querySelector("[data-match-note]");
    const matchZaloBtn = root.querySelector("[data-match-zalo]");
    const svgDieline = root.querySelector("[data-dieline-svg]");

    let lastSaving = 0;

    function findClosestDie(l, w, h, cat) {
      let candidate = WAREHOUSE_DIES[0];
      let minDiff = Infinity;

      for (const die of WAREHOUSE_DIES) {
        if (cat && cat !== "all" && die.category !== cat) continue;

        const diff = Math.abs(die.l - l) + Math.abs(die.w - w) + Math.abs(die.h - h);
        if (diff < minDiff) {
          minDiff = diff;
          candidate = die;
        }
      }
      return candidate;
    }

    function updateFinder() {
      const l = parseFloat(inputL ? inputL.value : "22.0") || 22.0;
      const w = parseFloat(inputW ? inputW.value : "16.0") || 16.0;
      const h = parseFloat(inputH ? inputH.value : "6.5") || 6.5;

      const activeCatBtn = root.querySelector("[data-cat-filter].is-active");
      const cat = activeCatBtn ? activeCatBtn.dataset.catFilter : "all";

      const die = findClosestDie(l, w, h, cat);

      if (matchDieId) matchDieId.textContent = "MÃ KHUÔN SẴN: #" + die.id + " / KHO Q12";
      if (matchTitle) matchTitle.textContent = die.type;
      if (matchPhuBi) matchPhuBi.textContent = `${die.l.toFixed(1)} × ${die.w.toFixed(1)} × ${die.h.toFixed(1)} cm`;
      if (matchLotLong) matchLotLong.textContent = `${(die.l - 0.4).toFixed(1)} × ${(die.w - 0.4).toFixed(1)} × ${(die.h - 0.3).toFixed(1)} cm`;
      if (matchPaper) matchPaper.textContent = die.paper;
      if (matchLead) matchLead.textContent = die.leadTime;
      if (matchNote) matchNote.textContent = "Ghi chú: " + die.note;

      // Animate savings count
      if (matchBadge && lastSaving !== die.saving) {
        animateCount(matchBadge, lastSaving || 1000000, die.saving, 600);
        lastSaving = die.saving;
      }

      // Update Zalo CTA link with pre-filled parameters
      if (matchZaloBtn) {
        const msg = `GÓI ơi, mình tra cứu kích cỡ ${l}x${w}x${h}cm thấy mã khuôn #${die.id}. Xưởng tư vấn giúp mình làm mẫu nhé!`;
        const baseZalo = matchZaloBtn.dataset.zaloBase || "https://zalo.me/0909000000";
        matchZaloBtn.href = `${baseZalo}?text=${encodeURIComponent(msg)}`;
        matchZaloBtn.setAttribute("data-zalo", msg);
      }

      // Render vector SVG
      renderSvgDieline(svgDieline, l, w, h);
    }

    // Input listeners
    [inputL, inputW, inputH].forEach((inp) => {
      if (inp) {
        inp.addEventListener("input", updateFinder);
        inp.addEventListener("change", updateFinder);
      }
    });

    // Category button listeners
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        // Preset sizes
        const cat = btn.dataset.catFilter;
        if (cat === "cosmetics") {
          if (inputL) inputL.value = "18.0";
          if (inputW) inputW.value = "12.0";
          if (inputH) inputH.value = "5.0";
        } else if (cat === "fashion") {
          if (inputL) inputL.value = "22.0";
          if (inputW) inputW.value = "16.0";
          if (inputH) inputH.value = "6.5";
        } else if (cat === "perfume") {
          if (inputL) inputL.value = "15.0";
          if (inputW) inputW.value = "10.0";
          if (inputH) inputH.value = "5.5";
        } else if (cat === "gift") {
          if (inputL) inputL.value = "30.0";
          if (inputW) inputW.value = "22.0";
          if (inputH) inputH.value = "9.0";
        }
        updateFinder();
      });
    });

    // Initial render
    updateFinder();
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDieCutFinder);
  } else {
    initDieCutFinder();
  }
})();
