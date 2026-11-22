import { filtrerParNom, filtrerVelocistes } from "./utils.js";

/*============================================
     TESTS DE LA FONCTION FILTRER PAR NOM
=============================================*/

const velocistes = [
    { nom_enseigne: "ECOX" },
    { nom_enseigne: "Decathlon" }
];  
const velocistesAvecEspaces = [
    { nom_enseigne: "  ECOX  " },
    { nom_enseigne: "Decathlon" }
];
describe("filtrerParNom", () => {
    it("Retourne le nom du vélociste", () => {
        const resultat = filtrerParNom(velocistes, "ECOX");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX"}]);
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
        expect(resultat).toEqual([{ nom_enseigne: "ECOX"}]);
    }) 
    it("Retourne le nom du vélociste même si le nom contient des espace superflus", () => {
        const resultat = filtrerParNom(velocistesAvecEspaces, "ECOX");
        expect(resultat).toEqual([{ nom_enseigne: "  ECOX  "}]);
    })       
})

/*=========================================================
    TEST DE LA FONCTION FILTRER PAR VELOCISTE ET COMMUNE 
==========================================================*/

const velocistesParVille = [
    { nom_enseigne: "ECOX",
        commune: "Nantes"},
    { nom_enseigne: "Decathlon",
        commune: "Nantes"},
    { nom_enseigne: "ECOX",    
        commune: "Rezé" }
];

describe("filtrerVelocistes", () => {
    it("Retourne les vélocistes correspondant au nom et à la commune", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "ECOX", "Nantes");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX", commune: "Nantes" }])
    })
    it("Retourne tous les vélocistes correspondant au nom de toute les communes", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "ECOX", "");
        expect(resultat).toEqual([{ nom_enseigne: "ECOX", commune: "Nantes" }, { nom_enseigne: "ECOX", commune: "Rezé" }])
    })
    it("Retourne un tableau vide lorsqu'aucun vélociste ne correspond", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "TREK", "Nantes")
        expect(resultat).toEqual([]);
    })    
    it("Retourne un tableau vide lorsqu'aucune commune ne correspond", () => {
        const resultat = filtrerVelocistes(velocistesParVille, "Decathlon", "Clisson")
        expect(resultat).toEqual([]);
    })
})
