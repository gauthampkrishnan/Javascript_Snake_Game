




function init(){
    canvas = document.getElementById("mycanvas");
    W=H=canvas.width = canvas.height=1000;
    pen = canvas.getContext('2d');
    cs=66;
    game_over = false;
    score = 5;
    //Creat img object of food
    food_img = new Image();
    food_img.src = "Assets/apple.png"
    trophy = new Image()
    trophy.src = "Assets/trophy.png"
    
    food = getRandomFood();
    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake: function(){
            for(var i =this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
                //So { x:i, y:0 } is an object where x, y are keys and i, 0 are corresponding values
                // x, y refer to the co-ordinates on the plane of a particular box
                // this.cells is the snake array object
                // this.cells[i] refers to ith box in the snake
                // this.cells[i].x refers to X co-ordinate of ith box in snake
            }
        },
        drawSnake: function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs-2,this.cells[i].y*cs,cs-3,cs-3)
            //  pen.fillrect(x - coordinate of left most corner, y-coordinate of left most corner, width, height)
            }
        },
        updateSnake:function(){
            console.log("Updating snake according to direction property")
            // check whether the snake had eaten the food
            //generate new food
            var headX = this.cells[0].x // Coordinate of last cell x
            var headY = this.cells[0].y
            if(headX ==food.x && headY==food.y){
                console.log("Food eaten by snake")
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();//this will remove the last cell
            }
            
            // Coordinate of last cell y
            var nextX,nextY;
            if(this.direction=="right"){
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x:nextX,y:nextY});
            /* write a logic prevents snake from going out */

          var last_x = Math.round(W/cs);
          var last_y = Math.round(H/cs);

          if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
              game_over = true;    
          }
           
        }
    };
    snake.createSnake();


    //Add a event listener on the document object
    function keyPressed(e){
        // console.log("Key pressed",e.key);
        if(e.key == "ArrowRight"){
            snake.direction ="right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }
        console.log(e.key)
    }
    document.addEventListener('keydown',keyPressed)
}


function draw(){

    // Erase the old frame
    pen.clearRect(0,0,W,H);

    snake.drawSnake()

    pen.fillStyle = food.color;  
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,18,20,cs,cs)
    pen.fillStyle = "blue"
    pen.font = "20px Roboto"
    pen.fillText(score,50,50)
}


function update(){
    snake.updateSnake();
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*((W-cs)/cs));
    var foodY = Math.round(Math.random()*((H-cs)/cs));

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;

}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game over");
        return;
    }
    draw()
    update()
}

init();
var f = setInterval(gameloop,100)