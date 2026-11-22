// RECHERCHE PAR NOM

export const filtrerParNom = (velocistes, recherche) => {
    return velocistes.filter((velociste) => {
        return velociste.nom_enseigne != null &&
            velociste.nom_enseigne.toLowerCase().includes(recherche.toLowerCase());
    });
};

// COMBINE RECHERHCE PAR NOM ET COMMUNE

export const filtrerVelocistes = (velocistes, recherche, commune) => {
    const parNom = filtrerParNom(velocistes, recherche);

    if (commune === "") {
        return parNom
    }
    return parNom.filter((velociste) => {
        return velociste.commune === commune;
    });
};

// EXTRAIRE SERVICES

export const extraireServices = (velociste) => {
    const services = []
    // Regroupe les champs de l'API concernant la vente 
    const champsVente = [
        velociste.vente_classique_mecanique,
        velociste.vente_classique_vae,
        velociste.vente_cargo_mecanique,
        velociste.vente_cargo_ae,
        velociste.vente_pliant_mecanique,
        velociste.vente_pliant_ae
    ];
    // Regroupe les champs de l'API concernant la location    
    const champsLocation = [
        velociste.location_classique_mecanique,
        velociste.location_classique_vae,
        velociste.location_cargo_mecanique,
        velociste.location_cargo_ae,
        velociste.location_pliant_mecanique,
        velociste.location_pliant_ae
    ];
    // Regroupe le champ de l'API concernant la réparation
    const champsReparations = [
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

// FORMATER LES DONNEES (TRANSFORME DES DONNEE DE L'API)

export const formaterDonnee = (item) => {
    return {
        nomEnseigne: item.nom_enseigne ?? "Nom manquant",
        adresse: item.adresse ?? "Adresse non renseignée",
        commune: item.commune ?? "Commune non renseignée",
        codePostal: item.code_postal ?? "Non renseigné",
        adresseEmail: item.mail ?? "Email non renseigné",
        services: extraireServices(item)
    };
};





const config = {
    "version": 1.0,
    filtrerParNom,
    filtrerVelocistes,
    extraireServices,
    formaterDonnee

};


export default config