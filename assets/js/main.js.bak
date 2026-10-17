/**
 * SolarSound Website - Main JavaScript
 * Handles language switching, animations, contact form, and UI interactions
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
    defaultLanguage: 'fr',
    contactEmail: 'dev.hcstudio@gmail.com',
    supportedLanguages: ['fr', 'en', 'de', 'es', 'it', 'cn', 'ru'],
    animationsEnabled: true,
    githubRepo: 'https://github.com/BalzaTer/SolarSound',
    githubLicense: 'https://github.com/BalzaTer/SolarSound?tab=MIT-1-ov-file'
};

// ============================================
// Translations - Loaded synchronously
// ============================================
const TRANSLATIONS = {
    fr: {
        site: {
            title: "SolarSound - Lecteur Audio & Vidéo 5.1",
            description: "SolarSound est un lecteur audio et vidéo avancé avec support complet du son surround 5.1",
            keywords: "lecteur audio, lecteur vidéo, surround 5.1, musique, égaliseur, playlist"
        },
        nav: {
            home: "Accueil",
            download: "Téléchargement",
            presentation: "Présentation",
            contact: "Contact"
        },
        hero: {
            title: "SolarSound",
            subtitle: "Lecteur Audio & Vidéo 5.1 Ultime",
            description: "Écoutez votre musique et regardez vos vidéos avec une qualité exceptionnelle et un contrôle total sur votre expérience audio.",
            ctaDownload: "Télécharger Maintenant",
            ctaLearn: "En Savoir Plus"
        },
        features: {
            title: "Fonctionnalités Principales",
            subtitle: "Tout ce dont vous avez besoin pour une expérience audio parfaite",
            audio: { title: "Lecture Audio Avancée", description: "Support de nombreux formats audio (WAV, MP3, etc.) avec visualisation spectrale et gestion avancée de la lecture." },
            video: { title: "Lecture Vidéo", description: "Lecture de vidéos en MP4, MKV, AVI, MOV, WMV et plus, avec vitesse variable et sous-titres." },
            surround: { title: "Son Surround 5.1", description: "Réglage précis de chaque enceinte, mixage mono vers caisson de basse, et effets audio immersifs." },
            equalizer: { title: "Égaliseur Personnalisable", description: "8 bandes d'égalisation, presets personnalisés, et mode libre pour créer votre propre courbe sonore." },
            playlist: { title: "Gestion de Playlists", description: "Créez, organisez et gérez vos playlists avec recherche globale et indexation automatique." },
            rotation: { title: "Effets de Rotation", description: "Faites tourner le son autour de vous avec des effets uniques pour une expérience immersive." },
            moods: { title: "Humeurs", description: "Choisissez des humeurs associées à vos playlists et lancez plus rapidement les musiques qui correspondent au moment" },
            favorites: { title: "Favoris", description: "Marquez vos morceaux favoris et lancez-les plus rapidement depuis l'onglet principal" },
            settings: { title: "Des tonnes de paramètres", description: "De la police d'écriture aux thèmes de couleurs en passant par le lancement au démarrage de l'ordinateur avec vos musiques. Vous maîtrisez tout !" }
        },
        download: {
            title: "Télécharger SolarSound",
            subtitle: "Disponible pour Windows - Version portable ou installateur",
            latest: "Dernière Version",
            oldReleases: "Versions Précédentes",
            seeChanges: "Voir les changements",
            standalone: "Version Portable (EXE)",
            installer: "Installateur",
            note: "L'installateur propose une case à cocher optionnelle pour associer les fichiers audio et vidéo pris en charge à SolarSound."
        },
        presentation: {
            title: "Présentation de SolarSound",
            subtitle: "Découvrez pourquoi SolarSound est le lecteur multimédia ultime",
            intro: "SolarSound a été créé pour répondre à un besoin personnel : écouter de la musique en surround 5.1 avec des options de réglage précises. N'ayant pas trouvé de solution satisfaisante dans les logiciels existants comme VLC, j'ai décidé de créer mon propre lecteur.",
            story: { title: "Notre Histoire", content: "Ce projet a commencé comme un simple experiment personnel. Aujourd'hui, il est devenu un lecteur multimédia complet avec des fonctionnalités avancées pour la lecture audio et vidéo. Tout est développé en Python, avec l'aide de l'IA pour certaines parties, mais toujours avec attention au détail et à la qualité." },
            technology: { title: "Technologies Utilisées", content: "SolarSound utilise PyQt6 pour son interface graphique, avec des bibliothèques audio spécialisées comme sounddevice, soundfile, et mutagen pour la gestion des fichiers multimédias. L'interface est entièrement personnalisable avec des thèmes de couleurs et des polices adaptables." },
            future: { title: "Futur du Projet", content: "Nous travaillons constamment sur de nouvelles fonctionnalités : support de plus de formats, amélioration des effets audio, interface plus intuitive, et support multiplateforme. Vos retours sont les bienvenus pour orienter le développement." }
        },
        contact: {
            title: "Contactez-Nous",
            subtitle: "Des questions, des suggestions ou besoin d'aide ?",
            formTitle: "Envoyez-nous un message",
            name: "Nom",
            email: "Adresse Email",
            subject: "Sujet",
            message: "Votre Message",
            send: "Envoyer le Message",
            sending: "Envoi en cours...",
            success: "Message envoyé ! Veuillez vérifier votre client de messagerie.",
            error: "Une erreur est survenue. Veuillez réessayer.",
            note: "Nous vous répondrons dans les plus brefs délais."
        },
        footer: {
            description: "SolarSound est un projet open source dédié à fournir la meilleure expérience de lecture audio et vidéo.",
            links: "Liens rapides",
            github: "GitHub",
            license: "Licence",
            privacy: "Politique de Confidentialité",
            copyright: "© 2024 SolarSound. Tous droits réservés."
        }
    },
    en: {
        site: {
            title: "SolarSound - 5.1 Audio & Video Player",
            description: "SolarSound is an advanced audio and video player with full 5.1 surround sound support",
            keywords: "audio player, video player, 5.1 surround, music, equalizer, playlist"
        },
        nav: { home: "Home", download: "Download", presentation: "Presentation", contact: "Contact" },
        hero: {
            title: "SolarSound",
            subtitle: "Ultimate 5.1 Audio & Video Player",
            description: "Listen to your music and watch your videos with exceptional quality and full control over your audio experience.",
            ctaDownload: "Download Now",
            ctaLearn: "Learn More"
        },
        features: {
            title: "Key Features",
            subtitle: "Everything you need for the perfect audio experience",
            audio: { title: "Advanced Audio Playback", description: "Support for many audio formats (WAV, MP3, etc.) with spectral visualization and advanced playback management." },
            video: { title: "Video Playback", description: "Play videos in MP4, MKV, AVI, MOV, WMV and more, with variable speed and subtitles." },
            surround: { title: "5.1 Surround Sound", description: "Precise adjustment of each speaker, mono mixing to subwoofer, and immersive audio effects." },
            equalizer: { title: "Customizable Equalizer", description: "8-band equalizer, custom presets, and free mode to create your own sound curve." },
            playlist: { title: "Playlist Management", description: "Create, organize, and manage your playlists with global search and automatic indexing." },
            rotation: { title: "Rotation Effects", description: "Rotate sound around you with unique effects for an immersive experience." },
            moods: { title: "Moods", description: "Choose moods associated with your playlists and launch music that matches the moment faster" },
            favorites: { title: "Favorites", description: "Mark your favorite tracks and launch them faster from the main tab" },
            settings: { title: "Tons of Settings", description: "From fonts to color themes to auto-start with your music when the computer boots. You control everything!" }
        },
        download: {
            title: "Download SolarSound",
            subtitle: "Available for Windows - Portable version or installer",
            latest: "Latest Version",
            oldReleases: "Previous Versions",
            seeChanges: "See changes",
            standalone: "Portable Version (EXE)",
            installer: "Installer",
            note: "The installer offers file association for audio/video files with SolarSound."
        },
        presentation: {
            title: "SolarSound Presentation",
            subtitle: "Discover why SolarSound is the ultimate media player",
            intro: "SolarSound was created to meet a personal need: listening to music in 5.1 surround sound with precise adjustment options. Not finding a satisfactory solution in existing software like VLC, I decided to create my own player.",
            story: { title: "Our Story", content: "This project started as a simple personal experiment. Today, it has become a complete media player with advanced features for audio and video playback. Everything is developed in Python, with the help of AI for some parts, but always with attention to detail and quality." },
            technology: { title: "Technologies Used", content: "SolarSound uses PyQt6 for its graphical interface, with specialized audio libraries such as sounddevice, soundfile, and mutagen for multimedia file management. The interface is fully customizable with color themes and adaptable fonts." },
            future: { title: "Project Future", content: "We are constantly working on new features: support for more formats, improved audio effects, more intuitive interface, and cross-platform support. Your feedback is welcome to guide development." }
        },
        contact: {
            title: "Contact Us",
            subtitle: "Questions, suggestions, or need help?",
            formTitle: "Send us a message",
            name: "Name",
            email: "Email Address",
            subject: "Subject",
            message: "Your Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Message sent! Please check your email client.",
            error: "An error occurred. Please try again.",
            note: "We will respond as soon as possible."
        },
        footer: {
            description: "SolarSound is an open source project dedicated to providing the best audio and video playback experience.",
            links: "Quick Links",
            github: "GitHub",
            license: "License",
            privacy: "Privacy Policy",
            copyright: "© 2024 SolarSound. All rights reserved."
        }
    },
    de: {
        site: {
            title: "SolarSound - 5.1 Audio & Video Player",
            description: "SolarSound ist ein fortschrittlicher Audio- und Videoplayer mit voller 5.1-Surround-Sound-Unterstützung",
            keywords: "Audio-Player, Video-Player, 5.1 Surround, Musik, Equalizer, Playlist"
        },
        nav: { home: "Startseite", download: "Download", presentation: "Präsentation", contact: "Kontakt" },
        hero: {
            title: "SolarSound",
            subtitle: "Ultimativer 5.1 Audio & Video Player",
            description: "Hören Sie Ihre Musik und sehen Sie sich Ihre Videos mit herausragender Qualität und voller Kontrolle über Ihr Hörerlebnis an.",
            ctaDownload: "Jetzt herunterladen",
            ctaLearn: "Mehr erfahren"
        },
        features: {
            title: "Hauptmerkmale",
            subtitle: "Alles, was Sie für das perfekte Audio-Erlebnis benötigen",
            audio: { title: "Fortgeschrittene Audio-Wiedergabe", description: "Unterstützung für viele Audioformate (WAV, MP3, usw.) mit Spektralvisualisierung und erweiterter Wiedergabeverwaltung." },
            video: { title: "Video-Wiedergabe", description: "Wiedergabe von Videos in MP4, MKV, AVI, MOV, WMV und mehr mit variabler Geschwindigkeit und Untertiteln." },
            surround: { title: "5.1 Surround-Sound", description: "Präzise Einstellung jedes Lautsprechers, Mono-Mixing zum Subwoofer und immersive Audioeffekte." },
            equalizer: { title: "Anpassbarer Equalizer", description: "8-Band-Equalizer, benutzerdefinierte Voreinstellungen und freier Modus, um Ihre eigene Klangkurve zu erstellen." },
            playlist: { title: "Playlist-Verwaltung", description: "Erstellen, organisieren und verwalten Sie Ihre Playlists mit globaler Suche und automatischer Indizierung." },
            rotation: { title: "Rotationseffekte", description: "Lassen Sie den Klang um sich herum rotieren mit einzigartigen Effekten für ein immersives Erlebnis." },
            moods: { title: "Stimmungen", description: "Wählen Sie Stimmungen, die zu Ihren Playlists passen, und starten Sie schneller Musik, die zum Moment passt" },
            favorites: { title: "Favoriten", description: "Markieren Sie Ihre Lieblingstitel und starten Sie sie schneller vom Haupttab aus" },
            settings: { title: "Viele Einstellungen", description: "Von Schriftarten über Farbthemen bis zum Autostart mit Ihrer Musik beim Hochfahren des Computers. Sie haben die volle Kontrolle!" }
        },
        download: {
            title: "SolarSound herunterladen",
            subtitle: "Verfügbar für Windows - Portable Version oder Installer",
            latest: "Neueste Version",
            oldReleases: "Frühere Versionen",
            seeChanges: "Änderungen anzeigen",
            standalone: "Portable Version (EXE)",
            installer: "Installer",
            note: "Der Installer bietet die Dateizuordnung für Audio-/Videodateien mit SolarSound an."
        },
        presentation: {
            title: "SolarSound Präsentation",
            subtitle: "Entdecken Sie, warum SolarSound der ultimative Medienplayer ist",
            intro: "SolarSound wurde erstellt, um ein persönliches Bedürfnis zu erfüllen: Musik in 5.1-Surround-Sound mit präzisen Einstellungsoptionen zu hören. Da ich in bestehenden Programmen wie VLC keine zufriedenstellende Lösung gefunden habe, habe ich beschlossen, meinen eigenen Player zu erstellen.",
            story: { title: "Unsere Geschichte", content: "Dieses Projekt begann als einfaches persönliches Experiment. Heute ist es zu einem vollständigen Medienplayer mit fortschrittlichen Funktionen für die Audio- und Videowiedergabe geworden." },
            technology: { title: "Verwendete Technologien", content: "SolarSound verwendet PyQt6 für seine grafische Oberfläche und spezialisierte Audiobibliotheken wie sounddevice, soundfile und mutagen für die Verwaltung von Multimediadateien." },
            future: { title: "Zukunft des Projekts", content: "Wir arbeiten ständig an neuen Funktionen: Unterstützung für mehr Formate, verbesserte Audioeffekte, intuitivere Oberfläche und plattformübergreifende Unterstützung." }
        },
        contact: {
            title: "Kontaktieren Sie uns",
            subtitle: "Fragen, Vorschläge oder brauchen Sie Hilfe?",
            formTitle: "Senden Sie uns eine Nachricht",
            name: "Name",
            email: "E-Mail-Adresse",
            subject: "Betreff",
            message: "Ihre Nachricht",
            send: "Nachricht senden",
            sending: "Wird gesendet...",
            success: "Nachricht gesendet! Bitte überprüfen Sie Ihren E-Mail-Client.",
            error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
            note: "Wir werden so schnell wie möglich antworten."
        },
        footer: {
            description: "SolarSound ist ein Open-Source-Projekt, das sich der Bereitstellung des besten Audio- und Videowiedergabeerlebnisses verschrieben hat.",
            links: "Schnellzugriff",
            github: "GitHub",
            license: "Lizenz",
            privacy: "Datenschutzrichtlinie",
            copyright: "© 2024 SolarSound. Alle Rechte vorbehalten."
        }
    },
    es: {
        site: {
            title: "SolarSound - Reproductor de Audio y Video 5.1",
            description: "SolarSound es un reproductor de audio y video avanzado con soporte completo de sonido envolvente 5.1",
            keywords: "reproductor audio, reproductor video, sonido 5.1, música, ecualizador, lista de reproducción"
        },
        nav: { home: "Inicio", download: "Descargar", presentation: "Presentación", contact: "Contacto" },
        hero: {
            title: "SolarSound",
            subtitle: "Reproductor de Audio y Video 5.1 Definitivo",
            description: "Escuche tu música y mira tus videos con una calidad excepcional y control total sobre tu experiencia de audio.",
            ctaDownload: "Descargar Ahora",
            ctaLearn: "Más Información"
        },
        features: {
            title: "Características Principales",
            subtitle: "Todo lo que necesitas para la experiencia de audio perfecta",
            audio: { title: "Reproducción de Audio Avanzada", description: "Soporte para muchos formatos de audio (WAV, MP3, etc.) con visualización espectral y gestión avanzada de reproducción." },
            video: { title: "Reproducción de Video", description: "Reproduce videos en MP4, MKV, AVI, MOV, WMV y más, con velocidad variable y subtítulos." },
            surround: { title: "Sonido Envolvente 5.1", description: "Ajuste preciso de cada altavoz, mezcla mono al subwoofer y efectos de audio inmersivos." },
            equalizer: { title: "Ecualizador Personalizable", description: "Ecualizador de 8 bandas, preajustes personalizados y modo libre para crear tu propia curva de sonido." },
            playlist: { title: "Gestión de Listas de Reproducción", description: "Crea, organiza y gestiona tus listas de reproducción con búsqueda global e indexación automática." },
            rotation: { title: "Efectos de Rotación", description: "Gira el sonido alrededor tuyo con efectos únicos para una experiencia inmersiva." },
            moods: { title: "Estados de Ánimo", description: "Elige estados de ánimo asociados a tus playlists y lanza más rápidamente la música que coincide con el momento" },
            favorites: { title: "Favoritos", description: "Marca tus canciones favoritas y lánzalas más rápidamente desde la pestaña principal" },
            settings: { title: "Montones de Configuraciones", description: "Desde la fuente de escritura hasta los temas de color, pasando por el inicio automático con tu música al encender el ordenador. ¡Lo controlas todo!" }
        },
        download: {
            title: "Descargar SolarSound",
            subtitle: "Disponible para Windows - Versión portátil o instalador",
            latest: "Última Versión",
            oldReleases: "Versiones Anteriores",
            seeChanges: "Ver cambios",
            standalone: "Versión Portátil (EXE)",
            installer: "Instalador",
            note: "El instalador ofrece la asociación de archivos de audio/video con SolarSound."
        },
        presentation: {
            title: "Presentación de SolarSound",
            subtitle: "Descubre por qué SolarSound es el reproductor multimedia definitivo",
            intro: "SolarSound se creó para satisfacer una necesidad personal: escuchar música en sonido envolvente 5.1 con opciones de ajuste precisas. Al no encontrar una solución satisfactoria en software existente como VLC, decidí crear mi propio reproductor.",
            story: { title: "Nuestra Historia", content: "Este proyecto comenzó como un simple experimento personal. Hoy se ha convertido en un reproductor multimedia completo con funciones avanzadas para la reproducción de audio y video." },
            technology: { title: "Tecnologías Utilizadas", content: "SolarSound utiliza PyQt6 para su interfaz gráfica, con bibliotecas de audio especializadas como sounddevice, soundfile y mutagen para la gestión de archivos multimedia." },
            future: { title: "Futuro del Proyecto", content: "Estamos trabajando constantemente en nuevas funciones: soporte para más formatos, mejora de efectos de audio, interfaz más intuitiva y soporte multiplataforma." }
        },
        contact: {
            title: "Contáctenos",
            subtitle: "¿Preguntas, sugerencias o necesita ayuda?",
            formTitle: "Envíenos un mensaje",
            name: "Nombre",
            email: "Dirección de Correo",
            subject: "Asunto",
            message: "Su Mensaje",
            send: "Enviar Mensaje",
            sending: "Enviando...",
            success: "¡Mensaje enviado! Por favor revisa tu cliente de correo.",
            error: "Se produjo un error. Por favor inténtelo de nuevo.",
            note: "Responderemos lo antes posible."
        },
        footer: {
            description: "SolarSound es un proyecto de código abierto dedicado a brindar la mejor experiencia de reproducción de audio y video.",
            links: "Enlaces Rápidos",
            github: "GitHub",
            license: "Licencia",
            privacy: "Política de Privacidad",
            copyright: "© 2024 SolarSound. Todos los derechos reservados."
        }
    },
    it: {
        site: {
            title: "SolarSound - Lettore Audio e Video 5.1",
            description: "SolarSound è un lettore audio e video avanzato con supporto completo per l'audio surround 5.1",
            keywords: "lettore audio, lettore video, surround 5.1, musica, equalizzatore, playlist"
        },
        nav: { home: "Home", download: "Scarica", presentation: "Presentazione", contact: "Contatti" },
        hero: {
            title: "SolarSound",
            subtitle: "Lettore Audio e Video 5.1 Definitivo",
            description: "Ascolta la tua musica e guarda i tuoi video con una qualità eccezionale e controllo totale sulla tua esperienza audio.",
            ctaDownload: "Scarica Ora",
            ctaLearn: "Scopri di Più"
        },
        features: {
            title: "Funzionalità Principali",
            subtitle: "Tutto ciò di cui hai bisogno per un'esperienza audio perfetta",
            audio: { title: "Riproduzione Audio Avanzata", description: "Supporto per molti formati audio (WAV, MP3, ecc.) con visualizzazione spettrale e gestione avanzata della riproduzione." },
            video: { title: "Riproduzione Video", description: "Riproduci video in MP4, MKV, AVI, MOV, WMV e altro, con velocità variabile e sottotitoli." },
            surround: { title: "Audio Surround 5.1", description: "Regolazione precisa di ogni altoparlante, missaggio mono al subwoofer e effetti audio immersivi." },
            equalizer: { title: "Equalizzatore Personalizzabile", description: "Equalizzatore a 8 bande, preimpostazioni personalizzate e modalità libera per creare la tua curva sonora." },
            playlist: { title: "Gestione Playlist", description: "Crea, organizza e gestisci le tue playlist con ricerca globale e indicizzazione automatica." },
            rotation: { title: "Effetti di Rotazione", description: "Fai ruotare il suono intorno a te con effetti unici per unesperienza immersiva." },
            moods: { title: "Umori", description: "Scegli umori associati alle tue playlist e avvia più velocemente la musica che corrisponde al momento" },
            favorites: { title: "Preferiti", description: "Segna i tuoi brani preferiti e avviali più velocemente dalla scheda principale" },
            settings: { title: "Tonnelate di Impostazioni", description: "Dal tipo di carattere ai temi di colore, passando per lavvio automatico con la tua musica allaccensione del computer. Padroni di tutto!" }
        },
        download: {
            title: "Scarica SolarSound",
            subtitle: "Disponibile per Windows - Versione portatile o installatore",
            latest: "Ultima Versione",
            oldReleases: "Versioni Precedenti",
            seeChanges: "Vedi cambiamenti",
            standalone: "Versione Portatile (EXE)",
            installer: "Installatore",
            note: "L'installatore offre l'associazione dei file audio/video con SolarSound."
        },
        presentation: {
            title: "Presentazione di SolarSound",
            subtitle: "Scopri perché SolarSound è il lettore multimediale definitivo",
            intro: "SolarSound è stato creato per soddisfare un bisogno personale: ascoltare musica in surround 5.1 con opzioni di regolazione precise. Non trovando una soluzione soddisfacente nei software esistenti come VLC, ho deciso di creare il mio lettore.",
            story: { title: "La Nostra Storia", content: "Questo progetto è iniziato come un semplice esperimento personale. Oggi è diventato un lettore multimediale completo con funzionalità avanzate per la riproduzione audio e video." },
            technology: { title: "Tecnologie Utilizzate", content: "SolarSound utilizza PyQt6 per la sua interfaccia grafica, con librerie audio specializzate come sounddevice, soundfile e mutagen per la gestione dei file multimediali." },
            future: { title: "Futuro del Progetto", content: "Stiamo lavorando costantemente su nuove funzionalità: supporto per più formati, miglioramento degli effetti audio, interfaccia più intuitiva e supporto multipiattaforma." }
        },
        contact: {
            title: "Contattaci",
            subtitle: "Domande, suggerimenti o hai bisogno di aiuto?",
            formTitle: "Invia un messaggio",
            name: "Nome",
            email: "Indirizzo Email",
            subject: "Oggetto",
            message: "Il Tuo Messaggio",
            send: "Invia Messaggio",
            sending: "Invio in corso...",
            success: "Messaggio inviato! Controlla il tuo client di posta.",
            error: "Si è verificato un errore. Riprova.",
            note: "Ti risponderemo il prima possibile."
        },
        footer: {
            description: "SolarSound è un progetto open source dedicato a fornire la migliore esperienza di riproduzione audio e video.",
            links: "Collegamenti Rapid",
            github: "GitHub",
            license: "Licenza",
            privacy: "Politica sulla Privacy",
            copyright: "© 2024 SolarSound. Tutti i diritti riservati."
        }
    },
    cn: {
        site: {
            title: "SolarSound - 5.1 音频和视频播放器",
            description: "SolarSound 是一款先进的音频和视频播放器，完整支持 5.1 环绕声",
            keywords: "音频播放器, 视频播放器, 5.1 环绕声, 音乐, 均衡器, 播放列表"
        },
        nav: { home: "首页", download: "下载", presentation: "介绍", contact: "联系" },
        hero: {
            title: "SolarSound",
            subtitle: "终极 5.1 音频和视频播放器",
            description: "以卓越的品质收听您的音乐并观看视频，完全控制您的音频体验。",
            ctaDownload: "立即下载",
            ctaLearn: "了解更多"
        },
        features: {
            title: "主要功能",
            subtitle: "为完美音频体验提供所需的一切",
            audio: { title: "高级音频播放", description: "支持多种音频格式 (WAV, MP3 等)，配有频谱可视化和高级播放管理。" },
            video: { title: "视频播放", description: "播放 MP4, MKV, AVI, MOV, WMV 等格式的视频，支持可变速度和字幕。" },
            surround: { title: "5.1 环绕声", description: "精确调节每个扬声器，单声道混音到低音炮，以及沉浸式音频效果。" },
            equalizer: { title: "可自定义均衡器", description: "8 段均衡器，自定义预设，自由模式创建自己的声音曲线。" },
            playlist: { title: "播放列表管理", description: "创建、组织和管理播放列表，支持全局搜索和自动索引。" },
            rotation: { title: "旋转效果", description: "用独特的效果让声音在您周围旋转，获得沉浸式体验。" },
            moods: { title: "心情", description: "选择与您的播放列表相关的心情，更快地启动符合时刻的音乐" },
            favorites: { title: "收藏", description: "标记您最喜欢的曲目，并从主标签中更快地启动它们" },
            settings: { title: "大量设置", description: "从字体到配色方案，到电脑启动时自动播放音乐。您完全掌控！" }
        },
        download: {
            title: "下载 SolarSound",
            subtitle: "Windows 可用 - 便携版或安装程序",
            latest: "最新版本",
            oldReleases: "之前的版本",
            seeChanges: "查看更改",
            standalone: "便携版 (EXE)",
            installer: "安装程序",
            note: "安装程序提供音频/视频文件与 SolarSound 的关联。"
        },
        presentation: {
            title: "SolarSound 介绍",
            subtitle: "发现为什么 SolarSound 是终极媒体播放器",
            intro: "SolarSound 的创建是为了满足个人需求：以精确的调节选项收听 5.1 环绕声音乐。在现有软件（如 VLC）中没有找到满意的解决方案后，我决定创建自己的播放器。",
            story: { title: "我们的故事", content: "这个项目始于一个简单的个人实验。如今，它已成为一个功能完整的媒体播放器，具备音频和视频播放的高级功能。所有内容均使用 Python 开发，部分功能得到 AI 的帮助，但始终注重细节和品质。" },
            technology: { title: "使用的技术", content: "SolarSound 使用 PyQt6 作为其图形界面，并使用 sounddevice、soundfile 和 mutagen 等专用音频库进行多媒体文件管理。界面完全可自定义，配有颜色主题和可调整的字体。" },
            future: { title: "项目未来", content: "我们不断致力于新功能的开发：支持更多格式、改进音频效果、更直观的界面以及跨平台支持。欢迎您的反馈来指导开发方向。" }
        },
        contact: {
            title: "联系我们",
            subtitle: "有问题、建议或需要帮助吗？",
            formTitle: "发送消息",
            name: "姓名",
            email: "邮箱地址",
            subject: "主题",
            message: "您的消息",
            send: "发送消息",
            sending: "发送中...",
            success: "消息已发送！请查看您的邮件客户端。",
            error: "发生错误。请重试。",
            note: "我们会尽快回复。"
        },
        footer: {
            description: "SolarSound 是一个开源项目，致力于提供最佳的音频和视频播放体验。",
            links: "快速链接",
            github: "GitHub",
            license: "许可证",
            privacy: "隐私政策",
            copyright: "© 2024 SolarSound. 版权所有。"
        }
    },
    ru: {
        site: {
            title: "SolarSound - Аудио и Видео Плеер 5.1",
            description: "SolarSound - это продвинутый аудио и видео плеер с полной поддержкой объемного звука 5.1",
            keywords: "аудиоплеер, видеоплеер, объемный звук 5.1, музыка, эквалайзер, плейлист"
        },
        nav: { home: "Главная", download: "Скачать", presentation: "Презентация", contact: "Контакты" },
        hero: {
            title: "SolarSound",
            subtitle: "Ультимативный Аудио и Видео Плеер 5.1",
            description: "Слушайте свою музыку и смотрите свои видео с исключительным качеством и полным контролем над вашим аудио опытом.",
            ctaDownload: "Скачать Сейчас",
            ctaLearn: "Узнать Больше"
        },
        features: {
            title: "Основные Возможности",
            subtitle: "Все, что нужно для идеального аудио опыта",
            audio: { title: "Продвинутое Воспроизведение Аудио", description: "Поддержка многих аудио форматов (WAV, MP3 и др.) с визуализацией спектра и продвинутым управлением воспроизведением." },
            video: { title: "Воспроизведение Видео", description: "Воспроизведение видео в форматах MP4, MKV, AVI, MOV, WMV и др., с переменной скоростью и субтитрами." },
            surround: { title: "Объемный Звук 5.1", description: "Точная настройка каждого динамика, микширование моно в сабвуфер и иммерсивные аудио эффекты." },
            equalizer: { title: "Настраиваемый Эквалайзер", description: "8-полосный эквалайзер, пользовательские пресеты и свободный режим для создания своей звуковой кривой." },
            playlist: { title: "Управление Плейлистами", description: "Создавайте, организовывайте и управляйте своими плейлистами с глобальным поиском и автоматической индексацией." },
            rotation: { title: "Эффекты Вращения", description: "Вращайте звук вокруг себя с уникальными эффектами для иммерсивного опыта." },
            moods: { title: "Настроения", description: "Выберите настроения, связанные с вашими плейлистами, и быстрее запускайте музыку, которая подходит моменту" },
            favorites: { title: "Избранное", description: "Пометьте любимые треки и запускайте их быстрее из основной вкладки" },
            settings: { title: "Множество Настроек", description: "От шрифтов до цветовых тем, включая автоматический запуск с вашей музыкой при загрузке компьютера. Вы контролируете всё!" }
        },
        download: {
            title: "Скачать SolarSound",
            subtitle: "Доступно для Windows - Портативная версия или установщик",
            latest: "Последняя Версия",
            oldReleases: "Предыдущие Версии",
            seeChanges: "Смотреть изменения",
            standalone: "Портативная версия (EXE)",
            installer: "Установщик",
            note: "Установщик предлагает ассоциацию аудио/видео файлов с SolarSound."
        },
        presentation: {
            title: "Презентация SolarSound",
            subtitle: "Узнайте, почему SolarSound - это ультимативный медиаплеер",
            intro: "SolarSound был создан для удовлетворения личной потребности: слушать музыку в формате объемного звука 5.1 с точными настройками. Не найдя подходящего решения в существующих программах, таких как VLC, я решил создать свой собственный плеер.",
            story: { title: "Наша История", content: "Этот проект начался как простой личный эксперимент. Сегодня он стал полноценным медиаплеером с продвинутыми функциями для воспроизведения аудио и видео. Все разработано на Python, с помощью ИИ для некоторых частей, но всегда с вниманием к деталям и качеству." },
            technology: { title: "Используемые Технологии", content: "SolarSound использует PyQt6 для своего графического интерфейса, со специализированными аудио библиотеками, такими как sounddevice, soundfile и mutagen для управления мультимедийными файлами. Интерфейс полностью настраиваем с цветовыми темами и адаптируемыми шрифтами." },
            future: { title: "Будущее Проекта", content: "Мы постоянно работаем над новыми функциями: поддержка большего количества форматов, улучшенные аудио эффекты, более интуитивный интерфейс и кроссплатформенная поддержка. Ваши отзывы приветствуются для руководства разработкой." }
        },
        contact: {
            title: "Свяжитесь с Нами",
            subtitle: "Есть вопросы, предложения или нужна помощь?",
            formTitle: "Отправьте нам сообщение",
            name: "Имя",
            email: "Адрес Электронной Почты",
            subject: "Тема",
            message: "Ваше Сообщение",
            send: "Отправить Сообщение",
            sending: "Отправка...",
            success: "Сообщение отправлено! Пожалуйста, проверьте ваш почтовый клиент.",
            error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
            note: "Мы ответим как можно скорее."
        },
        footer: {
            description: "SolarSound - это проект с открытым исходным кодом, посвященный предоставлению лучшего опыта воспроизведения аудио и видео.",
            links: "Быстрые Ссылки",
            github: "GitHub",
            license: "Лицензия",
            privacy: "Политика Конфиденциальности",
            copyright: "© 2024 SolarSound. Все права защищены."
        }
    }
};


// ============================================
// Language Management
// ============================================
class LanguageManager {
    constructor() {
        this.currentLang = CONFIG.defaultLanguage;
        this.translations = {};
        this.init();
    }
    
    async init() {
        // Load translations from JSON file
        await this.loadTranslations();
        
        // Check for saved language preference
        const savedLang = localStorage.getItem('solarSoundLang');
        if (savedLang && CONFIG.supportedLanguages.includes(savedLang)) {
            this.currentLang = savedLang;
        }
        
        this.applyLanguage();
        this.bindEvents();
        this.updateRTL();
    }
    
    async loadTranslations() {
        try {
            const lang = this.currentLang;
            const response = await fetch(`assets/locales/${lang}.json`);
            if (response.ok) {
                this.translations = await response.json();
            } else {
                // Fallback to embedded translations or default
                this.translations = this.getEmbeddedTranslations(lang);
            }
        } catch (error) {
            // If loading fails, use embedded translations
            this.translations = this.getEmbeddedTranslations(this.currentLang);
        }
    }
    
    getEmbeddedTranslations(lang) {
        // Fallback to embedded translations
        return TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.defaultLanguage];
    }
    
    async setLanguage(lang) {
        if (!CONFIG.supportedLanguages.includes(lang)) {
            lang = CONFIG.defaultLanguage;
        }
        
        this.currentLang = lang;
        localStorage.setItem('solarSoundLang', lang);
        
        // Reload translations for the new language
        await this.loadTranslations();
        
        this.applyLanguage();
        this.updateLanguageSelector();
        this.updateRTL();
    }
    
    applyLanguage() {
        // Update all translatable elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                el.textContent = translation;
            }
        });
        
        // Update placeholder attributes
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                el.placeholder = translation;
            }
        });
        
        // Update title
        const titleEl = document.querySelector('title');
        if (titleEl) {
            const titleKey = titleEl.getAttribute('data-i18n');
            if (titleKey) {
                titleEl.textContent = this.getTranslation(titleKey);
            }
        }
        
        // Update meta description
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            const descKey = descMeta.getAttribute('data-i18n');
            if (descKey) {
                descMeta.content = this.getTranslation(descKey);
            }
        }
        
        // Update meta keywords
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            const keywordsKey = keywordsMeta.getAttribute('data-i18n');
            if (keywordsKey) {
                keywordsMeta.content = this.getTranslation(keywordsKey);
            }
        }
        
        // Re-render downloads with correct language
        if (window.downloadManager) {
            window.downloadManager.renderDownloads();
        }
    }
    
    getTranslation(key) {
        const langData = this.translations || this.getEmbeddedTranslations(this.currentLang);
        if (!langData) return null;
        
        // Support nested keys like "section.title"
        const keys = key.split('.');
        let value = langData;
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        return value;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    updateLanguageSelector() {
        const selector = document.querySelector('.lang-selector button');
        if (selector) {
            const langName = this.getLangName(this.currentLang);
            const langSpan = selector.querySelector('.lang-name');
            if (langSpan) {
                langSpan.textContent = langName;
            } else {
                // Fallback for old HTML structure
                selector.textContent = langName;
            }
        }
    }
    
    getLangName(code) {
        const names = {
            fr: 'Français',
            en: 'English',
            de: 'Deutsch',
            es: 'Español',
            it: 'Italiano',
            cn: '中文',
            ru: 'Русский'
        };
        return names[code] || code;
    }
    
    updateRTL() {
        // Russian and Chinese are LTR languages, only Arabic is RTL
        const rtlLangs = ['ar'];
        const isRTL = rtlLangs.includes(this.currentLang);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.dir = isRTL ? 'rtl' : 'ltr';
    }
    
    bindEvents() {
        // Language selector dropdown
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', async (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                await this.setLanguage(lang);
            });
        });
    }
}

// ============================================
// Contact Form Handler
// ============================================
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> <span>${window.langManager?.getTranslation('contact.sending') || 'Sending...'}</span>`;
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            language: window.langManager?.getCurrentLanguage() || CONFIG.defaultLanguage
        };
        
        // Send email using mailto
        const subject = encodeURIComponent(`[SolarSound] ${data.subject || 'Contact Form'}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Language: ${data.language}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
        
        // Open mail client
        window.location.href = mailtoLink;
        
        // Reset form and button
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.form.reset();
            
            // Show success message
            this.showMessage(
                window.langManager?.getTranslation('contact.success') || 'Message sent! Please check your email client.',
                'success'
            );
        }, 1000);
    }
    
    showMessage(text, type) {
        // Remove existing message
        const existingMsg = this.form.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = text;
        messageEl.style.cssText = `
            padding: 12px;
            margin-top: 16px;
            border-radius: 8px;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)'};
            color: ${type === 'success' ? '#4caf50' : '#f44336'};
            border: 1px solid ${type === 'success' ? '#4caf50' : '#f44336'};
            animation: fadeIn 0.3s ease;
            text-align: center;
        `;
        
        this.form.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// ============================================
// Changelog Accordion
// ============================================
class ChangelogAccordion {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            this.bindEvents();
        }, 100);
    }
    
    bindEvents() {
        const toggles = document.querySelectorAll('.changelog-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAccordion(toggle);
            });
        });
    }
    
    toggleAccordion(toggle) {
        const targetId = toggle.getAttribute('aria-controls');
        const content = document.getElementById(targetId);
        if (!content) return;
        
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions in the same group
        const group = toggle.closest('.download-item');
        if (group) {
            const otherToggles = group.querySelectorAll('.changelog-toggle');
            otherToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherId = otherToggle.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherId);
                    if (otherContent) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                        otherContent.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = null;
                    }
                }
            });
        }
        
        // Toggle current accordion
        toggle.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
        }
    }
}

// ============================================
// Animations
// ============================================
class Animations {
    constructor() {
        if (!CONFIG.animationsEnabled) return;
        this.init();
    }
    
    init() {
        // Intersection Observer for fade-in animations
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        
                        // Add delay based on data-delay attribute
                        const delay = entry.target.getAttribute('data-delay');
                        if (delay) {
                            entry.target.style.animationDelay = delay;
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
        
        // Parallax effect for hero section
        this.initParallax();
        
        // Animated background elements
        this.initFloatingElements();
    }
    
    initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            const logo = hero.querySelector('.hero-logo');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }
            
            if (logo) {
                const currentTransform = logo.style.transform || '';
                logo.style.transform = `translateY(${scrolled * 0.5}px) ${currentTransform}`;
            }
        });
    }
    
    initFloatingElements() {
        // Create floating particles
        const particles = document.createElement('div');
        particles.className = 'floating-particles';
        particles.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 149, 0, ${Math.random() * 0.2 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            particles.appendChild(particle);
        }
        
        document.body.appendChild(particles);
        
        // Add keyframes for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideIn {
                from { transform: translateX(-20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInRight {
                from { transform: translateX(20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// Download Manager
// ============================================
class DownloadManager {
    constructor() {
        this.releases = [];
        this.init();
    }
    
    async init() {
        // Static data - update this when releasing new versions
        // Paths are relative to the website root (webpage/ folder)
        this.releases = [
            {
                version: '5.1.0',
                date: '2024-10-15',
                title: 'SolarSound 5.1.0',
                description: 'Dernière version avec support amélioré du son surround 5.1 et nouvelles fonctionnalités',
                standalone: {
                    url: '../Releases/SolarSound.exe',
                    size: '102 MB'
                },
                installer: {
                    url: '../Releases/SolarSound_Setup.exe',
                    size: '103 MB'
                },
                changes: [
                    'Support complet du son surround 5.1 avec réglage précis de chaque enceinte',
                    'Amélioration des effets de rotation audio avec nouvelle interface visuelle',
                    'Nouveau mode de simulation vinyle avec réglages avancés',
                    'Gestion améliorée des playlists avec recherche globale instantanée',
                    'Corrections de bugs majeurs et améliorations des performances',
                    'Nouvelle interface utilisateur plus intuitive',
                    'Support de nouveaux formats audio et vidéo'
                ]
            },
            {
                version: '5.0.0',
                date: '2024-09-01',
                title: 'SolarSound 5.0.0',
                description: 'Mise à jour majeure avec support de la lecture vidéo',
                standalone: {
                    url: '#',
                    size: '95 MB'
                },
                installer: {
                    url: '#',
                    size: '98 MB'
                },
                changes: [
                    'Ajout de la lecture vidéo pour MP4, MKV, AVI, MOV, WMV',
                    'Vitesse de lecture variable de 0.25x à 10x',
                    'Navigation image par image précise',
                    'Support complet des sous-titres SRT et ASS',
                    'Fenêtre vidéo détachable pour plus de flexibilité',
                    'Mode plein écran amélioré',
                    'Intégration des playlists mixtes (audio + vidéo)'
                ]
            },
            {
                version: '4.5.0',
                date: '2024-08-15',
                title: 'SolarSound 4.5.0',
                description: 'Fonctionnalités audio améliorées et améliorations de l\'interface',
                standalone: {
                    url: '#',
                    size: '88 MB'
                },
                installer: {
                    url: '#',
                    size: '90 MB'
                },
                changes: [
                    'Égaliseur amélioré avec 8 bandes et presets personnalisés',
                    'Effet de rotation audio 3D immersif',
                    'Recherche dans les playlists ultra-rapide',
                    '8 nouveaux thèmes de couleurs personnalisables',
                    'Optimisations des performances pour les grandes bibliothèques',
                    'Nouveau système de gestion des métadonnées',
                    'Support des playlists CD avec reconnaissance automatique'
                ]
            }
        ];
        
        this.renderDownloads();
    }
    
    renderDownloads() {
        const container = document.querySelector('.downloads-container');
        if (!container) return;
        
        let html = '';
        const langManager = window.langManager;
        
        // Latest release first
        if (this.releases.length > 0) {
            const latest = this.releases[0];
            html += this.createDownloadItem(latest, true, langManager);
        }
        
        // Other releases
        if (this.releases.length > 1) {
            html += '<div class="section-title" style="margin-top: 2rem;">' +
                (langManager?.getTranslation('download.oldReleases') || 'Previous Releases') +
                '</div>';
            
            for (let i = 1; i < this.releases.length; i++) {
                html += this.createDownloadItem(this.releases[i], false, langManager);
            }
        }
        
        container.innerHTML = html;
        
        // Re-initialize accordions after rendering
        if (window.changelogAccordion) {
            window.changelogAccordion.bindEvents();
        }
    }
    
    createDownloadItem(release, isLatest, langManager) {
        const changesHtml = release.changes.map(change => 
            `<li class="changelog-item"><strong>•</strong> ${change}</li>`
        ).join('');
        
        const changelogId = `changelog-${release.version.replace(/\./g, '-')}`;
        const seeChangesText = langManager?.getTranslation('download.seeChanges') || 'See changes';
        const standaloneText = langManager?.getTranslation('download.standalone') || 'Portable Version (EXE)';
        const installerText = langManager?.getTranslation('download.installer') || 'Installer';
        
        return `
            <div class="download-item fade-on-scroll" ${isLatest ? 'data-delay="0.1s"' : ''}>
                <div class="download-item-header">
                    <div>
                        <h3 class="download-item-title">${release.title}</h3>
                        <span class="download-item-date">${release.date}</span>
                    </div>
                    <span class="download-item-version">v${release.version}</span>
                </div>
                <p class="download-item-description">${release.description}</p>
                <div class="download-buttons">
                    <a href="${release.standalone.url}" class="btn btn-primary download-btn">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        ${standaloneText}
                    </a>
                    <a href="${release.installer.url}" class="btn btn-secondary download-btn">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        ${installerText}
                    </a>
                </div>
                <div class="changelog-section">
                    <button class="changelog-toggle" 
                            aria-expanded="false" 
                            aria-controls="${changelogId}">
                        <span>${seeChangesText}</span>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="changelog-content" 
                         id="${changelogId}" 
                         aria-expanded="false" 
                         style="max-height: 0; overflow: hidden; transition: max-height 0.5s ease;">
                        <ul class="changelog-list">
                            ${changesHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// Navigation
// ============================================
class Navigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMain = document.querySelector('.nav-main');
        
        if (menuToggle && navMain) {
            menuToggle.addEventListener('click', () => {
                navMain.classList.toggle('mobile-visible');
            });
        }
        
        // Active nav link based on current page
        this.setActiveLink();
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Fix header z-index issue
        this.fixHeaderZindex();
    }
    
    setActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const pageName = currentPath.replace('.html', '');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href').replace('.html', '');
            if (href === pageName || (href === '' && pageName === 'index')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    fixHeaderZindex() {
        // Make sure header doesn't overlap content
        const header = document.querySelector('.header');
        const mainContent = document.querySelector('.main-content');
        
        if (header && mainContent) {
            // Add padding to main content equal to header height
            const headerHeight = parseInt(getComputedStyle(header).height) || 70;
            mainContent.style.paddingTop = `${headerHeight}px`;
        }
    }
}

// ============================================
// Initialize everything
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize language manager first (async)
    window.langManager = new LanguageManager();
    await window.langManager.init();
    
    // Initialize other components
    window.contactForm = new ContactForm();
    window.downloadManager = new DownloadManager();
    window.animations = new Animations();
    window.navigation = new Navigation();
    window.changelogAccordion = new ChangelogAccordion();
    
    console.log('SolarSound Website initialized');
});

// ============================================
// Utility Functions
// ============================================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Make functions globally available
window.formatDate = formatDate;
window.formatFileSize = formatFileSize;
