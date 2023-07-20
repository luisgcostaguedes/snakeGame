const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 20

const snake = [
  {x:200, y:200},
  {x:220, y:200},
  


] // cobra vai ser uma array que vai sendo implementada a cada comida que ela come

let direction, loopId;

const drewSnake = () => {
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

const gameLoop = () => {
  clearInterval(loopId)
  ctx.clearRect(0,0, 800, 800)
  moveSnake();
  drewSnake();

  loopId = setTimeout(() => {
    gameLoop()

  },100)
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



