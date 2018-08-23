
var url = 'https://tekatekisulit.herokuapp.com/api/view';
var indexData = 0;

fetch(url).then(function(response){
	return response.json();
}).then(function(data){
	var randomData = shuffle(data);

	quiz(randomData,indexData);
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


		var show = document.createElement('button');
		show.setAttribute('class','show-answer');
		show.textContent = 'show';
		document.querySelector('.answer-wrapper').appendChild(show);

		var hints = data[index]['hints'].split(',');
		hints.forEach(function(item){
			var answer = document.querySelectorAll('.answer');
			answer[item].setAttribute('value',dataAnswer[item]);
		});	

		var btn = document.querySelector('#submit');
	
		var dataQuiz = data;
		var indexQuiz = index;
		btn.addEventListener('click',checkAnswer(dataQuiz,indexQuiz));

		var answer = data[index]['answer'];
		var answerBox = document.querySelectorAll('.answer');
		show.addEventListener('click',showAnswer(answer,answerBox));
}


function checkAnswer(data,index){
	return function(){
		var answerColumn = document.querySelectorAll('.answer');
		var answer = "";
		var dataAnswer = data[index]['answer'].toLowerCase();
		var answerWrapper = document.querySelector('.answer-wrapper');
		var dataQuestion = document.querySelector('.question');

		answerColumn.forEach(function(item){
			var char = item.value;
			answer = answer+char;			
		});

		answer = answer.toLowerCase();

		if(document.querySelector('.true-false') != null){
			document.querySelector('.true-false').remove();
		}

		var trueFalse = document.createElement('img');
		var show = document.querySelector('.show-answer');

		if(answer == dataAnswer){

			trueFalse.setAttribute('src','images/true.svg');
			trueFalse.setAttribute('class','true-false');
			document.querySelector('.answer-wrapper').insertBefore(trueFalse,show);
				
			setTimeout(function(){
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

			},1600);
			
		}else{
			trueFalse.setAttribute('src','images/false.png');
			trueFalse.setAttribute('class','true-false');
			document.querySelector('.answer-wrapper').insertBefore(trueFalse,show);
		}	
	}
		
}

function showAnswer(answer,answerBox){
	return function(){

		var size = answer.length;

		for(var i = 0; i < size; i++){
			
			answerBox[i].value =answer[i];	
		}	
	}
		
		

}