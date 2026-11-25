import { extraireServices, filtrerParNom, filtrerVelocistes, formaterDonnee } from "./utils.js";

/*============================================
     TESTS DE LA FONCTION FILTRER PAR NOM
=============================================*/

describe("filtrerParNom", () => {
    const velocistes = [
        { nom_enseigne: "ECOX" },
        { nom_enseigne: "Decathlon" }
    ];
    const velocistesAvecEspaces = [
        { nom_enseigne: "  ECOX  " },
        { nom_enseigne: "Decathlon" }
    ];
    it("Retourne le nom du vélociste", () => {
        const resultat = filtrerParNom(velocistes, "ECOX");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX" }]);
    })
    it("Retourne un tableau vide lorsqu'aucun vélociste ne correspond", () => {
        const resultat = filtrerParNom(velocistes, "TREK");
        expect(resultat).toEqual([]);
    })
    it("Retourne tous les vélocistes lorsque la recherche est vide", () => {
        const resultat = filtrerParNom(velocistes, "");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX" }, { nom_enseigne: "Decathlon" }]);
    })
    it("Retourne le nom du vélociste en enlevant les espace devant et derriere", () => {
        const resultat = filtrerParNom(velocistes, "  ECOX  ");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX" }]);
    })
    it("Retourne le nom du vélociste même si le nom contient des espace superflus", () => {
        const resultat = filtrerParNom(velocistesAvecEspaces, "ECOX");
        expect(resultat).toEqual([{ nom_enseigne: "  ECOX  " }]);
    })
})

/*=========================================================
    TEST DE LA FONCTION FILTRER PAR VELOCISTE ET COMMUNE 
==========================================================*/

describe("filtrerVelocistes", () => {
    const velocistesParVille = [
        {
            nom_enseigne: "ECOX",
            commune: "Nantes"
        },
        {
            nom_enseigne: "Decathlon",
            commune: "Nantes"
        },
        {
            nom_enseigne: "ECOX",
            commune: "Rezé"
        }
    ];

    it("Retourne les vélocistes correspondant au nom et à la commune", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "ECOX", "Nantes");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX", commune: "Nantes" }]);
    })
    it("Retourne tous les vélocistes correspondant au nom de toute les communes", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "ECOX", "");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX", commune: "Nantes" }, { nom_enseigne: "ECOX", commune: "Rezé" }])
    })
    it("Retourne un tableau vide lorsqu'aucun vélociste ne correspond", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "TREK", "Nantes");
        expect(resultat).toEqual([]);
    })
    it("Retourne un tableau vide lorsqu'aucune commune ne correspond", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "Decathlon", "Clisson");
        expect(resultat).toEqual([]);
    })
})

/*===========================================================
    TESTS DE LA FONCTION EXTRAIRE SERVICES 
=============================================================*/

describe("extraireServices", () => {
    const velociste = {
        vente_classique_mecanique: 1
    };
    const velocisteLocation = {
        location_classique_mecanique: 1
    };
    const velocisteReparation = {
        reparation_hors_sav: 1,
        rdv_reparation: 0
    };
    const velocisteCompletVae = {
        vente_classique_vae: 1,
        location_classique_vae: 1,
        reparation_hors_sav: 1,
        rdv_reparation: 0
    };

    it("Retourne vente de vélos si la valeur est trouvé", () => {
        const resultat = extraireServices(velociste);
        expect(resultat).toEqual(["Vente de vélos"]);
    })
    it("Retourne Location de vélos si la valeur est trouvé", () => {
        const resultat = extraireServices(velocisteLocation);
        expect(resultat).toEqual(["Location de vélos"]);
    })
    it("Retourne Réparation si la valeur est trouvé", () => {
        const resultat = extraireServices(velocisteReparation);
        expect(resultat).toEqual(["Réparation"]);
    })
    it("Retourne Vente locacation Réparation si la valeur est trouvé", () => {
        const resultat = extraireServices(velocisteCompletVae);
        expect(resultat).toEqual(["Vente de vélos", "Location de vélos", "Réparation"]);
    })
});

/*===========================================================
        TEST DE LA FONCTION FORMATER DONNEE
=============================================================*/

describe("formaterDonnee", () => {
    const donneeVelociste = {
        objectid: 25,
        nom_enseigne: "VELO HORIZON",
        adresse: "360 Boulevard Marcel Paul",
        commune: "Saint-Herblain",
        code_postal: "44000",
        mail: "denis@velo-horizon.fr"
    };
    const donneeVelocisteIncomplet = {
        objectid: 26,
        nom_enseigne: "VELO HORIZON"
    };

    it("Retourne données renseignée lorsque le donnees sont présentes", () => {
        const resultat = formaterDonnee(donneeVelociste);
        expect(resultat).toEqual({
            id: "25",
            nomEnseigne: "VELO HORIZON",
            adresse: "360 Boulevard Marcel Paul",
            commune: "Saint-Herblain",
            codePostal: "44000",
            adresseEmail: "denis@velo-horizon.fr",
            services: []
        });
    })
    it("Retourne Donnée manquantes lorsqu'il manque des données", () => {
        const resultat = formaterDonnee(donneeVelocisteIncomplet);
        expect(resultat).toEqual({
            id: "26",
            nomEnseigne: "VELO HORIZON",
            adresse: "Adresse non renseignée",
            commune: "Commune non renseignée",
            codePostal: "Non renseigné",
            adresseEmail: "Email non renseigné",
            services: []
        });
    })
    it("Renvoie un id pour chaque enregistrement", () => {
        const resultat = formaterDonnee(donneeVelociste);
        expect(resultat.id).toBeDefined();
        expect(typeof resultat.id).toBe("string");
    })
    it("Renvoie des ids uniques", () => {
        const ids = [donneeVelociste, donneeVelocisteIncomplet].map((item) =>
            formaterDonnee(item).id);
        expect(new Set(ids).size).toBe(ids.length)
    })
})