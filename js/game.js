//////////////////////////////////
//	Date : Oct. 3 2016 			//
// 								//
//	Group: 19 					//
// 								//
//	Members: 					//
//	Anthony Hill	- 141667940	//
//	Xue Wu Zhang	- 123000380	//
//////////////////////////////////

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);



//Image Related
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Projectile image
var projectileReady = false;
var projectileImage = new Image();
projectileImage.onload = function(){
	projectileReady = true;
};
projectileImage.src = "images/projectile.png";

// Death image
var deathReady = false;
var deathImage = new Image();
deathImage.onload = function(){
	deathReady = true;
}
deathImage.src = "images/ded.png";

// Pause Image
var pauseReady = false;
var pauseImage = new Image();
pauseImage.onload = function(){
	pauseReady = true;
}
pauseImage.src = "images/pause.png";

// Heart Image 
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function(){
	heartReady = true;
}
heartImage.src = "images/heart.png"

// Gear1 Image 
var gear1Ready = false;
var gear1Image = new Image();
gear1Image.onload = function(){
	gear1Ready = true;
}
gear1Image.src = "images/gear1.png"

// Gear2 Image 
var gear2Ready = false;
var gear2Image = new Image();
gear2Image.onload = function(){
	gear2Ready = true;
}
gear2Image.src = "images/gear2.png"

// Gear3 Image 
var gear3Ready = false;
var gear3Image = new Image();
gear3Image.onload = function(){
	gear3Ready = true;
}
gear3Image.src = "images/gear3.png"

// Gear4 Image 
var gear4Ready = false;
var gear4Image = new Image();
gear4Image.onload = function(){
	gear4Ready = true;
}
gear4Image.src = "images/gear4.png"

// Gear5 Image 
var gear5Ready = false;
var gear5Image = new Image();
gear5Image.onload = function(){
	gear5Ready = true;
}
gear5Image.src = "images/gear5.png"

// Gear6 Image 
var gear6Ready = false;
var gear6Image = new Image();
gear6Image.onload = function(){
	gear6Ready = true;
}
gear6Image.src = "images/gear6.png"

// Gear array to hold all gears to increase readability
var gearArray = [gear1Image, gear2Image, gear3Image, gear4Image, gear5Image, gear6Image];

//mute image
var muteReady = false;
var muteImage = new Image();
muteImage.onload = function(){
	muteReady = true;
}
muteImage.src = "images/muted.png"

//notmuted image
var notmuteReady = false;
var notmuteImage = new Image();
notmuteImage.onload = function(){
	notmuteReady = true;
}
notmuteImage.src = "images/unmuted.png"


//coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function(){
	coinReady = true;
}
coinImage.src = "images/coin.png"

//shop image
var shopReady = false;
var shopImage = new Image();
shopImage.onload = function(){
	shopReady = true;
}
shopImage.src = "images/shop.png"

//shop purchased image 
var shop1Ready = false;
var shop1Image = new Image();
shop1Image.onload = function(){
	shop1Ready = true;
}
shop1Image.src = "images/shopBulletsBought.png"










//sound related
var backgroundSound = new Audio("sounds/motorcycle.wav");
if (!soundMuted){
	backgroundSound.play();
}
backgroundSound.loop = true;

var crashSoud = new Audio("sounds/crash.wav");

var passingSound = new Audio("sounds/passing.wav");

var pewSound = new Audio("sounds/pew.wav");

var coinSound = new Audio("sounds/coin.wav");



//constants
var HEROSPEED = 256;
var HEROXPOS = 32;
var MONSTERSPEED = 50;
var BULLETSPEED = 400;
var COINSPEED = 800;
var COINSPAWNFACTOR = 1.5;
var BACKGROUNDSPEED = 1;
var STARTINGHEALTH = 5;
var HEROWIDTH = 32;
var HEROHEIGHT = 32;
var ENEMYWIDTH = 32;
var ENEMYHEIGHT = 32;
var BULLETWIDTH = 32;
var BULLETHEIGHT = 32;
var COINWIDTH = 40;
var COINHEIGHT = 40;



// Game objects
var hero = {};
hero.speed = HEROSPEED;
hero.width = HEROWIDTH;
hero.height = HEROHEIGHT;
monsterArray = [];
bulletArray = [];
coinArray = [];

var backgroundOffset = 0;


// Display values
var monstersCaught ;
var monstersEscaped ;
var health ;
var myinterval ;
var coininterval;
var gear ;
var coins ;
var trippleBullets = false;
var gear = 1;
var gamePaused = false;
var soundMuted = false;
var shopOpen = false;




// Handle keyboard/mouse controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;

	if (e.keyCode == 80 && health > 0){		//p, toggle the paused state
		if (gamePaused){		//unpause the game
			myinterval = setInterval(function(){ generateEnemy(); }, 10000/(gear*2));
			coininterval = setInterval(function(){ generateCoins();}, 10000/COINSPAWNFACTOR);
			if (!soundMuted){
				backgroundSound.play();
			}
		}
		gamePaused = !gamePaused;
	}


	if (gamePaused){		//to prevent gear switches, movement and bullet firing while paused
		backgroundSound.pause();
		return true;
	}

	if (e.keyCode == 83){		//s, open or close the shop
		if (shopOpen){
			myinterval = setInterval(function(){ generateEnemy(); }, 10000/(gear*2));
			coininterval = setInterval(function(){ generateCoins();}, 10000/COINSPAWNFACTOR);
		}
		if (!soundMuted){
			backgroundSound.play();
		}
		shopOpen = !shopOpen;
	}

	if (shopOpen){
		if (e.keyCode == 81 && coins > 9 && trippleBullets == false){		//q, purchase tripple bullets
			trippleBullets = true;
			localStorage.setItem('trippleBullets', 'true');
			coins-=10;
			localStorage.setItem('coins', coins);
		}
		backgroundSound.pause();
		return true;
	}

	if (e.keyCode == 32 && health > 0 ){	//spacebar, shoot forward
		bulletArray.push({
			x:hero.x,
			y:hero.y,
			xSpeed:1,
			ySpeed:0,
			width:BULLETWIDTH,
			height:BULLETHEIGHT
		});
		if (trippleBullets){
			bulletArray.push({
				x:hero.x,
				y:hero.y+5+BULLETHEIGHT,
				xSpeed:1,
				ySpeed:0,
				width:BULLETWIDTH,
				height:BULLETHEIGHT
			});
			bulletArray.push({
				x:hero.x,
				y:hero.y-5-BULLETHEIGHT,
				xSpeed:1,
				ySpeed:0,
				width:BULLETWIDTH,
				height:BULLETHEIGHT
			});

		}
		if(!soundMuted){
			playPewSound();
		}
	}	
	if (e.keyCode == 77){				//m, mute/unmute the sound
		soundMuted = !soundMuted;
		backgroundSound.pause();
		if (!soundMuted){
			backgroundSound.play();
		}
	}
	if (e.keyCode == 82){	//r, reset the game

		localStorage.setItem('health', STARTINGHEALTH);
		localStorage.setItem('caught', 0);
		localStorage.setItem('escaped', 0);
		localStorage.setItem('coins', 0);
		localStorage.setItem('trippleBullets', 'false');
		startup();

	}
	if (e.keyCode == 67 && health == 0){		//c, continue the game, add 5 lives
		health += STARTINGHEALTH;
		localStorage.setItem('health', health);
		myinterval = setInterval(function(){ generateEnemy(); }, 10000/(gear*2));
		coininterval = setInterval(function(){ generateCoins();}, 10000/COINSPAWNFACTOR);
		if (!soundMuted){
			backgroundSound.play();
		}
	}
	if (e.keyCode == 75){		//k, kill yourself
		health = 0;
		localStorage.setItem('health', health);
		if (!soundMuted){
			crashSoud.play();
		}
	}
	if (e.keyCode == 71){
		coins ++;	//this is needed otherwise it thinks that 0 is a string, and not an int
		coins = coins + 99;
		localStorage.setItem('coins', coins);
	}

	else if (e.keyCode == 49 || e.keyCode ==97){
		gear = 1;
		changeGearTo(1);
	}
	else if (e.keyCode == 50 || e.keyCode ==98){
		gear = 2;
		changeGearTo(2);
	}
	else if (e.keyCode == 51 || e.keyCode ==99){
		gear = 3;
		changeGearTo(3);
	}
	else if (e.keyCode == 52 || e.keyCode ==100){
		gear = 4;
		changeGearTo(4);
	}
	else if (e.keyCode == 53 || e.keyCode ==101){
		gear = 5;
		changeGearTo(5);
	}
	else if (e.keyCode == 54 || e.keyCode ==102){
		gear = 6
		changeGearTo(6);
	}

}, false);


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("click", function(e){
	if (e.x > 48 && health > 0 && !gamePaused && !shopOpen){
		var dir = Math.atan((e.y-hero.y-16)/(e.x-hero.x-16));
		bulletArray.push({
			x:hero.x,
			y:hero.y,
			xSpeed:Math.cos(dir),
			ySpeed:Math.sin(dir),
			width:BULLETWIDTH,
			height:BULLETHEIGHT
		});
		if (trippleBullets){
			bulletArray.push({
				x:hero.x,
				y:hero.y+5+BULLETHEIGHT,
				xSpeed:Math.cos(dir),
				ySpeed:Math.sin(dir),
				width:BULLETWIDTH,
				height:BULLETHEIGHT
			});
			bulletArray.push({
				x:hero.x,
				y:hero.y-5-BULLETHEIGHT,
				xSpeed:Math.cos(dir),
				ySpeed:Math.sin(dir),
				width:BULLETWIDTH,
				height:BULLETHEIGHT
			});
		}
		playPewSound();
	}
}, false);





var playPewSound = function(){
	pewSound.pause();
	pewSound.currentTime = 0.0;
	pewSound.play();
}

var playPassSound = function(){
	passingSound.pause();
	passingSound.currentTime = 0.0;
	passingSound.play();
}

var playCrashSound = function(){
	crashSoud.pause();
	crashSoud.currentTime = 0.0;
	crashSoud.play();
}

var playCoinSound = function(){
	coinSound.pause();
	coinSound.currentTime = 0.0;
	coinSound.play();
}

//update the car gear
var changeGearTo = function(newGear){
	backgroundSound.pause();
	clearInterval(myinterval);
	myinterval = setInterval(function(){ generateEnemy(); }, 10000/(gear*2));
	if (!soundMuted){
		setTimeout(function(){ backgroundSound.play();}, 300);
	}
}



//creates enemies
var generateEnemy = function(){
	monsterArray.push({
		x:ENEMYWIDTH+(canvas.width),
		y:ENEMYHEIGHT+(Math.random()*(canvas.height-(ENEMYHEIGHT*2))),
		width:ENEMYWIDTH,
		height:ENEMYHEIGHT
	});
}

//creates enemies
var generateCoins = function(){
	coinArray.push({
		x:COINWIDTH+(canvas.width),
		y:COINHEIGHT+(Math.random()*(canvas.height-(COINHEIGHT*2))),
		width:COINWIDTH,
		height:COINHEIGHT
	});
}




//sets all values and objects to start/restart the game
var startup = function(){
	bulletArray.length = 0;	//clear all bullets
	monsterArray.length = 0;	//clear all monsters
	coinArray.length = 0;

	generateEnemy();

	hero.x = HEROXPOS;
	hero.y = canvas.height / 2;
	health = localStorage.getItem('health');
	coins = localStorage.getItem('coins');
	monstersCaught = localStorage.getItem('caught');
	monstersEscaped = localStorage.getItem('escaped');
	if (localStorage.getItem('trippleBullets') == 'true'){
		trippleBullets = true;
	}
	else{
		trippleBullets = false;
	}

	//first load so set all values
	if (health == null){ 
		health = STARTINGHEALTH;
		coins = 0;
		monstersCaught = 0;
		monstersEscaped = 0;
	}
	gear = 1;

	clearInterval(myinterval);
	myinterval = setInterval(function(){ generateEnemy(); }, 10000/(gear*2));

	clearInterval(coininterval);
	coininterval = setInterval(function(){ generateCoins();}, 10000/COINSPAWNFACTOR);

	soundMuted = false;
	backgroundSound.play();


}


//checks for a colision between two objects
var collisionDetected = function(a, b){
	  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}















// Update game objects
var update = function (modifier) {

	if (health < 1 || gamePaused ){
		clearInterval(myinterval);
		clearInterval(coininterval);
		backgroundSound.pause();
		return true;
	}

	if (shopOpen){
		clearInterval(myinterval);
		clearInterval(coininterval);
		backgroundSound.pause();
		return true;
	}

	backgroundOffset -= BACKGROUNDSPEED*(gear+1);
	if (backgroundOffset < -canvas.width){
		backgroundOffset = 0;
	}

	if (38 in keysDown && hero.y>0) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y<canvas.height- hero.height) { // Player holding down
		hero.y += hero.speed * modifier;
	}

	//loop through all monster
	monsterArray.forEach(
		function(currentMonster,index){
			if (collisionDetected(hero,currentMonster)){	//hero colided with monster
				monsterArray.splice(index,1);
				health--;
				if (!soundMuted){
					playCrashSound();
				}
				localStorage.setItem('health', health);
			}
			if (currentMonster.x<-ENEMYWIDTH){	//reached the edge of the screen
				monsterArray.splice(index,1);
				monstersEscaped++;
				localStorage.setItem('escaped', monstersEscaped);
				if (!soundMuted){
					playPassSound();
				}
			}
			currentMonster.x -= MONSTERSPEED * modifier *(gear *2);
		}
	)

	coinArray.forEach(
		function(coin, index){
			if (collisionDetected(coin, hero)){
				coinArray.splice(index,1);
				coins++;
				if (!soundMuted){
					playCoinSound();
				}
				localStorage.setItem('coins', coins);
			}
			bulletArray.forEach(
				function(bullet, bulletIndex){
					if(collisionDetected(coin,bullet)){
						coinArray.splice(index,1);
						bulletArray.splice(bulletIndex,1);
						coins++;
						if (!soundMuted){
							playCoinSound();
						}
						localStorage.setItem('coins', coins);
					}
				})
			if (coin.x<-COINWIDTH){
				coinArray.splice(index,1);
			}
			coin.x -= COINSPEED * modifier;
		}
	)

	bulletArray.forEach(
		function(bullet,index){

			monsterArray.forEach(
				function(monster,monsterIndex){
					if (collisionDetected(bullet,monster)){	//hero colided with monster
						monsterArray.splice(monsterIndex,1);
						bulletArray.splice(index, 1)
						monstersCaught++;
						if (!soundMuted){
							playCrashSound();
						}
						localStorage.setItem('caught', monstersCaught);
					}
				}
			)

			if (bullet.x>canvas.width||
				bullet.y<-bullet.height||
				bullet.y>canvas.height){ // the bullet went off the screen
				bulletArray.splice(index,1);
			}
			bullet.x += bullet.xSpeed * BULLETSPEED * modifier;
			bullet.y += bullet.ySpeed * BULLETSPEED * modifier;
		}
	)

};











// Draw everything
var render = function () {
	if (gamePaused){
		if (pauseReady){
			ctx.drawImage(pauseImage, 0, 0, canvas.width, canvas.height);
		}
		return true;
	}
	if (shopOpen){
		if (shopReady){
			if (trippleBullets){
				ctx.drawImage(shop1Image, 0, 0, canvas.width, canvas.height);
			}
			else{
				ctx.drawImage(shopImage, 0, 0, canvas.width, canvas.height);
			}
		}
		return true;
	}
	if (bgReady) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.drawImage(bgImage, backgroundOffset, 0, canvas.width*2, canvas.height);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
	}


	if (monsterReady) {
		monsterArray.forEach(
			function(monster) {
				ctx.drawImage(monsterImage, monster.x, monster.y, monster.width, monster.height);
			}
		)
	}


	if (projectileReady) {
		bulletArray.forEach(
			function(proj){
				ctx.drawImage(projectileImage, proj.x, proj.y, proj.width, proj.height);
			}
		)
	}

	if (coinReady){
		coinArray.forEach(
			function(coin){
				ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
			}
		)
	}

	if (health < 1 ){	//needs to be at the bottom so its drawn overtop of everything else
		if (deathReady){
			ctx.drawImage(deathImage, canvas.width/2-50, canvas.height/2-25);
		}
	}

	// Coins
	ctx.fillStyle = "rgb(250, 250, 0)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Coins: " + coins, 32, 12);

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Cars Shot: " + monstersCaught, 32, 32);



	ctx.fillStyle = "rgb(0, 250, 0)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Health: ", 32, 48);

	for (i = 0; i<health; i++){
		if (heartReady){
			ctx.drawImage(heartImage, 90+i*32, 48);
		}
	}


	ctx.fillStyle = "rgb(0, 0, 250)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Cars Passed: " + monstersEscaped, 32, 74);

	//update the gear image to the currently selected gear
	if (gear1Ready){
		ctx.drawImage(gearArray[gear-1], canvas.width -220, canvas.height -220);
	}
	if (soundMuted && muteReady){
		ctx.drawImage(muteImage, canvas.width-60, 10);
	}
	if (!soundMuted && notmuteReady) {
		ctx.drawImage(notmuteImage, canvas.width-60, 10);
	}



};







// The main game loop
var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
};






// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();


	startup();

	//prevent scroll bars from appearing in the game
	document.body.style.overflow = "hidden";

