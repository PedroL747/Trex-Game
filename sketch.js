var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var antibug = 0
var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var gameover, reset, gamiouver, que_ruim
var pontuacao;
var sommorre, chekipoitesom, sompula

function preload(){
  trex_correndo =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  sommorre = loadSound("die.mp3");
  imagemdosolo = loadImage("ground2.png");
  reset = loadImage("restart.png");
  imagemdanuvem = loadImage("cloud.png");
  gameover = loadImage("gameOver.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  sompula = loadSound("jump.mp3");
  chekipoitesom = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50,180,10,10);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,windowHeight/2,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,windowHeight/2,400,10);
  soloinvisivel.visible = false;
   gamiouver = createSprite(windowWidth/2,windowHeight/3,100,100)
  gamiouver.addImage("cabo",gameover)
  que_ruim = createSprite(windowWidth/2, windowHeight/2.3)
  que_ruim.addImage("horrivel", reset)
  gamiouver.scale = 0.6
  que_ruim.scale = 0.4
  que_ruim.visible = false
  gamiouver.visible = false
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  
  pontuacao = 0;
  trex.setCollider("circle",0,0,45)
}

function draw() {
  background(180);
  antibug = antibug + 1
  text("Pontuação: "+ pontuacao, 500,50);
  
  console.log(soloinvisivel.y)
  

if(estadoJogo === JOGAR){
    solo.velocityX = -(4 + pontuacao / 800);
    pontuacao = pontuacao + antibug
  if(pontuacao % 10000 === 0 && pontuacao > 0){
    chekipoitesom.play()
  }
  if((touches.length>0||keyDown("space"))&& trex.y >= windowHeight/2.4) {
    trex.velocityY = -15;
    sompula.play()
      touches =  []
  }
  trex.velocityY = trex.velocityY + 0.8 
  gerarObstaculos();
  gerarNuvens();
  if(grupodeobstaculos.isTouching(trex)){
    estadoJogo = ENCERRAR
    sommorre.play()
  }
}
  
else if(estadoJogo === ENCERRAR){
    solo.velocityX = 0;
trex.velocityY = trex.velocityY + 0.8 
  trex.velocityX = 0
    trex.changeAnimation("collided", trex_colidiu)
    grupodeobstaculos.setVelocityXEach(0)
    grupodenuvens.setVelocityXEach(0)
    grupodenuvens.setLifetimeEach(0)
    grupodeobstaculos.setLifetimeEach(0)
    que_ruim.visible = true
    gamiouver.visible = true
  if((touches.length>0||mousePressedOver(que_ruim)){
      desiste()
  }
}
 
    if (solo.x < 0){
       solo.x = solo.width/2;
    } 
  
    trex.collide(soloinvisivel);
    
    drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(windowWidth,windowHeight/2.5,10,40);
  obstaculo.velocityX = -(6 + pontuacao / 10000);
      
   console.log("obstaculo" + obstaculo.y)
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}




function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,windowHeight/3));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 300;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adicionando nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
}

function desiste(){
  estadoJogo = JOGAR
  gamiouver.visible = false
  que_ruim.visible = false
  trex.changeAnimation("running", trex_correndo);
  pontuacao = 0
  antibug = 0
}
 
