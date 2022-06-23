'use strict';

var navbar = document.getElementById('navbar');

window.addEventListener('offline', event => {
    console.log('sin conexción');

    d.querySelector(`#status`).innerHTML = `<p id="statusp" class="text-warning bg-dark">Offline</p>`;

})

window.addEventListener('online', event => {
    console.log('con conexión');
    d.querySelector(`#statusp`).remove();
})

if (!navigator.onLine) {
    console.log('sin conexion');
}

const d = document;


const btn = d.querySelector('.btn');
const inputElement = d.getElementById('search');
let personajes = [];

let divContenedor = d.getElementById(`div1`);

let ul = d.createElement(`ul`);

let favoritos = [];
let filtrados = [];
const spinner = d.getElementById("spin");

const constructorConsulta = (personaje) => `query {
    characters(page: 2, filter: { name: "${personaje}" }) {
      info {
        count
      }
      results {
        id,
        name,
        status,
        species,
        image
      }
      
    }
   
  }`




btn.addEventListener(`click`, (e) => {

    loadData();
    const valorDeInput = inputElement.value;
    console.log('valor del input: ', valorDeInput);
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: constructorConsulta(valorDeInput)
        })
    }

    fetch("https://rickandmortyapi.com/graphql", options)
        .then(function(response) {
            console.log(`respuesta en crudo OBJETO RESPONSE`, response)

            return response.json();

        })
        .then(function(json) {
            console.log(`json recibido`, json);
            console.log(`visualizo el atributo data `, json);
            personajes = json.data.characters.results;
            resultData();
            cardsFx(personajes);



        })

    .catch(function(err) {
        console.log("Something went wrong!", err);
    });



});



function cardsFx() {
    let images = '';
    let btn2 = '';
    let nombre = "";
    let especie = "";
    let estado = "";
    let id = "";

    for (let index = 0; index < personajes.length; index++) {
        nombre = personajes[index].name;
        especie = personajes[index].species;
        estado = personajes[index].status;
        id = personajes[index].id;
        images += `<li class="col-xs-8 col-sm-8 col-lg-3 mt-5 offset-1 "><div class="card  shadow" style="width: 18rem;" ><img class="card-img-top"  src="${personajes[index].image}" />
        <div class="card-body">
        <p class="parrafito"> ${personajes[index].name}</p>
        <p>Especie :${personajes[index].species}</p>
        <p>Estado: ${personajes[index].status}</p>
        <button data-cat="${personajes[index].id}" class="btn2 btn btn-primary" type="button">Favorito</button>
        </div>
        </div></li>`;

    }
    divContenedor.innerHTML = `<ul class='row'>${images}</ul>`;
    let botones = d.querySelectorAll(`.btn2`);

    for (let bnt of botones) {
        bnt.addEventListener(`click`, (e) => {
                console.log(e.target.dataset.cat);
                filtrados = personajes.filter(personaje => personaje.id == e.target.dataset.cat);
                favoritos.push(filtrados);
                addFav(favoritos);
                console.log(favoritos);

            }

        )


    }
    addFav(favoritos);
}
// FUNCION PARA GUARDAR EN LOCAL STORAGE-------------------------////

function addFav(favoritos) {
    for (let index = 0; index < favoritos.length; index++) {
        console.log(`datos de fav : ${favoritos[index][0].name}`)
        let datosGuardados = JSON.parse(localStorage.getItem("favoritos"));
        if (datosGuardados == null) datosGuardados = [];

        let data = {

            "id": favoritos[index][0].id,
            "nombre": favoritos[index][0].name,
            "especie": favoritos[index][0].species,
            "img": favoritos[index][0].image,

        }



        localStorage.setItem("data", JSON.stringify(data));
        datosGuardados.push(data);

        localStorage.setItem("favoritos", JSON.stringify(datosGuardados));

    }
}

function loadData() {
    spinner.style.visibility = "visible";
}

function resultData() {
    spinner.style.visibility = "hidden";
}