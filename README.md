# SolarSound Website

Ce dossier contient le site web de présentation du projet SolarSound.

## Structure

```
webpage/
├── index.html          # Page d'accueil
├── download.html       # Page de téléchargement
├── presentation.html   # Page de présentation
├── contact.html        # Page de contact
├── assets/
│   ├── css/
│   │   └── style.css   # Styles CSS avec le thème orange/jaune
│   ├── js/
│   │   └── main.js     # JavaScript principal (formulaire, animations, etc.)
│   ├── images/
│   │   ├── logo.png    # Logo de l'application
│   │   └── solarsound.ico # Icône de l'application
└── README.md           # Ce fichier
```

## Fonctionnalités

Le site est disponible uniquement en français.

### Pages

1. **Accueil** (`index.html`)
   - Présentation du projet
   - Caractéristiques principales avec icônes
   - Captures d'écran

2. **Téléchargement** (`download.html`)
   - Dernière version en haut
   - Versions précédentes avec accordéons pour le changelog
   - Liens de téléchargement (portable et installateur)

3. **Présentation** (`presentation.html`)
   - Introduction et histoire du projet
   - Technologies utilisées
   - Aperçu des fonctionnalités
   - Captures d'écran supplémentaires

4. **Contact** (`contact.html`)
   - Formulaire de contact (envoie vers dev.hcstudio@gmail.com)
   - Adresse email directe
   - FAQ

### Thème
Le site utilise le même thème que l'application :
- Couleurs principales : orange (#ff9500) et jaune (#ffcc00)
- Fond sombre pour un look moderne
- Animations fluides
- Effets de survol
- Icônes inspirées de l'application

## Personnalisation

### Mettre à jour les releases

Modifiez la liste `SOLARSOUND_RELEASES` dans `assets/js/releases.js` :

```javascript
const SOLARSOUND_RELEASES = [
    {
        version: '1.6',
        date: 'YYYY-MM-DD',
        title: 'SolarSound 1.6',
        description: 'Description de la version',
        standalone: {
            url: 'chemin/vers/SolarSound.exe',
            size: '102 MB'
        },
        installer: {
            url: 'chemin/vers/SolarSound_Setup.exe',
            size: '103 MB'
        },
        changes: [
            'Changement 1',
            'Changement 2',
            // ...
        ]
    },
    // Versions précédentes
];
```

### Mettre à jour les captures d'écran

Les captures d'écran sont chargées depuis les URLs GitHub. Vous pouvez :
1. Remplacer les URLs par vos propres images
2. Ajouter des images locales dans `assets/images/`

## Utilisation

### Pour tester localement

Sous Windows, ouvrez PowerShell dans ce dossier et lancez `.\demarrer-serveur.ps1`. Le navigateur ouvrira le site à l'adresse `http://127.0.0.1:8000/`. Gardez la fenêtre du serveur ouverte pendant la visite, puis appuyez sur `Ctrl+C` pour l'arrêter. Pour choisir un autre port, utilisez par exemple `.\demarrer-serveur.ps1 -Port 8080`.

Python doit être installé et disponible via `py` ou `python`.

### Pour héberger le site

Copiez le dossier `webpage` sur votre serveur web. Aucune configuration serveur particulière n'est nécessaire car le site est entièrement statique.

### Pour mettre à jour avec de nouvelles releases

1. Copiez les fichiers `.exe` et `.exe` de l'installateur dans un dossier accessible
2. Mettez à jour les chemins dans `assets/js/main.js`
3. Mettez à jour la liste des changements (changelog) pour chaque version

## Technologies utilisées

- **HTML5** : Structure des pages
- **CSS3** : Styles et animations
- **Vanilla JavaScript** : Interactivité sans dépendances
Aucune bibliothèque externe n'est utilisée, ce qui rend le site léger et rapide.

## Notes

- Le formulaire de contact envoie les messages via FormSubmit, un service tiers compatible avec GitHub Pages. À la première soumission, FormSubmit envoie un e-mail de confirmation à `dev.hcstudio@gmail.com` : confirmez cette adresse pour activer l’envoi. Les données et les pièces jointes lui sont transmises. La taille cumulée des pièces jointes est limitée à 10 Mo par FormSubmit.
- Les téléchargements pointent vers des chemins locaux. Pour un site hébergé, utilisez des URLs absolues ou configurez correctement les chemins relatifs.
- Les captures d'écran sont actuellement chargées depuis GitHub. Pour un site de production, hébergez les images localement.

## Contribuer

Les contributions au site web sont les bienvenues ! Vous pouvez :
- Corriger des bugs dans le code HTML/CSS/JS
- Ajouter de nouvelles fonctionnalités
- Améliorer le design

## Licence

Ce site web fait partie du projet SolarSound et est sous la même licence.
