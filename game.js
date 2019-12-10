let img3
var pikaface
var goodnotes
var score
var drop
let song
var car;
var carX;
var carY;
var carWidth;
var carHeight;
var enemyCar;
var enemyCarX;
var enemyCarY;
var enemyCarWidth;
var enemyCarHeight;
var position1;
var position2;
var position3;
var crashCount;
let img1;
let img2;
let song2;
var endingTimer;
var timerBeginTime;
var timeSetToTimer;
var timeOver = false;
var timerIsRunning = false;
let screen = 0;
var ship;
var flowers = [];
var drops = [];
var score = 0;
let boss;
let p1
let ammoimg
let bg2
let song3
let intro
let end

function preload() {
	// intro = loadSound('introsong.mp3');
	end = loadSound('endsong.mp3');
	img3 = loadImage("city.png");
	// song = loadSound("lv1song.mp3");
	bg = loadImage("bed.png");
	pikaface = loadImage("sleeping.png");
	goodnotes = loadImage("badnotes.png");
	// song2 = loadSound("lv2song.mp3");
	bg = loadImage("bed.png");
	pikaface = loadImage("sleeping.png");
	goodnotes = loadImage("badnotes.png");
	img1 = loadImage("car.png");
	img2 = loadImage("car2.png");
	song = loadSound("lv2song.mp3");
	bg2 = loadImage('city2.jpg');
	boss = loadImage('boss.png');
	p1 = loadImage('pika4.png');
	ammoimg = loadImage('bolt.png');
	// song3 = loadSound('bosssong.mp3');


}

function setup() {
	song.play();
	createCanvas(800, 800);
	frameRate(30);
	character = createSprite();
	character.addImage("sleeping.png", pikaface);
	pikaface.resize(150, 150);
	score = 0;
	notes = new Group();
	drop = createSprite()
	position1 = 200;
	position2 = 600;
	carX = 250;
	carY = 500;
	carWidth = 80;
	carHeight = 160;
	enemyCarX = random([position1, position2]);
	enemyCarY = 100;
	enemyCarWidth = 80;
	enemyCarHeight = 160;
	crashCount = 3;
	ship = new Ship();
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 3; j++) {
			flowers.push(new Flower(i * 80 + 80, j * 50));
		}
	}
}

function draw() {
	if (screen == 0) {
		mainmenu();
	}

	if (screen == 1) {
		instruction1();
	}

	if (screen == 2) {
		one();
	}

	if (screen == 3) {
		instruction2();
	}

	if (screen == 4) {
		two();
	}

	if (screen == 5) {
		instruction3();
	}

	if (screen == 6) {
		final();
	}

	if (screen == 7) {
		gameover();
	}
}

function mainmenu() {
	background(img3);
	textAlign(CENTER);
	fill(255);
	textSize(40);
	text('The Jams Manager', 400, 300);
	text('By James Watson', 400, 400);
	text('Press P to Play', 400, 500);
}

function instruction1() {
	background(0);
	textAlign(CENTER);
	textSize(60);
	fill(255);
	text('Level 1: The Creation', 400, 300);
	textSize(20);
	text('Collect The Notes', 400, 400);
}

function one() {
	background(bg)
	textSize(30);
	fill(255);
	text("Score: " + score, 670, 45);
	character.position.x = mouseX
	character.position.y = 700
	drop.position.x = random(0, 800);
	drop.position.y = 800
	drop.visible = false
	character.setCollider("rectangle", 0, 0, 0, 0);
	if (frameCount % 30 == 0) {
		var tempSprite = createSprite(random(0, 800), 0);
		tempSprite.velocity.y = 40;
		tempSprite.addImage("badnotes.png", goodnotes);
		tempSprite.scale = '.5'
		notes.add(tempSprite);
	}
	notes.collide(character, addPoints);
	notes.collide(drop, removePoints);
	drawSprites();

	function addPoints(p, b) {
		p.remove();
		score++;
		if (score == 50) {
			screen = 3;
		}
	}

	function removePoints(p, b) {
		p.remove();
		score--;
	}
}

function instruction2() {
	background(0);
	textAlign(CENTER);
	textSize(60);
	fill(255);
	text('Level 2: Get to the Studio', 400, 300);
	textSize(20);
	text('Avoid Soundcloud Rappers', 400, 400);
}

function two() {
	timerIsRunning = true;
	timerBeginTime = millis();
	background(150);
	var timeElapsed = millis() - timerBeginTime;
	var timeRemainingRounded = Math.ceil((timeSetToTimer - timeElapsed) * 0.001);
	if (timerIsRunning) {
		if (timeOver != true) {
			textSize(20);
			fill(255);
			text("Time: " + timeRemainingRounded, 700, 50);
		} else {
			(screen = 5);
		}
	}
	timerBeginTime = millis();
	timeSetToTimer = 60000;
	endingTimer = setTimeout(endTimer, timeSetToTimer);
	stroke(255);
	for (var i = 0; i <= random(790, 800); i += 80) {
		line(width / 2, i + random(0, -5), width / 2, i + random(35, 40));
	}
	image(img1, carX, carY, carWidth, carHeight);
	image(img2, enemyCarX, enemyCarY, enemyCarWidth, enemyCarHeight);
	textSize(60);
	text(crashCount, 50, 50);
	enemyCarY = enemyCarY + 25;
	if (enemyCarX >= carX - 80 && enemyCarX <= carX + 80 && enemyCarY >= 350 && enemyCarY <= 600) {
		crashCount--;
		enemyCarY = 0;
		enemyCarX = random([position1, position2]);
	}
	if (enemyCarY > 1000) {
		enemyCarY = 0;
		enemyCarX = random([position1, position2]);
	}
	if (keyIsDown(LEFT_ARROW)) {
		carX = 200;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		carX = 600;
	}

	if (crashCount == 0) {
		screen = 7;
	}

	function endTimer() {
		timeOver = true;
	}

}

function instruction3() {
	background(0);
	textAlign(CENTER);
	textSize(60);
	fill(255);
	text('Level 3: Boss Battle', 400, 300);
	textSize(20);
	text('The Boss is Trying To Steal Your Idea...Stop Him', 400, 400);
}

function final() {
	background(bg2);
	ship.show();
	ship.move();
	fill(255);
	text(score, 80, 80);
	textSize(50);
	for (var i = 0; i < drops.length; i++) {
		drops[i].show();
		drops[i].move();
		for (var j = 0; j < flowers.length; j++) {
			if (drops[i].hits(flowers[j])) {
				score = score + 1;
				if (score>=50) {
				screen=7
		}
				flowers.splice(j, 1);
			}
		}
	}

	var edge = false;

	for (var i = 0; i < flowers.length; i++) {
		flowers[i].show();
		flowers[i].move();

		if (flowers[i].x > width || flowers[i].x < 0) {
			edge = true;
		}
	}

	if (edge) {
		for (var i = 0; i < flowers.length; i++) {
			flowers[i].shiftDown();
		}
	}

	for (var i = drops.length - 1; i >= 0; i--) {
		if (drops[i].toDelete) {
			drops.splice(i);
		}
	}
}

function Ship() {
	this.x = width / 2;
	this.xdir = 0;
	this.show = function() {
		image(p1, this.x, 650, 100, 100)
	}

	this.setDir = function(dir) {
		this.xdir = dir;
	}
	this.move = function(dir) {
		this.x += this.xdir * 3;
	}
}

function Flower(x, y) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.xdir = 1


	this.grow = function() {
		this.r = this.r + 5;
	}

	this.shiftDown = function() {
		this.xdir *= -1;
		this.y += this.r;
	}
	this.move = function() {
		this.x = this.x + this.xdir;
	}

	this.show = function() {
		image(boss, this.x, this.y, this.r * 2, this.r * 2);
	}
}

function Drop(x, y) {
	this.x = x;
	this.y = y;
	this.r = 2;
	this.toDelete = false;

	this.show = function() {
		image(ammoimg, this.x, this.y, 30, 30);
	}

	this.evaporate = function() {
		this.toDelete = true;
	}


	this.hits = function(flower) {
		var d = dist(this.x, this.y, flower.x, flower.y)
		if (d < this.r + flower.r) {
			return true;
		} else {
			return false;
		}
	}
	this.move = function() {
		this.y = this.y - 25;
	}
}

function gameover() {
	end.play();
	background(img3);
	fill(255);
	textSize(60);
	textAlign(CENTER);
	text('GAME OVER', 400, 300);
	text('Press R to Restart', 400, 400);
}

function reset() {
	screen = 0;
}

function keyPressed() {
	if (key == 'r') {
		reset();
	}

	if (key === ' ') {
		var drop = new Drop(ship.x + 20, height);
		drops.push(drop);
	}

	if (key == 'p') {
		screen = screen + 1
	}
}

function keyReleased() {
	ship.setDir(0);
	if (keyCode === RIGHT_ARROW) {
		ship.setDir(2);
	} else if (keyCode === LEFT_ARROW) {
		ship.setDir(-2);

	}
}
