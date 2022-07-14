let apikey = "755a1b31cd20da18e011d63cc46f10d7"
let apirequest = "https://api.themoviedb.org/3/movie/550?api_key=755a1b31cd20da18e011d63cc46f10d7"
let apitoken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTVhMWIzMWNkMjBkYTE4ZTAxMWQ2M2NjNDZmMTBkNyIsInN1YiI6IjYyYTZmNmUxM2Q0ZDk2MDA1MGE5NzE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ZNQLW0mjXVkGwyTj3dmsDL9q98pkx_En-TDof0QyYs"

let url_trending = "https://api.themoviedb.org/3/trending/all/day?api_key="
let url_image = "https://image.tmdb.org/t/p/w500/"


let promise = carga("c_trending", url_trending, apikey);
      

function carga(contenedor, urlt, apikeyt){
    let cards = document.getElementById(contenedor);
        cards.innerHTML = ``
        fetch(urlt + apikeyt)
        .then(res => res.json())
        .then(json => {
            console.log(json.results);
            tarjetas(json.results, contenedor, urlt);
            });
}

function tarjetas(data, contenedor, urlt){
    let cards =  document.getElementById(contenedor);
    data.forEach(film =>{   
        cards.innerHTML += `
            <div class="t_film">
                <img class="film_poster" src="${url_image + film.poster_path}"><img>
                <p>${getFilmName(film)} <br><br> Rating: ${film.vote_average}</p>
            </div>
        `;
    });
 }

 function getFilmName(f){
    if (f.original_titlen !== undefined){
        return f.original_title;
    } else { 
        if (f.name !== undefined){
            return f.name;
            } else {
                if (f.title !== undefined){
                    return f.title;
            }
        }
    }
 }

 function getFilmImage(f){
    return f.poster_path;
 }