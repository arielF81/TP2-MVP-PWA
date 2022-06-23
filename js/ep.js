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
const btn = d.querySelector('#btn3');
const inputElement = d.getElementById('searchEpisode');
let ul3 = d.createElement(`ul`);
let table = d.createElement(`table`);
let divContenedor = d.getElementById(`div3`);
let episodios = [];
const spinner = d.getElementById("spin");




const constructorConsultaEp = (episodio) => `query {
    episodes (filter: {name: "${episodio}"}){
      info {
        count
      }
      results {
        id,
        name,
        air_date,
        episode
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
            query: constructorConsultaEp(valorDeInput)
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
            episodios = json.data.episodes.results;
            console.log(episodios)
            resultData();
            epFx(episodios)

        })

    .catch(function(err) {
        console.log("Something went wrong!", err);
    });



});




function epFx() {

    let datos = "";
    for (let index = 0; index < episodios.length; index++) {

        datos +=
            /*`<li class="col-xs-8 col-sm-8 col-lg-6 mt-5 offset-2> <div class="card  shadow  text-dark  mb-3" >
            <div class="card-header">Temporada: ${episodios[index].episode}</div>
            <div class="card-body bg-info text-white">
            <p class="card-title" >Nombre: ${episodios[index].name} </p>
            <p class="card-text">Fecha de estreno :${episodios[index].air_date}</p>
        
        
            </div>
            </div>
            </li>`;*/
            `<tr>
            <th >${episodios[index].episode}</th>
            <td >${episodios[index].name}</td>
            <td>${episodios[index].air_date}</td>
          </tr>`



        /* divContenedor.innerHTML = `<ul class='row'>${datos}</ul>`*/

    }
    divContenedor.innerHTML = `<table class="table table-info table-hover"><thead>
    <tr>
      <th scope="col">Episodio</th>
      <th scope="col">Nombre</th>
      <th scope="col">Lanzamiento</th>
      
    </tr>
  </thead>
  <tbody>${datos}</tbody></table>`
}


function loadData() {
    spinner.style.visibility = "visible";
}

function resultData() {
    spinner.style.visibility = "hidden";
}