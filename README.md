# BookBot - Free Audiobook Finder
<p>Made by Anna Patillo, using a code baseline from Barry Cumbie's <a href="https://github.com/barrycumbie/bearbot">BearBot</a> as well as Bootstrap styling.</p>
<p>"The Library of all Libraries"</p>
<p>As a reader, I want to search book summaries so I can find a new audiobook for free.</p>

<p>REPO : <a href="https://github.com/over-anna/book-bot">CLICK ME<a></p>
<p>APP : <a href="https://over-anna.github.io/book-bot/">CLICK ME<a></p>  
<p>INSPIRATION : <a href="https://github.com/over-anna/book-bot/issues/6">CLICK ME<a></p>

CODE SNIPPET :
```
function loadVideoContent() {
  fetch("./assets/data/video-data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load video data");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const grid = document.getElementById("videoGrid");

      data.videos.forEach(video => {
        const col = document.createElement("div");
        col.className = "col-lg-3 col-md-4 col-sm-12";

        grid.appendChild(col);
      });
    })
    .catch(error => {
      console.error(error);
      document.getElementById("videoGrid").innerHTML =
        "<p class='text-danger'>Unable to load videos.</p>";
    });
}


function unloadVideoContent() {
  document.getElementById("videoGrid").textContent = '';

} 
```
<p>This code snippet ensures that the audiobook video links, containers, and images are loaded and put in the correct space in index.html. It uses one function to load the data, and another to remove it once the user logs out. With the 'fetch' statement, it pulls data from the video-data.json file to use.</p>

<p>Front end app fetching internal data. Uses Bootstrap styling, js code functions, and basic html.</p>
  
<p>Tested on Desktop & Mobile.</p>
