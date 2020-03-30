class Shape 
{
    constructor(container, containerBoundingRect, width, height, xPos, yPos, color)
    {
        this.container = container;
        this.containerBoundingRect = containerBoundingRect;
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.mousePressed = false;
        this.SVGElement = null;
    }

    printDescription()
    {
        console.log("Width : " + this.width + ", Height : " + this.height, ", XPos : " + this.xPos + ", YPos : " + this.yPos);
    }

    OnMouseDownCallback(event)
    {
        console.log("MouseDown");
        this.mousePressed = true;
    }

    OnMouseUpCallback(event)
    {
        console.log("MouseUp");
        this.mousePressed = false;
    }

    OnMouseMoveCallback(event)
    {
        console.log("MouseMove");

        if(this.mousePressed)
        {
            let containerXPos = this.containerBoundingRect.left;
            let containerYPos = this.containerBoundingRect.top;
            
            this.SVGElement.attr({
                x : event.clientX - (this.width / 2) - containerXPos,
                y : event.clientY - (this.height / 2) - containerYPos
            });
        }
    }
}

/*
class Shape 
{
    SVGShape = null;
    mousePressed = false;
    height = 0;
    width = 0;
    
    construtor(container, height = 10, width = 10, xPos = 10, yPos = 10) {
        
        this.container  = container;
        this.height     = height;
        this.width      = width;
        this.xPos       = xPos;
        this.yPos       = yPos;

        //this.shape = this.container.rect(100, 100).attr({ fill: '#f06' });
        
        /*

        shape.addEventListener('mousedown', function(){
            this.mousePressed = true;
        });
    
        shape.addEventListener('mouseup', function(){
            this.mousePressed = true;
        });
    
        shape.addEventListener('mousemove', function(){
            if(this.mousePressed)
            {
                let containerBoundingRect = container.getBoundingClientRect();
        
                let containerXPos = containerBoundingRect.left;
                let containerYPos = containerBoundingRect.top;
                
                
                this.attr({
                    x : event.clientX - (this.width / 2) - containerXPos,
                    y : event.clientY - (this.height / 2) - containerYPos
                });
            }
        });
        
    }

    print() {
        console.log("Height " + this.height);
        console.log(this.container);
        console.log(this.shape);
    }
}
*/