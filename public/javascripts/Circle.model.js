class Circle extends Shape 
{
    constructor(container, containerBoundingRect, containerWidth, containerHeight, diameter, xPos, yPos, color, printType = PrintType.NO_TYPE)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, diameter, diameter, xPos, yPos, color, 'circle', printType);

        this.diameter = diameter;
        this.SVGElement = container.circle(diameter);

        this.SVGElement.attr({
            fill: 'black',
        });

        this.SVGElement.move(this.xPos, this.yPos);
        this.updateAttr();
        super.setPrintType(printType);
    }
}