--[[
    Love2d looks for main functions
        it has a certain order that the prograam HAS TO run
]]

push = require 'push'          --import class
Class = require 'class'
require 'Ball'
require 'Paddle'
require "colors-rgb"

--screen ratio 16:9 ........... remember this.........
--physical window
WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 720
--virtual window size:  Your coordinates will be based on this system
VIRTUAL_WIDTH = 432
VIRTUAL_HEIGHT = 243

PADDLE_SPEED = 200



--Runs when the game first starts up, only once... only once
function love.load()
    --Nearest-nearest filtering  on upscaling and downscaling to prevent blurring of text and graphics
    love.graphics.setDefaultFilter('nearest','nearest')
    
    love.window.setTitle('pong')
    --set the seed or the "randomness" of the serve
    --if we set the "randomness" based on time, in theory it
    math.randomseed(os.time())


    --more retro looking font we need to load it in
    smallFont = love.graphics.newFont('font.ttf',8)
    scoreFont = love.graphics.newFont('font.ttf',32)
    largeFont = love.graphics.newFont('font.ttf',16)
    --set the font to the retro look
    love.graphics.setFont(smallFont)
    -- scoreFont = love.graphics.newFont('font.ttf',20)
   push:setupScreen(VIRTUAL_WIDTH,VIRTUAL_HEIGHT,WINDOW_WIDTH,WINDOW_HEIGHT,{
        fullscreen=false,
        resizable=false,
        vsync=true
   })
   
    --set up the score
    player1Score=7
    player2Score=7
    player3Score=7
    player4Score=7
    
    --create a paddle
    --paddle last 3 value are rgb for the color of the paddle
    player1 = Paddle(10,30,5,20,235, 64, 52)
    player2 = Paddle(VIRTUAL_WIDTH-10,VIRTUAL_HEIGHT/2-2,5,20,119, 235, 52)
    player3 = Paddle(200,5,20,5,52, 64, 235)
    player4 = Paddle(200,230,20,5,235, 52, 180)
   --ball(w,h,x,y)
    ball = Ball(VIRTUAL_WIDTH/2-2,VIRTUAL_HEIGHT/2-2,4,4)

    servingPlayer = 1
    --setting up the game to be in a "start mode" or "main menu"
   gameState = 'start'
end

--update runs every time the screen refreshes
function love.update(dt)
    --player 1 left side
    if love.keyboard.isDown('w') then
        player1.dy=-PADDLE_SPEED
    elseif love.keyboard.isDown('s') then
        player1.dy=PADDLE_SPEED
    else
        player1.dy=0
    end
        -- player 2 right side
    if love.keyboard.isDown('up') then
        player2.dy=-PADDLE_SPEED
    elseif love.keyboard.isDown('down') then
        player2.dy=PADDLE_SPEED
    else
        player2.dy=0
    end
    --player 3 top
    if love.keyboard.isDown('a') then
        player3.dx=-PADDLE_SPEED
    elseif love.keyboard.isDown('d') then
        player3.dx=PADDLE_SPEED
    else
        player3.dx=0
    end
    --player 4 bottom
    if love.keyboard.isDown('left') then
        player4.dx=-PADDLE_SPEED
    elseif love.keyboard.isDown('right') then
        player4.dx=PADDLE_SPEED
    else
        player4.dx=0
    end


    if gameState=='serve' then
        --before switching to play, set the ball's velocity
        if servingPlayer == 1 then
            ball.dx = math.random(140,200)
        elseif servingPlayer == 2 then
            ball.dx = -math.random(140,200)
        elseif servingPlayer == 3 then
            ball.dy = math.random(0,200) ----------------------------------------------------------
        end
        ball.dy = math.random(-50,50)
    elseif gameState == 'play'  then
    
        if ball:collides(player1) then
            ball.dx = -ball.dx * 1.03   --1.03 to speed up
            ball.x = player1.x+5      --move the ball of paddle
            
            if ball.dy<0 then
                ball.dy = -math.random(10,150)
            else
                ball.dy = math.random(10,150)
            end
        end
        if ball:collides(player2) then
            ball.dx = -ball.dx * 1.03   --1.03 to speed up
            ball.x = player2.x-5      --move the ball of paddle

            if ball.dy<0 then
                ball.dy = -math.random(10,150)
            else
                ball.dy = math.random(10,150)
            end
        end
        if ball:collides(player3) then
            ball.dy = -ball.dy * 1.03   --1.03 to speed up
            ball.y = player3.y+5      --move the ball of paddle
            
            if ball.dx<0 then
                ball.dx = -math.random(10,150)
            else
                ball.dx = math.random(10,150)
            end
        end
        if ball:collides(player4) then
            ball.dy = -ball.dy * 1.03   --1.03 to speed up
            ball.y = player4.y-5      --move the ball of paddle
            
            if ball.dx<0 then
                ball.dx = -math.random(10,150)
            else
                ball.dx = math.random(10,150)
            end
        end

        ball:update(dt)

    end

    --player1
    if ball.x < 0 then
        player2Score = player2Score - 1
        servingPlayer = 2
        if player2Score==0 then
            winningPlayer=2
            gameState='done'
        else
            gameState='serve'
        end
        ball:reset()
    end
    --player2
    if ball.x > VIRTUAL_WIDTH then
        player1Score = player1Score - 1
        servingPlayer = 1
        if player1Score==0 then
            winningPlayer=1
            gameState='done'
        else
            gameState='serve'
        end
        ball:reset()
    end
        --player3
    if ball.y < 0 then
        player3Score = player3Score - 1
        servingPlayer = 3
        if player3Score==0 then
            winningPlayer=3
            gameState='done'
        else
            gameState='serve'
        end
        ball:reset()
    end
       --player4
       if ball.y > VIRTUAL_HEIGHT then
        player4Score = player4Score - 1
        servingPlayer = 4
        if player4Score==0 then
            winningPlayer=4
            gameState='done'
        else
            gameState='serve'
        end
        ball:reset()
    end
    --update
    player1:update(dt)
    player2:update(dt)
    player3:update(dt)
    player4:update(dt)

end
--escape(leave game)
function love.keypressed(key)
    --keys can be accessed by string name
    if key =='escape' then
        love.event.quit()
        --enter to move ball
    elseif key=='enter' or key=='return' then
        if gameState == 'start' then
            --serve == moving state
            gameState = 'serve'
        elseif gameState == 'serve' then
            --play == serve state
            gameState = 'play'
        elseif gameState == 'done' then
            gameState='serve'
            player1Score=0
            player2Score=0
            player3Score=0
            player4Score=0
            ball:reset()

            if winningPlayer == 1 then
                servingPlayer = 2
            elseif winningPlayer == 2 then
                servingPlayer = 1
            elseif winningPlayer == 3 then
                servingPlayer = 4 
            else 
                servingPlayer = 3
            end
        end
    end
end

--call after update function by love2d, this draws what is on your screen
function love.draw()
    --begin rendering a virtual res
    push:apply('start')

    --Clear the screen AND set the backgrounf color(R,G,B,A)
    love.graphics.clear(40,45,52,225)

    love.graphics.setFont(smallFont)
    if gameState == 'start' then
        love.graphics.setFont(smallFont)
        love.graphics.printf('Welcome to Pong!', 0, 10, VIRTUAL_WIDTH, 'center')
        love.graphics.printf('Press Enter to begin!', 0, 20, VIRTUAL_WIDTH, 'center')
    elseif gameState == 'serve' then
        love.graphics.setFont(smallFont)
        love.graphics.printf('Player ' .. tostring(servingPlayer) .. "'s serve!", 
            0, 10, VIRTUAL_WIDTH, 'center')
        love.graphics.printf('Press Enter to serve!', 0, 20, VIRTUAL_WIDTH, 'center')
    elseif gameState == 'play' then
        -- no UI messages to display in play

    elseif gameState == 'done' then 
        love.graphics.setFont(largeFont)
        love.graphics.printf('Player ' .. tostring(winningPlayer) .. ' wins!',
            0, 10, VIRTUAL_WIDTH, 'center')
        love.graphics.setFont(smallFont)
        love.graphics.printf('Press Enter to restart!', 0, 30, VIRTUAL_WIDTH, 'center')
    end
    --love.graphics.setColor(r,g,b) pick the color
    love.graphics.setFont(scoreFont)
    love.graphics.setColor(119, 235, 52)
    love.graphics.print(tostring(player1Score), VIRTUAL_WIDTH / 2 - 50, VIRTUAL_HEIGHT / 3)
    love.graphics.setColor(235, 64, 52)
    love.graphics.print(tostring(player2Score), VIRTUAL_WIDTH / 2 + 30, VIRTUAL_HEIGHT / 3)
    love.graphics.setColor(235, 64, 52)
    love.graphics.print(tostring(player3Score), VIRTUAL_WIDTH / 2 + 30, VIRTUAL_HEIGHT / 2)
    love.graphics.setColor(235, 64, 52)
    love.graphics.print(tostring(player4Score), VIRTUAL_WIDTH / 2 - 50, VIRTUAL_HEIGHT / 2)

    player1:render()
    player2:render()
    player3:render()
    player4:render()
    -- player4:render()

    --ball
    ball:render()

    displayFPS()

    --end rendering of virtual res
    push:apply('end')
end

function displayFPS()
    -- simple FPS display across all states
    love.graphics.setFont(smallFont)
    love.graphics.setColor(0, 255, 0, 255)
    love.graphics.print('FPS: ' .. tostring(love.timer.getFPS()), 10, 10)
end