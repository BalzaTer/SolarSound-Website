/**
 * SolarSound - Releases Configuration
 * Ce fichier contient les informations sur les versions disponibles
 * Mettez à jour ce fichier lorsque vous publiez de nouvelles versions
 */

const SOLARSOUND_RELEASES = [
    {
        version: '1.5',
        date: '2026-10-16',
        title: 'SolarSound 1.5',
        description: 'Dernière version avec une interface plus soignée, et un nouveau système de favoris !',
        standalone: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.5/SolarSound.exe',
            size: '98 MB'
        },
        installer: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.5/SolarSound_Setup.exe',
            size: '99 MB'
        },
        changes: [
            'Nouvelles icônes',
            'Ajout d\'un système de favoris',
            'Ajout d\'un cadre montrant le morceau suivant',
            'Palettes de couleurs personnalisées désormais enregistrables',
            'Corrections de bugs avec la fenêtre de lecture vidéo'
        ]
    },
    {
        version: '1.4',
        date: '2024-09-15',
        title: 'SolarSound 1.4',
        description: 'Mise à jour majeure avec beaucoup d\'ajout',
        standalone: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.4/SolarSound.exe',  // Remplacez par le vrai chemin
            size: '67 MB'
        },
        installer: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.4/SolarSound_Setup.exe',  // Remplacez par le vrai chemin
            size: '68 MB'
        },
        changes: [
            'Prise en charge de 11 langues désormais',
            'Gestion interne des playlists',
            'Système d\'humeurs pour coller au moment',
            'Bibliothèque pour effectuer des recherches de fichiers',
            'Métadonnées sur CD',
            'Barre de recherche à travers les artistes, titres, albums, playlists etc...'
        ]
    },
    {
        version: '1.3',
        date: '2026-08-28',
        title: 'SolarSound 1.3',
        description: 'Mise à jour importante autant sur les ajouts que les résolutions de bugs',
        standalone: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.3/SolarSound.exe',  // Remplacez par le vrai chemin
            size: '60 MB'
        },
        installer: {
            url: 'https://github.com/BalzaTer/SolarSound/releases/download/1.3/SolarSound_Setup.exe',  // Remplacez par le vrai chemin
            size: '61 MB'
        },
        changes: [
            'Ajout d\'un égaliseur',
            'Réglages de bugs liées aux couleurs personnalisées',
            'Ajouts de 2 type de progressions différentes',
            'Clic gauche et tenu sur la barre de progression fait maintenant bouger le curseur au niveau du pointeur',
            'Ajout de presets de couleurs',
            'Ajout d\'un effet de phase (dans l\'onglet 5.1), pour diffuser ce qui est hors phase vers les surrounds arrières'
        ]
    }
];

// Exporter pour une utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SOLARSOUND_RELEASES;
}

// Rendre disponible dans le navigateur
if (typeof window !== 'undefined') {
    window.SOLARSOUND_RELEASES = SOLARSOUND_RELEASES;
}
