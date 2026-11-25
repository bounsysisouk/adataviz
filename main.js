import utils from "./utils.js"
import { afficherVelociste } from "./display.js"

const recherche = document.getElementById("recherche-velociste")
const filtreCommune = document.getElementById("liste-commune")
let liste = []

const init = async () => {
    liste = await utils.recupererVelociste()
    // Récupére les communes de chaque vélociste avec map()
    const communes = liste.map((velociste) => velociste.commune);
    // Utilisation de Set pour supprimer les doublons de communes 
    const communesUniques = [...new Set(communes)]
    /* Convertir le Set en tableau grâce à l'opérateur spread (...)
    afin de pouvoir parcourir les communes comme un tableau */
    afficherVelociste(liste)
    // FILTRAGE PAR COMMUNE
    filtreCommune.innerHTML = '<option value="">Toutes les communes</option>' +
        communesUniques.map((commune) => {
            return `<option value="${commune}">${commune}</option>`;
        }).join("");

}


// ECOUTE DE LA BAR DE RECHERCHE
recherche.addEventListener("input", () => {
    const resultats = utils.filtrerVelocistes(
        liste,
        recherche.value.trim(),
        filtreCommune.value
    );
    afficherVelociste(resultats);
});


// ECOUTE DU FILTRAGE PAR COMMUNE 
filtreCommune.addEventListener("change", () => {
    const resultats = utils.filtrerVelocistes(
        liste,
        recherche.value.trim(),
        filtreCommune.value
    );

    afficherVelociste(resultats);
});

init()