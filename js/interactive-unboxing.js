/**
 * GÓI Packaging - Interactive 3D Unboxing Simulator
 * Features:
 * - 3-State Unboxing Stepper (Closed -> Ajar 35° -> Full Burst Reveal)
 * - 3D Perspective Tilt on Mouse Movement with dynamic specular sheen
 * - Interactive Craftsmanship Hotspot Tooltips (N52 Magnet, V-Groove 90°, Velvet EVA Tray)
 * - Tactile sound effects / visual feedback
 */

(function () {
  "use strict";

  const UNBOXING_DATA = {
    step1: {
      stepNum: "01",
      badge: "GIA CÔNG THỦ CÔNG CAO CẤP / TÂN THỚI HIỆP Q12",
      title: "Cảm Giác Đầm Tay Khi Rút Nắp Khỏi Đáy Hộp",
      img: "/img/stage/hero_box_closeup.jpg",
      fallbackImg: "/img/stage/qxs.webp",
      specs: [
        {
          title: "Dung sai khe hở ±0.2mm",
          desc: "Nắp trượt êm 3 giây nhờ lực cản khí tự nhiên, chuẩn boutique."
        },
        {
          title: "Cốt Carton lạnh 2.0mm đanh chắc",
          desc: "Chịu nén 15kg khi vận chuyển xa, đảm bảo hộp quà luôn nguyên vẹn."
        },
        {
          title: "Khay mút EVA bồi nhung tuyết",
          desc: "Bế cữ chuẩn theo dáng sản phẩm, chống trầy xước và rơi tuột."
        }
      ],
      hotspots: [
        {
          x: "12%",
          y: "14%",
          color: "#D7262B",
          label: "Nam châm vĩnh cửu N52 • Lực hít êm ái, khít 100%"
        },
        {
          x: "54%",
          y: "84%",
          color: "#EAB308",
          label: "Soi rãnh V-Groove 90° • Vuông vức, không rạn gân giấy"
        }
      ]
    },
    step2: {
      stepNum: "02",
      badge: "GÓC NGHIÊNG 35° / HÉ LỘ KHAY ĐỊNH HÌNH",
      title: "Góc Mở Hé Lộ Lớp Giấy Can Lót & Khay Nhung",
      img: "/img/stage/atelier_luxury_packaging.jpg",
      fallbackImg: "/img/stage/lx200.webp",
      specs: [
        {
          title: "Bản lề gập giấu chỉ",
          desc: "Gia công mép gập ẩn hoàn toàn vào trong, không lộ mép dán."
        },
        {
          title: "Giấy lót nến can mỏng in chìm",
          desc: "Bảo vệ sản phẩm và gia tăng cảm giác tò mò khi mở hộp."
        },
        {
          title: "Cữ khay bế khuôn chính xác",
          desc: "Ôm khít từng mm thân chai/lọ mà không cần dùng băng keo định vị."
        }
      ],
      hotspots: [
        {
          x: "30%",
          y: "28%",
          color: "#3B82F6",
          label: "Giấy nến can mỏng • In chìm hoa văn nhận diện"
        },
        {
          x: "65%",
          y: "62%",
          color: "#D7262B",
          label: "Khay nhung đen mịn • Ôm khít thân sản phẩm"
        }
      ]
    },
    step3: {
      stepNum: "03",
      badge: "BUNG NẮP HOÀN PHẦN / TRẢI NGHIỆM ĐẬP HỘP WOW",
      title: "Trải Nghiệm Unboxing Tạo Dấu Ấn Thương Hiệu",
      img: "/img/stage/am_duong_detail_open.jpg",
      fallbackImg: "/img/stage/dst01.webp",
      specs: [
        {
          title: "Khay nhung định hình sang trọng",
          desc: "Nâng niu sản phẩm như một món trang sức nghệ thuật cao cấp."
        },
        {
          title: "Tăng 40% tỷ lệ quay video đập hộp",
          desc: "Khách hàng tự hào khoe lên TikTok/Instagram, quảng bá thương hiệu tự nhiên."
        },
        {
          title: "Tái sử dụng lâu dài",
          desc: "Hộp cứng cáp giữ lại làm hộp đựng phụ kiện, logo hiện diện nhiều năm."
        }
      ],
      hotspots: [
        {
          x: "45%",
          y: "40%",
          color: "#22C55E",
          label: "Nền nhung tuyết mịn • Tôn vinh đẳng cấp món quà"
        },
        {
          x: "70%",
          y: "20%",
          color: "#EAB308",
          label: "Ép kim vàng mờ • Chi tiết sắc sảo không bong tróc"
        }
      ]
    }
  };

  function initUnboxingSimulator() {
    const container = document.querySelector("[data-unboxing-sim]");
    if (!container) return;

    const tabs = container.querySelectorAll("[data-unbox-tab]");
    const stageBox = container.querySelector("[data-unbox-stage]");
    const imgEl = container.querySelector("[data-unbox-img]");
    const glareEl = container.querySelector("[data-unbox-glare]");
    const hotspotsBox = container.querySelector("[data-unbox-hotspots]");
    const badgeEl = container.querySelector("[data-unbox-badge]");
    const titleEl = container.querySelector("[data-unbox-title]");
    const specsBox = container.querySelector("[data-unbox-specs]");

    let currentStep = "step1";

    function renderStep(stepKey) {
      const data = UNBOXING_DATA[stepKey];
      if (!data) return;

      currentStep = stepKey;

      // Update tabs active state
      tabs.forEach((tab) => {
        const isActive = tab.dataset.unboxTab === stepKey;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      // Update image with smooth crossfade
      if (imgEl) {
        imgEl.style.opacity = "0.4";
        imgEl.style.transform = "scale(0.98)";

        setTimeout(() => {
          imgEl.src = data.img;
          imgEl.onerror = function () {
            this.src = data.fallbackImg;
          };
          imgEl.style.opacity = "1";
          imgEl.style.transform = "scale(1)";
        }, 150);
      }

      // Update badge & title
      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;

      // Render specs
      if (specsBox) {
        specsBox.innerHTML = data.specs
          .map(
            (sp) => `
          <div class="unbox-point">
            <span class="unbox-point__icon">✓</span>
            <div>
              <strong>${sp.title}</strong>
              <p>${sp.desc}</p>
            </div>
          </div>
        `
          )
          .join("");
      }

      // Render hotspots
      if (hotspotsBox) {
        hotspotsBox.innerHTML = data.hotspots
          .map(
            (hs) => `
          <div class="unbox-hotspot" style="left:${hs.x}; top:${hs.y};">
            <span class="unbox-hotspot__dot" style="background:${hs.color}"></span>
            <span class="unbox-hotspot__label">${hs.label}</span>
          </div>
        `
          )
          .join("");
      }
    }

    // Attach click listener to tabs
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const step = tab.dataset.unboxTab;
        if (step !== currentStep) {
          renderStep(step);
        }
      });
    });

    // 3D Perspective Tilt Effect
    if (stageBox && !window.matchMedia("(pointer: coarse)").matches) {
      stageBox.addEventListener("mousemove", (e) => {
        const rect = stageBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9; // max 9deg
        const rotateY = ((x - centerX) / centerX) * 9;

        stageBox.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

        // Move glare reflection
        if (glareEl) {
          glareEl.style.opacity = "0.18";
          glareEl.style.transform = `translate(${x - 100}px, ${y - 100}px)`;
        }
      });

      stageBox.addEventListener("mouseleave", () => {
        stageBox.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        stageBox.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        if (glareEl) glareEl.style.opacity = "0";

        setTimeout(() => {
          stageBox.style.transition = "";
        }, 500);
      });
    }

    // Initial render
    renderStep("step1");
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUnboxingSimulator);
  } else {
    initUnboxingSimulator();
  }
})();
