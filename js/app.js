console.log("blackjack");


// console testing for basic dealing logic

let playerScore = 0;
let houseScore = 0;
console.log('playerScore is ', playerScore);
console.log('houseScore is ', houseScore);

let shortDeck = ['Ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'Jack', 'Queen', 'King'];
console.log('shortDeck is ', shortDeck);

let deal = () => {
  console.log(shortDeck[Math.floor(Math.random() * 13)]);
};

for(let i=0; i <=100; i++) {
  deal();
};







// Stands:

// - What did I work on yesterday
// - What am I trying to get done today
// - What is preventing me from getting this done.









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
