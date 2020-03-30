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
        this.Select();
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
            
            let newPosX = event.clientX - (this.width / 2) - containerXPos;
            let newPosY = event.clientY - (this.height / 2) - containerYPos;

            (newPosX < 1 ? newPosX = 0 : newPosX = newPosX);
            (newPosY < 1 ? newPosY = 0 : newPosY = newPosY);

            if(newPosX >= 0 && newPosX <= 1000 - this.width)
            {
                this.SVGElement.x(newPosX);
            }
            
            if(newPosY >= 0 && newPosY <= 800 - this.height)
            {
                this.SVGElement.y(newPosY);
            }
            
            
        }
    }

    OnClickCallback(event)
    {
        console.log("Element clicked.");
    }

    Select()
    {
        this.SVGElement.css('opacity', '0.7');
    }

    Unselect()
    {
        this.SVGElement.css('opacity', '1');
    }
}