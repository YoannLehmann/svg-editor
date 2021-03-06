class Square extends Shape
{
    constructor(container, containerBoundingRect, containerWidth, containerHeight, sideLength, xPos, yPos, color, printType = PrintType.NO_TYPE)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, sideLength, sideLength, xPos, yPos, color, 'square', printType);

        this.SVGElement = container.rect(sideLength, sideLength);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);

        this.SVGElement.attr({
            fill: 'black',
        });
        this.updateAttr();
        super.setPrintType(printType);
    }

    updateAttr()
    {
        super.updateAttr();
    }
}