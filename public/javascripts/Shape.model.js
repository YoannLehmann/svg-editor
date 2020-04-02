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
        this.oldMousePosition = null;
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

        let containerXPos = this.containerBoundingRect.left;
        let containerYPos = this.containerBoundingRect.top;

        this.mousePressed = true;
        this.oldMousePosition = [
            event.clientX - containerXPos,
            event.clientY - containerYPos
        ];
    }

    OnMouseUpCallback(event)
    {
        this.mousePressed = false;
        this.oldMousePosition = null;
    }

    OnMouseMoveCallback(event)
    {
        if(this.mousePressed && this.oldMousePosition !== null) 
        {
            let containerXPos = this.containerBoundingRect.left;
            let containerYPos = this.containerBoundingRect.top;
            
            let newMousePosition = [
                event.clientX - containerXPos,
                event.clientY - containerYPos
            ];

            let dx = newMousePosition[0] - this.oldMousePosition[0];
            let dy = newMousePosition[1] - this.oldMousePosition[1];
            let newPosX = this.SVGElement.x() + dx;//event.clientX  - containerXPos;
            let newPosY = this.SVGElement.y() + dy;//event.clientY  - containerYPos;
            this.oldMousePosition = newMousePosition;
        

            //if(newPosX >= 0 && newPosX <= 1000 - this.width)
            //{
                this.SVGElement.x(newPosX);
                //this.SVGElement.move(this.SVGElement.x, 0);
            //}
            
            //if(newPosY >= 0 && newPosY <= 800 - this.height)
            //{
                this.SVGElement.y(newPosY);
                //this.SVGElement.move(0, dy);
            //}
            
            
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