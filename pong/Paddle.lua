-- class Paddle

Paddle = Class{}

-- def __init__(self):  Constructor
-- add red,green,blue to the function so can add color
function Paddle:init(x,y,width,height,red,green,blue)
     self.x = x
     self.y = y
     self.width = width
     self.height = height
     self.dy=0
     self.dx=0
     self.r=red
     self.g=green
     self.b=blue
end

--update the Paddle
function Paddle:update(dt)
     if self.dy<0 then
          self.y = math.max(0,self.y+self.dy*dt)
     else
          self.y = math.min(VIRTUAL_HEIGHT-self.height,self.y+self.dy*dt)
     end
     if self.dx<0 then
          self.x = math.max(0,self.x+self.dx*dt)
     else
          self.x = math.min(VIRTUAL_WIDTH-self.width,self.x+self.dx*dt)
     end
end




--draw the Paddle onto the screen
--render the color
function Paddle:render()
     love.graphics.setColor(self.r,self.g,self.b)
     love.graphics.rectangle('fill',self.x,self.y,self.width,self.height)
end