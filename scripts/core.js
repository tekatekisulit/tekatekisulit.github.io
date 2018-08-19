
var url = 'https://tekatekisulit.herokuapp.com/api/view';
var indexData = 0;

setInterval(function() {
   fetch(url).then(function(response){
		return response.json();
	})
}, 300000); // every 5 minutes (300000)

fetch(url).then(function(response){
	return response.json();
}).then(function(data){
	var randomData = shuffle(data);


	quiz(randomData,indexData);

	// var data = randomData;
	// indexData = indexData + 1;
	
		

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

function quiz(data,index){

		var answerWrapper = document.querySelector('.answer-wrapper');
		if(answerWrapper.hasChildNodes){
			while (answerWrapper.hasChildNodes()) {
	    		answerWrapper.removeChild(answerWrapper.lastChild);
			}	
		}
		
		
		var dataQuestion = document.querySelector('.question');
		dataQuestion.textContent = data[index]['question'];

		var dataAnswer = data[index]['answer'];
		var size = dataAnswer.length;

		for(var i = 0; i < size; i++){
			var char = document.createElement('input');
			char.setAttribute('class','answer');
			char.setAttribute('maxlength',1);

			document.querySelector('.answer-wrapper').appendChild(char);
		}

		var hints = data[index]['hints'].split(',');
		hints.forEach(function(item){
			var answer = document.querySelectorAll('.answer');
			answer[item].setAttribute('value',dataAnswer[item]);
		});	

		document.querySelector('#submit').onclick = function(){
			var answerColumn = document.querySelectorAll('.answer');
			var answer = "";

			answerColumn.forEach(function(item){
				var char = item.value;
				answer = answer+char;			
			});

			if(answer == dataAnswer){
				
				if(index == data.length - 1){
					dataQuestion.textContent = "Selamat, saudara memiliki IQ diatas rata - rata";

					if(answerWrapper.hasChildNodes){
						while (answerWrapper.hasChildNodes()) {
				    		answerWrapper.removeChild(answerWrapper.lastChild);
						}	
					}
					
				}else{
					index= index+1;
					quiz(data,index);	
				}
				
			}
			
		};
}