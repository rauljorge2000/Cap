let url = 'https://rickandmortyapi.com/api/character?page='
let ind = 1

let promise = carga();
           
async function tarjetas(data){
    let cards =  document.getElementById("container");
    await data.forEach( async rym =>{   
        cards.innerHTML += `
            <div class="card">
            <div class="card-l">
                <img class="ima" src="${rym.image}"><img>
            </div>
            <div class="card-r">
                <p class="p1">${rym.name}</p>
                <p class="p2"><span class="circulo"></span>  ${rym.status} - ${rym.species}</p>
                <p class="p3">Last known location:</p>
                <p class="p4">${rym.status}</p>
                <p class="p3">First seen in:</p>
                <p class="p4">${await getFirstSeen(rym)}</p>
            </div>
        </div>
        `;
    });
    formatoEstado();
 }


    
function getImage(rym){
    return rym.image;
}    

function getId(rym){
    return rym.id;
}

function getName(rym){
    return rym.name;
}

function getState(rym){
    return rym.status;
}

function getSpecie(rym){
    return rym.species;
}

function getLocation(rym){
    return rym.location.name;
}

async function getFirstSeen(rym){
    let res = await fetch(rym.episode[0])
    let parsed = await res.json()
    console.log(parsed.name)
    return await parsed.name;
}



function formatoEstado(){
    const estados = document.getElementsByClassName("p2");
    const circulos = document.getElementsByClassName("circulo");
    for (let i = 0; i < estados.length; i++) {
        if(estados[i].innerText.includes("Alive")){
            circulos[i].style.backgroundColor  = "#32CD32";
        }else if(estados[i].innerText.includes("Dead")){
            circulos[i].style.backgroundColor  = "red";
        }
   }
}        



function next() {
    ind += 1;
    let cards = document.getElementById("container");
    cards.innerHTML = ``
    carga();
}

function prev() {
    if (ind==1){
        alert("Primera pagina");
    }else {
        ind -= 1;
        let cards = document.getElementById("container");
        cards.innerHTML = ``
        carga();
    }
}
async function carga(){
    let cards = document.getElementById("container");
        cards.innerHTML = ``
        let a = await fetch(url+ind)
        let b = await a.json();
        let c = await tarjetas(b.results);
}