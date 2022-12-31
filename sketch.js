// for(var i=0; i<10; i+=1){}
// 
let ship;
let t_block;
let block;
let line_block;
let z_block;
let particles = [];
let bHoles = [];
let bCounter = 0;
let stars = [];
var space_x;
var space_y;
var aX_v;
var aY_v;
var alien_x;
var alien_y;
var wobble_x;
var wobble_y;
var aliens;
var Aliens;
var seed = 0;
var stepSize = 100;
var threshold;


function setup() {
  we = 700
  he = 400
  createCanvas(we, he);
  for (var l = 0; l < 280; l++) {
    let s = new Star(0, 700, 0, 400)
    stars.push(s)
  }

  recursiveBHole(800, random(0, 400), 0.5, 100, 100, true)




  block = loadImage('block.png')
  z_block = loadImage('z_block.png')
  line_block = loadImage('line_block.png')
  t_block = loadImage('t_block^.png')
  ship = loadImage('fezRocket.png');

  aliens = [t_block, block, line_block, z_block]
  aX_v = random(-10, 10)
  aY_v = random(-10, 10)
  lstart = false;
  Aliens = [];
  var count = 200;
  for (var q = 0; q < 200; q += 1) {
    count +=random(20,100)

    var a = {
      x: count,
      y: random(0, height)
    }
    Aliens.push(a);
  }
  spaceShip = {
    screen_x: 80,
    world_x: 0,
    y: height / 2,
    speed_y: 0
  };

  threshold = 30;
}

function draw() {
  background(0);
  
    //blackHoles
    if (bCounter < 5) {
      randomSeed()
      wide = random(10, 150)
      recursiveBHole(bHoles[bHoles.length - 1].x + random(300, 400), random(0, 400), random(0.5, 1), wide, wide, true)
    }
    for (var a = bHoles.length - 1; a >= 0; a--) {
      randomSeed()
      bHoles[a].update();
      bHoles[a].show();
      if (bHoles[a].finished()) {
        if (bHoles[a].original()) {
          bCounter -= 1
        }
        bHoles.splice(a, 1)
      }
    }
    for (var d = bHoles.length - 1; d >= 0; d--) {
      randomSeed(0)
      bHoles[d].cover();
    }

    //stars
    for (var b = 0; b < stars.length - 1; b++) {
      for (var c = 0; c < bHoles.length - 1; c++) {
        if (stars[b].on(bHoles[c])) {
          stars[b].show()
        }
      }
    }

    //lightning
    randomSeed()
    if ((random(0, 1) < (1 / 300)) && lstart == false) {
      ypos = random(100, 700)
      lightningBolt(ypos, 0, 0, 150, 5)
      lstart = true
    }
    if (lstart == true && (random(0, 1) < (1 / 5))) {
      lightningBolt(ypos, 0, 0, 150, 5)
      lstart = false
    }
  
  //spaceship
  spaceShip.world_x += 5;
  spaceShip.y += spaceShip.speed_y;

  if (binary_search(0, Aliens.length - 1) == true) {
    noLoop();
  }
  updateTree();

  drawSpaceShip(spaceShip.screen_x, spaceShip.y)
  let p = new Particle(spaceShip.screen_x, spaceShip.y);
  particles.push(p)

  for (let j = particles.length - 1; j >= 0; j--) {
    particles[j].update()
    particles[j].show();
    if (particles[j].finished()) {
      particles.splice(j, 1);

    }
  }


  if (spaceShip.screen_x > 750) {
    spaceShip.screen_x = -80;
  }
  //aliens
  for (var q = 0; q < Aliens.length; q++) {
    drawAlien(Aliens[q].x - spaceShip.world_x + spaceShip.screen_x, Aliens[q].y, q);

  }
}

function linearSearch() {
  for (var i = 0; i < Aliens.length; i++) {
    var d = dist(spaceShip.world_x, spaceShip.y, Aliens[i].x + 15, Aliens[i].y + 15);

    if (d < threshold) {
      noLoop()
    }
  }

}

function binary_search(first, last) {
  if (first > last) {
    return false;
  } else {
    var mid = floor((first + last) / 2);
    var d = dist(spaceShip.world_x+20, spaceShip.y+5, Aliens[mid].x +15, Aliens[mid].y +15);

    if (d < threshold) {
      return true;
    } else if (spaceShip.world_x > Aliens[mid].x) {
      first = mid + 1;
      return (binary_search(first, last));
    } else {
      last = mid - 1;
      return(binary_search(first, last));
    }
  }
}

function updateTree(){
  tree = [];
  
  tree.push({left:null, right:null, data: Aliens[0]});
  
  for(var i = 1; i<Aliens.length; i ++){
    addTreeValue(Aliens[i],0);
  }
}

function addTreeValue(value, currentIndex)
{
  if(value.x < tree[currentIndex].data.x)
  {
    if(tree[currentIndex].left == null)
    {
          //add value as a new node in the tree
      tree.push({left:null, right:null, data: value});
          //register with left branch of node at current_index
      tree[currentIndex].left = tree.length -1;
    }
    else
    {
          addTreeValue(value, tree[currentIndex].left);
    }
  }
  else
  {
    if(tree[currentIndex].right == null)
    {
      tree.push({left:null , right:null, data:value });
          //add value as a new node in the tree
          //register with right branch of node at current_index
      tree[currentIndex].right = tree.length -1;
    }
    else{
          addTreeValue(value, tree[currentIndex].right)
    }
  }
}




function drawSpaceShip(x, y) {
  image(ship, x - 60, y - 50, 120, 100);
}



function drawAlien(x, y, c) {
  randomSeed()
  //alien
  if (c % 4 == 0) {
    image(t_block, x - 15, y - 15);
  } else if (c % 4 == 1) {
    image(block, x - 15, y - 15)
  } else if (c % 4 == 2) {
    image(line_block, x - 15, y - 15)
  } else if (c % 4 == 3) {
    image(z_block, x - 15, y - 15)
  }

  //rect(x - 15, y - 15, 30, 30);


}


class Blackhole {
  constructor(x, y, vx, w, ori) {
    this.x = x - (w / 2);
    this.y = y - (w / 2);
    this.vx = -vx;
    this.width = w; //10-150
    this.ori = ori

  }

  update() {
    this.x += this.vx
  }

  original() {
    return this.ori
  }

  finished() {
    return this.x < -this.width
  }

  show() {
    noStroke()
    randomSeed()
    for (var j = 3; j >= 0; j--) {
      if (j == 2) {
        fill(0, 0, 255)
      } else if (j == 1) {
        fill(0, 255, 0)
      } else if (j == 0) {
        fill(255, 0, 0)
      }

      push();
      translate(this.x - j + this.width / 2, this.y - j + this.width / 2);
      rotate(random(-0.05, 0.05));
      rect(-this.width / 2, -this.width / 2, this.width + j * 2, this.width + j * 2);
      pop();
    }

  }
  cover() {
    fill(0)
    rect(this.x, this.y, this.width, this.width)
  }

}


function recursiveBHole(x, y, vx, ow, width, ori) {
  if (width == ow) {
    bCounter += 1
    ori = true
  } else {
    ori = false
  }

  if (width > (ow * 0.2)) {
    let b = new Blackhole(x, y, vx, width, ori)
    bHoles.push(b)
    recursiveBHole(x + random(width / 2, width), y + random(-width / 2, width / 2), vx, ow, width / (random(2, 4)), ori)
    recursiveBHole(x - random(width / 2, width), y + random(-width / 2, width / 2), vx, ow, width / (random(2, 4)), ori)
    recursiveBHole(x + random(-width / 2, width / 2), y + random(width / 2, width), vx, ow, width / (random(2, 4)), ori)
    recursiveBHole(x + random(-width / 2, width / 2), y - random(width / 2, width), vx, ow, width / (random(2, 4)), ori)

  }


}


class Star {
  constructor(x, x1, y, y1) {
    this.x = random(x, x1)
    this.y = random(y, y1)
  }

  on(b) {
    return ((b.x < this.x) && (this.x < b.x + b.width) && (b.y < this.y) && (this.y < b.y + b.width))
  }


  show() {
    noStroke()
    fill(255)
    rect(this.x, this.y, 2, 2)
  }


}





class Particle {

  constructor(x, y) {
    this.x = x - 30;
    this.y = y;

    this.vx = random(-3, -1);
    this.vy = random(-0.5, 0.5);
    this.alpha = 255
    this.yellow = 0
  }
  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 10
    this.yellow += 20
    if (this.yellow > 255) {
      this.yellow = 255
    }

  }

  show() {
    noStroke()
    fill(255, this.yellow, 0, this.alpha);
    rect(this.x, this.y, 5, 5)
  }
}


function lightningBolt(x, y, angle, numSteps, stepSize) {
  stroke(255);
  var v = createVector(0, stepSize);
  v.rotate(angle + random(-1, 1))
  strokeWeight(stepSize / 2)
  line(x, y, x + v.x, y + v.y);

  //ellipse(x,y,5);

  if (y < height && numSteps > 0) {
    lightningBolt(x + v.x, y + v.y, angle, numSteps - 1, stepSize);

    if (random(0, 1) < 0.05) {
      lightningBolt(
        x + v.x,
        y + v.y,
        angle + random(-1, 1),
        numSteps / 2,
        stepSize * 0.75);
    }

  }

}




function keyPressed() {
  if (key == "w") {
    spaceShip.speed_y = -5;
  }
  if (key == "s") {
    spaceShip.speed_y = 5;
  }


}

function keyReleased() {
  spaceShip.speed_y = 0
}