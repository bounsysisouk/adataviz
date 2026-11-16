export const verifierDossier = (chemin) => existsSync(chemin)

//STATUT D'UN PROJET

export const afficherStatut = (nom, ok) => {
  const icone = ok ? "✅" : "❌"
  console.log(`${icone} dossier du projet ${nom}`)
}
/*
afficherStatut("adapage", true)
afficherStatut("adalgo",  false)
*/

//LISTE D'ERREURS

export const afficherErreurs = (erreurs) => {
  erreurs.forEach((e) => console.log(`- ${e}`))
}
/*
afficherErreurs(["le repository git n'est pas initialisé", "il manque index.js"])
*/

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

//POURCENTAGE ARRONDI

export const afficherPourcentage = (ok, total) => {
  const pct   = Math.round((ok / total) * 100)
  const icone = ok === total ? "✅" : "❌"
  console.log(`${icone} ${pct}% des projets sont initialisés correctement (${ok}/${total})`)
}
/*
afficherPourcentage(2,  12)
afficherPourcentage(12, 12)
*/

//AFFICHER UN BLOC PROJET

export const icone = projet.ok ? "✅" : "❌"
console.log(`${icone} dossier du projet ${projet.nom}`)
projet.erreurs.forEach((e) => console.log(`- ${e}`))


const config = {
    "version" : 1.0,
};

export default config