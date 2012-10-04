$(document).ready(function() {
	var audioElement = document.createElement('audio');
	console.log(audioElement);
	audioElement.setAttribute('src', 'dshuffle.mp3');
	
	audioElement.onload  = function() { 
		audioElement.play(); 
		$(".duration span").html(audioElement.duration);
		$(".filename span").html(audioElement.src);
	};
	audioElement.oncanplay = function() { console.log("ZOINK");};
	audioElement.load()
	
	
	



	
	$('.play').click(function() {
		audioElement.play();
		
	});
	$('.pause').click(function() {
		audioElement.pause();
	});
	$('.volumeMax').click(function() {
		audioElement.volume=1;
	});
		$('.volumestop').click(function() {
		audioElement.volume=0;
	});
	$('.playatTime').click(function() {
		audioElement.currentTime= 35;
		audioElement.play();
	});			
});
