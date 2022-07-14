let url = 'https://pokeapi.co/api/v2/pokemon/'

function main(){
    fetch(url)
        .then(res => res.json())
        .then(json => {
            tarjetas(json.results);
            });
            
        function tarjetas(data){
        let cards = document.getElementById("contenedor");
        data.forEach(pok =>{            
            cards.innerHTML += `
                <div class ="card">
                <button><img width="100%" height="100%" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(pok.url)}.png"/></button>
                <span> Nº ${getPokemonId(pok.url)}</span>
                <h3>${getPokemonName(pok)}</h3>
                </div>   
                `;
        });
    }

    function getPokemonId(pokUrl){
        return pokUrl.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
    }

    function getPokemonName(pokName){
        return pokName.name.charAt(0).toUpperCase() + pokName.name.substring(1, pokName.name.length);
    }
}

main();
