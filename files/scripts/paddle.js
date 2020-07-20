let paddle = [{ xPos: 0, yPos: 0, width: 0, height: 0, spd: 0 }, { xPos: 0, yPos: 0, width: 0, height: 0, spd: 0 }]
let paddleSpd, w, s, up, down

function paddle_config()
{
    //define o tamanho e a posicao das barras de acordo com o canvas
    for(let i = 0; i < 2; i++)
    {
        paddle[i].width = Math.floor(canvas.width * .02)
        paddle[i].height = Math.floor(canvas.height * .2)
        paddle[i].yPos = Math.floor(canvas.height / 2) - Math.floor(paddle[i].height / 2)
    }

    paddle[0].xPos = Math.floor(canvas.width * .02)
    paddle[1].xPos = Math.floor(canvas.width * .96)

    //variaveis para o movimento das barras
    paddleSpd = Math.floor(canvas.height * .01)

    w = s = up = down = false
}

//adiciona os listeners para a movimentacao das barras
function paddle_input()
{
    addEventListener("keydown", paddle_keydown)
    addEventListener("keyup", paddle_keyup)
}

//aumenta a velocidade na direcao da tecla pressionada
function paddle_keydown(event)
{
    if(!event.repeat)
    {
        if(event.keyCode === 87) w = true
        if(event.keyCode === 83) s = true
        if(event.keyCode === 38) up = true
        if(event.keyCode === 40) down = true
    }
}

//aumenta a velocidade na direcao contraria da tecla solta
function paddle_keyup(event)
{
    if(event.keyCode === 87) w = false
    if(event.keyCode === 83) s = false
    if(event.keyCode === 38) up = false
    if(event.keyCode === 40) down = false
}

function paddle_movement()
{
    //configura as velocidades
    if(w === s) paddle[0].spd = 0
    else if(w) paddle[0].spd = -paddleSpd
    else if(s) paddle[0].spd = paddleSpd

    if(up === down) paddle[1].spd = 0
    else if(up) paddle[1].spd = -paddleSpd
    else if(down) paddle[1].spd = paddleSpd

    //move as barras
    paddle[0].yPos += paddle[0].spd
    paddle[1].yPos += paddle[1].spd

    //garante que as barras nao saiam da tela
    if(paddle[0].yPos < 0) paddle[0].yPos = 0
    if(paddle[0].yPos > canvas.height - paddle[0].height) paddle[0].yPos = canvas.height - paddle[0].height
    if(paddle[1].yPos < 0) paddle[1].yPos = 0
    if(paddle[1].yPos > canvas.height - paddle[1].height) paddle[1].yPos = canvas.height - paddle[1].height
}