
let deck = [{points: 2, suit: "Hearts", cardValue: "2"}, {points: 3, suit: "Hearts", cardValue: "3"}, {points: 4, suit: "Hearts", cardValue: "4"}, {points: 5, suit: "Hearts", cardValue: "5"}, {points: 6, suit: "Hearts", cardValue: "6"}, {points: 7, suit: "Hearts", cardValue: "7"}, {points: 8, suit: "Hearts", cardValue: "8"}, {points: 9, suit: "Hearts", cardValue: "9"}, {points: 10, suit: "Hearts", cardValue: "10"}, {points: 10, suit: "Hearts", cardValue: "Jack"}, {points: 10, suit: "Hearts", cardValue: "Queen"}, {points: 10, suit: "Hearts", cardValue: "King"}, {points: 11, suit: "Hearts", cardValue: "Ace"}, {points: 2, suit: "Clubs", cardValue: "2"}, {points: 3, suit: "Clubs", cardValue: "3"}, {points: 4, suit: "Clubs", cardValue: "4"}, {points: 5, suit: "Clubs", cardValue: "5"}, {points: 6, suit: "Clubs", cardValue: "6"}, {points: 7, suit: "Clubs", cardValue: "7"}, {points: 8, suit: "Clubs", cardValue: "8"}, {points: 9, suit: "Clubs", cardValue: "9"}, {points: 10, suit: "Clubs", cardValue: "10"}, {points: 10, suit: "Clubs", cardValue: "Jack"}, {points: 10, suit: "Clubs", cardValue: "Queen"}, {points: 10, suit: "Clubs", cardValue: "King"}, {points: 11, suit: "Clubs", cardValue: "Ace"}, {points: 2, suit: "Spades", cardValue: "2"}, {points: 3, suit: "Spades", cardValue: "3"}, {points: 4, suit: "Spades", cardValue: "4"}, {points: 5, suit: "Spades", cardValue: "5"}, {points: 6, suit: "Spades", cardValue: "6"}, {points: 7, suit: "Spades", cardValue: "7"}, {points: 8, suit: "Spades", cardValue: "8"}, {points: 9, suit: "Spades", cardValue: "9"}, {points: 10, suit: "Spades", cardValue: "10"}, {points: 10, suit: "Spades", cardValue: "Jack"}, {points: 10, suit: "Spades", cardValue: "Queen"}, {points: 10, suit: "Spades", cardValue: "King"}, {points: 11, suit: "Spades", cardValue: "Ace"},  {points: 2, suit: "Diamonds", cardValue: "2"}, {points: 3, suit: "Diamonds", cardValue: "3"}, {points: 4, suit: "Diamonds", cardValue: "4"}, {points: 5, suit: "Diamonds", cardValue: "5"}, {points: 6, suit: "Diamonds", cardValue: "6"}, {points: 7, suit: "Diamonds", cardValue: "7"}, {points: 8, suit: "Diamonds", cardValue: "8"}, {points: 9, suit: "Diamonds", cardValue: "9"}, {points: 10, suit: "Diamonds", cardValue: "10"}, {points: 10, suit: "Diamonds", cardValue: "Jack"}, {points: 10, suit: "Diamonds", cardValue: "Queen"}, {points: 10, suit: "Diamonds", cardValue: "King"}, {points: 11, suit: "Diamonds", cardValue: "Ace"}];

let dealtCards = []; //array to store cards that have been dealt

let playerTotal = 0; // scores
let dealerTotal = 0;

let currentCardIndex; // a variable to hold the "random" value in deck array

function selectCard() { // random array value to represent shuffling and dealing a card
    currentCardIndex = Math.floor(Math.random() * (Object.keys(deck).length-1));
}


function dealAPlayerCard() {  //grabs a card, adds point to player score, pushes card to dealtCards array
    cardsRemaining();
    selectCard();
    if (dealtCards.includes(deck[currentCardIndex])) { // This checks to make sure "dealtCards" doesn't already have that card inside
        return dealAPlayerCard();
    }
    incrementPlayerTotal();
    dealtCards.push(deck[currentCardIndex]);
    document.getElementById("playerScore").innerHTML = playerTotal;
    bustorNot();
}

function dealADealerCard() { //grabs a card, adds point to dealer score, removes card from deck
    cardsRemaining();
    selectCard();
    if (dealtCards.includes(deck[currentCardIndex])) {
        return dealADealerCard();
    }
    incrementDealerTotal();
    dealtCards.push(deck[currentCardIndex]);
    document.getElementById("dealerScore").innerHTML = dealerTotal;
    bustorNot();
}

function incrementPlayerTotal () { // calculates player score
    playerTotal += deck[currentCardIndex].points;
}

function incrementDealerTotal () { // calculates dealer score
    dealerTotal += deck[currentCardIndex].points;
}

function stand() { // When player doesn't want to hit anymore, dealer's turn. Logic for controlling when dealer hits or stands

    if (dealerTotal <=16) {
        dealADealerCard();
        stand();
    }

    else if (dealerTotal >= 16 && playerTotal > dealerTotal) {
        dealADealerCard();
        stand();
    }

    else if (playerTotal === dealerTotal) {
        document.getElementById("gameStatus").innerHTML = "Tied points! The dealer wins!";
        disableButtonsAfterGameEnd();
    }

    else if (dealerTotal >= 17 && dealerTotal <= 21) {
        calculateWinner();
    }
}

function hit() { // deals another card upon button press "hit"
    dealAPlayerCard();
}

function bustorNot() { //Calculates if player or dealer score is > 21

    if (playerTotal > 21) {
        document.getElementById("gameStatus").innerHTML = "Bust! You lose!";
        disableButtonsAfterGameEnd();
    }
    else if (dealerTotal > 21) {
        document.getElementById("gameStatus").innerHTML = "The dealer is bust! You win!";
        disableButtonsAfterGameEnd();
    }
}

function calculateWinner() { // calculates who has greater score and declares winner
    if (playerTotal > dealerTotal) {
        document.getElementById("gameStatus").innerHTML = "You beat the dealer! You win!";
        disableButtonsAfterGameEnd();
    }
    else if (dealerTotal > playerTotal) {
        document.getElementById("gameStatus").innerHTML = "Too low! The dealer wins!";
        disableButtonsAfterGameEnd();
    }
}

function displayCardValue() { // shows current card value
    return deck[currentCardIndex].cardValue;
}

function displayCardSuit() { // shows current card suit
    return deck[currentCardIndex].suit;
}

function cardsRemaining () { // displays number of cards remaining in deck
    let cardsLeft;
    cardsLeft = (deck.length - 1) - dealtCards.length;
    document.getElementById("deckCount").innerHTML = "There are " + cardsLeft + " cards remaining.";
}

function reset() { //starts the game again
    location.reload();
}

function disableButtonsAfterGameEnd() { // stops the hit and stand buttons being used after game has finished
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
}

/*function displayCards() { // unable to implement outputting in the second column
    var table = document.getElementById("cardsPlayed");
    // Insert a row in the table at the last row
    var newRow   = table.insertRow(table.rows.length);

// Insert a cell in the row at index 0
    var newCell  = newRow.insertCell(0);

// Append a text node to the cell
    var newText  = document.createTextNode(displayCardValue() + " of " + displayCardSuit());
    newCell.appendChild(newText);

}*/
//--------------------------------------------------------------------------------

function start () { //begins fresh game

    document.getElementById("newGame").style.display='none';
    dealAPlayerCard();
 //   console.log("You have the " + displayCardValue() + " of " + displayCardSuit() + "...");
    dealAPlayerCard();
    if (playerTotal === 21) {
        document.getElementById("gameStatus").innerHTML = "Blackjack! You win!";
        disableButtonsAfterGameEnd();
        return;
    }

    dealADealerCard();
    dealADealerCard();
    if (dealerTotal === 21) {
        document.getElementById("gameStatus").innerHTML = "The dealer has blackjack! You lose!";
        disableButtonsAfterGameEnd();
        return;
    }
}
