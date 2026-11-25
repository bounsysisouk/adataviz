import utils from "./utils.js"

export const afficherVelociste = (liste) => {
    const listeVelocistes = document.getElementById("liste-velocistes")
    const compteur = document.getElementById("compteur")
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


const config = {
    "version": 1.0,
    afficherVelociste
}    

export default config 