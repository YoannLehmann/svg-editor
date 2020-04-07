class Path extends Shape {
    constructor(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, printType = PrintType.NO_TYPE, pathContent)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, 'path', printType, pathContent);
        this.SVGElement = container.path(pathContent);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        this.changePrintType(printType);
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

    updateAttr()
    {
        super.updateAttr();

        this.SVGElement.attr({
            'path-content' : this.pathContent
        });
    }
}