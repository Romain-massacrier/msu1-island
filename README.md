# Retro Mod Island

Retro Mod Island est un site statique personnel qui regroupe les projets rétro de Kenedarbz : patches MSU-1, traductions françaises, OST alternatives, modifications de jeux et homebrew.

Le site utilise uniquement HTML, CSS et JavaScript vanilla. Il ne dépend d’aucun framework ni CDN.

## Structure

```text
Retro-Mod-Island/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── projects-data.js
│   ├── project-page.js
│   └── script.js
├── assets/
│   └── images/
│       └── jeux/
├── msu-1/
│   └── index.html
└── releases/
    └── nom-du-projet/
        └── index.html
```

Les anciennes URLs sous `releases/` sont conservées, mais l’interface présente désormais l’ensemble comme des projets.

## Modifier les projets

Tous les projets sont décrits dans le tableau `projects` de `js/projects-data.js`. Une entrée contient les informations communes utilisées sur la carte et la fiche :

```js
{
  slug: "nom-du-projet",
  title: "Nom du projet",
  console: "Console",
  type: "Traduction FR + OST Anime",
  status: "En cours",
  tags: ["Console", "Traduction FR", "OST Anime", "En cours"],
  image: "assets/images/jeux/image.png",
  detailImage: "../../assets/images/jeux/image.png",
  page: "releases/nom-du-projet/",
  description: "Description courte pour la carte.",
  gameInfo: [["Plateforme", "Console"], ["Statut", "En cours"]]
}
```

Les propriétés optionnelles permettent d’adapter chaque fiche sans afficher de section vide :

- `sections` pour les textes, sous-sections et listes propres au projet ;
- `youtube` pour une ou plusieurs vidéos ;
- `download` pour un téléchargement réellement disponible ;
- `availabilityMessage` pour indiquer qu’un projet n’est pas encore téléchargeable ;
- `msuContribution` pour la section « Apport du pack MSU-1 » ;
- `installation` pour les instructions, les informations de ROM et les fichiers attendus ;
- `participation` pour mettre un crédit en évidence.
- `gallery` pour une galerie facultative d’images et de légendes.

Les tableaux `tags` et la propriété `status` alimentent les repères visuels des cartes et des fiches. Si une image n’existe pas encore, le JavaScript affiche automatiquement un placeholder avec le nom du projet.

## Utilisation locale

Ouvrez le dossier dans VS Code, puis lancez `index.html` avec un serveur local comme Live Server. L’usage d’un serveur local est recommandé pour tester les chemins et la politique de sécurité du contenu.

## Note

Les ROMs commerciales ne sont pas fournies. Les liens de téléchargement ne sont affichés que pour les projets réellement publiés.
