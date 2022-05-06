$.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));
});

summa = 1000
document.getElementById('summa').innerHTML = summa

likme = 0
document.getElementById('likme').innerHTML = likme

function add (num) {
    if (summa >= num) {
        likme += num;
        summa -= num
        document.getElementById('likme').innerHTML = likme
        document.getElementById('summa').innerHTML = summa
    }
    
}

function reset () {
    summa = summa + likme
    likme = 0
    document.getElementById('likme').innerHTML = likme
    document.getElementById('summa').innerHTML = summa
}

var jsbApp = {};

jsbApp.pcards = document.getElementById('pcards');
jsbApp.dcards = document.getElementById('dcards');
jsbApp.hitButton = document.getElementById('hit');
jsbApp.stayButton = document.getElementById('stay');
jsbApp.playButton = document.getElementById('play');
jsbApp.textUpdates = document.getElementById('textUpdates');
jsbApp.buttonBox = document.getElementById('buttonBox');
jsbApp.phandtext = document.getElementById('phand');
jsbApp.dhandtext = document.getElementById('dhand');
jsbApp.tracker = document.getElementById('tracker');
jsbApp.newgame = document.getElementById('newgame');
jsbApp.choice = document.getElementById('choice');

jsbApp.playerHand = [];
jsbApp.dealerHand = [];
jsbApp.deck = [];
jsbApp.suits = ['<span class="bold">&#9827</span>', '<span class="boldrc">&#9830</span>', '<span class="boldrc">&#9829</span>', '<span class="bold">&#9824</span>'];
jsbApp.values = ["Dūzis", "Divi", "Trīs", "Četri", "Pieci", "Seši", "Septiņi", "Astoņi", "Deviņi", "Desmit", "Kalps", "Dāma", "Kungs"];
jsbApp.gameStatus = 0;
jsbApp.wins = 0; 
jsbApp.draws = 0; 
jsbApp.losses = 0; 
jsbApp.games = 0; 

function card(suit, value, name) {
    this.suit = suit;
    this.value = value;
    this.name = name;
};


var newGame = function () {

    if (likme > 0) {
        jsbApp.newgame.classList.add("hidden");
     
    jsbApp.dcards.innerHTML = "";
    jsbApp.dcards.innerHTML = "";
    jsbApp.playerHand = [];
    jsbApp.dealerHand = [];
    jsbApp.gameStatus = 0;

    


    jsbApp.deck = createDeck();


    jsbApp.playerHand.push(jsbApp.deck.pop());
    jsbApp.playerHand.push(jsbApp.deck.pop());


    if (handTotal(jsbApp.playerHand) === 21)
    {
        jsbApp.wins += 1;
        jsbApp.games += 1;        
        jsbApp.gameStatus = 1;
        drawHands();
        jsbApp.textUpdates.innerHTML = "Tu uzvarēji, tavas rokas vērtība bija 21!";
        track();
        jsbApp.gameStatus = 2;
        return;
    }

    jsbApp.dealerHand.push(jsbApp.deck.pop());
    jsbApp.dealerHand.push(jsbApp.deck.pop());
 
    if (handTotal(jsbApp.dealerHand) === 21)
    {
        jsbApp.games += 1;
        jsbApp.losses += 1;
        jsbApp.gameStatus = 1;
        drawHands();
        jsbApp.textUpdates.innerHTML = "Tu pakāsi, dealera rokas vērtība bija 21!";
        track();
        jsbApp.gameStatus = 2; 
        return;
    }


    drawHands();
    advise();
    jsbApp.buttonBox.classList.remove("hidden");
    jsbApp.textUpdates.innerHTML = "Rokas tika izdalītas!";
    
    }

    else {
        alert('UZLIEC LIKMI!')
    }
}
    
var createDeck = function () {
    var deck = [];

    for (var a = 0; a < jsbApp.suits.length; a++) {
        for (var b = 0; b < jsbApp.values.length; b++) {
            var cardValue = b + 1;
            var cardTitle = "";            
            if (cardValue > 10){
                cardValue = 10;
            }
            if (cardValue != 1) {
                cardTitle += (jsbApp.values[b] + "  " + jsbApp.suits[a] + " (" + cardValue + ")");
            }
            else
            {
                cardTitle += (jsbApp.values[b] + "  " + jsbApp.suits[a] + " (" + cardValue + " or 11)");
            }
            var newCard = new card(jsbApp.suits[a], cardValue, cardTitle);
            deck.push(newCard);
            

        }
    }

    deck = shuffle(deck);

    return deck;
};

var drawHands = function () {    
    var htmlswap = "";
    var ptotal = handTotal(jsbApp.playerHand);
    var dtotal = handTotal(jsbApp.dealerHand);
    htmlswap += "<ul>";
    for (var i = 0; i < jsbApp.playerHand.length; i++)
    {
        htmlswap += "<li>" + jsbApp.playerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    jsbApp.pcards.innerHTML = htmlswap;
    jsbApp.phandtext.innerHTML = "Tava roka (" + ptotal + ")";
    if (jsbApp.dealerHand.length == 0)
    {
        return;
    }

    htmlswap = "";
    if (jsbApp.gameStatus === 0)
    {
        htmlswap += "<ul><li>[Paslēptā kārts]</li>";
        jsbApp.dhandtext.innerHTML = "Dealera roka (" + jsbApp.dealerHand[1].value + " + pasleptā kārts)"; // hide value while a card is face down
    }
    else
    {
        jsbApp.dhandtext.innerHTML = "Dealera roka (" + dtotal + ")"; //
    }
    
    for (var i = 0; i < jsbApp.dealerHand.length; i++) {

        if (jsbApp.gameStatus === 0)
        {
            i += 1;
        }
        htmlswap += "<li>" + jsbApp.dealerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    jsbApp.dcards.innerHTML = htmlswap;
    

};


var handTotal = function (hand) {

    var total = 0;
    var aceFlag = 0; 
    for (var i = 0; i < hand.length; i++) {

        total += hand[i].value;
        if (hand[i].value == 1)
        {
            aceFlag += 1;
        }
    }

    for (var j = 0; j < aceFlag; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }

    return total;
}


var shuffle = function (deck) {

    var shuffledDeck = [];
    var deckL = deck.length;
    for (var a = 0; a < deckL; a++)
    {
        var randomCard = getRandomInt(0, (deck.length));        
        shuffledDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);        
    }
    return shuffledDeck;
}

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
    
}


var deckPrinter = function (deck) {
    for (var i = 0; i < deck.length; i++)
    {
        console.log(deck[i].name);
    }
    return
}

jsbApp.playButton.addEventListener("click", newGame);


jsbApp.hitButton.addEventListener("click", function () {
 
    if (jsbApp.gameStatus === 2)
    {
        console.log("Hit clicked when game was over or already clicked.");
        return;
    }

    jsbApp.playerHand.push(jsbApp.deck.pop());
    drawHands();
   

    var handVal = handTotal(jsbApp.playerHand);
    if (handVal > 21)
    {
        bust();
        advise();
        return;
    }
    else if (handVal === 21)
    {
        victory();
        advise();
        return;
    }
    advise();
    jsbApp.textUpdates.innerHTML = "Sitīsi vai paliksi?</p>";
    return;      
});


jsbApp.stayButton.addEventListener("click", function stayLoop() {

    if (jsbApp.gameStatus === 2)
    {
        console.log("Stay clicked when game was over or already clicked.");
        return;
    }
    else if (jsbApp.gameStatus === 0) // 
    {
        
        jsbApp.buttonBox.classList.add("hidden");
        var handVal = handTotal(jsbApp.dealerHand);
        jsbApp.gameStatus = 1; 
        advise();
        jsbApp.textUpdates.innerHTML = "Dealeris atklāj paslēpto kārti!";
        drawHands();
        setTimeout(stayLoop, 750);
    }
    else if (jsbApp.gameStatus === 1) {    

    var handVal = handTotal(jsbApp.dealerHand);
    if (handVal > 16 && handVal <= 21) 
    {
        drawHands();

        var playerVal = handTotal(jsbApp.playerHand);
        if (playerVal > handVal)
        {            
            victory();
            return;
        }
        else if (playerVal < handVal)
        {            
            bust();
            return;
        }
        else
        {            
            tie();
            return;
        }
    }
    if (handVal > 21)
    {
        victory();
        return;
    }
    else // hit
    {
        jsbApp.textUpdates.innerHTML = "Dealeris sit!";
        jsbApp.dealerHand.push(jsbApp.deck.pop());
        drawHands();
        setTimeout(stayLoop, 750);
        return;
    }   
    }
});

var victory = function () {
    summa = summa + likme * 2;
    likme = 0;
    document.getElementById('likme').innerHTML = likme;
    document.getElementById('summa').innerHTML = summa;
    jsbApp.wins += 1;
    jsbApp.games += 1;
    var explanation = "";
    jsbApp.gameStatus = 2;
    var playerTotal = handTotal(jsbApp.playerHand);
    var dealerTotal = handTotal(jsbApp.dealerHand);
    if (playerTotal === 21)
    {
        explanation = "Tavas rokas vērtiba ir 21!";
    }
    else if (dealerTotal > 21)
    {
        explanation = "Dealeris pakāsa ar " + dealerTotal + "!";
    }
    else
    {
        explanation = "Tev bija " + playerTotal + " un dealerim bija " + dealerTotal + ".";
    }
    jsbApp.textUpdates.innerHTML = "Tu uzvarēji!<br>" + explanation + "<br>Spied 'Jauna spēle', lai spēlētu vēlreiz.";
    track();
}

var bust = function () {
    likme = 0;
    document.getElementById('likme').innerHTML = likme;
    jsbApp.games += 1;
    jsbApp.losses += 1;
    var explanation = "";
    jsbApp.gameStatus = 2;
    var playerTotal = handTotal(jsbApp.playerHand);
    var dealerTotal = handTotal(jsbApp.dealerHand);
    if (playerTotal > 21)
    {
        explanation = "Tu pakāsi ar " + playerTotal + ".";
    }
    jsbApp.textUpdates.innerHTML = "Tu pakāsi.<br>" + explanation + "<br>Spied 'Jauna spēle', lai spēlētu vēlreiz.";
    track();
}

var tie = function () {
    reset();
    jsbApp.games += 1;
    jsbApp.draws += 1;
    var explanation = "";
    jsbApp.gameStatus = 2;
    var playerTotal = handTotal(jsbApp.playerHand);
    jsbApp.textUpdates.innerHTML = "Neizškirts ar " + playerTotal + " punktiem katram.<br>Spied 'Jauna spēle', lai spēlētu vēlreiz.";
    track();
}


var track = function () {
    jsbApp.tracker.innerHTML = "<text>Uzvaras: " + jsbApp.wins + " Neizķirti: " + jsbApp.draws + " Zaudes: " + jsbApp.losses + "</text>";
    jsbApp.newgame.classList.remove("hidden");
    jsbApp.buttonBox.classList.add("hidden");
}

var softCheck = function (hand) {    
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {

        total += hand[i].value;
        if (hand[i].value == 1) {
            aceFlag += 1;
        }
    }

    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
            return true;
        }
    }    
    return false; 
}

var advise = function () {

    if (jsbApp.gameStatus > 0)
    {
        jsbApp.choice.innerHTML = "";
        return;
    } 
    var playerTotal = handTotal(jsbApp.playerHand);
    var soft = softCheck(jsbApp.playerHand);
    console.log("Mīksts: " + soft);
    var dealerUp = jsbApp.dealerHand[1].value;

    if (dealerUp === 1)
    {
        dealerUp = 11;
    }

    if (playerTotal <= 11 && !soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp <= 6 && !soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp >= 7 && !soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else if (playerTotal >= 17 && playerTotal <= 21 && !soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else if (playerTotal >= 12 && playerTotal <= 18 && soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else if (playerTotal >= 19 && playerTotal <= 21 && soft)
    {
        jsbApp.choice.innerHTML = "";
    }
    else
    {
        jsbApp.choice.innerHTML = "Kaut kas nesagāja, sorry!";
        console.log("Error: Spēlētāja roka bija " + playerTotal + " dealera roka bija " + dealerUp + ".");
    }
    return;
}