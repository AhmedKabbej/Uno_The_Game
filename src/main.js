import './style.css'
import { io } from 'socket.io-client';
const socket = io( 'http://localhost:3000');



export class Game {
  constructor(socket) {
    this.socket = socket;
    this.joinButton = document.querySelector('#joinButton');
    this.playerNameInput = document.querySelector('#playerNameInput');
    this.messageContainer = document.getElementById('messageContainer');
    this.buttonReady = document.getElementById('ready');
    this.playerList = document.getElementById('playerList');

    
    // Initialisation des événements
    this.initEvents();
    this.initSocketListener();
  }

  // Initialiser les événements
  initEvents() {
    this.joinButton.addEventListener('click', this.handleJoinGame.bind(this));
    this.buttonReady.addEventListener('click', this.handleButtonReady.bind(this));
   
  }
 

  initSocketListener() {
    this.socket.on('joinGameStatus', this.handleJoinGameStatus.bind(this));
    this.socket.on('updatePlayers', this.handleUpdatePlayers.bind(this));
  }

  // Méthode pour gérer le clic du bouton "Rejoindre le jeu"
  handleJoinGame() {
    const playerName = this.playerNameInput.value;
    console.log('Player Name:', playerName);

   

    // Émettre l'événement pour rejoindre la partie
    this.socket.emit('joinGame', playerName);
  }

  // Méthode pour gérer la réponse du serveur concernant le statut du jeu
  handleJoinGameStatus(message) {
    console.log(message);
    if (message && message.name) {
      this.messageContainer.textContent = 'Welcome, ' + message.name + '!'; // Affiche le nom
    } else {
      this.messageContainer.textContent = 'Message: ' + JSON.stringify(message); // Affiche l'objet entier
    }
  }
  handleUpdatePlayers(players){
    players.forEach(player => {
      console.log(player.name);
      console.log(player.isReady);
      this.createPlayer(player);
      
    })

      // console.log(players[0].name);
  }
  handleButtonReady(){
    socket.emit('playerReady');
     // Changer la couleur de fond du bouton avec la classe 'button-3'
    document.querySelector('.button-3').style.backgroundColor = 'green';
  }



//cree un paragraphe pour ready et un pour le pseudo dans chaque li

//ajouter chaque li au ul 'playerList' id

createPlayer(player){
  //recuperer pour chaque joueur ready et le pseudo
  const li = document.createElement("li");
  this.playerList.appendChild(li);
  const pIsready = document.createElement("p");
  const pName = document.createElement("p");
  li.appendChild(pIsready);
  li.appendChild(pName);
  console.log(player.isReady);

  pIsready.innerText = player.isReady;
  pName.innerText = player.name;

}

}



// Initialisation du jeu avec le socket (vous devez définir le socket au préalable)
const game = new Game(socket);













// socket.emit( "joinGame", playerName);

// socket.emit( "playerReady");


const playButton = document.querySelector('.playmusic');
const music = document.getElementById('music');

playButton.addEventListener('click', () => {
    if (music.paused) {
        music.play(); // Si la musique est en pause, on la joue
        playButton.textContent = 'Stop Music'; // Change le texte du bouton
    } else {
        music.pause(); // Si la musique joue, on la met en pause
        music.currentTime = 0; // Remise à zéro de la musique
        playButton.textContent = 'Play Music'; // Change le texte du bouton
    }
});






// socket. emit("playCard", { card });
// socket. emit( "drawCard" );