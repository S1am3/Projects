// create Phaser.Game object named "game"
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'my-game', { preload: preload, create: create, update: update });



// declare global variables for game
var player;
var arrowKey;
var fireKey;
var engineSound;
var space;
var asteroidGroup;
var maxSpeed = 100;
var boomSound;
var explosion;
var laser;
var fireSound;
var asteroidParticles;
var score = 0;
var scoreText;
var teleportSound;
var gameTitle;
var startText;
var gameOverText;

var livesText;
var livesBar;
var shipLives = 3;
var livesCrop;

var maxLives = 5;
var newLife = 10000;
var lifeSound;

// preload game assets - runs once at start
function preload() {
  game.load.spritesheet('ship', 'assets/images/spaceship.png', 64, 64);
  game.load.spritesheet('asteroid', 'assets/images/asteroid.png', 40, 40);
  game.load.spritesheet('explosion', 'assets/images/explosion.png', 128, 128);
  game.load.spritesheet('bullet', 'assets/images/laser.png', 36, 24);
  game.load.spritesheet('particle', 'assets/images/asteroid-particle.png', 20, 20)

  game.load.audio('life', 'assets/sounds/extra-life.wav');
  game.load.audio('teleport', 'assets/sounds/teleport.mp3');
  game.load.audio('boom', 'assets/sounds/boom.wav');
  game.load.audio('engine', 'assets/sounds/engine.mp3');
  game.load.audio('fire', 'assets/sounds/fire.wav');
  game.load.image('space', 'assets/images/space-stars.jpg');
  game.load.image('green-bar', 'assets/images/health-green.png');
  game.load.image('red-bar', 'assets/images/health-red.png');
  game.load.image('lives', 'assets/images/ship-lives.png')
  game.load.image('title', 'assets/images/asteroids-2084-title.png')

}

function create() {
  // create game world - runs once after "preload" finished
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // space need to be before player 
  space = game.add.tileSprite(0, 0, 800, 600, 'space');
  player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
  laser = game.add.weapon(10, 'bullet');
  laser.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
  laser.bulletSpeed = 600;
  laser.fireRate = 250;

  // set bullet collision area to match its visual size
  laser.setBulletBodyOffset(24, 12, 6, 6);


  game.physics.arcade.enable(player);
  player.body.maxVelocity.set(400);
  player.body.collideWorldBounds = true;
  player.body.drag.set(20);
  player.anchor.set(.5, .5);  //sets center of gravity
  player.angle = -90;
  player.health = 100;
  player.maxHealth = 100;
  player.animations.add('moving', [0, 1, 2], 10, true);
  game.add.image(300, 20, 'red-bar');
  healthBar = game.add.image(300, 20, 'green-bar');

  explosion = game.add.sprite(100, 100, 'explosion');
  explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 30, false);
  explosion.visible = false; // hide until needed;

  livesBar = game.add.image(655, 20, 'lives');
  livesText = game.add.text(590, 20, 'Ships', { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
  livesCrop = new Phaser.Rectangle(0, 0, shipLives * 25, 25);
  livesBar.crop(livesCrop);

  player.events.onKilled.add(function() {
    explosion.reset(player.x, player.y);
    // explosion.reset modifed
    // explosion.reset(player.x - explosion.width / 2, player.y - explosion.height / 2);
    explosion.animations.play('explosion', 30, false, true);
    // explosion.visible = true;
    shipLives = shipLives - 1;
    livesCrop.width = shipLives * 25;
    livesBar.crop(livesCrop);
    // respawn player if lives are left
    if (shipLives > 0) {
      player.x = game.world.centerX;
      player.y = game.world.centerY;
      player.angle = -90;
      player.body.velocity.set(0);
      player.body.acceleration.set(0);
      player.revive(player.maxHealth);
      player.alpha = 0; // start as transparent
      game.add.tween(player).to({ alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true);
      teleportSound.play();
    }
    else {
      // game over
      gameOverText.visible = true;
      game.add.tween(gameOverText).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true);
      game.add.tween(gameOverText.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Cubic.Out, true);
      game.add.tween(startText).to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 2000);
      fireKey.onDown.addOnce(restartGame, this);
    }
  });

  // LASER SOUND
  laser.onFire.add(function() {
    fireSound.play();
  });

  laser.trackSprite(player, 0, 0, true);

  asteroidGroup = game.add.group();
  asteroidGroup.enableBody = true;
  // add asteroids to group
  for (var i = 0; i < 10; i++) {
    // create individual asteroid in group
    var asteroid = asteroidGroup.create(game.world.randomX, game.world.randomY, 'asteroid');
    asteroid.anchor.set(0.5, 0.5);
    asteroid.body.setCircle(15, 5, 5);
    asteroid.animations.add('spin-clock', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 16, true);
    asteroid.animations.add('spin-counter', [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 16, true);
    if (Math.random() < 0.5) asteroid.animations.play('spin-clock');
    else asteroid.animations.play('spin-counter');

    // give asteroid random speed and direction
    asteroid.body.velocity.x = Math.random() * maxSpeed;
    if (Math.random() < 0.5) asteroid.body.velocity.x *= -1;
    asteroid.body.velocity.y = Math.random() * maxSpeed;
    if (Math.random() < 0.5) asteroid.body.velocity.y *= -1;
  }
  asteroidParticles = game.add.emitter(0, 0, 50);
  asteroidParticles.makeParticles('particle');
  asteroidParticles.gravity = 0;
  asteroidParticles.setAlpha(1, 0, 1000); // fade out after 1000 ms


  boomSound = game.add.audio('boom', 0.3);
  fireSound = game.add.audio('fire', 0.3);
  teleportSound = game.add.audio('teleport', 0.5);
  lifeSound = game.add.audio('life', 0.5);

  engineSound = game.add.audio('engine', 0.3);
  engineSound.loop = true;
  engineSound.play()
  // .play to get the sound playing
  arrowKey = game.input.keyboard.createCursorKeys();
  fireKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  fireKey.onDown.addOnce(startGame, this);

  scoreText = game.add.text(20, 20, 'Score: ' + score, { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });

  gameTitle = game.add.image(game.world.centerX - 225, 100, 'title');
  startText = game.add.text(game.world.centerX - 200, 300, 'Press Fire to Start Mission', { font: 'Arial', fontSize: '30px', fontStyle: 'bold', fill: '#00ff00' });
  // hide player at start screen
  player.exists = false;

  gameOverText = game.add.text(game.world.centerX - 150, 100, 'Game Over', { font: 'Arial', fontSize: '48px', fontStyle: 'bold', fill: '#ff0000' });
  gameOverText.visible = false;



}

function update() {
  game.physics.arcade.collide(player, asteroidGroup, collideAsteroid, null, this);
  if (arrowKey.left.isDown) {
    // rotate player counter-clockwise (negative value)
    player.body.angularVelocity = -200;
  } else if (arrowKey.right.isDown) {
    // rotate player clockwise (positive value)
    player.body.angularVelocity = 200;
  } else {
    // stop rotating player
    player.body.angularVelocity = 0;
  }
  if (arrowKey.up.isDown) {
    // accelerate player forward
    engineSound.volume = 1;
    game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
    player.animations.play('moving');
    // player.animations.stop();
    // player.frame = 1;
  }
  else {
    // stop accelerating player
    player.body.acceleration.set(0);
    engineSound.volume = 0.3;
    player.animations.stop();
    player.frame = 1;
  }
  // keep player onscreen (instead of collideWorldBounds)
  // will allow space tilesprite to keep scrolling
  if (player.left <= 50) player.left = 50;
  else if (player.right >= game.world.width - 50) player.right = game.world.width - 50;
  if (player.top <= 50) player.top = 50;
  else if (player.bottom >= game.world.height - 50) player.bottom = game.world.height - 50;

  // scroll space tilesprite in opposite direction of player velocity
  space.tilePosition.x = space.tilePosition.x - player.body.velocity.x / 40;
  space.tilePosition.y = space.tilePosition.y - player.body.velocity.y / 40;

  // wrap
  asteroidGroup.forEach(function(asteroid) {
    game.world.wrap(asteroid, 20);
  });

  if (fireKey.isDown && player.exists) {
    laser.fire();
  }

  game.physics.arcade.collide(laser.bullets, asteroidGroup, shootAsteroid, null, this);

  // randomly add new asteroid if dead asteroid available
  if (Math.random() < 0.02) {
    var asteroid = asteroidGroup.getFirstDead();
    if (asteroid) {
      // reset asteroid at random position in game
      // give asteroid random speed and direction
      // make asteroid fade into view
      asteroid.alpha = 0; // start as transparent
      game.add.tween(asteroid).to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
      asteroid.reset(game.world.randomX, game.world.randomY);
      asteroid.body.velocity.x = Math.random() * maxSpeed;
      asteroid.body.velocity.y = Math.random() * maxSpeed;
    }
  }
  checkNewLife();

}

function collideAsteroid(player, asteroid) {
  asteroidParticles.x = asteroid.x;
  asteroidParticles.y = asteroid.y;
  asteroidParticles.explode(1000, 5);
  asteroid.kill();
  boomSound.play();
  // player.exists = false;
  // player.kill() to trigger the on kill event on line 48
  // player.kill()
  // player damage trigger kil event
  player.damage(25);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

function shootAsteroid(bullet, asteroid) {
  asteroidParticles.x = asteroid.x;
  asteroidParticles.y = asteroid.y;
  asteroidParticles.explode(1000, 5);
  asteroid.kill();
  bullet.kill();
  boomSound.play();
  score = score + 250
  scoreText.text = 'Score: ' + score
}

function checkNewLife() {
  if (score >= newLife) {
    if (shipLives < maxLives) {
      // award extra life
      shipLives = shipLives + 1
      livesCrop.width = shipLives * 25;
      livesBar.crop(livesCrop);
      lifeSound.play()
      game.camera.flash(0x00ff00, 500);
    }
    // maxLives already reached
    else if (player.health < player.maxHealth) {
      // replenish health instead
      player.health = player.maxHealth
      healthBar.scale.setTo(player.health / player.maxHealth, 1);
      lifeSound.play()
    }
    // increase score needed for next new life
    newLife = newLife + 10000;
  }
}

function startGame() {
  // fade out start text
  game.add.tween(startText).to({ alpha: 0 }, 250, Phaser.Easing.Cubic.Out, true);

  // fade out and zoom out game title (after slight delay)
  game.add.tween(gameTitle).to({ alpha: 0 }, 3000, Phaser.Easing.Cubic.Out, true, 250);
  game.add.tween(gameTitle.scale).to({ x: 3, y: 3 }, 3000, Phaser.Easing.Cubic.Out, true, 250);

  // fade in player
  teleportSound.play();
  player.exists = true;
  // changer alpha to 1
  game.add.tween(player).to({ alpha: 1 }, 250, Phaser.Easing.Cubic.Out, true);
}

function restartGame() {
  score = 0;
  shipLives = 3;
  newLife = 10000;
  maxSpeed = 100;
  game.state.restart();
}

