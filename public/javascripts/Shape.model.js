class Shape 
{
    constructor(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, type = ShapeType.NO_SHAPE, printType = PrintType.NO_TYPE)
    {
        this.container = container;
        this.containerBoundingRect = containerBoundingRect;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
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
            let newPosX = this.SVGElement.x() + dx;
            let newPosY = this.SVGElement.y() + dy;
            this.oldMousePosition = newMousePosition;
        
            // @TODO Modifier la taille de la zone pour que ce soit automatique.
            if(newPosX >= 0 && newPosX <= this.containerWidth - this.width)
            {
                this.SVGElement.x(newPosX);
            }
            
            if(newPosY >= 0 && newPosY <= this.containerHeight - this.height)
            {
                this.SVGElement.y(newPosY);
            }
            
            
        }
        this.updateAttr();
    }

    OnClickCallback(event){}

    Select()
    {
        this.SVGElement.css('opacity', '0.7');
    }

    Unselect()
    {
        this.SVGElement.css('opacity', '1');
    }

    updateAttr()
    {
        this.SVGElement.attr({
            'width' : this.width,
            'height' : this.height,
            'color' : this.color,
            'print-type' : this.printType,
            'node-type' : this.type
        });
    }

    updateContainerSize(newContainerWidth, newContainerHeight)
    {
        this.containerWidth = newContainerWidth;
        this.containerHeight = newContainerHeight;
    }

    changePrintType(newPrintType)
    {
        this.printType = newPrintType;

        if(this.printType === PrintType.CUTTING)
        {
            this.SVGElement.attr({
                'fill-opacity' : 0
            });
            this.SVGElement.stroke({
                color: 'red',
                width: 1
            });
        }
        else if(this.printType === PrintType.ENGRAVE)
        {
            this.color = 'black';
            this.SVGElement.attr({
                'fill-opacity' : 1
            });
            this.SVGElement.stroke({
                color: 'red',
                width: 0
            });
        }
    }

    getPrintType()
    {
        return this.printType;
    }
}