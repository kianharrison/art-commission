const ART_DATA = {
  1: {
    title: "Expressive Portrait I",
    image: "art/1.jpg",
    processImages: ["art/1.jpg", "art/1_2.png", "art/1_3.png"],
    description:
      "A bright and expressive headshot centered on emotion, clean lighting, and character personality.",
  },
  2: {
    title: "Expressive Portrait II",
    image: "art/2.jpg",
    processImages: ["art/2.jpg", "art/2_1.png", "art/2_3.png"],
    description:
      "A festive portrait piece with soft tonal blending and playful color atmosphere.",
  },
  3: {
    title: "Character Concept",
    image: "art/3.png",
    processImages: ["art/1.jpg", "art/2.jpg", "art/4.png"],
    description:
      "Stylized character artwork with stronger contrast and cinematic framing.",
  },
  4: {
    title: "City Vibes Illustration",
    image: "art/4.png",
    processImages: ["art/5.jpg", "art/1.jpg", "art/3.png"],
    description:
      "A confident composition combining mood, costume detail, and polished digital rendering.",
  },
  5: {
    title: "Story Panel Artwork",
    image: "art/5.jpg",
    processImages: ["art/2.jpg", "art/1.jpg", "art/3.png"],
    description:
      "Narrative-focused artwork with a balanced composition and smooth painterly finish.",
  },
  6: {
    title: "Neon Pulse Character",
    image: "art/6.png",
    processImages: ["art/6.png", "art/6_2.png", "art/6_3.png"],
    description:
      "Dynamic character artwork with layered lighting and clean finishing details.",
  },
};

const params = new URLSearchParams(window.location.search);
const artId = params.get("art");
const art = ART_DATA[artId] || ART_DATA[1];
const artIds = Object.keys(ART_DATA)
  .map((id) => Number.parseInt(id, 10))
  .filter((id) => Number.isInteger(id))
  .sort((a, b) => a - b);

const imageEl = document.getElementById("art-detail-image");
const titleEl = document.getElementById("art-detail-title");
const descEl = document.getElementById("art-detail-description");
const imageSwitcherEl = document.getElementById("art-image-switcher");
const processEls = document.querySelectorAll(".art-process-image");
const prevArtBtn = document.getElementById("art-nav-prev");
const nextArtBtn = document.getElementById("art-nav-next");
const processImages = Array.isArray(art.processImages) && art.processImages.length
  ? art.processImages
  : [art.image];

let activeImageIndex = 0;

const setActiveImage = (index) => {
  if (!imageEl) {
    return;
  }

  const boundedIndex = Math.max(0, Math.min(processImages.length - 1, index));
  activeImageIndex = boundedIndex;
  const nextImage = processImages[boundedIndex];

  imageEl.src = nextImage;
  imageEl.alt = `${art.title} process ${boundedIndex + 1}`;
  imageEl.loading = "lazy";

  if (imageSwitcherEl) {
    imageSwitcherEl.querySelectorAll(".art-switch-dot").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === boundedIndex);
      button.setAttribute("aria-pressed", buttonIndex === boundedIndex ? "true" : "false");
    });
  }

  if (processEls.length) {
    processEls.forEach((preview, previewIndex) => {
      preview.classList.toggle("active", previewIndex === boundedIndex);
    });
  }
};

if (imageEl) {
  setActiveImage(0);
}

if (titleEl) {
  titleEl.textContent = art.title;
}

if (descEl) {
  descEl.textContent = art.description;
}

if (imageSwitcherEl) {
  imageSwitcherEl.innerHTML = "";

  processImages.forEach((_, index) => {
    const switchButton = document.createElement("button");
    switchButton.className = "art-switch-dot";
    switchButton.type = "button";
    switchButton.setAttribute("aria-label", `Show process image ${index + 1}`);
    switchButton.setAttribute("aria-pressed", index === activeImageIndex ? "true" : "false");
    switchButton.addEventListener("click", () => setActiveImage(index));
    imageSwitcherEl.appendChild(switchButton);
  });

  setActiveImage(activeImageIndex);
}

if (processEls.length) {
  processEls.forEach((image, index) => {
    image.src = processImages[index] || processImages[0];
    image.alt = `${art.title} process preview ${index + 1}`;
    image.loading = "lazy";
    image.classList.toggle("active", index === activeImageIndex);
    image.addEventListener("click", () => setActiveImage(index));
  });
}

const currentArtId = Number.parseInt(artId || "1", 10);
const currentIndex = artIds.indexOf(currentArtId);

const navigateArt = (direction) => {
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = (safeIndex + direction + artIds.length) % artIds.length;
  const nextId = artIds[nextIndex];
  window.location.href = `art-details.html?art=${nextId}`;
};

if (prevArtBtn) {
  prevArtBtn.addEventListener("click", () => navigateArt(-1));
}

if (nextArtBtn) {
  nextArtBtn.addEventListener("click", () => navigateArt(1));
}

document.title = `${art.title} | KianLooksBetter`;
