class Square extends Shape
{
    constructor(container, containerBoundingRect, sideLength, xPos, yPos, color)
    {
        super(container, containerBoundingRect, sideLength, sideLength, xPos, yPos, color);

        this.SVGElement = container.rect(sideLength, sideLength);
        this.SVGElement.attr({
            fill: this.color
        })
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
    }
}