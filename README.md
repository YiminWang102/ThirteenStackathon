# PlayThirteen

This is a web application that allows you to play the card game Thirteen with your friends or against AI.

Thirteen is a fairly straight-forward game, the rules are simple:

Each player is dealt thirteen cards (hence the name) and is to arrange them into 3 hands, a hand of 3 called your top, a hand of 5 called your middle, and another hand of 5 called your bottom. The only constraint is that your bottom hand has to be stronger than your middle hand which has to be stronger than your top hand.

So for example Trips, Straight, Flush, would be a legal hand, but Trips, Two Pair, Straight, would not, since the trips on top is stronger than two pair in the middle.

After everyone has finished arranging their hands, they compare their hands with everyone else's hands in the same position. The player with the winning hand is given a point and the player with the losing hand is deducted a point. In the case of a tie, zero points are awarded. This is done with every one and score is tallied after each round.

## Setup

To run this program on your machine all you need to do is to install the dependencies:

* `npm install`, or `yarn install` - whatever you're into

## Start

`npm start` will launch your server and compile your webpack file.

Connect to the server, create a lobby and enjoy! Either play in a practice room, play against AI, or play agains friends!
