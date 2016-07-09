/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.


var playersGuess;
var pastGuesses=[];

var winningNumber = generateWinningNumber();



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.ceil(Math.random()*100);
}

//generates numbers that are not the winning number nor previous guesses ('decoys') to be returned as part of a hint
function generateNonWinningNumber(numArray){
	var potentialNumber;
	do {
	 	potentialNumber = Math.ceil(Math.random()*100);
	}
	while (numArray.indexOf(potentialNumber)>-1);
	return potentialNumber; 
}
// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +document.getElementById('your-guess').value;
	document.getElementById('your-guess').value = '';  //does this "remove guess from DOM"?
	checkGuess();

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var comparedTo = (playersGuess>winningNumber) ? 'higher':'lower';
	return comparedTo;

}

function guessMessage(){
	var proximity = Math.abs(playersGuess-winningNumber);
	var roundedProximity;
	if (proximity<5) roundedProximity= 'less than 5.';
	else if (proximity<10) roundedProximity='less than 10.';
	else if (proximity<25) roundedProximity='less than 25.';
	else if (proximity<50) roundedProximity='less than 50.';
	else roundedProximity=' a lot.';
	return message = 'Your guess is '+lowerOrHigher()+' than the number by '+roundedProximity;

}	

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (playersGuess===winningNumber){
//		console.log('you win');
		$('h2').text("You got it, it's "+playersGuess+"--Victorious!! ");
		$('h2').animate({'opacity': '0'}, 5000);
		$('body').addClass('won');
		$('span').addClass('hide');
		$('#reset').animate({'font-size':'2em'}, 5000);
	}
	else if (pastGuesses.indexOf(playersGuess)>-1){
//		console.log('already guessed');
		$('#prompt').text("You already guessed "+playersGuess+
			"... and my number hasn't changed!");
	}
	else if (pastGuesses.length>=4){
		$('h2').text("No turd-brain, it's not "+playersGuess+"... it's "+winningNumber+"!!");
		$('h2').append("<p>YOU LOSE!</p>");
		$('h2').append("<p>Now get out of my sight.</p>");
		$('h2').animate({'opacity': '0'}, 5000);
		$('#reset').animate({'font-size':'2em'}, 5000);

		$('body').addClass('lost');
		$('span').addClass('hide');
//		$('#reset').removeClass('hide');

//		console.log('you lose');
	}
	else {
		pastGuesses.push(playersGuess);
		$('#prompt').text(guessMessage());
//		console.log('nope, guess again');
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	$('#prompt').text('The number is either '+generateHintArray());
	// $('#prompt').text("You have guessed "+pastGuesses);
	// $('#prompt').append("the answer is " +winningNumber);

}

// create array of possible winning numbers (winning number along with "decoys"), length is 2x remaining guesses
function generateHintArray(){
	var targetLength = 2*(5-pastGuesses.length);
	var hintArray = [winningNumber];
	while (hintArray.length<targetLength){
		hintArray.push(generateNonWinningNumber(hintArray.concat(pastGuesses)));
	}
	var sortedArray = quickSort(hintArray);
	sortedArray.splice(targetLength-1, 0, 'or');
	return sortedArray.join(' ');
}

function quickSort(arr) {
	if (arr.length < 2) {
		return arr;
	}
	var pivot = arr[arr.length-1];
	var small = [pivot];
	var big = [];
	for (var i=0; i<arr.length-1; i++) {
		(arr[i]<pivot) ? small.push(arr[i]):big.push(arr[i]);
	}
	return quickSort(small).concat(quickSort(big));
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here

	winningNumber = generateWinningNumber();
	pastGuesses = [];
	playersGuess = undefined;
	$('body').removeClass('lost');
	$('body').removeClass('won');
	$('h2').text("Guess the number!!!")
	$('#prompt').text("Back for another round, eh? What number am I thinking of right... NOW??");
	$('span').removeClass('hide');
	$('h2').animate({'opacity': '100'}, 2000);
	$('#reset').animate({'font-size':'1em'}, 500);
}


/* **** Event Listeners/Handlers ****  */

$(document).ready(function(){

//$('#set-guess').click(playersGuessSubmission);
$('#set-guess').click(function(event){
	$('#set-guess').animate({'text-size':'1.2em'});
	$('#set-guess').animate({'text-size':'1em'});

	event.preventDefault();
	event.stopPropagation();
	playersGuessSubmission();
	});

$('#clue').click(function(event){
		
	event.preventDefault();
	event.stopPropagation();
	provideHint();
	});

$('#reset').click(function(event){
	$('#reset').animate({'top':'-12px'});
	$('#reset').animate({'top':'+12px'});

	event.preventDefault();
	event.stopPropagation();
	playAgain();
	});
});

 