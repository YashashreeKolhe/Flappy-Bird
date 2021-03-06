$(function() {
	var container = $('#container');
	var bird = $('#bird');
	var pole = $('.pole');
	var pole_1 = $('#pole_1');
	var pole_2 = $('#pole_2');
	var score = $('#score');
	var speed_span = $('#speed');
	var restart_btn = $('#restart_btn');
	
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var pole_initial_position = parseInt(pole.css('right'));
	var pole_initial_height = parseInt(pole.css('height'));
	var bird_left = parseInt(bird.css('left'));
	var bird_height = parseInt(bird.height());
	var speed = 10;
	
	var go_up = false;
	var score_updated = false;
	var game_over = false;
	
	var msg = document.createElement("img");
		msg.setAttribute('id', "get_ready");
	        msg.setAttribute('src', "GetReady.jpeg")
	    	msg.style.position = "absolute";
	   	msg.style.left = '32%';
	   	msg.style.top = '20%';
	   	msg.style.width = '30%';
	   	msg.style.height = '30%';
		document.body.appendChild(msg);
	
	var play = document.createElement("img");
		play.setAttribute('id', "play");
	        play.setAttribute('src', "play.png")
	    	play.style.position = "absolute";
	   	play.style.left = '45%';
	   	play.style.top = '30%';
	   	play.style.width = '70px';
	   	play.style.height = '70px';
		document.body.appendChild(play);
		
	//show_game_over();
		
	document.getElementById( "play" ).onclick = function() {
	
		var element = document.getElementById("play");
		element.parentNode.removeChild(element);
	
		element = document.getElementById("get_ready");
		element.parentNode.removeChild(element);
		
		ObstacleSound = new obsound("hit.mp3");
		GameSound = new bgsound("background.mp3");
		GameSound.play();
	
		var the_game = setInterval(function() {
			if(collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top'))<= 0 || parseInt(bird.css('top'))>container_height - bird_height) {
				stop_the_game();
			}else {
				var pole_current_position = parseInt(pole.css('right'));
			
				if(pole_current_position > container_width-bird_left) {
					if(score_updated === false) {
						score.text(parseInt(score.text())+1);
						score_updated = true;
					}
				}
			
				if(pole_current_position > container_width) {
					var new_height = parseInt(Math.floor(Math.random()*201)-100);
				
					pole_1.css('height', pole_initial_height + new_height);
					pole_2.css('height', pole_initial_height - new_height);
				
					speed = speed + 1;
					speed_span.text(speed);
				
					score_updated =false;
				
					pole_current_position = pole_initial_position;
				}
			
				pole.css('right', pole_current_position +  speed);
			
				if(go_up === false) {
					go_down();
				}
			}
		}, 40);

	
		$(document).on('keydown', function(e) {
			var key = e.keyCode;
			if (key === 32 && go_up === false && game_over === false) {
			    go_up = setInterval(up, 50);
			}
		});
	
		$(document).on('keyup', function(e) {
			var key = e.keyCode;
			if(key === 32) {
				clearInterval(go_up);
				go_up = false;
			}
		});
	
		function go_down() {
			bird.css('top', parseInt(bird.css('top'))+5);
		}
	
		function up() {
			bird.css('top', parseInt(bird.css('top'))-10);
		}
	
		function stop_the_game() {
			clearInterval(the_game);
			game_over = true;
			ObstacleSound.play();
			GameSound.stop();
			show_game_over();
		}
	
		function show_game_over() {
			var over = document.createElement("img");
			over.setAttribute('src', "GameOver.png")
		    	over.style.position = "absolute";
		   	over.style.left = '32%';
		   	over.style.top = '20%';
		   	over.style.width = '30%';
		   	over.style.height = '30%';
			document.body.appendChild(over);
		}
	
		function collision($div1, $div2) {
			var x1 = $div1.offset().left;
			var y1 = $div1.offset().top;
			var h1 = $div1.outerHeight(true);
			var w1 = $div1.outerWidth(true);
			var b1 = y1+h1;
			var r1 = x1+w1;
			var x2 = $div2.offset().left;
			var y2 = $div2.offset().top;
			var h2 = $div2.outerHeight(true);
			var w2 = $div2.outerWidth(true);
			var b2 = y2+h2;
			var r2 = x2+w2;
		
			if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
				return false;
			};
			return true;
		}
		
		function bgsound(src) {
			this.sound = document.createElement("audio");
		    	this.sound.src = src;
		    	this.sound.setAttribute("preload", "auto");
		    	this.sound.setAttribute("controls", "none");
		    	this.sound.setAttribute("loop", "true");
		    	this.sound.style.display = "none";
		    	document.body.appendChild(this.sound);
		    	this.play = function(){
				this.sound.play();
		    	}
		    	this.stop = function(){
				this.sound.pause();
		    	}
		} 
		
		function obsound(src) {
			this.sound = document.createElement("audio");
		    	this.sound.src = src;
		    	this.sound.setAttribute("preload", "auto");
		    	this.sound.setAttribute("controls", "none");
		    	this.sound.style.display = "none";
		    	document.body.appendChild(this.sound);
		    	this.play = function(){
				this.sound.play();
		    	}
		    	this.stop = function(){
				this.sound.pause();
		    	}
		} 
	}
	
	restart_btn.click(function() {
		location.reload();
	});
	
	$('#stop_btn').click(function(){
		clearInterval(the_game);
		game_over = true;
		show_game_over();
	});

});
