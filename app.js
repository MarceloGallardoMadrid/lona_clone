
        function m_rot(angle,v){
            let m=[[cos(angle),-sin(angle)],[sin(angle),cos(angle)]]
            return createVector(m[0][0]*v.x+m[0][1]*v.y,m[1][0]*v.x+m[1][1]*v.y)
        }

        class Food{
            constructor(x,y,radio=20){
                this.x=x
                this.y=y
                this.radio=radio
            }
            show(){
                noStroke()
                fill('red')
                ellipse(this.x,this.y,this.radio,this.radio)
            }

        }

        class Tail{
            constructor(x,y,radio){
                this.pos=createVector(x,y)
                this.radio=radio
            }
            show(){
                noStroke()
                fill('yellow')
                ellipse(this.pos.x,this.pos.y,this.radio,this.radio)
            }
        }

        class Snake{
            constructor(x,y,dir,size,radio,r_eje=10){
                this.radio=radio
                //Head
                this.head=createVector(x,y)
                //Es horario o anti horario
                //1 horario, -1 anti
                this.dir=dir
                //eje
                this.r_eje=r_eje
                this.eje=createVector(x-r_eje,y)
                this.size=size
                
                //Body
                this.tails=[]
                this.tails.push(new Tail(this.head.x,this.head.y,radio))
                for(let t=1;t<this.size;t++){
                    let vec=m_rot(0.1*t*this.dir,p5.Vector.sub(this.tails[t-1].pos,this.eje)).add(this.eje.x,this.eje.y)
                    
                    this.tails.push(new Tail(vec.x,vec.y,radio))
                }
                
            }
            toggleDir(){
                this.dir=-1*this.dir
                this.eje=p5.Vector.sub(p5.Vector.mult(this.tails[0].pos,2),this.eje)
                
            }
            //Dos circulos chocan 
            //Si la distancia entre ellos es menor a la suma de los  radios
            eat(food){
                let dist=this.head.dist(createVector(food.x,food.y))
                
                if(dist<this.radio+food.radio-30){
                    console.log(dist-this.radio+food.radio)
                    return true
                }
                return false
            }
            grow(){

            }
            hit(board_pos,board_size){

            }
            move(){
                for(let i=1;i<this.tails.length;i++){
                    this.tails[i].pos=this.tails[i-1].pos
                }
                this.tails[0].pos=m_rot(0.1*this.dir,p5.Vector.sub(this.tails[0].pos,this.eje)).add(this.eje.x,this.eje.y)
                
                //this.head=m_rot(0.1*this.dir,this.head.sub(this.eje)).add(this.eje.x,this.eje.y)
                
            }
            show(){

                fill(0)
                for(let t of this.tails){
                    
                    t.show()
                }
                
            }
        }

        let puntaje=0;

        let f;

        let s

        let iteration=0;
        let togle=false
        let board_pos
        let board_size
        let hitted=false
        function setup(){
            createCanvas(600,800)
            f=new Food(200,300)
            s=new Snake(400,400,100,40,40)
            board_pos=createVector(300,350)
            board_size=createVector(600,700)    
        }
        function draw(){
            if(!hitted){

                //Doblar
                if(keyIsDown(65)){
                    if(!togle){
                        togle=true
                        s.toggleDir()
                    iteration=0
                    }
                }
                if(togle){
                        iteration+=1
                }
                if(iteration>20){
                    iteration=0
                    togle=false
                }
                background(204, 255 , 229);
                ///Tablero
                noStroke()
                fill(0)
                textSize(25)
                text("Puntaje: "+puntaje,10,40)
                stroke('brown')
                strokeWeight(10)
                fill('rgb(0,255,0)');
                ellipse(board_pos.x,board_pos.y,board_size.x,board_size.y)
                //food
                f.show()
                //Snake
                s.move()
                s.show()
                //Check food or wall
                let eated  = s.eat(f)
                hitted = s.hit(board_pos,board_size)
                if(eated){
                    s.grow()
                    let rnd_angle=random(2*PI)
                    let rnd_a=random(board_size.x/2-10)
                    let rnd_b=random(board_size.y/2-10)
                    f=new Food(cos(rnd_angle)*rnd_a+board_pos.x,sin(rnd_angle)*rnd_b+board_pos.y)
                    console.log(f)
                }
            }
            else{
                
               
                background(204, 255 , 229);
                ///Tablero
                noStroke()
                fill(0)
                textSize(25)
                text("Puntaje: "+puntaje,10,40)
                stroke('brown')
                strokeWeight(10)
                fill('rgb(0,255,0)');
                ellipse(board_pos.x,board_pos.y,board_size.x,board_size.y)
                noStroke()
                fill(0)
                textSize(50)
                text("Perdiste",250,400)
            }
            

        }
