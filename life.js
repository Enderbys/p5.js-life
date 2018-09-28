var life;
var hx=0;
var hy=0;
function setup() {
  createCanvas(801,401);
  life=new CLife(160,80,5);
  life.setRandom(life.grid);
}

function draw() {
  life.draw();
  life.nextFrame();
}

class CLife
{
  constructor(width,height,size)
  {
    this.width = width;
    this.height = height;
    this.size = size;
    this.grid = this.makeGrid();
  }
  makeGrid()
  {
    let g = new Array(this.width);
    for(let i=0; i<width ; i++) {
      g[i] = new Array(this.height);
    }
    return g;
  }
  setRandom(g)
  {
    for(let i=0; i<this.width; i++) {
      for(let j=0; j<this.height; j++) {
        g[i][j] = floor(random(2));
      }
    }
  }
  draw()
  {
    background(0,0,0);
    fill(255,255,255)
    for(let i=0; i<this.width; i++) {
      for(let j=0; j<this.height; j++) {
        if(!this.grid[i][j]) {
          rect(i*this.size,j*this.size,this.size,this.size);
        }
      }
    }
  }
  countNeighbours(x,y)
  {
    let sum = 0;
    for(let i=x-1;i<x+2;i++) {
      for(let j=y-1;j<y+2;j++) {
        sum+=this.grid[(i+this.width)%this.width][(j+this.height)%this.height];
      }
    }
    sum-=this.grid[x][y];
    return sum;
  }
  nextFrame()
  {
    let next=this.makeGrid();
    for(let i=0; i<this.width; i++) {
      for(let j=0; j<this.height; j++) {
        let state = this.grid[i][j];
        let nei=this.countNeighbours(i,j);
        if(state == 0 && nei ==3){
          next[i][j]=1;
        }else if(state == 1 &&(nei<2 || nei>3)){
          next[i][j]=0;
        }else {
          next[i][j]=this.grid[i][j];
        }
      }
    }
    this.grid=next;
  }
}
