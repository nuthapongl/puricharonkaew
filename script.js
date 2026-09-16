(() => {
  const MASTER_WIDTH = 1440;
  const MASTER_HEIGHT = 19244;
  const DESKTOP_SCALE = 0.8;
  const root = document.documentElement;
  const shell = document.getElementById("site-shell");

  let scale = 1;

  function updateScale() {
    scale = Math.min(DESKTOP_SCALE, window.innerWidth / MASTER_WIDTH);
    root.style.setProperty("--scale", scale.toFixed(6));
    shell.style.height = `${MASTER_HEIGHT * scale}px`;
  }

  function scrollToCanvasY(y) {
    window.scrollTo({ top: Number(y) * scale, behavior: "smooth" });
  }

  document.querySelectorAll("[data-scroll-y]").forEach((control) => {
    control.addEventListener("click", () => scrollToCanvasY(control.dataset.scrollY));
    if (control.classList.contains("brand")) {
      control.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          scrollToCanvasY(0);
        }
      });
    }
  });

  const logoCards = [
    '<div class="logo-card logo-1"><img src="assets/logo-1.png" alt="Pun Thai logo" /></div>',
    '<div class="logo-card logo-2"><img src="assets/logo-2.png" alt="Birdy logo" /></div>',
    '<div class="logo-card logo-3"><img src="assets/G-birdy.png" alt="Brand identity logo" /></div>',
    '<div class="logo-card logo-4"><img src="assets/logo-4.svg" alt="Campaign logo" /></div>',
    '<div class="logo-card logo-5"><img src="assets/logo-5.svg" alt="Corporate logo" /></div>',
    '<div class="logo-card logo-6" role="img" aria-label="Brand mark"><div class="logo-six-art" aria-hidden="true"><img class="six-v0" src="assets/logo-6-v0.svg" alt="" /><span class="six-v1-wrap"><img src="assets/logo-6-v1.svg" alt="" /></span><img class="six-v2" src="assets/logo-6-v2.svg" alt="" /><img class="six-v3" src="assets/logo-6-v3.svg" alt="" /><img class="six-v4" src="assets/logo-6-v4.svg" alt="" /><img class="six-g3" src="assets/logo-6-g3.svg" alt="" /><img class="six-g4" src="assets/logo-6-g4.svg" alt="" /><img class="six-g5" src="assets/logo-6-g5.svg" alt="" /><img class="six-g6" src="assets/logo-6-g6.svg" alt="" /></div></div>',
    '<div class="logo-card logo-7"><img src="assets/logo-7.webp" alt="Logo design project" /></div>',
    '<div class="logo-card logo-8"><img src="assets/logo-8.webp" alt="Logo design project" /></div>',
  ];

  document.querySelectorAll("[data-logo-cycle]").forEach((cycle) => {
    cycle.innerHTML = logoCards.join("");
  });

  const phoneScreens = [
    "assets/phone-1.webp",
    "assets/phone-2.webp",
    "assets/phone-3.webp",
    "assets/phone-4.webp",
    "assets/phone-5.webp",
    "assets/phone-6.webp",
  ];
  const phoneButton = document.querySelector(".phone-sequence");
  const phoneImage = document.getElementById("phone-screen");
  const phoneCounter = document.getElementById("phone-counter");
  let phoneIndex = 0;

  phoneScreens.slice(1).forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  phoneButton.addEventListener("click", () => {
    phoneIndex = (phoneIndex + 1) % phoneScreens.length;
    phoneButton.classList.add("is-changing");
    window.setTimeout(() => {
      phoneImage.src = phoneScreens[phoneIndex];
      phoneImage.alt = `CLICX mobile app screen ${phoneIndex + 1} of ${phoneScreens.length}`;
      phoneCounter.textContent = `${phoneIndex + 1} / ${phoneScreens.length}`;
      phoneButton.classList.remove("is-changing");
    }, 150);
  });

  const galleryImages = [
    ["assets/kv-doikham-1.webp", "Doi Kham strawberry key visual", "doikham"],
    ["assets/kv-doikham-2.webp", "Doi Kham mango key visual", "doikham"],
    ["assets/kv-birdy.webp", "Birdy key visual", "birdy"],
    ["assets/kv-truemove.webp", "TrueMove H key visual", "truemove"],
    ["assets/kv-eversense-1.webp", "Eversense key visual", "eversense"],
    ["assets/kv-eversense-2.webp", "Eversense campaign key visual", "eversense"],
    ["assets/kv-mansome.webp", "Mansome key visual", "mansome"],
  ];

  const projectStates = {
    doikham: { galleryY: 0, selectorTop: 480 },
    birdy: { galleryY: -724, selectorTop: 428 },
    truemove: { galleryY: -1086, selectorTop: 376 },
    eversense: { galleryY: -1448.3, selectorTop: 324 },
    mansome: { galleryY: -2104.61, selectorTop: 272 },
  };

  const galleryTrack = document.getElementById("key-gallery-track");
  const projectSelector = document.querySelector(".project-selector");
  const projectButtons = [...document.querySelectorAll("[data-project]")];
  const galleryElements = galleryImages.map(([src, alt, project]) => {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.dataset.galleryProject = project;
    galleryTrack.append(image);
    return image;
  });

  function selectProject(project, immediate = false) {
    const state = projectStates[project];
    if (!state) return;

    galleryTrack.classList.toggle("is-immediate", immediate);
    projectSelector.classList.toggle("is-immediate", immediate);
    galleryTrack.style.setProperty("--gallery-y", `${state.galleryY}px`);
    projectSelector.style.top = `${state.selectorTop}px`;

    projectButtons.forEach((button) => {
      const isSelected = button.dataset.project === project;
      button.setAttribute("aria-selected", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    galleryElements.forEach((image) => {
      const isActive = image.dataset.galleryProject === project;
      image.classList.toggle("is-active", isActive);
      image.setAttribute("aria-hidden", String(!isActive));
    });

    if (immediate) {
      requestAnimationFrame(() => {
        galleryTrack.classList.remove("is-immediate");
        projectSelector.classList.remove("is-immediate");
      });
    }
  }

  projectButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectProject(button.dataset.project);
    });

    button.addEventListener("keydown", (event) => {
      if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + projectButtons.length) % projectButtons.length;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % projectButtons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = projectButtons.length - 1;

      projectButtons[nextIndex].focus();
      selectProject(projectButtons[nextIndex].dataset.project);
    });
  });

  selectProject("doikham", true);
  updateScale();
  window.addEventListener("resize", updateScale, { passive: true });
})();
