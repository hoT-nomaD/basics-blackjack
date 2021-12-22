var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//initialise variables
var playerScore = 0;
var dealerScore = 0;
var playerCards = [];
var dealerCards = [];
var shuffledDeck = shuffleCards(makeDeck());
var inGameFlag = false;
var outputValue = ``;

//function to reset variables on game end
var resetGame = function () {
  inGameFlag = false;
  playerScore = 0;
  dealerScore = 0;
  playerCards = [];
  dealerCards = [];
  shuffledDeck = shuffleCards(makeDeck());
};

//function to add the points of cards
var cardScoring = function (cards) {
  var handScore = 0;
  var aces = 0;
  for (let i = 0; i < cards.length; i += 1) {
    //if a card is an ace, add to aces counter
    if (cards[i].rank == 1) {
      aces += 1;
    }
    //adds 10 points for any picture cards
    else if (
      cards[i].rank == 11 ||
      cards[i].rank == 12 ||
      cards[i].rank == 13
    ) {
      handScore += 10;
    } else {
      handScore += cards[i].rank;
    }
  } //checks if total is bust if current ace is 11 and other aces are 1
  for (var j = aces; j > 0; j -= 1) {
    //if 11 will bust the hand, add 1
    if (handScore > 11 - j) {
      handScore += 1;
    }
    //if current ace won't bust at 11, add 11
    else {
      handScore += 11;
    }
  }
  return handScore;
};

var listCards = function (cardlist, person) {
  message = `${person} has `;
  for (let i = 0; i < cardlist.length; i += 1) {
    message += `${cardlist[i].name} of ${cardlist[i].suit}, `;
  }
  message = message.slice(0, -1);
  return message;
};

var main = function (input) {
  //if not in a game, start a new game
  if (inGameFlag == false) {
    inGameFlag = true;
    // player and dealer draw 2 cards each
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    console.log(
      `${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}`
    );
    console.log(
      `${dealerCards[0].name} of ${dealerCards[0].suit} and ${dealerCards[1].name} of ${dealerCards[1].suit}`
    );
    playerScore = cardScoring(playerCards);
    dealerScore = cardScoring(dealerCards);
    console.log(playerScore, dealerScore);
    if (playerScore == 21 && dealerScore != 21 && playerCards.length == 2) {
      outputValue =
        listcards(playerCards, "Player") +
        ` which is a Blackjack!` +
        listCards(dealerCards, "Dealer") +
        ` with a score of ${dealerScore}. <br><br> Player wins! Press submit to play another game.`;
      resetGame();
      return outputValue;
    } else if (
      playerScore != 21 &&
      dealerScore == 21 &&
      playerCards.length == 2
    ) {
      outputValue =
        listCards(dealerCards, "Dealer") +
        ` which is a Blackjack!` +
        listcards(playerCards, "Player") +
        `with a score of ${playerScore}.  Dealer wins! <br><br>Press submit to play another game.`;
      resetGame();
      return outputValue;
    } else if (
      playerScore == 21 &&
      dealerScore == 21 &&
      playerCards.length == 2
    ) {
      outputValue =
        listcards(playerCards, "Player") +
        ` and dealer has ` +
        listCards(dealerCards, "Dealer") +
        ` Both have Blackjack and it's a push!. <br><br>Press submit to play another game.`;
      resetGame();
      return outputValue;
    } else {
      return (
        listCards(playerCards, "Player") +
        ` with a score of ${playerScore}. ` +
        listCards(dealerCards, "Dealer") +
        ` with a score of ${dealerScore}. <br><br>Enter 'hit' or 'stand' to continue`
      );
    }
  } else if (inGameFlag == true) {
    if (input != "hit" && input != "stand" && playerScore != 21) {
      return (
        listCards(playerCards, "Player") +
        ` and now has a score of ${playerScore} while Dealer has a score of ${dealerScore}. <br><br>Enter 'hit' or 'stand' to continue.`
      );
    } else if (input == "hit") {
      playerCards.push(shuffledDeck.pop());
      console.log(
        playerCards[playerCards.length - 1].name +
          " of " +
          playerCards[playerCards.length - 1].suit
      );
      playerScore = cardScoring(playerCards);
      console.log(playerScore);
      if (playerScore < 21) {
        return (
          listCards(playerCards, "Player") +
          ` and now has a score of ${playerScore} while Dealer has a score of ${dealerScore}. <br><br>Enter 'hit' or 'stand' to continue.`
        );
      } else if (playerScore == 21) {
        return (
          listCards(playerCards, "Player") +
          ` and now has a score of ${playerScore}.<br><br> Press submit for the dealer to draw.`
        );
      } else {
        outputValue =
          listCards(playerCards, "Player") +
          ` and busts with a score of ${playerScore}. Dealer wins! <br><br>Press submit to play another game.`;
        resetGame();
        return outputValue;
      }
    } else if (input == "stand" || playerScore == 21) {
      while (dealerScore < 17) {
        dealerCards.push(shuffledDeck.pop());
        dealerScore = cardScoring(dealerCards);
      }
      if (playerScore < dealerScore && dealerScore < 22) {
        outputValue =
          listCards(dealerCards, "Dealer") +
          ` and has a total score of ${dealerScore} while the player has a score of ${playerScore}. <br><br> Dealer wins! Press submit to play again`;
        resetGame();
        return outputValue;
      } else if (dealerScore < playerScore || dealerScore > 21) {
        outputValue =
          listCards(dealerCards, "Dealer") +
          ` and has a total score of ${dealerScore} while the player has a score of ${playerScore}. <br><br> Player wins! Press submit to play again`;
        resetGame();
        return outputValue;
      } else {
        outputValue =
          listCards(dealerCards, "Dealer") +
          ` and has a total score of ${dealerScore} while the player has a score of ${playerScore}. <br><br> It's a push! Press submit to play again`;
        resetGame();
        return outputValue;
      }
    }
  }
};
