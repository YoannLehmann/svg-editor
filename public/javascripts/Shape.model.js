class Shape 
{
    constructor(container, containerBoundingRect, width, height, xPos, yPos, color, type = 'shape')
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
        this.type = type;
    }

    OnMouseOverCallback(event)
    {
        this.SVGElement.css({
            cursor: "pointer"
        });
    }

    OnMouseDownCallback(event)
    {
        this.Select();
        this.mousePressed = true;
    }

    OnMouseUpCallback(event)
    {
        this.mousePressed = false;
    }

    OnMouseMoveCallback(event)
    {
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