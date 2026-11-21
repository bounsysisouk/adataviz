import utils from "./utils.js"

const listeVelocistes = document.getElementById("liste-velocistes")
const recherche = document.getElementById("recherche-velociste")
const compteur = document.getElementById("compteur")
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
        console.log(velociste)
        // Déclaration des vaiables du velociste 
        let adresse = "";
        let nomEnseigne = "";
        let commune = "";
        let adresseEmail = "";
        let codePostal = "";

        // Vérification des informations manquantes  
        if (velociste.adresse === null && velociste.nom_enseigne === null) {
            return
        }
        nbAffiche++
        // Récupération des informations (nom, adresse, commune, Email, site internet)        
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
        if (velociste.commune != null) {
            commune = velociste.commune
        } else {
            commune = "Commune non renseignée"
        }
        if (velociste.code_postal != null) {
            codePostal = velociste.code_postal
        } else {
            codePostal = "Non renseigné"
        }
        if (velociste.mail != null) {
            adresseEmail = velociste.mail
        } else {
            adresseEmail = "Non renseigné"
        }
        // Vérificatios des services Proposés
        const servicesProposes = utils.extraireServices(velociste);
        // Création des cartes HTML // 
        listeVelocistes.innerHTML +=
            `<article class="carte-velociste">
                <h3>${nomEnseigne}</h3> 
                <p>${adresse}, ${codePostal} ${commune}</p> 
                <p>${adresseEmail}</p>
                <section>
                    <h4>Services proposés</h4>
                        <ul>
                            ${servicesProposes.map((service) => `<li>${service}</li>`).join("")}
                        </ul>
                </section>
            </article>`;
    })
    compteur.textContent = `${nbAffiche} velocistes affichés`
}
const liste = await recupererVelociste()
console.log("Nombre de vélocistes :", liste.length);
console.log("Test ECOX :", utils.filtrerParNom(liste, "ECOX").length);
afficherVelociste(liste)

recherche.addEventListener("input", () => {

    const resultats = utils.filtrerParNom(liste, recherche.value.trim())


    afficherVelociste(resultats)
})