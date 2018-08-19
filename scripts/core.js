
var url = 'https://tekatekisulit.herokuapp.com/api/view';

setInterval(function() {
   fetch(url).then(function(response){
		return response.json();
	})
}, 300000); // every 5 minutes (300000)

fetch(url).then(function(response){
	return response.json();
}).then(function(data){

	var randomData = shuffle(data);

	randomData.forEach(function(item){
		console.log(item['question']);
	});

	var dataQuestion = document.querySelector('.question');
	dataQuestion.textContent = randomData[1]['question'];

	var dataAnswer = randomData[1]['answer'];
	var size = dataAnswer.length;

	for(var i = 0; i < size; i++){
		var char = document.createElement('input');
		char.setAttribute('class','answer');
		char.setAttribute('maxlength',1);

		document.querySelector('.answer-wrapper').appendChild(char);
	}

	var hints = randomData[1]['hints'].split(',');
	hints.forEach(function(item){
		var answer = document.querySelectorAll('.answer');
		answer[item].setAttribute('value',dataAnswer[item]);
	})

});


function getRandomInt(max) {
  return Math.ceil(Math.random() * Math.floor(max));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var container = document.querySelector('body');
container.style.back