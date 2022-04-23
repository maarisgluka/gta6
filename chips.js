var startnauda = 1000,
    tempTotal = 0;

$('#nauda span').html(startnauda);

var chip1 = 1,
    chip2 = 2.50,
    chip3 = 5,
    chip4 = 10,
    chip5 = 20,
    chip6 = 25,
    chip7 = 50,
    chip8 = 100,
    chip9 = 500,
    chip10 = 1000,
    chip11 = 5000,

function maximumBet(a) {
    var foo = startnauda - a
    var bar = foo - tempTotal;
    console.log(foo + ' ____ ' + bar);
    if (tempTotal >= startnauda || bar < 0) {
        return false;
    } else {
        tempTotal += a;
        $('#js-total-bet-amount span').html(tempTotal);
    }
}

$('#js-chip1').click(function() {
    maximumBet(chip1);
});
$('#js-chip2').click(function() {
    maximumBet(chip2);
});
$('#js-chip3').click(function() {
    maximumBet(chip3);
});
$('#js-chip4').click(function() {
    maximumBet(chip4);
});
$('#js-chip5').click(function() {
    tempTotal = startingMoney;
    $('#js-total-bet-amount span').html(tempTotal);
});

$('#js-clear-bet').click(function() {
    $('#js-total-bet-amount span').html('');
    tempTotal = 0;
});

$('#js-user-win').click(function() {
    startingMoney += tempTotal;
    $('#total-pot span').html(startingMoney);
    $('#js-total-bet-amount span').html('');
    tempTotal = 0;
});
    
$('#js-user-lose').click(function() {
    startingMoney -= tempTotal;
    $('#total-pot span').html(startingMoney);
    $('#js-total-bet-amount span').html('');
    tempTotal = 0;
});