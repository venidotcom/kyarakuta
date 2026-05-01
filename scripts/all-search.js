const searchBox = document.getElementById("searchBox");
const videoGrid = document.getElementById("videoGrid");

const modalImage = document.getElementById("modalImage");
const modalEl = document.getElementById("imageModal");
const imageModal = new bootstrap.Modal(modalEl);

let videoData = null;

// Pagination state
let visibleCount = 50;
const LOAD_STEP = 50;
let currentItems = [];

// Ensure pageType always exists
const pageType = document.body.dataset.page || "default";

// Fetch data
fetch("../assets/data/character-data.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load video data");
    return res.json();
  })
  .then(data => {
    videoData = data;
    console.log("videoData loaded:", videoData);

    renderPageData();
  })
  .catch(err => {
    console.error("Data load error:", err);
    videoGrid.innerHTML = `<p class="text-center text-danger">Failed to load content</p>`;
  });

// SAFE getter
function getCurrentData() {
  if (!videoData) return [];

  const data = videoData[pageType];

  if (!Array.isArray(data)) {
    console.warn("Invalid pageType or missing data:", pageType);
    return [];
  }

  return data;
}

// Initialize page
function renderPageData() {
  currentItems = getCurrentData();
  visibleCount = LOAD_STEP;
  renderObjectResults();
}

// Render cards (paginated)
function renderObjectResults() {
  videoGrid.innerHTML = "";

  if (!currentItems.length) {
    videoGrid.innerHTML = `
      <div class="text-center text-muted py-5 w-100">
        No content available
      </div>
    `;
    return;
  }

  const itemsToShow = currentItems.slice(0, visibleCount);

  itemsToShow.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-12";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          src="${video.cover}" 
          loading="lazy"
          class="card-img-top img-fluid video-thumb"
          data-src="${video.cover}"
          data-page="${video.page || ""}"
          style="cursor:pointer;">
      </div>
    `;

    videoGrid.appendChild(col);
  });

  renderLoadMoreButton();
}

// Load More button
function renderLoadMoreButton() {
  const existingBtn = document.getElementById("loadMoreBtn");
  if (existingBtn) existingBtn.remove();

  if (visibleCount >= currentItems.length) return;

  const btn = document.createElement("button");
  btn.id = "loadMoreBtn";
  btn.className = "btn load-more-btn d-block mx-auto mt-4";
  btn.textContent = "Click to See More";

  btn.addEventListener("click", () => {
    visibleCount += LOAD_STEP;
    renderObjectResults();
  });

  videoGrid.after(btn);
}

// Click handler
videoGrid.addEventListener("click", (e) => {
  const target = e.target.closest(".video-thumb");
  if (!target) return;

  const page = target.dataset.page;

  if (page) {
    window.location.href = page;
  } else {
    modalImage.src = target.dataset.src;
    imageModal.show();
  }
});

// Clean modal
modalEl.addEventListener("hidden.bs.modal", () => {
  modalImage.src = "";
});

// Search with pagination
function handleGlobalObjectSearch() {
  if (!videoData) return;

  const query = searchBox.value.trim().toLowerCase();
  const baseData = getCurrentData();

  if (!query) {
    currentItems = baseData;
  } else {
    currentItems = baseData.filter(item =>
      Object.values(item).some(value => {
        if (Array.isArray(value)) {
          return value.some(v => String(v).toLowerCase().includes(query));
        }
        return String(value).toLowerCase().includes(query);
      })
    );
  }

  visibleCount = LOAD_STEP;
  renderObjectResults();
}

searchBox.addEventListener("input", handleGlobalObjectSearch);