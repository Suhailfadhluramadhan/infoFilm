const images = document.querySelectorAll('.tv-image');
let currentImageIndex = 0;

function showImage(index) {
  images.forEach((image, i) => {
    image.style.opacity = (i === index) ? '1' : '0';
  });
}

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

showImage(currentImageIndex);

setInterval(changeImage, 3000);

document.addEventListener("DOMContentLoaded", function () {
  const buttonCari = document.querySelector("#button-cari");
  buttonCari.addEventListener("click", async function () {
    try {
      const input = document.querySelector(".input-keyword");
      const val = input.value;
      const dataFilm = await etFilm(val);
      updateui(dataFilm);
    } catch (err) {
      alert(err);
    }
  });

  document.addEventListener("click", async function (e) {
    try {
      if (e.target.classList.contains("modal-detail-button")) {
        const imdb = e.target.dataset.imdbid;
        const ambil = await getImdb(imdb);
        updatModal(ambil);
      }
    } catch (err) {
      alert(err);
    }
  });

  function etFilm(val) {
    return fetch("https://www.omdbapi.com/?apikey=3d3092b4&s=" + val)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        return response.Search;
      });
  }

  function getImdb(id) {
    return fetch("https://www.omdbapi.com/?apikey=3d3092b4&i=" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then((m) => {
        if (m.Response === "False") {
          throw new Error(m.Error);
        }
        return m;
      });
  }

  function updatModal(e) {
    const move = carde(e);
    const modalbody = document.querySelector(".modal-body");
    modalbody.innerHTML = move;
  }

  function updateui(i) {
    let card = "";
    i.forEach((e) => (card += cari(e)));
    const konten = document.querySelector(".movie-konten");
    konten.innerHTML = card;
  }

  function cari(e) {
    return `
    <div class="col-md-4 my-5">
      <div class="bg-amber shadow-lg  rounded-lg overflow-hidden bg-cyan-500" style="box-shadow: 10px 15px 5px rgba(245, 152, 211, 0.9);">
        <img src="${e.Poster}" class="w-full" alt="gambar ${e.Title}">
        <div class="p-4" style="background-color: rgba(245, 152, 211, 0.9);">
          <h5 class="text-lg font-semibold">${e.Title}</h5>
          <h6 class="text-sm text-gray-600 mb-2">${e.Year}</h6>
          <a href="#" class="bg-blue-200 text-white px-3 py-2 rounded-md text-sm font-medium modal-detail-button" data-imdbid="${e.imdbID}">Show Details</a>
        </div>
      </div>
    </div>
  `;
  }

  function carde(e) {
    return `<div class="container mx-auto p-4 border-solid border-2 border-black ">
              <div class="flex flex-wrap">
                <div class="w-full sm:w-1/3">
                  <img src="${e.Poster}" alt="Poster ${e.Title}" class="w-full rounded-lg">
                </div>
                <div class="w-full sm:w-2/3 p-4">
                  <ul class="list-none">
                    <li class="py-2"><h4 class="text-xl font-bold">${e.Title} (${e.Year})</h4></li>
                    <li class="py-2"><strong>Actors:</strong> ${e.Actors}</li>
                    <li class="py-2"><strong>Writer:</strong> ${e.Writer}</li>
                    <li class="py-2"><strong>Plot:</strong> ${e.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
  }

  const modal = document.getElementById("indexmovieModal");
  const modalCloseButton = document.getElementById("modal-close-button");
  const modalCloseFooter = document.getElementById("modal-close-footer");

  modalCloseButton.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  modalCloseFooter.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-detail-button")) {
      modal.classList.remove("hidden");
    }
  });
});
