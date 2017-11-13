// console.log("blackjack");

$( () => {

  // Number array for cards
  const shortDeck = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
  // console.log('shortDeck is ', shortDeck);

  // Suit array for cards
  const suits = ['diamonds', 'hearts', 'clubs', 'spades'];
  // console.log('suits are ', suits);


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
        this.value = 10;
      }
      if(this.number >= 2 && this.number <= 10) {
        this.value = this.number;
      };
    }
  }




  // Testing fullCard constructor

  const hit1 = new drawCard();
  const hit2 = new drawCard();
  const hit3 = new drawCard();
  const hit4 = new drawCard();
  const hit5 = new drawCard();
  const hit6 = new drawCard();
  const hit7 = new drawCard();
  const hit8 = new drawCard();

  console.log(hit1);
  console.log(hit2);
  console.log(hit3);
  console.log(hit4);
  console.log(hit5);
  console.log(hit6);
  console.log(hit7);
  console.log(hit8);






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
