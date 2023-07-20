const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 20

const snake = [
  {x:400, y:400}] // cobra vai ser uma array que vai sendo implementada a cada comida que ela come

const food = {
  x: 100,
  y: 100,
  color: "yellow"

} 
let direction, loopId;

const drawFood = () => {

  const {x, y, color} = food //exemplo de desestruturação que aprendi no jstack e agora usando em outro projeto
 // podemos ver que as linhas abaixo não precisam mais usar o ponto alguma coisa que nem era antes (food.x, food.y e assim por diante)
  ctx.shadowColor = color
  ctx.shadowBlur = 6
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
  ctx.shadowBlur = 0
}


const drawSnake = () => {
  ctx.fillStyle = "#ddd"
  snake.forEach((position, index) => {
    if(index == snake.length -1){
      ctx.fillStyle = "blue"
    }
    ctx.fillRect(position.x, position.y, size, size)
  })
}

const moveSnake = () => {
  if(!direction) return
  const head = snake.at(-1)
  
  if (direction == "right") {
    snake.push({x:head.x + size, y:head.y})

  }

  if (direction == "left") {
    snake.push({x:head.x - size, y:head.y})

  }

  if (direction == "down") {
    snake.push({x:head.x, y:head.y + size})

  }

  if (direction == "up") {
    snake.push({x:head.x, y:head.y - size})

  }


  snake.shift()
}

const drawGrid = () => {
  ctx.lineWidth = 1
  ctx.strokeStyle = "#191919"

  for (let i = 20; i < canvas.width; i += 20) {

    ctx.beginPath()
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 800)
    ctx.stroke()   

    ctx.beginPath()
    ctx.lineTo(0, i)
    ctx.lineTo(800, i)
    ctx.stroke()   

    
  }

}

const gameLoop = () => {
  clearInterval(loopId)
  ctx.clearRect(0,0, 800, 800)
  

  
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  

  loopId = setTimeout(() => {
    gameLoop()

  },300)
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
  if (key == "ArrowRight" && direction != "left" ) {
    direction = "right"
  }

  if (key == "ArrowLeft" && direction != "right") {
    direction = "left"
  }

  if (key == "ArrowUp" && direction != "down") {
    direction = "up"
  }

  if (key == "ArrowDown" && direction != "up") {
    direction = "down"
  }



})



