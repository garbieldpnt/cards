// Les 4 familles avec leur traduction pour correspondre aux noms de fichiers
const familles = [
    { nom: 'Carreau', id: 'carreau', nomFichier: 'diamonds', imageAs: 'images/ace_of_diamonds.png' },
    { nom: 'Pique', id: 'pique', nomFichier: 'spades', imageAs: 'images/ace_of_spades.png' },
    { nom: 'Cœur', id: 'coeur', nomFichier: 'hearts', imageAs: 'images/ace_of_hearts.png' },
    { nom: 'Trèfle', id: 'trefle', nomFichier: 'clubs', imageAs: 'images/ace_of_clubs.png' }
];

// La liste exacte des valeurs telles qu'elles sont écrites dans vos noms de fichiers.
// À ADAPTER : Si vos fichiers s'appellent "A_of_clubs", "J_of_clubs", remplacez 'ace' par 'A', 'jack' par 'J', etc.
const valeursImages = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
// La base de données de vos messages (12 messages par famille)
const messagesCartes = {
    carreau: [
        "Rien pour l'instant !",
        "Taureau !",
        "Rien pour l'instant !.",
        "Tape en grenouille.",
        "Rien pour l'instant !.",
        "Vole une trace à quelqu’un.",
        "Rien pour l'instant !.",
        "Puni ! Vas taper seul dans la douche.",
        "Rien pour l'instant !.",
        "Quelle star ! Tout le monde te fixe.",
        "Rien pour l'instant !.",
        "Tu peux boire dans tous les verres",
        "Rien pour l'instant !"
    ],
    pique: [
        "Double trouble !", 
        "Fais une danse Fortnite",
        "Rien pour l'instant !", 
        "Rien pour l'instant !", 
        "Rien pour l'instant !",
        "Rien pour l'instant !", 
        "Sommelier", 
        "Rien pour l'instant ! ",
        "Rien pour l'instant !", 
        "Rien pour l'instant !", 
        "Rien pour l'instant !",
        "Rien pour l'instant !",
        "Attention les cheveux !",
    ],
    coeur: [
        // Remplissez avec vos 12 messages pour Cœur
        "Rien pour l'instant !", "Chasse à la trace",
        "Rien pour l'instant !", "Rien pour l'instant !", "Rien pour l'instant !",
        "Rien pour l'instant !", "Rien pour l'instant !", "Enculette",
        "Rien pour l'instant !", "Plateau humain", "Shot", "Rien pour l'instant !", "Sans les mains"
    ],
    trefle: [
        // Remplissez avec vos 12 messages pour Trèfle
        "Trace ton initiale", "Changement de place !",
        "On ouvre le nez et on ferme les yeux", "Rien pour l'instant !", "Rien pour l'instant !",
        "Rien pour l'instant !", "Instant promo, présente un artiste", "Rien pour l'instant !",
        "Crazy? I was crazy once", "Rien pour l'instant !", "Change de musique", "Roi du silence", "Rien pour l'instant !"
    ]
};

// Références aux éléments HTML
const viewMenu = document.getElementById('view-menu');
const viewSuit = document.getElementById('view-suit');
const btnBack = document.getElementById('btn-back');
const menuGrid = document.getElementById('menu-grid');
const gameBoard = document.getElementById('game-board');
const suitTitle = document.getElementById('suit-title');

function initialiserMenu() {
    familles.forEach((famille) => {
        const card = creerElementCarte(famille.nom, true, famille.imageAs);
        
        card.addEventListener('click', () => {
            ouvrirGrilleJeu(famille);
        });
        
        menuGrid.appendChild(card);
    });
}

function ouvrirGrilleJeu(famille) {
    suitTitle.textContent = `As de ${famille.nom}`;
    gameBoard.innerHTML = ''; 

    // On boucle de 0 à 12 pour parcourir facilement notre tableau de 13 valeurs
    for(let i = 0; i < 13; i++) {
        // On récupère le bon message
        const infoCarte = messagesCartes[famille.id][i]; 
        
        // On récupère la valeur (ex: '2', '10', 'jack')
        const valeurImage = valeursImages[i];
        
        // On assemble l'URL dynamique (ex: 'images/2_of_clubs.png')
        // Modifiez .png en .jpg si nécessaire
        const urlImage = `images/${valeurImage}_of_${famille.nomFichier}.png`; 
        
        const card = creerElementCarte(infoCarte, false, urlImage);
        
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        gameBoard.appendChild(card);
    }

    viewMenu.classList.add('hidden');
    viewSuit.classList.remove('hidden');
}

// 3. Bouton Retour
btnBack.addEventListener('click', () => {
    viewSuit.classList.add('hidden');
    viewMenu.classList.remove('hidden');
});

// Fonction utilitaire pour fabriquer le HTML d'une carte
// On ajoute "urlImage" comme 3ème paramètre
function creerElementCarte(texteVerso, isMenuCard, urlImage) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    
    // C'est cette condition qui manquait pour afficher l'image !
    if (urlImage) {
        cardFront.style.backgroundImage = `url('${urlImage}')`;
    }

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    if(isMenuCard) {
        cardBack.innerHTML = `<strong>As de</strong><br>${texteVerso}`;
    } else {
        cardBack.textContent = texteVerso;
    }

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    return card;
}

// Lancer la création du menu au chargement
initialiserMenu();
