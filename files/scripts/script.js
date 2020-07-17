let canvas, render, windowSize, paddleSpd
let ball = { xPos: 0, yPos: 0, width: 0, height: 0, xSpd: 0, ySpd: 0 }
let paddle = [{ xPos: 0, yPos: 0, width: 0, height: 0, ySpd: 0 }, { xPos: 0, yPos: 0, width: 0, height: 0, ySpd: 0 }]
let w = false, s = false, up = false, down = false
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
    //define o tamanho e a posicao das barras de acordo com o canvas
    for(let i = 0; i < 2; i++)
    {
        paddle[i].width = Math.floor(canvas.width * .02)
        paddle[i].height = Math.floor(canvas.height * .2)
        paddle[i].yPos = Math.floor(canvas.height / 2) - Math.floor(paddle[i].height / 2)
    }

    paddle[0].xPos = Math.floor(canvas.width * .02)
    paddle[1].xPos = Math.floor(canvas.width * .98) - Math.floor(paddle[1].width)

    //define o tamanho e a posicao da bola de acordo com o canvas
    ball.width = Math.floor(canvas.width * .02)
    ball.height = Math.floor(canvas.width * .02)
    ball.xPos = Math.floor(canvas.width / 2) - Math.floor(ball.width / 2)
    ball.yPos = Math.floor(canvas.height / 2) - Math.floor(ball.height / 2)

    paddleSpd = Math.floor(canvas.height * .01)

    setInterval(update, fps)

    input()
}

function update()
{
    paddleMovement()
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

function input()
{
    //aumenta a velocidade na direcao da tecla pressionada
    addEventListener("keydown", event => {
        if(!event.repeat)
        {
            if(event.keyCode === 87) w = true
            if(event.keyCode === 83) s = true
            if(event.keyCode === 38) up = true
            if(event.keyCode === 40) down = true
        }
    })
    
    //aumenta a velocidade na direcao contraria da tecla solta
    addEventListener("keyup", event => {
        if(event.keyCode === 87) w = false
        if(event.keyCode === 83) s = false
        if(event.keyCode === 38) up = false
        if(event.keyCode === 40) down = false
    })
}

function paddleMovement()
{
    //configura as velocidades
    if(w === s) paddle[0].ySpd = 0
    else if(w) paddle[0].ySpd = -paddleSpd
    else if(s) paddle[0].ySpd = paddleSpd

    if(up === down) paddle[1].ySpd = 0
    else if(up) paddle[1].ySpd = -paddleSpd
    else if(down) paddle[1].ySpd = paddleSpd

    //move as barras
    paddle[0].yPos += paddle[0].ySpd
    paddle[1].yPos += paddle[1].ySpd

    //garante que as barras nao saiam da tela
    if(paddle[0].yPos < 0) paddle[0].yPos = 0
    if(paddle[0].yPos > canvas.height - paddle[0].height) paddle[0].yPos = canvas.height - paddle[0].height
    if(paddle[1].yPos < 0) paddle[1].yPos = 0
    if(paddle[1].yPos > canvas.height - paddle[1].height) paddle[1].yPos = canvas.height - paddle[1].height
}