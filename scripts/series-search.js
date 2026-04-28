const searchBox = document.getElementById("searchBox");
const videoGrid = document.getElementById("videoGrid");

let videoData;

// Fetch data
fetch("./assets/data/series-data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load video data");
    }
    return response.json();
  })
  .then(data => {
    videoData = data;
    console.log("videoData", videoData);

    renderObjectResults(videoData.series);
  });

// Render cards
function renderObjectResults(items) {
  videoGrid.innerHTML = "";

  items.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-12";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          src="${video.cover}" 
          class="card-img-top img-fluid video-thumb"
          data-id="${video.page}"
          style="cursor:pointer;">
      </div>
    `;

    videoGrid.appendChild(col);
  });
}

// CLICK → go to series page
videoGrid.addEventListener("click", function (e) {
  const target = e.target.closest(".video-thumb");
  if (!target) return;

  const id = target.dataset.id;

  window.location.href = `${id}`;
});

// Search
function handleGlobalObjectSearch() {
  const query = searchBox.value.trim().toLowerCase();

  if (!query) {
    renderObjectResults(videoData.series);
    return videoData.series;
  }

  const results = videoData.series.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(query)
    );
  });

  renderObjectResults(results);
  return results;
}

searchBox.addEventListener("input", handleGlobalObjectSearch);