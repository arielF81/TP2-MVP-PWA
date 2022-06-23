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
let divContenedor2 = d.getElementById(`divFav`);
let ul2 = d.createElement(`ul`);
let imagesFav = "";



window.onload = function() {

    let dataRec = JSON.parse(localStorage.getItem("favoritos"));
    let id2 = 0;
    for (let i = 0; i < dataRec.length; i++) {

        console.log(`esto está en local : ${dataRec[i].nombre}`);
        imagesFav += `<li class="col-xs-8 col-sm-8 col-lg-3 mt-5 offset-1 " id="${dataRec[i].id}"><div class="card  shadow" style="width: 18rem;" ><img src="${dataRec[i].img}" />
        <div class="card-body">
        <p class="parrafito"> ${dataRec[i].nombre}</p>
        <p >Especie :${dataRec[i].especie}</p>
        <p >Estado: ${dataRec[i].estado}</p>
        <button data-local="${dataRec[i].id}" class="btn3" type="button">Eliminar</button>
        </div>
        </div>
        </li>`;
    }
    divContenedor2.innerHTML = `<ul class='row'>${imagesFav}</ul>`;
    let botones = d.querySelectorAll(`.btn3`);

    for (let bnt of botones) {
        let removidos = [];
        bnt.addEventListener(`click`, (e) => {
            let dataRec2 = JSON.parse(localStorage.getItem("favoritos"));
            console.log("funciona el evento");
            console.log(e.target.dataset.local);

            for (let i = 0; i < dataRec2.length; i++) {

                if (dataRec2[i].id == e.target.dataset.local) {
                    console.log(`HAY QUE BORRAR EL ID ${dataRec2[i].id} = target ${e.target.dataset.local}`)

                    dataRec2 = dataRec2.filter(function(personaje) {
                        return personaje.id !== e.target.dataset.local;

                    });

                    console.log(dataRec2);
                    localStorage.setItem("favoritos", JSON.stringify(dataRec2));
                    d.getElementById(e.target.dataset.local).remove();

                }

            }





        })

    }
}