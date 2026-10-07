// Les 4 familles (As)
const familles = [
    { nom: 'Carreau', id: 'carreau' },
    { nom: 'Pique', id: 'pique' },
    { nom: 'Cœur', id: 'coeur' },
    { nom: 'Trèfle', id: 'trefle' }
];

// Références aux éléments HTML
const viewMenu = document.getElementById('view-menu');
const viewSuit = document.getElementById('view-suit');
const btnBack = document.getElementById('btn-back');
const menuGrid = document.getElementById('menu-grid');
const gameBoard = document.getElementById('game-board');
const suitTitle = document.getElementById('suit-title');

// 1. Initialiser le Menu Principal
function initialiserMenu() {
    familles.forEach((famille) => {
        const card = creerElementCarte(famille.nom, true);
        
        // Au clic sur un As du menu, on ouvre la grille de 12
        card.addEventListener('click', () => {
            ouvrirGrilleJeu(famille);
        });
        
        menuGrid.appendChild(card);
    });
}

// 2. Ouvrir la grille de jeu correspondante
function ouvrirGrilleJeu(famille) {
    suitTitle.textContent = `As de ${famille.nom}`;
    
    // Nettoyer l'ancienne grille
    gameBoard.innerHTML = ''; 

    // Générer 12 cartes pour cette famille
    for(let i = 1; i <= 12; i++) {
        // C'est ici que vous pourrez injecter les infos spécifiques
        const infoCarte = `Info secrète ${famille.nom} n°${i}`;
        const card = creerElementCarte(infoCarte, false);
        
        // Clic pour retourner la carte (uniquement dans le jeu)
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        gameBoard.appendChild(card);
    }

    // Basculer l'affichage des vues
    viewMenu.classList.add('hidden');
    viewSuit.classList.remove('hidden');
}

// 3. Bouton Retour
btnBack.addEventListener('click', () => {
    viewSuit.classList.add('hidden');
    viewMenu.classList.remove('hidden');
});

// Fonction utilitaire pour fabriquer le HTML d'une carte
function creerElementCarte(texteVerso, isMenuCard) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    // Si c'est une carte du menu, on écrit le nom de l'As directement dessus pour s'y retrouver
    if(isMenuCard) {
        cardBack.innerHTML = `<strong>As de</strong><br>${texteVerso}`;
        // Pour l'instant, on laisse le placeholder vert devant, 
        // mais le texte est derrière si on la retourne (optionnel)
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
