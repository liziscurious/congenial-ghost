# congenial-ghost

## Blackjack!

It's a game we know and love. Start with $100 and lose yourself along the way. If you run out of money, there may be a friendly card shark there to help you play some more.


## Gameplay overview

-First, the player places a bet. When they're ready to start the game, they click that they placed their bet.

-After that, card backs will be displayed and then they can his the deal function.

-Their hand begins and they can see their score and the house score throughout the hand.

-Once the hand is over, a message appears with the hand outcome and the pool is dispersed to the player if they won.

-Player then can place another bet and play another round.

-If at any time, the player wants to take out a $100 loan from a cardshark nearby, they can continue playing, even if they were broke.


## Programming path

-I decided that since blackjack in casinos is played with at least six decks, using randomization in the constructor would be sufficient for the game play.

-Each hit and stand function is unique to the hand, so that the same cards are not pushed into the player and house hands at the same time.

-Hands are checked for the presence of aces when they are check to see if either player has busted. If an ace is present, the hand score is adjusted to allow that player to continue. This was an interesting challenge due to scope issues to have the score carry over.

-Cards and available actions within a hand are reset when new bets are placed after a hand has ended.

### Two game resets are present.
-Once a hand is over, new bets can be placed and the player can play another hand.
-If the player has lost all their money, they can take out a loan to continue playing.
