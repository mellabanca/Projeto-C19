var imagemTorre, torre;
var imagemPorta, porta, grupoPortas;
var imagemGrade, grade, grupoGrades;
var imagemFantasma, fantasma;
var blocoinvisivel, grupodeBlocos;
var somAssustador;
var estado = "JOGAR";
var score = 0

function preload(){
  imagemTorre = loadImage("tower.png");
  imagemPorta = loadImage("door.png");
  imagemGrade = loadImage("climber.png");
  imagemFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  somAssustador.play();
  torre = createSprite(300,300);
  torre.addImage("torre", imagemTorre);
  torre.velocityY = 1;

  grupoPortas = new Group();
  grupoGrades = new Group();
  grupodeBlocos = new Group();

  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("fantasma", imagemFantasma);
}

function draw() {
  background("black");
  if(estado === "JOGAR"){

    score = score + Math.round(frameRate()/60);
    if (torre.y > 590){
      torre.y = 300;
    }
    if(keyDown("right")){
      fantasma.x = fantasma.x + 3;
    }
  
    if(keyDown("left")){
      fantasma.x = fantasma.x - 3;
    }
    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    fantasma.velocityY = fantasma.velocityY + 0.8;
  
    if(grupoGrades.isTouching(fantasma) || fantasma.y > 600){
      estado = "ENCERRAR";
    }
    drawSprites();
    gerarPortas();
  }

    if(estado === "ENCERRAR"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250);
      text("Score: "+score,20,30);
    }
}

function gerarPortas(){
  if (frameCount % 240 === 0){
    porta = createSprite(200,-50);
    porta.addImage("porta", imagemPorta);

    grade = createSprite(200,10);
    grade.addImage("grade",imagemGrade);

    blocoinvisivel = createSprite(200,15);
    blocoinvisivel.width = grade.width;
    blocoinvisivel.height = grade.height;

    porta.x = Math.round(random(120,400));
    porta.velocityY = 1;

    grade.x = porta.x;
    grade.velocityY = 1;

    blocoinvisivel.x = porta.x;
    blocoinvisivel.velocityY = 1;

    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth + 1;

    porta.lifetime = 800;
    grade.lifetime = 800;

    grupoPortas.add(porta);
    grupoGrades.add(grade);

    blocoinvisivel.debug = true;
    grupodeBlocos.add(blocoinvisivel);
    
  }
}


