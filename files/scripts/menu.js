const MAIN_MENU = "main", GAMEOVER_MENU = "gameover"
let current_menu, title, description
let winnerText

function menu_config(menu)
{
    current_menu = menu

    if(current_menu === MAIN_MENU)
    {
        title = "Another Pong Clone"
        description = "Press SPACE to start"

        addEventListener("keydown", menu_input)
    }

    else if(current_menu === GAMEOVER_MENU)
    {
        title = score[0] >= 2 ? "Player 1 wins!" : "Player 2 wins!"
        description = "Press SPACE to go back"

        addEventListener("keydown", menu_input)
    }

    else console.log("invalid menu")

    loop = setInterval(menu_update)
}

function menu_update()
{
    menu_draw()
}

function menu_draw()
{
    render.clearRect(0, 0, canvas.width, canvas.height)

    render.fillStyle = "#fafafa"
    render.textAlign = "center"

    render.font = Math.floor(canvas.height * .1) + "px Sarpanch"
    render.fillText(title, Math.floor(canvas.width * .5), Math.floor(canvas.height * .3))

    render.font = Math.floor(canvas.height * .05) + "px Sarpanch"
    render.fillText(description, Math.floor(canvas.width * .5), Math.floor(canvas.height * .8))
}

function menu_input(event)
{
    if(!event.repeat)
    {
        if(event.keyCode === 32)
        {
            removeEventListener("keydown", menu_input)
            clearInterval(loop)

            if(current_menu === MAIN_MENU) initGame()
            else if(current_menu === GAMEOVER_MENU) menu_config(MAIN_MENU)
        }
    }
}