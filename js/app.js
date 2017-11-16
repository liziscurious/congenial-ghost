// console.log("blackjack");

$( () => {

  // Number array for cards
  const shortDeck = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];

  // Suit array for cards
  const suits = ['diamonds', 'hearts', 'clubs', 'spades'];


  let wallet = 100;
  let pot = 0;

  let playerHand = [];
  let houseHand = [];
  let playerScore = 0;
  let houseScore = 0;

  let playerWins = 0;
  let houseWins = 0;
  let roundWin = 0;


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

  // Function to place your bets
  const bet5 = () => {
    if (wallet > 0) {
      wallet -= 5;
      pot += 5;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('#game-status').text(" ")
    }
    if (wallet <= 0) {
      lose();
    }

  };

  const bet25 = () => {
    if (wallet > 0) {
      wallet -= 25;
      pot += 25;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('#game-status').text(" ");
    }
    if (wallet <= 0) {
      lose();
    }

  };


  // Function to start new hand
  const newHand = () => {
    if (pot > 0) {
      playerScore = 0;
      houseScore = 0;
      playerHand = [];
      houseHand = [];

      // for(i=0; i < playerHand.length; i++){
      //   playerHand.pop(playerHand[i]);
      //   console.log(playerHand);
      // }

      // new hand reorganization with jQuery
      $('.cardsFaceUp').remove();
      $('#house-cards').append($('<img>').attr('src', 'images/Card-Back-04.png').addClass('card-back'), $('<img>').attr('src', 'images/Card-Back-04.png').addClass('card-back'));
      $('#player-cards').append($('<img>').attr('src', 'images/Card-Back-04.png').addClass('card-back'), $('<img>').attr('src', 'images/Card-Back-04.png').addClass('card-back'));

      $('.btn').hide();
      const $deal = $('<div>').addClass("btn").addClass("play-action").attr("id", "deal").text("Deal");
      $('#action-btns').append($deal);
      const $hit = $('<div>').addClass("btn").addClass("play-action").attr("id", "hit").text("Hit");
      $('#action-btns').append($hit);
      const $stand = $('<div>').addClass("btn").addClass("play-action").attr("id", "stand").text("Stand");
      $('#action-btns').append($stand);

      $('#house-score').text(" ");
      $('#player-score').text(" ");

      $('#deal').on('click', deal);
      $('#hit').on('click', hit);
      $('#stand').on('click', stand);
    }
  };


  // Function for initial deal for each game/ hand
  const deal = () => {
    // if (playerHand.length !== 0) {
    //   newHand();
    // }

    $('.card-back').hide();
    playerHand.push((new drawCard()), (new drawCard()));
    playerScore = (playerHand[0].value + playerHand[1].value);
    let $playerImg1 = $('<img>').attr('src', playerHand[0].image).addClass("cardsFaceUp");
    let $playerImg2 = $('<img>').attr('src', playerHand[1].image).addClass("cardsFaceUp");
    console.log('Your score is ', playerScore);

    houseHand.push((new drawCard()), (new drawCard()));
    houseScore = (houseHand[0].value + houseHand[1].value);
    let $houseImg1 = $('<img>').attr('src', houseHand[0].image).addClass("cardsFaceUp");
    let $houseImg2 = $('<img>').attr('src', houseHand[1].image).addClass("cardsFaceUp");
    console.log('House score is ', houseScore);

    $('#player-cards').append($playerImg1, $playerImg2);
    $('#player-score').text(playerScore);
    $('#house-cards').append($houseImg1, $houseImg2);
    $('#house-score').text(houseScore);

    $('#new-hand').hide();

    checkBlackjack();
    checkBust();
  };

  // Function for hit
  const hit = () => {
      playerHand.push(new drawCard());
      playerScore += playerHand[2].value;
      console.log('newcard is ', playerHand[2].value, ' your score is ', playerScore);
      let $playerImg3 = $('<img>').attr('src', playerHand[2].image).addClass("cardsFaceUp");
      $('#player-cards').append($playerImg3);

    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[2].value;
      let $houseImg3 = $('<img>').attr('src', houseHand[2].image).addClass("cardsFaceUp");
      $('#house-cards').append($houseImg3);
    };

    $('#hit').hide();
    let $hit2Div = $('<div>').addClass('btn').attr('id', 'hit2').text('Hit Again');
    $('#action-btns').eq(0).append($hit2Div);

    $('#hit2').on('click', hit2);

    checkAcePlayer();
    checkAceHouse();
    $('#player-score').text(playerScore);
    $('#house-score').text(houseScore);

    checkBlackjack();
    checkBust();
  };

  // drawing fourth card every time playerHand is under 21.
  const hit2 = () => {
      playerHand.push(new drawCard());
      playerScore += playerHand[3].value;
      console.log('newcard is ', playerHand[3].value, ' your score is ', playerScore);
      let $playerImg4 = $('<img>').attr('src', playerHand[3].image).addClass("cardsFaceUp");
      $('#player-cards').append($playerImg4);

    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[3].value;
      console.log('new house card is ', houseHand[3].value, ' house score is ', houseScore);
      let $houseImg4 = $('<img>').attr('src', houseHand[3].image).addClass("cardsFaceUp");
      $('#house-cards').append($houseImg4);
    };

    $('#hit2').hide();
    let $hit3Div = $('<div>').addClass('btn').attr('id', 'hit3').text('Hit  Again');
    $('#action-btns').eq(0).append($hit3Div);



    checkAcePlayer();
    checkAceHouse();
    $('#player-score').text(playerScore);
    $('#house-score').text(houseScore);

    checkBlackjack();
    checkBust();
  };

  // drawing fifth card every time playerHand is under 21.
  const hit3 = () => {
    if (playerScore < 21 && playerHand.length <= 4) {
      playerHand.push(new drawCard());
      playerScore += playerHand[4].value;
      console.log('newcard is ', playerHand[4].value, ' your score is ', playerScore);
      let $playerImg5 = $('<img>').attr('src', playerHand[4].image).addClass("cardsFaceUp");
      $('#player-cards').append($playerImg5);
    };

    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[2].value;
      console.log('new house card is ', houseHand[2].value, ' house score is ', houseScore);
    };

    checkAcePlayer();
    checkAceHouse();
    $('#player-score').text(playerScore);
    $('#house-score').text(houseScore);

    checkBlackjack();
    checkBust();
  };


  // Function for stand, draws new cards for house only if houseScore is below 17
  const stand = () => {
    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[2].value;
      console.log('new house card is ', houseHand[2].value, ' house score is ', houseScore);
      let $houseImg3 = $('<img>').attr('src', houseHand[2].image).addClass("cardsFaceUp");
      $('#house-cards').append($houseImg3);
    };

    $('#stand').hide();
    let $stand2Div = $('<div>').addClass('btn').attr('id', 'stand2').text('Stand');
    $('#action-btns').append($stand2Div);

    checkAcePlayer();
    checkAceHouse();
    $('#house-score').text(houseScore);

    checkWin();
    checkBlackjack();
    checkBust();


  };

  // second stand function
  const stand2 = () => {
    if (houseScore < 17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[3].value;
      console.log('new house card is ', houseHand[3].value, 'house score is ', houseScore);
      let $houseImg4 = $('<img>').attr('src', houseHand[3].image).addClass("cardsFaceUp");
      $('#house-cards').append($houseImg4);
    };

    $('#stand2').hide();
    let $stand3Div = $('<div>').addClass('btn').attr('id', 'stand3').text('Stand');
    $('#action-btns').append($stand3Div);

    checkAcePlayer();
    checkAceHouse();
    $('#house-score').text(houseScore);

    checkWin();
    checkBlackjack();
    checkBust();


  };

  // third stand function
  const stand3 = () => {
    if (houseScore <17) {
      houseHand.push(new drawCard());
      houseScore += houseHand[4].value;
      console.log('new house card is ', houseHand[4].value, 'house score is ', houseScore);
      let $houseImg5 = $('<img>').attr('src', houseHand[4].image).addClass("cardsFaceUp");
      $('#house-cards').append($houseImg5);
    };

    checkAcePlayer();
    checkAceHouse();
    $('#house-score').text(houseScore);

    checkWin();
    checkBlackjack();
    checkBust();
  };

  // Checking for win conditions
  // check for presence of an ace in the the player's hand
  const checkAcePlayer = () => {
    // first need to check to see if the score of the hand in question is over 21
    if (playerScore > 21) {
      // if hand in question is over 21,
      // console.log(playerScore);
      for (let i = 0; i < playerHand.length; i++) {

        if (playerHand[i].number === "ace") {
          // then need to change value of the ace to 1
          playerScore -= 10;
          // console.log(playerScore);
        }
        else {
          // console.log(playerScore);
        }
      };
    };
  };

  // check for presence of an ace in the the house's hand
  const checkAceHouse = () => {
    if (houseScore > 21) {
      // console.log(houseScore);
      for (let i = 0; i < houseHand.length; i++) {
        if (houseHand[i].number === "ace") {
          houseScore -= 10;
          // console.log(houseScore);
        }
        else {
          // console.log(houseScore);
        }
      };
    };
  };

  const checkWin = () => {
    console.log('Your score is ' + playerScore + '. House score is ' + houseScore + '.');
    if (houseScore >16 && playerScore === houseScore) {
      console.log("Push!(Draw) Keep your money for now.");
      $('#game-status').text("Push!(Draw) Keep your money for now.");
      wallet += pot;
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('.play-action').remove();
      $('#new-hand').show();
    };
    if (houseScore > 16 && playerScore > houseScore && playerScore <= 21) {
      playerWins += 1;
      console.log("You win! Player has ", playerWins, " wins. House has ", houseWins, " wins.");
      $('#game-status').text("You win!");
      wallet += (pot * 2);
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('.play-action').remove();
      $('#new-hand').show();
    };
    if (houseScore > 16 && houseScore < 21 && houseScore > playerScore) {
      houseWins += 1;
      console.log("House wins. Womp womp. House has ", houseWins, " wins. Player has ", playerWins, " wins.");
      $('#game-status').text("House wins. Womp womp.");
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('.play-action').remove();
      $('#new-hand').show();
    };
  };

  const checkBlackjack = () => {
    if (playerScore == 21 && houseScore < 21) {
      playerWins += 1;
      console.log("Blackjack! You win! Player has ", playerWins, " wins. House has ", houseWins, " wins.");
      $('#game-status').text("Blackjack! You win!");
      wallet += (pot * 2);
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('.play-action').remove();
      $('#new-hand').show();
    };
    if (houseScore == 21 && playerScore < 21) {
      houseWins += 1;
      console.log("House got Blackjack! You lose. Womp womp. House has ", houseWins, " wins. Player has ", playerWins, " wins.");
      $('#game-status').text("House got Blackjack! You lose. Womp womp.");
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      $('.play-action').remove();
      $('#new-hand').show();
    };
  };

  const checkBust = () => {
    if (houseScore > 21 && playerScore <= 21) {
      playerWins += 1;
      console.log("House busts! You win! Player has ", playerWins, " wins. House has ", houseWins, " wins.");
      $('#game-status').text("House busts! You win!");
      wallet += (pot * 2);
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      // checkLose();
      $('.play-action').remove();
      $('#new-hand').show();
    };
    if (playerScore > 21 && houseScore <= 21) {
      houseWins += 1;
      console.log("You bust! House wins! House has", houseWins, " wins. Player has ", playerWins, " wins.");
      $('#game-status').text("You bust! House wins!");
      pot = 0;
      $('#wallet').text(wallet);
      $('#pot').text(pot);
      // checkLose();
      $('.play-action').remove();
      $('#new-hand').show();
    };
  };

  const lose = () => {
    // if (wallet <= 0) {
      $modal.css('display', 'block');

      wallet = 100;
      pot = 0;

      playerHand = [];
      houseHand = [];
      playerScore = 0;
      houseScore = 0;

      playerWins = 0;
      houseWins = 0;
      roundWin = 0;

      $('#wallet').text(wallet);
      $closeBtn.on('click', closeModal);

    // }
  };

  $('#bet5').on('click', bet5);
  $('#bet25').on('click', bet25);
  $('#new-hand').on('click', newHand);
  $('#hit2').on('click', hit2);
  $('#hit3').on('click', hit3);
  $('#stand2').on('click', stand2);
  $('#stand3').on('click', stand3);


});
