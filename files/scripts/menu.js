const MAIN_MENU = "main", GAMEOVER_MENU = "gameover"
let current_menu, title, description

function menu_config(menu)
{
    //define o menu atual
    current_menu = menu

    //caso esteja no menu principal
    if(current_menu === MAIN_MENU)
    {
        title = "Another Pong Clone"
        description = "Press SPACE to start"

        addEventListener("keydown", menu_input)
    }

    //caso esteja no menu pos jogo
    else if(current_menu === GAMEOVER_MENU)
    {
        title = score[0] > score[1] ? "Player 1 wins!" : "Player 2 wins!"
        description = "Press SPACE to go back"

        addEventListener("keydown", menu_input)
    }

    //caso o menu inserido nao exista
    else console.log("invalid menu")

    loop = setInterval(menu_update)
}

//atualizacao do menu
function menu_update()
{
    menu_draw()
}

function menu_draw()
{
    //limpa o canvas
    render.clearRect(0, 0, canvas.width, canvas.height)

    //configuracoes do texto
    render.fillStyle = "#fafafa"
    render.textAlign = "center"

    //desenha o titulo do menu
    render.font = Math.floor(canvas.height * .1) + "px Sarpanch"
    render.fillText(title, Math.floor(canvas.width * .5), Math.floor(canvas.height * .3))

    //desenha a descricao do menu
    render.font = Math.floor(canvas.height * .05) + "px Sarpanch"
    render.fillText(description, Math.floor(canvas.width * .5), Math.floor(canvas.height * .8))
}

function menu_input(event)
{
    if(!event.repeat)
    {
        //opcao selecionada do jogador
        if(event.keyCode === 32)
        {
            //limpa o listener e interrompe o menu_update()
            removeEventListener("keydown", menu_input)
            clearInterval(loop)

            //caso esteja no menu principal, inicia o jogo
            if(current_menu === MAIN_MENU) initGame()
            //caso esteja no menu pos jogo, leva ao menu principal
            else if(current_menu === GAMEOVER_MENU) menu_config(MAIN_MENU)
        }
    }
}