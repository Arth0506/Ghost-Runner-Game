var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower, towerImg;

var doorImg, door, doorGroup;

var climberImg, climber, climberGroup, invisibleblock, invisibleblockGroup;

var ghostImg, ghost, ghostImg2;

var ghostSound;



function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png");
  ghostSound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 400);
  ghost.addImage("ghoststanding", ghostImg);
  ghost.scale = 0.35;

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleblockGroup = new Group();

  ghostSound.loop();
}

function draw() {
  background(0);


  if (gameState == PLAY) {

    if (tower.y > 400) {
      tower.y = 300;

    }
    createDC();
    ghost.collide(climberGroup);

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 5;

    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 5;

    }



    if (keyWentDown("space")) {
      ghost.velocityY = -10;

    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (ghost.isTouching(invisibleblockGroup) || ghost.y > 650) {
      ghost.destroy();
      tower.destroy();
      gameState = END;

    
    }
  }
  if(gameState == END){
    fill("red");
    textSize(30);
    text("GAME OVER", 200, 300);
    
  }



  drawSprites();
}

function createDC() {
  if (frameCount % 250 == 0) {
    door = createSprite(random(75, 525), -100);
    door.addImage("door", doorImg);
    door.velocityY = 2;
    door.lifetime = 320;
    ghost.depth = door.depth + 1;
    doorGroup.add(door);

    climber = createSprite(300, -50);
    climber.x = door.x;
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climber.lifetime = 320;
    //climber.debug = true;
    climber.setCollider("rectangle", 0, -5, 100, 10);
    climberGroup.add(climber);

    invisibleblock = createSprite(300, -40, 100, 10);
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 2;
    invisibleblock.lifetime = 320;
    invisibleblock.visible = false;
    invisibleblockGroup.add(invisibleblock);



  }


}