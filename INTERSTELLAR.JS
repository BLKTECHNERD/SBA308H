document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('attack-button').addEventListener('click', attackAlienShip);
    document.getElementById('retreat-button').addEventListener('click', makeRetreat);
  });
  
  var spaceship = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7
  };
  
  var alienShips = [];
  
  // Create six alien ships with random properties
  for (var i = 0; i < 6; i++) {
    var alienShip = {
      hull: getRandomValue(3, 6),
      firepower: getRandomValue(2, 4),
      accuracy: getRandomValue(0.6, 0.8)
    };
    alienShips.push(alienShip);
  }
  
  var currentShipIndex = 0;
  var retreat = false;
  
  function attackAlienShip() {
    if (retreat) {
      // Game over, player has chosen to retreat
      displayMessage('Game over. You retreated!');
      return;
    }
  
    var alienShip = alienShips[currentShipIndex];
  
    // Player attacks the current alien ship
    var damage = calculateDamage(spaceship.firepower, spaceship.accuracy);
    alienShip.hull -= damage;
    displayMessage('You attacked the alien ship '+ currentShipIndex+' and caused ' + damage + ' damage.');
  
    // Check if the alien ship is destroyed
    if (alienShip.hull <= 0) {
      displayMessage('You destroyed the alien ship!');
  
      // Check if there are more alien ships to attack
      if (currentShipIndex < alienShips.length - 1) {
        currentShipIndex++;
        displayMessage('Prepare to attack the next alien ship.');
      } else {
        displayMessage('Congratulations! You destroyed all the alien ships. You win!');
        retreat = true;
      }
    } else {
      // Alien ship survives and counterattacks
      var alienDamage = calculateDamage(alienShip.firepower, alienShip.accuracy);
      spaceship.hull -= alienDamage;
      displayMessage('The alien ship counterattacks and causes ' + alienDamage + ' damage.');
  
      // Check if the player's spaceship is destroyed
      if (spaceship.hull <= 0) {
        displayMessage('Your spaceship has been destroyed. Game over!');
        retreat = true;
      }
    }
  }
  
  function makeRetreat() {
    retreat = true;
    displayMessage('Game over. You retreated!');
  }
  
  function calculateDamage(firepower, accuracy) {
    if (Math.random() < accuracy) {
      return firepower;
    } else {
      return 0;
    }
  }
  
  function displayMessage(message) {
    var messageContainer = document.createElement('p');
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);
  }
  
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  