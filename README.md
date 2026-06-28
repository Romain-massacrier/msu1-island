# MSU1-Island

Site web statique pour présenter des releases MSU-1 Super Nintendo, afficher des vidéos de démonstration YouTube et proposer des liens Google Drive.

## Structure

```text
MSU1-Island/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

## Modifier les releases

Toutes les releases sont dans le tableau `releases` du fichier `js/script.js`.

Exemple d’entrée :

```js
{
  title: "Nom du jeu MSU-1",
  console: "Super Nintendo",
  region: "FR",
  status: "Disponible",
  description: "Description courte du pack.",
  image: "assets/images/mon-image.jpg",
  youtubeUrl: "https://www.youtube.com/watch?v=TON_ID_VIDEO",
  googleDriveUrl: "https://drive.google.com/drive/folders/TON_DOSSIER"
}
```

Si `image` est vide, le site affiche automatiquement une image placeholder.

## Utilisation locale

Ouvre le dossier dans VS Code, puis lance `index.html` avec l’extension Live Server.

Le site utilise uniquement HTML, CSS et JavaScript vanilla. Aucun framework ni CDN obligatoire.

## Note

Les ROMs commerciales ne sont pas fournies. Les packs contiennent uniquement les fichiers nécessaires au projet MSU-1.
