//FORMATER UNE LISTE

export const formaterListe = (items) => {
  if (items.length === 1) return items[0]
  if (items.length === 2) return items.join(" et ")
  const debut = items.slice(0, -1).join(", ")
  return debut + " et " + items.at(-1)
}
/*
console.log(formaterListe(["index.js"]))
console.log(formaterListe(["index.js", "style.css"]))
console.log(formaterListe(["a", "b", "c"]))
*/

//MESSAGE FICHIERS MANQUANTS

export const messageFichiers = (manquants) => `il manque ${formaterListe(manquants)}`
/*
console.log(messageFichiers(["index.js"]))
console.log(messageFichiers(["index.js", "style.css"]))
*/

// FILTRER PAR NOM

export const filtrerParNom = (velocistes, recherche) => {
    return velocistes.filter((velociste) => {
      return velociste.nom_enseigne != null &&
          velociste.nom_enseigne.toLowerCase().includes(recherche.toLowerCase());
    });
};
// EXTRAIRE SERVICES

export const extraireServices = (velociste) => {
    const services = []
    // Regroupe les champs de l'API concernant la vente 
    const champsVente =[
        velociste.vente_classique_mecanique,
        velociste.vente_classique_vae,
        velociste.vente_cargo_mecanique,
        velociste.vente_cargo_ae,
        velociste.vente_pliant_mecanique,
        velociste.vente_pliant_ae
    ];
    // Regroupe les champs de l'API concernant la location    
    const champsLocation =[
        velociste.location_classique_mecanique,
        velociste.location_classique_vae,
        velociste.location_cargo_mecanique,
        velociste.location_cargo_ae,
        velociste.location_pliant_mecanique,
        velociste.location_pliant_ae
    ];
    // Regroupe le champ de l'API concernant la réparation
    const champsReparations =[
        velociste.reparation_hors_sav,
        velociste.rdv_reparation
    ];

    if (champsVente.some((valeur) => valeur === 1)) {
            services.push("Vente de vélos");
    }
    if (champsLocation.some((valeur) => valeur === 1)) {
            services.push("Location de vélos");    
    }
    if (champsReparations.some((valeur) => valeur === 1)) {
            services.push("Réparation");
    }
    return services;
};

   
   
   
 


const config = {
    "version" : 1.0,
    filtrerParNom,
    extraireServices

};


export default config