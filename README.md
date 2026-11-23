# Adataviz — Les vélocistes de Nantes Métropole

Application web qui récupère en temps réel les données des **vélocistes de Nantes Métropole** depuis l'API Open Data de Nantes, puis les affiche sous forme de cartes avec recherche par nom et filtre par commune.

Projet individuel — Semaine 8 · Adataviz.

---

## 📋 Présentation

- **Source des données** : [Open Data Nantes Métropole](https://data.nantesmetropole.fr/explore/)
- **Dataset** : `244400404_velocistes-nantes-metropole`
- **API utilisée** : API Explore v2.1 de Nantes Métropole
- **URL appelée** :
  `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_velocistes-nantes-metropole/records?limit=-1`

L'application affiche pour chaque vélociste :

- Le nom de l'enseigne
- L'adresse complète (adresse, code postal, commune)
- L'adresse e-mail de contact
- La liste des services proposés (vente, location, réparation — toutes catégories confondues)

---

## 🚀 Lancer le projet en local

### Prérequis

- [Node.js](https://nodejs.org/) (pour les tests Jest)
- Un serveur local pour ouvrir la page dans le navigateur

### Étapes

1. **Cloner le dépôt**

   git clone <https://github.com/bounsysisouk/adataviz.git>

2. Installer les dépendances (Jest uniquement)

   npm install

3. Lancer un serveur local
   Avec l'extension Live Server de VS Code : clic droit sur index.html → Open with Live Server.
   Ou en ligne de commande :

   npx live-server

   ⚠️ Un double-clic sur index.html ne fonctionne pas : les scripts type="module" sont bloqués par le navigateur en mode file://.

4. Lancer les tests

   npm test


5. Lien

🔗 [Voir le site en ligne](https://adataviz-bouns.netlify.app)   

---

📁 Structure du projet

```
adataviz/
├── index.html        ← structure de la page
├── style.css         ← mise en forme
├── main.js           ← fetch, manipulation du DOM, écoute des événements
├── utils.js          ← fonctions pures (formatage, filtres, extraction)
├── utils.test.js     ← tests Jest
├── package.json      ← configuration npm + Jest
└── README.md         ← ce fichier
```

Le principe clé : séparer la logique testable (utils.js) de l'affichage (main.js).

· utils.js contient des fonctions pures : elles prennent des données et retournent des données, sans toucher au DOM ni au réseau. C'est ce qu'on teste avec Jest.
· main.js contient le fetch et la manipulation du DOM. Il n'est pas testé car il dépend du réseau et du navigateur.

---

⚙️ Fonctionnalités

Obligatoires

· ✅ Récupération des données depuis l'API avec fetch et async/await
· ✅ Affichage d'une carte par vélociste : nom, adresse, commune, code postal, e-mail, services
· ✅ Affichage du nombre total de vélocistes affichés
· ✅ Gestion des erreurs HTTP (try/catch, response.ok)

Bonus réalisés

· ✅ Recherche par nom (insensible à la casse, tolère les espaces superflus)
· ✅ Filtre par commune (liste déroulante peuplée dynamiquement depuis les données)
· ✅ Combinaison recherche + filtre commune
· ✅ Extraction automatique des services : « Vente de vélos », « Location de vélos », « Réparation »
· ✅ Filtrage des entrées sans nom ou sans adresse pour ne pas afficher de cartes vides

---

🧪 Tests Jest

Les tests couvrent les fonctions pures de utils.js :

Fonction Ce qui est testé
filtrerParNom correspondance, casse insensible, espaces, résultat vide
filtrerVelocistes combinaison nom + commune, filtre vide, aucun résultat
extraireServices détection vente / location / réparation, cumul
formaterDonnee formatage complet + valeurs par défaut si champ manquant

Commande :

```bash
npm test
```

Le script Jest est lancé avec node --experimental-vm-modules pour supporter les modules ES ("type": "module").

---

🧠 Choix techniques et pistes écartées

· Choix du dataset : « vélocistes » parce que les champs sont riches (adresse, commune, services) et le volume raisonnable pour une visualisation en cartes.
· limit=-1 : permet de récupérer l'intégralité des enregistrements du dataset d'un coup (petit volume), plutôt que de paginer.
· Set + spread pour la liste des communes : élimine les doublons sans dépendance externe.
· ?? (nullish coalescing) dans formaterDonnee pour les valeurs par défaut — plus précis que || quand un champ peut valoir 0 ou "".
· Fonctions pures dans utils.js pour rendre les tests Jest indépendants du DOM et du réseau.

---

👤 Auteur

Bounsy Sisouk — 2026

