const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const audio = new Audio('../assets/audio.mp3')
const size = 20

const snake = [
  {x:400, y:400}] // cobra vai ser uma array que vai sendo implementada a cada comida que ela come

const randowNumber = (min, max) => {
  return Math.round( Math.random() * (max-min)+ min)
}

const randowPosition = () => {
  const number = randowNumber(0, canvas.width - size) // aqui pegamos o tamanho de toda a área do jogo e tiramos tamanho da comida, para que ela nunca caia na bairada do ambiente do jogo
  return Math.round(number/20) * 20 //para tornar os numeros aleatórios utilizei esta formula para que seja gerado multiplos de 20, que é o tamanho dos espaços do jogo
}

const randomColor = () => {
  const red = randowNumber(0,255)
  const green = randowNumber(0,255)
  const blue = randowNumber(0,255)

  return `rgb(${red}, ${green}, ${blue})` //utilizando a função de numero aleatórios podemos criar 3 variaveis que vão formar as cores aleatórias para as comidas do jogo

}

const food = {
  x: randowPosition(),
  y: randowPosition(),
  color: randomColor(),

  // aqui utilizamos o numero aleatorio para gerar as coordenadas de x e y, para onde a comida vai ficar
  // considerando a media retirada do size, para que não caia número perto de 800 que é o limite da bairada do jogo


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
//função utilizada para a criação do grid do jogo onde desenhamos as linhas em x e y
}

const checkEat = () => {
  const head = snake.at(-1)

  if(head.x == food.x && head.y == food.y){
    snake.push(head)
    audio.play()

    let x = randowPosition()
    let y = randowPosition()

    while (snake.find((position) => position.x == x && position.y == y )){     x = randowPosition(),
      y = randowPosition()
    }

    food.x = x
    food.y = y
    food.color = randomColor()

  }

}

const checkCollision = () => {
  const head = snake[snake.length - 1]

  if (head.x < 0 || head.x > 780 || head.y < 0 || head.y > 780) {

    alert("Você perdeu!!")
  }


}

const gameLoop = () => {
  clearInterval(loopId)
  ctx.clearRect(0,0, 800, 800)
  

  
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  checkEat();
  

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

// função para pegar os botões que são pressionados 

})



