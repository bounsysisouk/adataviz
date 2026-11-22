import utils from "./utils.js"

const listeVelocistes = document.getElementById("liste-velocistes")
const recherche = document.getElementById("recherche-velociste")
const compteur = document.getElementById("compteur")
const filtreCommune = document.getElementById("liste-commune")
const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_velocistes-nantes-metropole/records?limit=-1"
const recupererVelociste = async () => {
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error("Erreur HTTP " + reponse.status)
        }
        const data = await reponse.json();
        return data.results;

    } catch (erreur) {
        console.error("Erreur :", erreur)
        return []
    };
}
const afficherVelociste = (liste) => {
    listeVelocistes.innerHTML = ""
    let nbAffiche = 0

    liste.forEach((velociste) => {

        // Vérification des informations manquantes  
        if (velociste.adresse === null && velociste.nom_enseigne === null) {
            return
        }
        const velocisteFormate = utils.formaterDonnee(velociste);
        nbAffiche++

        // Vérificatios des services Proposés
        const servicesProposes = velocisteFormate.services;
        // Création des cartes HTML // 
        listeVelocistes.innerHTML +=
            `<article class="carte-velociste">
                <h3>${velocisteFormate.nomEnseigne}</h3> 
                <p>${velocisteFormate.adresse}, ${velocisteFormate.codePostal} ${velocisteFormate.commune}</p> 
                <p>${velocisteFormate.adresseEmail}</p>
                <section>
                    <h4>Services proposés</h4>
                        <ul>
                            ${servicesProposes.map((service) => `<li>${service}</li>`).join("")}
                        </ul>
                </section>
            </article>`;
    })
    compteur.textContent = `${nbAffiche} velocistes trouvés`
}
const liste = await recupererVelociste()
// Récupére les communes de chaque vélociste avec map()
const communes = liste.map((velociste) => velociste.commune);
// Utilisation de Set pour supprimer les doublons de communes 
const communesUniques = [...new Set(communes)]
/* Convertir le Set en tableau grâce à l'opérateur spread (...)
 afin de pouvoir parcourir les communes comme un tableau */

afficherVelociste(liste)

// ECOUTE DE LA BAR DE RECHERCHE
recherche.addEventListener("input", () => {
    const resultats = utils.filtrerVelocistes(
        liste,
        recherche.value.trim(),
        filtreCommune.value
    );
    afficherVelociste(resultats);
});

// FILTRAGE PAR COMMUNE
filtreCommune.innerHTML = '<option value="">Toutes les communes</option>' +
    communesUniques.map((commune) => {
        return `<option value="${commune}">${commune}</option>`;
    }).join("");

// ECOUTE DU FILTRAGE PAR COMMUNE 
filtreCommune.addEventListener("change", () => {
    const resultats = utils.filtrerVelocistes(
        liste,
        recherche.value.trim(),
        filtreCommune.value
    );

    afficherVelociste(resultats);
});
