// $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=3d3092b4&s=avengers',
//     success: result => {
//         const movies= result.Search;
//         console.log(movies)
//         let card=" "
//         movies.forEach(e => {
//             card+=` <div class="col-md-4 my-5">
//             <div class="card">
//                 <img src="${e.Poster}" class="card-img-top" alt="gambar ${e.Title}">
//                 <div class="card-body">
//                   <h5 class="card-title">${e.Title}</h5>
//                   <h6 class="card-subtitle mb-2 text-body-secondary">${e.Year}</h6>
//                   <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#indexmovieModal" data-imdbid="${e.imdbID}">show detail</a>

//                 </div>
//               </div>
//         </div>`
            
//         });
//         $('.movie-konten').html(card)

//         $('.modal-detail-button').on('click',function(){
//             $.ajax({           
//             url: `http://www.omdbapi.com/?apikey=3d3092b4&i=` + $(this).data('imdbid'),
//             success: e=>{
//                 const move=`<div class="kontainer-fluid">
//                 <div class="row">
//                   <div class="col-md-3">
//                     <img src="${e.Poster}" alt="">
//                   </div>
//                   <div class="col-md">
//                     <ul class="list-group">
//                       <li class="list-group-item"><h4>
//                       ${e.Title} ${e.Year}
//                       </h4></li>
//                       <li class="list-group-item">A second item</li>
//                       <li class="list-group-item">A third item</li>
//                       <li class="list-group-item">A fourth item</li>
//                       <li class="list-group-item">And a fifth one</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>`
//               $('.modal-body').html(move)
//             }
//            })

//         });
//     },
//     Error: ()=>{
//         console.log('error')
//     }

// })












// const buttonCari = document.getElementById("button-cari")
// buttonCari.addEventListener('click',function(){
//   const input= document.querySelector(".input-keyword")
//   fetch('http://www.omdbapi.com/?apikey=3d3092b4&s='+ input.value)
//   .then(Response=> Response.json())
//   .then(e=>{
//     const movie= e.Search;
//     let card=" "
//     movie.forEach(e => card+=cari(e));
//     const konten= document.querySelector(".movie-konten")
//     konten.innerHTML= card

//     const detailBtn = document.querySelectorAll(".modal-detail-button");
//     detailBtn.forEach(e=>{e.addEventListener('click',function(){ 

//     fetch(`http://www.omdbapi.com/?apikey=3d3092b4&i=` + $(this).data('imdbid'))
//       .then(Response=> Response.json())
//       .then(e=> { const move= carde(e);
    
//         const modalbody= document.querySelector(".modal-body");
//         modalbody.innerHTML= move;
//       })


//       })
//     })


//   })
// })

//event click start
const buttonCari= document.querySelector("#button-cari")
buttonCari.addEventListener(`click`, async function(){
try{
   const input= document.querySelector(".input-keyword");
  const val=input.value
  const dataFilm=  await etFilm(val)

  updateui(dataFilm);
}catch(err){
    alert(err)
}
 
})

document.addEventListener('click', async function(e){
  try{
    if(e.target.classList.contains('modal-detail-button')){
    const imdb=e.target.dataset.imdbid;
    const ambil= await getImdb(imdb)
   updatModal(ambil)
  }
  }catch(err){
    alert(err)
  }
   
})

//event clik end

 
//fungsi ambil film
function etFilm (val){
 return fetch('http://www.omdbapi.com/?apikey=3d3092b4&s='+ val)
  .then(Response=>{
   
    if(!Response.ok){
      throw new  Error(Response.statusText)
    }
    return Response.json();
  })
  .then(response=>{
    if(response.Response==="False"){
      throw new Error(response.Error);
    }
    return response.Search;
  });

}


function getImdb(id){
  return fetch('http://www.omdbapi.com/?apikey=3d3092b4&i=' + id)
  .then(response=>{ console.log(response)
     if(!response.ok){
      throw new Error("something went wrong")
    }
    return response.json()
  })
 
  .then(m=>{
    console.log(m)
    if(m.Response=== "False"){

      throw new Error(m.Error)
    }
    return m
  });
  
}
//fungsi ambil film end


//fungsi menampilkan 

function updatModal(e){
  const move= carde(e);
   const modalbody= document.querySelector(".modal-body");
        modalbody.innerHTML= move;
}

function updateui(i){
  let card=" "
     i.forEach(e => card+=cari(e));
      const konten= document.querySelector(".movie-konten")
      konten.innerHTML= card
}




function cari(e){
 return `<div class="col-md-4 my-5">
            <div class="card">
                <img src="${e.Poster}" class="card-img-top" alt="gambar ${e.Title}">
                <div class="card-body">
                  <h5 class="card-title">${e.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">${e.Year}</h6>
                  <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#indexmovieModal" data-imdbid="${e.imdbID}">show detail</a>
                </div>
              </div>
        </div>`
}

function carde(e){
  return ` <div class="container-fluid">
  <div class="row">
    <div class="col-md-auto"> <!-- Kolom gambar -->
      <img src="${e.Poster}" alt="" class="w-100">
    </div>
    <div class="col-md"> 
      <ul class="list-group w-100">
        <li class="list-group-item"><h4>
        ${e.Title} ${e.Year}
        </h4></li>
        <li class="list-group-item">${e.Actors}</li>
        <li class="list-group-item">${e.Writer}</li>
        <li class="list-group-item">${e.Plot}</li>
      </ul>
    </div>
  </div>
</div>
`
}



