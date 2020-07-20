let ball = { xPos: 0, yPos: 0, width: 0, height: 0, xSpd: 0, ySpd: 0 }
let ballSpd, ballAngle, turn

function ball_config()
{
    //define o tamanho e a posicao da bola de acordo com o canvas
    ball.width = Math.floor(canvas.width * .02)
    ball.height = Math.floor(canvas.width * .02)
    ball.xPos = Math.floor(canvas.width / 2) - Math.floor(ball.width / 2)
    ball.yPos = Math.floor(canvas.height / 2) - Math.floor(ball.height / 2)

    //movimento da bola
    ballSpd = canvas.height * .0075

    //define o lado e o angulo inicial da bola
    //turn garante que a bola nao colida com a mesma barra mais de uma vez seguida
    if(Math.random() < .5)
    {
        ballAngle = Math.random() * (1.3 - .7) + .7
        turn = 0
    }
    else
    {
        ballAngle = Math.random() * (2.3 - 1.7) + 1.7
        turn = 1
    }
}

function ball_movement()
{
    //define a velocidade para cada eixo com base no angulo
    ball.xSpd = ballSpd * Math.cos(ballAngle * Math.PI)
    ball.ySpd = ballSpd * -Math.sin(ballAngle * Math.PI)
    
    //move a bola
    ball.xPos += ball.xSpd
    ball.yPos += ball.ySpd

    //checa a colisao com as barras (apenas com a do turno atual)
    ball_paddleCollision(paddle[turn % 2])

    //garante que a bola nao saia pelo eixo Y
    if(ball.yPos <= 0 || ball.yPos >= canvas.height - ball.height) ballAngle *= -1

    //caso a bola saia pelo eixo X
    if(ball.xPos <= 0) updateScore(1)
    if(ball.xPos >= canvas.width - ball.width) updateScore(0)
}

function ball_paddleCollision(paddle)
{
    //caso a bola colida com alguma barra
    if(ball.xPos + ball.width >= paddle.xPos && ball.xPos <= paddle.xPos + paddle.width &&
        ball.yPos + ball.height >= paddle.yPos && ball.yPos <= paddle.yPos + paddle.height)
    {
        //pega as posicoes do ponto central (eixo y) da bola e da barra
        let ballCenter = ball.yPos + ball.height / 2
        let paddleCenter = paddle.yPos + paddle.height / 2

        //recalcula o angulo da bola com base no local da barra que ela colidiu
        ballAngle = turn++ % 2 === 0 ?
            (paddleCenter - ballCenter) / (paddle.height / 2) * .3 : 
            (ballCenter - paddleCenter) / (paddle.height / 2) * .3 + 1

        if(ballSpd < canvas.height * .015) ballSpd *= 1.025
    }
}