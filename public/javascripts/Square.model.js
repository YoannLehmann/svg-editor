class Square extends Shape
{
    constructor(container, containerBoundingRect, sideLength, xPos, yPos, color)
    {
        super(container, containerBoundingRect, sideLength, sideLength, xPos, yPos, color, 'square');

        this.SVGElement = container.rect(sideLength, sideLength);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        this.changeColor(this.color);
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

    changeColor(newColor)
    {
        this.color = newColor;
        this.SVGElement.attr({
            fill : "#" + newColor
        })
    }
}