let canvas, render
let ball = { xPos: 0, yPos: 0, width: 0, height: 0, xSpd: 0, ySpd: 0 }
let paddle = [{ xPos: 0, yPos: 0, width: 0, height: 0, spd: 0 }, { xPos: 0, yPos: 0, width: 0, height: 0, spd: 0 }]
const fps = 1000/60

window.onload = function()
{
    canvas = document.getElementById("canvas")
    render = canvas.getContext("2d")

    //define o tamanho do canvas de acordo com a tela
    canvas.width = window.innerWidth >= window.innerHeight * 1.33 ?
        Math.floor(window.innerHeight * 1.33) : Math.floor(window.innerWidth * .9)

    canvas.height = window.innerWidth >= window.innerHeight * 1.33 ?
        Math.floor(window.innerHeight * .9) : Math.floor(window.innerWidth * .75)

    initGame()
}

function initGame()
{
    paddle_config()
    ball_config()

    setInterval(update, fps)

    paddle_input()
}

function update()
{
    paddle_movement()
    ball_movement()
    
    draw()
}

function draw()
{
    //limpa o canvas
    render.clearRect(0, 0, canvas.width, canvas.height)

    render.fillStyle = "#fafafa"

    //desenha a divisoria, as barras e a bola, respectivamente
    render.fillRect(Math.floor(canvas.width / 2), 0, 1, canvas.height)

    render.fillRect(paddle[0].xPos, paddle[0].yPos, paddle[0].width, paddle[0].height)
    render.fillRect(paddle[1].xPos, paddle[1].yPos, paddle[1].width, paddle[1].height)

    render.fillRect(ball.xPos, ball.yPos, ball.width, ball.height)
}