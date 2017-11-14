// console.log("blackjack");

$( () => {

  // Number array for cards
  const shortDeck = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
  // console.log('shortDeck is ', shortDeck);

  // Suit array for cards
  const suits = ['diamonds', 'hearts', 'clubs', 'spades'];
  // console.log('suits are ', suits);

  let playerHand = [];
  let houseHand = [];
  let playerScore = 0;
  let houseScore = 0;


  // Class to draw a random card with number, suit, and value properties.
  class drawCard {
    constructor(number, suit, value) {
      this.number = shortDeck[Math.floor(Math.random() * 13)];
      this.suit = suits[Math.floor(Math.random() * 4)];
      this.image = 'images/' + this.number + "_of_" + this.suit + '.png';
      // I referenced http://aaronlipkin.com/blackjack/ for formatting image property to correspond to image file names.
      if(this.number === "jack") {
        this.value = 10;
      }
      if(this.number === "queen") {
        this.value = 10;
      }
      if(this.number === "king") {
        this.value = 10;
      }
      if(this.number === "ace") {
        this.value = 11;
      }
      if(this.number >= 2 && this.number <= 10) {
        this.value = this.number;
      };
    };
  };

  const cardback = $('<img>').attr('src', 'images/Card-Back-04.png');

  const checkWin = () => {
    alert('Your score is ' + playerScore + '. House score is ' + houseScore + '.');
    if (playerScore === 21) {
      alert("Blackjack! You win!")
    };
    if (playerScore <= 20 && houseScore === 21) {
      alert("House wins. Womp womp.")
    };
    if (playerScore === 21 && houseScore === 21) {
      alert("Push!(Draw) Keep your money for now.")
    };
    if (houseScore > 16 && playerScore > houseScore && playerScore <= 21) {
      alert("You win!")
    };
    if (houseScore > 21 && playerScore <= 21) {
      alert("House busts! You win!")
    };
    if (playerScore >= 21 && houseScore <= 21) {
      alert("You bust! House wins!")
    }
    console.log(playerScore);
  }
  // Function for initial deal for each game/ hand
  const deal = () => {
    $('.card-back').hide();
    playerHand.push((new drawCard()), (new drawCard()));
    playerScore = (playerHand[0].value + playerHand[1].value);
    let $playerImg1 = $('<img>').attr('src', playerHand[0].image);
    let $playerImg2 = $('<img>').attr('src', playerHand[1].image);
    // console.log('Your score is ', playerScore);
    houseHand.push((new drawCard()), (new drawCard()));
    houseScore = (houseHand[0].value + houseHand[1].value);
    let $houseImg1 = $('<img>').attr('src', houseHand[0].image);
    let $houseImg2 = $('<img>').attr('src', houseHand[1].image);
    // console.log('House score is ', houseScore);
    $('#player-cards').append($playerImg1, $playerImg2);
    $('#player-score').text(playerScore);
    $('#house-cards').append($houseImg1, $houseImg2);
    $('#house-score').text(houseScore);

    // alert('Your score is ' + playerScore + '. House score is ' + houseScore + '.');
    checkWin();
  };

  // drawing fourth card every time playerHand is under 21. trying to fix
  const hit2 = () => {
    if (playerScore < 21 && playerHand.length == 3) {
      playerHand.push(new drawCard());
      playerScore += playerHand[3].value;
      console.log('newcard is ', playerHand[3].value, ' your score is ', playerScore);
      let $playerImg4 = $('<img>').attr('src', playerHand[3].image);
      $('#player-cards').append($playerImg4);
      $('#player-score').text(playerScore);
      // console.log('card 4 is ' + playerHand[3].value);
      // console.log('card 5 is ' + playerHand[4].value);
      console.log(playerHand);
    };
    checkWin();
  };

  // Function for hit

  const hit = () => {
    if (playerScore < 21 && playerHand.length <= 2) {
      playerHand.push(new drawCard());
      playerScore += playerHand[2].value;
      console.log('newcard is ', playerHand[2].value, ' your score is ', playerScore);
      let $playerImg3 = $('<img>').attr('src', playerHand[2].image);
      $('#player-cards').append($playerImg3);
      $('#player-score').text(playerScore);
      // console.log('card 4 is ' + playerHand[3].value);
      // console.log('card 5 is ' + playerHand[4].value);
      console.log(playerHand);
    };

    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[2].value;
      // console.log('new house card is ', houseHand[2].value, ' house score is ', houseScore);
      let $houseImg3 = $('<img>').attr('src', houseHand[2].image);
      $('#house-cards').append($houseImg3);
      $('#house-score').text(houseScore);
      $('#hit').hide();
    };
    let $hitAgain = $('<div>').addClass('btn').attr('id', 'hit2').text('Hit Again');
    $('#action-btns').eq(0).append($hitAgain);
    checkWin();
  };


  // Function for stand, draws new cards for house only if houseScore is below 17
  const stand = () => {
    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[2].value;
      console.log('new house card is ', houseHand[2].value, ' house score is ', houseScore);
      let $houseImg3 = $('<img>').attr('src', houseHand[2].image);
      $('#house-cards').append($houseImg3);
      $('#house-score').text(houseScore);
    };
    // alert('Your score is ' + playerScore + '. House score is ' + houseScore + '.');
    checkWin();
  };

  $('#deal').on('click', deal);
  $('#hit').on('click', hit);
  $('#hit-again').on('click', hit2);
  $('#stand').on('click', stand);




});

// Blackjack pseudocode time :)

// Need to create objects/ object classes for cards in play once randomizations are correct.
//   Start with one suit, once that's good, then go to one deck

// Look into logic of switch statements for handling of Ace values

//




// Minimum rules to implement for win conditions:
//   1.  Highest score <= 21 wins
//   2.  Ace is 1 or 10, depending on what is still <= 21
//   3.  Facecards all have a point value of 10
//   4.  Have to be able to start the game after window onload
//   5.  Must be able to hit or stand
//   6.  Dealer hits at 16, stands at 17
//   7.  Card dealing randomization: use Math.floor and Math.random to pick cards.
//   8.  Test in console or alerts first


// Must be worked out for minimum viable product
//   1.  Bets: deduct bet from wallet for the round
//   2.  Calculating a draw/ push scenario how that affects bank
//   3.  Maintain a wallet variable
//   4.  Hard lose conditions for when wallet gets below zero.
//   5.  Cannot have a green background
//   6.  Basic HTML and CSS layout


// Stretch:
//   1.  Create an escrow variable for where the bet goes while in play
//   2.  Instructions
//   3.  Split
//   4.  Double down
//   5.  Insurance
