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
│   │   └── main.js     # JavaScript principal (gestion des langues, formulaire, etc.)
│   ├── images/
│   │   ├── logo.png    # Logo de l'application
│   │   └── solarsound.ico # Icône de l'application
│   └── locales/
│       ├── fr.json     # Traductions Français
│       ├── en.json     # Traductions English
│       ├── de.json     # Traductions Deutsch
│       ├── es.json     # Traductions Español
│       ├── it.json     # Traductions Italiano
│       ├── cn.json     # Traductions 中文
│       └── ru.json     # Traductions Русский
└── README.md           # Ce fichier
```

## Fonctionnalités

### Multilingue
Le site supporte 7 langues : Français, English, Deutsch, Español, Italiano, 中文, Русский.

- La langue par défaut est le Français
- La langue sélectionnée est sauvegardée dans le localStorage
- Tous les textes sont traduits via des fichiers JSON dans `assets/locales/`

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

### Ajouter une nouvelle langue

1. Créez un fichier `assets/locales/xx.json` (où xx est le code de la langue)
2. Traduisiez tous les textes en utilisant les mêmes clés que dans les autres fichiers
3. Ajoutez l'option dans le sélecteur de langue dans le header de chaque page HTML

### Mettre à jour les releases

Modifiez le fichier `assets/js/main.js` dans la classe `DownloadManager` :

```javascript
this.releases = [
    {
        version: 'X.Y.Z',
        date: 'YYYY-MM-DD',
        title: 'SolarSound X.Y.Z',
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
    // ... autres versions
];
```

### Mettre à jour les captures d'écran

Les captures d'écran sont chargées depuis les URLs GitHub. Vous pouvez :
1. Remplacer les URLs par vos propres images
2. Ajouter des images locales dans `assets/images/`

## Utilisation

### Pour tester localement

Ouvrez simplement les fichiers HTML dans votre navigateur :
```bash
# Sous Windows
start webpage/index.html

# Sous Linux/Mac
xdg-open webpage/index.html  # Linux
open webpage/index.html      # Mac
```

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
- **JSON** : Fichiers de traduction

Aucune bibliothèque externe n'est utilisée, ce qui rend le site léger et rapide.

## Notes

- Le formulaire de contact utilise `mailto:` pour envoyer les messages. Pour une solution plus avancée, vous pourriez implémenter un backend avec PHP, Node.js, ou un service comme Formspree.
- Les téléchargements pointent vers des chemins locaux. Pour un site hébergé, utilisez des URLs absolues ou configurez correctement les chemins relatifs.
- Les captures d'écran sont actuellement chargées depuis GitHub. Pour un site de production, hébergez les images localement.

## Contribuer

Les contributions au site web sont les bienvenues ! Vous pouvez :
- Améliorer les traductions
- Corriger des bugs dans le code HTML/CSS/JS
- Ajouter de nouvelles fonctionnalités
- Améliorer le design

## Licence

Ce site web fait partie du projet SolarSound et est sous la même licence.
