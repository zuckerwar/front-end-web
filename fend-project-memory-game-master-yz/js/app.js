let click1 = {},
  click2 = {},
  numStars = 3,
  pairs = 8,
  gameStarted,
  matches,
  moves,
  timer,
  twoStar,
  oneStar;

/**
* @description List of cards on the board using icons from Font Awesome
* @constructor cardData
*/
const cardData = [
  {
    name: "Burn",
    class: "fa-burn",
    id: "burn"
  }, {
    name: "Rocket",
    class: "fa-rocket",
    id: "rocket"
  }, {
    name: "LifeRing",
    class: "fa-life-ring",
    id: "lifering"
  }, {
    name: "Compass",
    class: "fa-compass",
    id: "compass"
  }, {
    name: "ShieldAlt",
    class: "fa-shield-alt",
    id: "shieldalt"
  }, {
    name: "Beer",
    class: "fa-beer",
    id: "beer"
  }, {
    name: "Ship",
    class: "fa-ship",
    id: "ship"
  }, {
    name: "Bomb",
    class: "fa-bomb",
    id: "bomb"
  }
];

/**
* @description Represents the game board
* @constructor gameBoard
*/
const gameBoard = {
  class: "board",
  pairs: 8,
  twoStar: 10,
  oneStar: 14
};

class Card {
  constructor(card, num) {
    let cardID = card.id + "-" + num;
    this.id = "#" + card.id + "-" + num;
    this.class = card.class;
    this.name = card.name;
    this.html = `<div class="card" id="${cardID}">
    <div class="card-back">
      <i class="fa ${this.class} card-icon"></i>
    </div>
    <div class="card-front">
      <i class="fa fa-anchor"></i>
    </div>
  </div>`;
  }
}

const setGame = () => {
  pairs = gameBoard.pairs;
  twoStar = gameBoard.twoStar;
  oneStar = gameBoard.oneStar;
  $("#game-board").removeClass("board");
  $("#game-board").addClass(gameBoard.class);
};


/**
* @description Sets amount of cards array
* @constructor gameArray
*/
const gameArray = array => {
  let newArray = array.slice();
  // trim array as needed
  while (newArray.length > pairs) {
    let randomIndex = Math.floor(Math.random() * newArray.length);
    newArray.splice(randomIndex, 1);
  }
  return newArray;
};

const makeCardArray = (data) => {
  let array = [];

  // Get the correct sized array for level
  let trimmedData = gameArray(data);

  // Add two of each card to the array
  trimmedData.forEach(function(card) {
    array.push(new Card(card, 1));
    array.push(new Card(card, 2));
  });

  return array;
};

/**
* @description Shuffle the list of cards
* @constructor shuffle
*/
const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
* @description Add cards to game board and start timer on click
* @constructor displayCards
*/
const displayCards = cardArray => {
  cardArray.forEach(function(card) {
    $("#game-board").append(card.html);

    $(card.id).click(function() {
      if (!gameStarted) {
        gameTimer();
        gameStarted = true;
      }

      // Check for match when clicked
      checkMatch(card);
    });
  });
};

/**
* @description Checks for matched cards
* @constructor checkMatch
*/
const checkMatch = card => {
  if (!click1.name) {
    click1 = card;
    $(card.id).addClass("flipped");
    return;

  } else if (!click2.name && click1.id !== card.id) {
    click2 = card;
    $(card.id).addClass("flipped");

    // Moves count
    moves++;
    $("#moves").text(moves);

    rateStars();
  } else
    return;

  if (click1.name === click2.name) {
    matchCard(click1, click2);
    foundMatch();
  } else {
    unmatchCard(click1, click2);
    hideCards();
  }
};

const matchCard = (selectedCard1, selectedCard2) => {
  $(selectedCard1.id).addClass("matched");
  $(selectedCard2.id).addClass("matched");
}

const unmatchCard = (selectedCard1, selectedCard2) => {
  $(selectedCard1.id).addClass("unmatched");
  $(selectedCard2.id).addClass("unmatched");
}

const foundMatch = () => {
  matches++;
  if (matches === pairs) {
    gameOver();
  }

  $(click1.id).unbind("click");
  $(click2.id).unbind("click");
  // reset click objects
  click1 = {};
  click2 = {};
};

const hideCards = () => {
  //hide cards
  setTimeout(function() {
    $(click1.id).removeClass("flipped");
    $(click2.id).removeClass("flipped");
    $(click1.id).removeClass("unmatched");
    $(click2.id).removeClass("unmatched");
    // reset click objects
    click1 = {};
    click2 = {};
  }, 600);
};

/**
* @description Game over, show modal
* @constructor gameOver
*/
const gameOver = () => {
  clearInterval(timer);

  setTimeout(function() {
    $("#ayeModal").show();
  }, 500);
};

/**
* @description Determines star rating based on moves
* @constructor rateStars
*/
const rateStars = () => {
  let currentStars;
  if (moves >= oneStar) {
    currentStars = 1;
  } else if (moves >= twoStar) {
    currentStars = 2;
  } else
    currentStars = 3;
  if (numStars !== currentStars) {
    displayStars(currentStars);
  }
};

/**
* @description Game timer
* @constructor gameTimer
*/
const gameTimer = () => {
  let startTime = new Date().getTime();

  // Update the timer every second
  timer = setInterval(function() {
    var now = new Date().getTime();

    // Find the time elapsed between beggining to end
    var elapsed = now - startTime;

    // Calculate minutes and seconds
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let currentTime = minutes + ":" + seconds;

    $(".clock").text(currentTime);
  }, 750);
};

/**
* @description Add star ratings to the game and the modal
* @constructor displayStars
*/
const displayStars = num => {
  const starIcon = '<i class="fas fa-star"></i>';
  $(".stars").empty();
  for (let i = 0; i < num; i++) {
    $(".stars").append(starIcon);
  }
};

// Close modals when click outside modal
$("#ayeModal #close, #overlay").click(function() {
  $("#ayeModal").hide();
});

$(".modal").click(function() {
  $(".modal").hide();
});

$(".modal-content").click(function(event) {
  event.stopPropagation();
});

// Animate restart icon on hover

$('.fa-redo-alt').hover(function() {
  $(this).addClass('fa-spin');
}, function() {
  $(this).removeClass('fa-spin');
});


// Restart game when clicking restart icon
$("#restart, #ayeModal").click(function() {
  $("#ayeModal").hide();
  clearInterval(timer);
  startGame(cardData);
});

/**
* @description Reset timer
* @constructor resetTimer
*/
const resetTimer = () => {
  $(".clock").text("0:00");
  $("#moves").text("0");
}

/**
* @description Start game and set deck on game board
* @constructor startGame
* @param {string} cards - Game cards
*/
const startGame = (cards) => {
  // reset game variables
  pairs = 8;
  twoStar = 10;
  oneStar = 14;
  gameStarted = false;
  moves = 0;
  matches = 0;
  click1 = 0;

  $("#game-board").empty();
  $("#ayeModal").hide();

  resetTimer()

  let cardArray = makeCardArray(cardData);

  shuffle(cardArray);
  displayCards(cardArray);
  displayStars(3);
};

window.onload = startGame(cardData);
