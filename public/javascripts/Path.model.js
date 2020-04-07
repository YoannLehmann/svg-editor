class Path extends Shape {
    constructor(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, printType = PrintType.NO_TYPE, pathContent)
    {
        super(container, containerBoundingRect, containerWidth, containerHeight, width, height, xPos, yPos, color, 'path', printType);
        this.SVGElement = container.path(pathContent);
        this.SVGElement.x(this.xPos);
        this.SVGElement.y(this.yPos);
        this.updateAttr();
        super.setPrintType(printType);
    }

    updateAttr()
    {
        super.updateAttr();

        this.SVGElement.attr({
            'path-content' : this.pathContent
        });
    }
}