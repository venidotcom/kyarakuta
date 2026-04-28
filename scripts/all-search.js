const searchBox = document.getElementById("searchBox");
const videoGrid = document.getElementById("videoGrid");

const modalImage = document.getElementById("modalImage");
const modalEl = document.getElementById("imageModal");
const imageModal = new bootstrap.Modal(modalEl);

let videoData = null;

// FIX: ensure pageType always exists
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

  // FIX: prevent undefined crash
  if (!Array.isArray(data)) {
    console.warn("Invalid pageType or missing data:", pageType);
    return [];
  }

  return data;
}

// Render page
function renderPageData() {
  const data = getCurrentData();
  renderObjectResults(data);
}

// Render cards
function renderObjectResults(items) {
  videoGrid.innerHTML = "";

  if (!items.length) {
    videoGrid.innerHTML = `
      <div class="text-center text-muted py-5 w-100">
        No content available
      </div>
    `;
    return;
  }

  items.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-12";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          src="${video.cover}" 
          class="card-img-top img-fluid video-thumb"
          data-src="${video.cover}"
          data-page="${video.page || ""}"
          style="cursor:pointer;">
      </div>
    `;

    videoGrid.appendChild(col);
  });
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

// Search
function handleGlobalObjectSearch() {
  if (!videoData) return;

  const query = searchBox.value.trim().toLowerCase();
  const currentData = getCurrentData();

  if (!query) {
    renderObjectResults(currentData);
    return;
  }

  const results = currentData.filter(item =>
    Object.values(item).some(value => {
      if (Array.isArray(value)) {
        return value.some(v => String(v).toLowerCase().includes(query));
      }
      return String(value).toLowerCase().includes(query);
    })
  );

  renderObjectResults(results);
}

searchBox.addEventListener("input", handleGlobalObjectSearch);