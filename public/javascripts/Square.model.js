class Square extends Shape
{
    constructor(container, containerBoundingRect, sideLength, xPos, yPos, color, printType = PrintType.NO_TYPE)
    {
        super(container, containerBoundingRect, sideLength, sideLength, xPos, yPos, color, 'square', printType);

        this.SVGElement = container.rect(sideLength, sideLength);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        
        this.changePrintType(this.printType);

        this.SVGElement.attr({
            fill: 'black'
        });
        this.updateAttr();
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

    changeSideLength(newSideLength)
    {
        this.width = newSideLength;
        this.height = newSideLength;
        this.SVGElement.attr({
            width: this.width,
            height: this.height
        });
    }

    updateAttr()
    {
        super.updateAttr();
    }
}