import utils from "./utils.js"

let velocistes = [];
const listeVelocistes = document.getElementById("liste-velocistes")
const compteur = document.getElementById("compteur")
const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_velocistes-nantes-metropole/records?limit=64"
const recupererVelociste = async () => {
    const reponse = await fetch(url);
    const data = await reponse.json();
    velocistes = data.results;
    return data;
};
recupererVelociste()
    .then((data) => {
        compteur.textContent = `${velocistes.length} velocistes trouvés`; 
        console.log(data)
        velocistes.forEach((velociste) => {
            listeVelocistes.innerHTML += 
            `<h3>${velociste.nom_enseigne}</h3> 
            <p>${velociste.adresse} ${velociste.commune}</p>`;
        })
    })
    .catch((erreur) => {
        console.error("Erreur :", erreur)
    });