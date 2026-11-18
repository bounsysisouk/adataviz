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
        console.log(data)
        let nbAffiche = 0
        velocistes.forEach((velociste) => {
            let adresse = "";
            let nomEnseigne = "";
            if (velociste.adresse === null && velociste.nom_enseigne === null) {
                return
            }
            nbAffiche++
            compteur.textContent = `${nbAffiche} velocistes affichés`
            if (velociste.adresse != null) {
                adresse = velociste.adresse;
            } else {
                adresse = "Adresse non renseignée"
            }
            if (velociste.nom_enseigne != null) {
                nomEnseigne = velociste.nom_enseigne
            } else {
                nomEnseigne = "Nom Manquant"
            }

            listeVelocistes.innerHTML +=
                `<h3>${nomEnseigne}</h3> 
                <p>${adresse} ${velociste.commune}</p>`;
        })
    })
    .catch((erreur) => {
        console.error("Erreur :", erreur)
    });